
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { 
    CanvasData, 
    CanvasSection, 
    ResearchQuestionItem, 
    MarketResearchData, 
    ResearchSection, 
    CompetitorProfile, 
    TrendEntry, 
    ALL_CANVAS_SECTIONS,
    ResearchQuestionnaireSet,
    Language
} from '../types';
import { API_KEY_WARNING } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(API_KEY_WARNING);
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const textModel = 'gemini-2.5-flash-preview-04-17';

const parseJsonFromText = <T,>(text: string): T | null => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", text);
    return null;
  }
};


export const generateBusinessCanvasContent = async (
  businessIdea: string,
  problemSolved: string,
  targetCustomer: string,
  uniqueSellingProposition: string,
  sections: CanvasSection[],
  language: Language
): Promise<Partial<CanvasData> | null> => {
  if (!API_KEY) return null;

  const langInstructions = language === 'am'
  ? "All generated textual content for the sections MUST be in Amharic. The JSON keys themselves (the section names like 'Project Overview', 'Product Vision', etc.) MUST remain in English as provided in the list of sections. Provide rich, culturally relevant Amharic content that is practical for an Ethiopian entrepreneur."
  : "All generated content should be in English and be practical for an Ethiopian entrepreneur.";


  const prompt = `
You are an AI assistant helping an entrepreneur develop a business plan for Ethiopia.
${langInstructions}

Business Idea: ${businessIdea}
Problem Solved (in Ethiopian context): ${problemSolved}
Target Customer (Focus on Ethiopian demographics, psychographics, and cultural nuances): ${targetCustomer}
Unique Selling Proposition (for the Ethiopian market): ${uniqueSellingProposition}

Based on the above information, generate concise and actionable content for a Business Launch Canvas.
All generated content MUST be highly relevant and contextualized for the Ethiopian business environment.
Financial figures should implicitly relate to Ethiopian Birr (ETB).
Market examples, competitor considerations, and business model suggestions should reflect local Ethiopian realities, common practices, and potential challenges (e.g., infrastructure, logistics, payment systems like Telebirr or CBE Birr).

For each of the following sections, provide a practical description or strategy (2-4 sentences per section):
${sections.join("\n")} 

When generating content for sections like 'Market', 'Pricing', 'Competitors', and 'Unit Economics', pay special attention to Ethiopian specifics (e.g., common distribution channels, local purchasing power, typical cost structures, regulatory landscape if generally applicable, local competition).

Return the response as a valid JSON object where keys are the section names (exactly as provided in English above) and values are the generated content strings (in ${language === 'am' ? 'Amharic' : 'English'}).
Ensure the entire output is a single JSON object.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: [{ role: "user", parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, 
      },
    });
    
    const textResponse = response.text;
    if (!textResponse) {
        console.error("Gemini API returned no text for Business Canvas.");
        return null;
    }
    
    const parsedData = parseJsonFromText<Partial<CanvasData>>(textResponse);
    if (parsedData) {
      const result: Partial<CanvasData> = {};
      ALL_CANVAS_SECTIONS.forEach(section => { 
        if (sections.includes(section)) { 
            if (parsedData[section]) {
                result[section] = parsedData[section];
            } else {
                console.warn(`AI did not generate content for section: ${section}. Setting default.`);
                result[section] = language === 'am' 
                  ? "AI ለዚህ ክፍል ይዘት ማመንጨት አልቻለም። እባክዎ በእጅ ይሙሉ ወይም የ AI ጥያቄዎችን ያጥሩ፣ የኢትዮጵያን ሁኔታ ግምት ውስጥ ያስገቡ።"
                  : "AI could not generate content for this section. Please fill manually or refine AI prompt inputs, keeping the Ethiopian context in mind.";
            }
        }
      });
      return result;
    }
    const errorResult: Partial<CanvasData> = {};
    sections.forEach(section => {
      errorResult[section] = language === 'am' ? "የ AI ምላሽ መተንተን አልተሳካም። እባክዎ የ AI ግብአቶችን ያረጋግጡ ወይም እንደገና ይሞክሩ።" : "AI response parsing failed. Please check AI inputs or try again.";
    });
    return errorResult;

  } catch (error) {
    console.error("Error generating business canvas content:", error);
    const errorResult: Partial<CanvasData> = {};
    sections.forEach(section => {
      errorResult[section] = language === 'am' ? "AI መጥራት ላይ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ። ግብአቶችዎ የኢትዮጵያን የንግድ ሁኔታ በግልፅ ማንጸባረቃቸውን ያረጋግጡ።" : "Error calling AI. Please try again. Ensure your inputs clearly reflect your Ethiopian business context.";
    });
    return errorResult;
  }
};


export const generateMarketResearchQuestions = async (
  strategyData: Partial<CanvasData>,
  researchGoal: string,
  targetAudience: string,
  language: Language
): Promise<ResearchQuestionItem[]> => {
  if (!API_KEY) return [];

  const strategyContextString = `
---BEGIN ETHIOPIAN BUSINESS STRATEGY (Language of strategy elements below is as provided by user, AI should process it for context)---
Project Overview: ${strategyData[CanvasSection.PROJECT_OVERVIEW] || "Not defined"}
Product Vision: ${strategyData[CanvasSection.PRODUCT_VISION] || "Not defined"}
Problem (in Ethiopian context): ${strategyData[CanvasSection.PROBLEM] || "Not defined"}
Solution (for Ethiopian market): ${strategyData[CanvasSection.SOLUTION] || "Not defined"}
Unique Value Proposition (for Ethiopian market): ${strategyData[CanvasSection.UNIQUE_VALUE_PROPOSITION] || "Not defined"}
---END ETHIOPIAN BUSINESS STRATEGY---
  `.trim();

  const langInstructions = language === 'am'
  ? "The generated market research questions MUST be in Amharic. These questions should be culturally sensitive and easy for Amharic speakers in Ethiopia to understand and respond to."
  : "The generated market research questions should be in English.";


  const prompt = `
You are an expert market research consultant specializing in the Ethiopian market.
You are assisting a client with their business in Ethiopia, detailed in the Business Launch Canvas context provided above.
${langInstructions}

The client's specific goal for THIS market research set is: "${researchGoal}".
The target audience for THIS research set is: "${targetAudience}" (within Ethiopia).

Based on the comprehensive Ethiopian business strategy provided AND the specific research goal and target audience for this set,
generate a list of 5 to 7 key, open-ended market research questions. These questions MUST be:
1. Culturally sensitive and appropriate for the Ethiopian context. If in Amharic, use clear and common Amharic. If in English, ensure they are understandable for an Ethiopian audience.
2. Designed to elicit insightful responses from Ethiopian consumers/stakeholders.
3. Consider local consumer habits, infrastructure challenges (e.g., internet penetration, logistics), socio-economic factors, and common communication styles in Ethiopia.
4. Directly help the client achieve their stated research goal and refine their business strategy for success in Ethiopia.

Return the response as a valid JSON array of strings, where each string is a question (in ${language === 'am' ? 'Amharic' : 'English'}).
For example: ["Question 1?", "Question 2?", "Question 3?"]
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: [{ role: "user", parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.6, 
      }
    });
    const textResponse = response.text;
     if (!textResponse) {
        console.error("Gemini API returned no text for research questions.");
        return [];
    }
    const questionsArray = parseJsonFromText<string[]>(textResponse); 
    if (questionsArray && Array.isArray(questionsArray)) {
      return questionsArray.map((q, index) => ({ 
        id: `q-${Date.now()}-${index}`, 
        text: q, // Text will be in the AI-generated language
        responses: [] 
      }));
    }
    return [];
  } catch (error) {
    console.error("Error generating market research questions:", error);
    return [];
  }
};

export const generateMarketResearchSummary = async (
  researchData: Pick<MarketResearchData, ResearchSection.QUESTIONS | ResearchSection.GENERAL_NOTES_IMPORT | ResearchSection.COMPETITOR_ANALYSIS | ResearchSection.TRENDS>,
  strategyData: Partial<CanvasData> | null,
  language: Language
): Promise<string> => {
  if (!API_KEY) return language === 'am' ? "የ AI ማጠቃለያ ማመንጨት ተሰናክሏል። የኤፒአይ ቁልፍ ጠፍቷል።" : "AI Summary generation disabled. API key missing.";

  let questionsAndResponsesSummary = language === 'am' ? "ምንም የምርምር ጥያቄ ስብስቦች አልቀረቡም ወይም በስብስቦች ውስጥ ምንም ጥያቄዎች የሉም።" : "No research question sets provided or no questions within sets.";
  if (researchData[ResearchSection.QUESTIONS] && researchData[ResearchSection.QUESTIONS].length > 0) {
    const allSetsSummaries = researchData[ResearchSection.QUESTIONS].map(set => {
      let setSummary = `${language === 'am' ? 'የምርምር ስብስብ' : 'Research Set'}: "${set.name}" (${language === 'am' ? 'ግብ' : 'Goal'}: ${set.researchGoal}, ${language === 'am' ? 'ታዳሚ በኢትዮጵያ' : 'Audience in Ethiopia'}: ${set.targetAudience})\n`;
      if (set.questions.length > 0) {
        setSummary += set.questions.map(q => {
          const responsesText = q.responses.length > 0 
            ? `\n    ${language === 'am' ? 'የግል ምላሾች (ከኢትዮጵያ አውድ)' : 'Individual Responses (from Ethiopian context)'}:\n      - ${q.responses.map(r => r.text).join('\n      - ')}`
            : `\n    (${language === 'am' ? 'ለዚህ ጥያቄ ምንም የግል ምላሾች አልተመዘገቡም' : 'No individual responses recorded for this question'})`;
          return `  - ${language === 'am' ? 'ጥያቄ' : 'Question'}: ${q.text}${responsesText}`;
        }).join('\n');
      } else {
        setSummary += `  (${language === 'am' ? 'በዚህ ስብስብ ውስጥ ምንም ጥያቄዎች የሉም' : 'No questions in this set'})`;
      }
      return setSummary;
    });
    questionsAndResponsesSummary = allSetsSummaries.join('\n\n');
  }

  // Competitor and Trend summaries would also need conditional Amharic labels if we were fully localizing this data presentation layer.
  // For now, the data itself is assumed to be in the language it was entered or generated in.
  let competitorsSummary = "No competitor analysis provided.";
  if (researchData[ResearchSection.COMPETITOR_ANALYSIS] && researchData[ResearchSection.COMPETITOR_ANALYSIS].length > 0) {
    competitorsSummary = researchData[ResearchSection.COMPETITOR_ANALYSIS].map(c => 
      `  - Competitor (in Ethiopian market): ${c.name}\n` +
      `    Pricing (ETB): ${c.pricingStrategy || 'N/A'}\n` // Keep N/A or translate
      // ... and so on
    ).join('\n\n');
  }
  // Similar for trendsSummary

  let strategyContextString = language === 'am' ? "ከቢዝነስ ማስጀመሪያ ሸራ ምንም የተለየ የንግድ ስትራቴጂ አውድ አልቀረበም።" : "No specific business strategy context provided from the Business Launch Canvas.";
  if (strategyData) {
     strategyContextString = Object.entries(strategyData)
      .filter(([key, value]) => value && value.trim() !== "Not defined")
      .map(([key, value]) => `- ${key} (Ethiopia context): ${value}`)
      .join('\n');
    if (!strategyContextString) strategyContextString = language === 'am' ? "የስትራቴጂ ሸራ ባዶ ነው።" : "Strategy canvas is empty.";
  }

  const langInstructions = language === 'am'
  ? "The summary MUST be in Amharic. It should be insightful and actionable for an Ethiopian entrepreneur. Analyze the provided data considering the Ethiopian market and cultural nuances."
  : "The summary should be in English. It should be insightful and actionable for an Ethiopian entrepreneur, analyzing data within the Ethiopian market context.";

  const prompt = `
As an expert market research analyst with a deep understanding of the Ethiopian market, provide a concise and insightful summary (3-5 paragraphs) 
based on the following comprehensive market research data AND the business's strategic context.
${langInstructions}

Business Strategic Context (for a business in Ethiopia - content language is as provided by user):
${strategyContextString}

Market Research Data (gathered with an Ethiopian focus - content language is as provided or generated):
1. Research Question Sets (including questions and individual responses):
${questionsAndResponsesSummary}

2. General Notes & Bulk Imported Data:
${researchData[ResearchSection.GENERAL_NOTES_IMPORT] || (language === 'am' ? 'የለም' : "N/A")}

3. Competitor Analysis (focusing on Ethiopian market):
${competitorsSummary}

4. Key Industry Trends (relevant to Ethiopia):
${researchData[ResearchSection.TRENDS].length > 0 ? researchData[ResearchSection.TRENDS].map(t => t.title).join(', ') : (language === 'am' ? 'የለም' : "N/A")}


Your summary MUST:
1. Analyze how the research findings support, challenge, or refine the stated business strategy specifically within the Ethiopian context.
2. Highlight key findings, patterns, and insights particularly relevant to operating and succeeding in Ethiopia. Consider local consumer behavior, economic conditions, infrastructure, and cultural factors.
3. Identify potential opportunities and critical considerations unique to or pronounced in the Ethiopian market (e.g., leveraging mobile money like Telebirr, addressing logistical challenges, adapting to local digital literacy levels).
4. Provide strategic recommendations that are actionable and practical for a business in Ethiopia. Financial aspects should implicitly consider Ethiopian Birr (ETB).
Ensure the summary clearly links research findings back to the business strategy for success in Ethiopia.
Generate the comprehensive summary:
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: textModel,
      contents: [{ role: "user", parts: [{text: prompt}] }],
       config: {
        temperature: 0.65, 
      }
    });
    return response.text || (language === 'am' ? "AI ማጠቃለያ ማመንጨት አልቻለም። እባክዎ ለኢትዮጵያ በቂ የአውድ መረጃ መኖሩን ያረጋግጡ።" : "AI could not generate a summary. Please ensure sufficient contextual data for Ethiopia is present.");
  } catch (error) {
    console.error("Error generating market research summary:", error);
    return language === 'am' ? "ማጠቃለያ በማመንጨት ላይ ስህተት ተፈጥሯል። እባክዎ እንደገና ይሞክሩ። የምርምር እና የስትራቴጂ ክፍሎች የኢትዮጵያን አውድ የሚያንጸባርቅ ይዘት እንዳላቸው ያረጋግጡ።" : "Error generating summary. Please try again. Ensure that both research and strategy sections have some content reflecting the Ethiopian context.";
  }
};
