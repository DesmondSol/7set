import { GenerateContentResponse, Part } from "@google/genai";
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
    Language,
    MarketingPost, 
    Pitch, 
    PitchType, 
    MarketingPostStatus,
    MindsetData, 
    AssessmentAnswers, 
    FounderProfileReportData, 
    GoalSettingData, 
    AssessmentScores,
    TranslationKey,
    Persona,
    ProductFeature,
    FeaturePriority
} from '../types';
import { API_KEY_WARNING } from "../constants";

// Note: GoogleGenAI type will be imported dynamically.
type GoogleGenAI = any;

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null; // AI client will be initialized on first use

const TEXT_MODEL = 'gemini-2.5-flash';

// Singleton pattern to get the AI client asynchronously
const getAiClient = async (): Promise<GoogleGenAI | null> => {
    if (ai) return ai; // Return existing instance
    if (!API_KEY) {
        console.warn(API_KEY_WARNING);
        return null;
    }
    try {
        // Dynamically import the library
        const { GoogleGenAI } = await import("@google/genai");
        ai = new GoogleGenAI({ apiKey: API_KEY });
        return ai;
    } catch (error) {
        console.error("Failed to load @google/genai library:", error);
        return null;
    }
};


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
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    const errorResult: Partial<CanvasData> = {};
    sections.forEach(section => {
      errorResult[section] = language === 'am' ? "የ AI አገልግሎት በአሁኑ ጊዜ አይገኝም።" : "AI service unavailable.";
    });
    return errorResult;
  }

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
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
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
            const key = section as keyof Partial<CanvasData>;
            if (parsedData[key]) {
                result[key] = parsedData[key];
            } else {
                console.warn(`AI did not generate content for section: ${section}. Setting default.`);
                result[key] = language === 'am' 
                  ? "AI ለዚህ ክፍል ይዘት ማመንጨት አልቻለም። እባክዎ በእጅ ይሙሉ ወይም የ AI ጥያቄዎችን ያጥሩ، የኢትዮጵያን ሁኔታ ግምት ውስጥ ያስገቡ።"
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
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return [];
  }

  const strategyContextString = `---BEGIN ETHIOPIAN BUSINESS STRATEGY (Language of strategy elements below is as provided by user, AI should process it for context)---
Project Overview: ${strategyData[CanvasSection.PROJECT_OVERVIEW] || "Not defined"}
Product Vision: ${strategyData[CanvasSection.PRODUCT_VISION] || "Not defined"}
Problem (in Ethiopian context): ${strategyData[CanvasSection.PROBLEM] || "Not defined"}
Solution (for Ethiopian market): ${strategyData[CanvasSection.SOLUTION] || "Not defined"}
Unique Value Proposition (for Ethiopian market): ${strategyData[CanvasSection.UNIQUE_VALUE_PROPOSITION] || "Not defined"}
---END ETHIOPIAN BUSINESS STRATEGY---`.trim();

  const langInstructions = language === 'am'
  ? "The generated market research questions MUST be in Amharic. These questions should be culturally sensitive and easy for Amharic speakers in Ethiopia to understand and respond to."
  : "The generated market research questions should be in English.";


  const prompt = `You are an expert market research consultant specializing in the Ethiopian market.
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
For example: ["Question 1?", "Question 2?", "Question 3?"]`;
  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
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
      return questionsArray.map((qText, index) => ({ 
        id: `q-${Date.now()}-${index}`, 
        text: qText, 
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
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return language === 'am' ? "የ AI ማጠቃለያ ማመንጨት ተሰናክሏል።" : "AI Summary generation disabled.";
  }

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

  let competitorsSummary = language === 'am' ? "ምንም የተፎካካሪ ትንተና አልቀረበም።" : "No competitor analysis provided.";
  if (researchData[ResearchSection.COMPETITOR_ANALYSIS] && researchData[ResearchSection.COMPETITOR_ANALYSIS].length > 0) {
    competitorsSummary = researchData[ResearchSection.COMPETITOR_ANALYSIS].map(c => 
      `  - ${language === 'am' ? 'ተፎካካሪ (በኢትዮጵያ ገበያ)' : 'Competitor (in Ethiopian market)'}: ${c.name}\n` +
      `    ${language === 'am' ? 'የዋጋ አወጣጥ (ብር)' : 'Pricing (ETB)'}: ${c.pricingStrategy || (language === 'am' ? 'N/A' : 'N/A')}\n` +
      `    ${language === 'am' ? 'ቁልፍ ባህሪዎች' : 'Key Features'}: ${c.keyFeatures || (language === 'am' ? 'N/A' : 'N/A')}\n` +
      `    ${language === 'am' ? 'ጥንካሬዎች' : 'Strengths'}: ${c.strengths || (language === 'am' ? 'N/A' : 'N/A')}\n` +
      `    ${language === 'am' ? 'ድክመቶች' : 'Weaknesses'}: ${c.weaknesses || (language === 'am' ? 'N/A' : 'N/A')}`
    ).join('\n\n');
  }
  
  let trendsSummary = language === 'am' ? "ምንም የኢንዱስትሪ አዝማሚያዎች አልቀረቡም።" : "No industry trends provided.";
    if (researchData[ResearchSection.TRENDS] && researchData[ResearchSection.TRENDS].length > 0) {
    trendsSummary = researchData[ResearchSection.TRENDS].map(t => 
      `  - ${language === 'am' ? 'አዝማሚያ' : 'Trend'}: ${t.title}\n` +
      `    ${language === 'am' ? 'መግለጫ' : 'Description'}: ${t.description || (language === 'am' ? 'N/A' : 'N/A')}`
    ).join('\n\n');
  }


  let strategyContextStringForSummary = language === 'am' ? "ከቢዝነስ ማስጀመሪያ ሸራ ምንም የተለየ የንግድ ስትራቴጂ አውድ አልቀረበም።" : "No specific business strategy context provided from the Business Launch Canvas.";
  if (strategyData) {
     strategyContextStringForSummary = Object.entries(strategyData)
      .filter(([key, value]) => value && value.trim() !== "Not defined")
      .map(([key, value]) => `- ${key} (Ethiopia context): ${value}`)
      .join('\n');
    if (!strategyContextStringForSummary) strategyContextStringForSummary = language === 'am' ? "የስትራቴጂ ሸራ ባዶ ነው።" : "Strategy canvas is empty.";
  }

  const langInstructions = language === 'am'
  ? "The summary MUST be in Amharic. It should be insightful and actionable for an Ethiopian entrepreneur. Analyze the provided data considering the Ethiopian market and cultural nuances."
  : "The summary should be in English. It should be insightful and actionable for an Ethiopian entrepreneur, analyzing data within the Ethiopian market context.";

  const prompt = `As an expert market research analyst with a deep understanding of the Ethiopian market, provide a concise and insightful summary (3-5 paragraphs) 
based on the following comprehensive market research data AND the business's strategic context.
${langInstructions}

Business Strategic Context (for a business in Ethiopia - content language is as provided by user):
${strategyContextStringForSummary}

Market Research Data (gathered with an Ethiopian focus - content language is as provided or generated):
1. Research Question Sets (including questions and individual responses):
${questionsAndResponsesSummary}

2. General Notes & Bulk Imported Data:
${researchData[ResearchSection.GENERAL_NOTES_IMPORT] || (language === 'am' ? 'የለም' : "N/A")}

3. Competitor Analysis (focusing on Ethiopian market):
${competitorsSummary}

4. Key Industry Trends (relevant to Ethiopia):
${trendsSummary}


Your summary MUST:
1. Analyze how the research findings support, challenge, or refine the stated business strategy specifically within the Ethiopian context.
2. Highlight key findings, patterns, and insights particularly relevant to operating and succeeding in Ethiopia. Consider local consumer behavior, economic conditions, infrastructure, and cultural factors.
3. Identify potential opportunities and critical considerations unique to or pronounced in the Ethiopian market (e.g., leveraging mobile money like Telebirr, addressing logistical challenges, adapting to local digital literacy levels).
4. Provide strategic recommendations that are actionable and practical for a business in Ethiopia. Financial aspects should implicitly consider Ethiopian Birr (ETB).
Ensure the summary clearly links research findings back to the business strategy for success in Ethiopia.
Generate the comprehensive summary:`;
  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
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

export const generateMarketingPlan = async (
  strategyData: Partial<CanvasData>,
  researchData: Pick<MarketResearchData, ResearchSection.QUESTIONS | ResearchSection.COMPETITOR_ANALYSIS | ResearchSection.TRENDS>,
  userInputs: { campaignGoal: string; targetPlatforms: string[]; contentTone: string; duration: string, referenceWeekStartDate: string },
  language: Language
): Promise<MarketingPost[] | null> => {
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return null;
  }

  const strategyContextString = Object.entries(strategyData)
    .filter(([, value]) => value && value.trim() !== "Not defined")
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const researchContextString = `
Competitors: ${researchData[ResearchSection.COMPETITOR_ANALYSIS]?.map(c => c.name).join(', ') || 'N/A'}
Trends: ${researchData[ResearchSection.TRENDS]?.map(t => t.title).join(', ') || 'N/A'}
Key Customer Insights (from questions): ${researchData[ResearchSection.QUESTIONS]?.[0]?.questions.slice(0,2).map(q => q.text).join('; ') || 'N/A'}
  `.trim();

  const langInstructions = language === 'am'
    ? "All generated marketing post content (title, content, visualRecommendation) MUST be in Amharic. The JSON keys and other structural elements like 'platform' and 'status' MUST remain in English as specified. Ensure content is culturally relevant for Ethiopia and SEO-friendly."
    : "All generated marketing post content should be in English, SEO-friendly, and practical for an Ethiopian entrepreneur targeting the Ethiopian market.";

  const prompt = `You are an expert AI Marketing Strategist specializing in the Ethiopian market. Your writing style is similar to Jasper AI - creative, engaging, and effective.
${langInstructions}

Business Strategy Context (Ethiopian Focus):
${strategyContextString || 'No detailed strategy provided.'}

Market Research Insights (Ethiopian Focus):
${researchContextString}

User Request for Marketing Plan:
- Campaign Goal: ${userInputs.campaignGoal}
- Target Platforms: ${userInputs.targetPlatforms.join(', ')}
- Desired Content Tone: ${userInputs.contentTone}
- Campaign Duration: ${userInputs.duration}
- Reference Week Start Date for Scheduling: ${userInputs.referenceWeekStartDate} (Format: YYYY-MM-DD)

Based on all the above, generate a list of 3-5 marketing posts for the specified duration and platforms.
Each post object should have the following fields: "id" (string, generate a unique one like post-timestamp-index), "title" (string, catchy headline), "content" (string, detailed post body, aim for SEO optimization if it's for a blog), "platform" (string, from user's target platforms), "scheduledDate" (string), "visualRecommendation" (string, description of a suitable image/video for an Ethiopian audience), "status" (string, default to 'todo').

IMPORTANT: The "scheduledDate" MUST be an actual date in 'YYYY-MM-DDTHH:mm' format (e.g., '2024-07-29T10:00').
These dates MUST fall within the 7-day period starting from the 'Reference Week Start Date' (${userInputs.referenceWeekStartDate}).
Distribute the posts reasonably across this week. Choose appropriate times within those days.

Output: Return a valid JSON array of these MarketingPost objects.
Example (if English requested and referenceWeekStartDate was '2024-07-29'):
[
  {
    "id": "post-1721110000-0",
    "title": "Exciting News for Addis Ababa!",
    "content": "Discover how our new service is changing lives in Ethiopia... #Ethiopia #AddisAbaba #Innovation",
    "platform": "Facebook",
    "scheduledDate": "2024-07-29T10:00", 
    "visualRecommendation": "Vibrant photo of diverse Ethiopians benefiting from the service.",
    "status": "todo"
  },
  {
    "id": "post-1721110000-1",
    "title": "Blog: Top 5 Benefits for Local Businesses",
    "content": "Our latest blog post dives deep into how Ethiopian SMEs can leverage...",
    "platform": "Blog",
    "scheduledDate": "2024-07-31T14:30",
    "visualRecommendation": "Infographic summarizing benefits, with Amharic text option.",
    "status": "todo"
  }
]
Consider local Ethiopian events, holidays, or cultural moments if relevant for scheduling or content ideas.
Focus on providing actionable, creative, and "Jasper-style" content suggestions.`;

  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.75 }
    });
    const textResponse = response.text;
    if (!textResponse) return null;
    return parseJsonFromText<MarketingPost[]>(textResponse);
  } catch (error) {
    console.error("Error generating marketing plan:", error);
    return null;
  }
};

export const generatePitchContent = async (
  strategyData: Partial<CanvasData>,
  researchData: Pick<MarketResearchData, ResearchSection.QUESTIONS | ResearchSection.COMPETITOR_ANALYSIS>,
  userInputs: { pitchType: PitchType; targetAudience: string; keyMessage: string; numEmails?: number },
  language: Language
): Promise<Partial<Pick<Pitch, 'title' | 'content'>> | null> => {
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return null;
  }

  const strategyContextString = Object.entries(strategyData)
    .filter(([, value]) => value && value.trim() !== "Not defined")
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const langInstructions = language === 'am'
    ? "The generated pitch content (title and body/details) MUST be in Amharic. JSON keys must remain in English. The content should be persuasive and culturally adapted for the Ethiopian target audience."
    : "The generated pitch content should be in English, persuasive, and tailored for the Ethiopian target audience.";

  let pitchTypeSpecifics = "";
  if (userInputs.pitchType === 'investor_pitch') {
    pitchTypeSpecifics = "Generate a compelling outline for an investor pitch deck, focusing on key slides like Problem (Ethiopian context), Solution, Market Opportunity in Ethiopia, Business Model (revenue in ETB), Team, Financial Projections (ETB), and Ask. The content for each slide should be a few bullet points or short paragraphs.";
  } else if (userInputs.pitchType === 'sales_pitch') {
    pitchTypeSpecifics = "Generate 3-5 key talking points for a sales pitch. These points should highlight the main benefits and address potential Ethiopian customer concerns.";
  } else if (userInputs.pitchType === 'email_campaign') {
    pitchTypeSpecifics = `Generate a sequence of ${userInputs.numEmails || 3} emails for a campaign. Each email should have a "subject" and "body". The sequence should build interest and lead to a call to action relevant for Ethiopian customers. Return this as a JSON array of objects, where each object has 'subject' and 'body' keys.`;
  }

  const prompt = `You are an AI Pitching and Communication Coach specializing in the Ethiopian business landscape.
${langInstructions}

Business Strategy Context (Ethiopian Focus):
${strategyContextString || 'No detailed strategy provided.'}

User Request for Pitch Content:
- Pitch Type: ${userInputs.pitchType}
- Target Audience (in Ethiopia): ${userInputs.targetAudience}
- Key Message/Objective: ${userInputs.keyMessage}

Task:
${pitchTypeSpecifics}

The generated content should be highly persuasive and directly address the target audience's needs and interests within the Ethiopian context.
For the overall pitch, suggest a concise and impactful "title".

Output: Return a valid JSON object with two keys: "title" (string, the overall title for this pitch/campaign) and "content" (string for investor/sales pitch, or a JSON string representing an array of email objects for email_campaign).
Example for investor_pitch (if English):
{
  "title": "Revolutionizing Ethiopian Logistics with Tech",
  "content": "Slide 1: Problem - Current logistics inefficiencies in Addis Ababa...\\nSlide 2: Solution - Our platform provides real-time tracking..."
}
Example for email_campaign (if English):
{
  "title": "Exclusive Offer for Ethiopian SMEs",
  "content": "[{\\"subject\\":\\"Unlock Growth for Your Business\\",\\"body\\":\\"Dear Ethiopian Entrepreneur...\\"}, {\\"subject\\":\\"Don't Miss Out!\\",\\"body\\":\\"Following up on...\\"}]"
}
Ensure the content is actionable and reflects an understanding of Ethiopian business communication styles.`;

  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.7 }
    });
    const textResponse = response.text;
    if (!textResponse) return null;
    
    const parsedData = parseJsonFromText<Pick<Pitch, 'title' | 'content'>>(textResponse);
    if (parsedData && userInputs.pitchType === 'email_campaign' && typeof parsedData.content === 'string') {
        try {
            JSON.parse(parsedData.content); 
        } catch (e) {
            console.warn("AI returned email campaign content as a non-JSON string, or malformed JSON string:", parsedData.content);
             if (parsedData.content.trim().startsWith("{") && parsedData.content.trim().endsWith("}")) {
                try {
                    JSON.parse('[' + parsedData.content + ']');
                } catch (e2) { /* still not valid */ }
            }
        }
    }
    return parsedData;

  } catch (error) {
    console.error("Error generating pitch content:", error);
    return null;
  }
};

// --- Mindset Section AI Functions ---

export const generateFounderProfileReport = async (
  assessmentAnswers: MindsetData['assessmentAnswers'],
  language: Language,
  t: (key: TranslationKey, defaultText?: string) => string // For potential mapping
): Promise<FounderProfileReportData | null> => {
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return null;
  }

  const langInstructions = language === 'am'
    ? "The analysis and generated textual content (founderTypeTitle, founderTypeDescription, cofounderPersonaSuggestion, keyTakeaways) MUST be in Amharic. The JSON keys (like 'founderTypeTitle', 'scores') MUST remain in English as specified."
    : "The analysis and generated textual content should be in English.";

  const defaultScores: AssessmentScores = {
    riskTolerance: 50, leadership: 50, adaptability: 50,
    marketInsight: 50, financialLiteracy: 50, strategicThinking: 50,
    resilience: 50, creativity: 50, salesAbility: 50, technicalSkills: 50,
  };

  const prompt = `You are an AI Business Profiling Expert specializing in entrepreneurial assessments for the Ethiopian context.
${langInstructions}

Analyze the following assessment answers from an Ethiopian entrepreneur:
Personality Assessment Answers:
${JSON.stringify(assessmentAnswers.personality, null, 2)}

Business Acumen Assessment Answers:
${JSON.stringify(assessmentAnswers.businessAcumen, null, 2)}

Startup Knowledge Assessment Answers:
${JSON.stringify(assessmentAnswers.startupKnowledge, null, 2)}

Based on this comprehensive data, generate a Founder Profile Report.
The report MUST be a valid JSON object with the following structure:
{
  "founderTypeTitle": "string (A concise, descriptive title for the founder archetype, e.g., 'The Resilient Innovator', 'Pragmatic Operator')",
  "founderTypeDescription": "string (A 2-3 sentence paragraph describing this founder archetype and their general tendencies relevant to Ethiopian entrepreneurship)",
  "scores": { 
    "riskTolerance": number (0-100), 
    "leadership": number (0-100), 
    "adaptability": number (0-100), 
    "marketInsight": number (0-100), 
    "financialLiteracy": number (0-100), 
    "strategicThinking": number (0-100),
    "resilience": number (0-100),
    "creativity": number (0-100),
    "salesAbility": number (0-100),
    "technicalSkills": number (0-100, if applicable, otherwise reasonable default)
  },
  "cofounderPersonaSuggestion": "string (A suggestion for a complementary co-founder type, considering the analyzed strengths and weaknesses, e.g., 'Consider a co-founder strong in areas X and Y to balance your Z.')",
  "keyTakeaways": ["string", "string", "string"] (An array of 3 actionable insights or recommendations for the founder based on the profile)
}

When generating scores, interpret the answers to provide a realistic assessment. For example, high comfort with ambiguity might relate to higher risk tolerance.
Ensure all text content (titles, descriptions, suggestions, takeaways) is culturally sensitive and practical for an Ethiopian entrepreneur.
The scores should reflect a balanced view; avoid extreme highs or lows unless strongly indicated by diverse answers.
`;

  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.6 }
    });
    const textResponse = response.text;
    if (!textResponse) {
        console.error("Gemini API returned no text for Founder Profile Report.");
        return null;
    }

    const parsedReport = parseJsonFromText<{
        founderTypeTitle: string;
        founderTypeDescription: string;
        scores: Partial<AssessmentScores>;
        cofounderPersonaSuggestion: string;
        keyTakeaways: string[];
    }>(textResponse);

    if (parsedReport) {
        const finalScores: AssessmentScores = {
            ...defaultScores,
            ...(parsedReport.scores || {}),
        };

        return {
            founderTypeTitle: parsedReport.founderTypeTitle,
            founderTypeDescription: parsedReport.founderTypeDescription,
            scores: finalScores,
            cofounderPersonaSuggestion: parsedReport.cofounderPersonaSuggestion,
            keyTakeaways: parsedReport.keyTakeaways || [],
            generatedDate: new Date().toISOString(),
            language: language,
        };
    }
    return null;
  } catch (error) {
    console.error("Error generating founder profile report:", error);
    return {
        founderTypeTitle: t('error_ai_failed_generic'),
        founderTypeDescription: t('error_ai_failed_generic'),
        scores: defaultScores,
        cofounderPersonaSuggestion: t('error_ai_failed_generic'),
        keyTakeaways: [t('error_ai_failed_generic')],
        generatedDate: new Date().toISOString(),
        language: language,
    };
  }
};


export const askAiMindsetCoach = async (
  currentGoals: GoalSettingData,
  userMessage: string,
  chatHistory: { role: 'user' | 'model', parts: {text: string}[] }[],
  language: Language
): Promise<string> => {
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "AI Mindset Coach disabled.");
    return language === 'am' ? "የ AI የአስተሳሰብ አሰልጣኝ ተሰናክሏል።" : "AI Mindset Coach disabled.";
  }
  
  const langInstructions = language === 'am'
    ? "Respond ONLY in Amharic. Act as an empathetic and insightful mindset coach for an entrepreneur in Ethiopia."
    : "Respond ONLY in English. Act as an empathetic and insightful mindset coach for an entrepreneur in Ethiopia.";

  const systemInstruction = `You are an AI Mindset Coach for entrepreneurs. Your role is to help users refine their goals to be more S.M.A.R.T. (Specific, Measurable, Achievable, Relevant, Time-bound), ambitious, and aligned with their values.
${langInstructions}
Keep your responses concise, encouraging, and focused on asking clarifying questions or offering concrete suggestions.

User's current long-term goals (for context, in the user's language):
${JSON.stringify(currentGoals, null, 2)}
`;

  try {
    const chat = localAi.chats.create({
      model: TEXT_MODEL,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7
      },
      history: chatHistory.slice(0, -1), // Send history without the latest user message
    });
    
    const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    return response.text;

  } catch (error) {
    console.error("Error asking AI mindset coach:", error);
    return language === 'am' ? "ይቅርታ, ጥያቄዎን ማካሄድ አልቻልኩም። እባክዎ እንደገና ይሞክሩ።" : "Sorry, I couldn't process your request. Please try again.";
  }
};

export const generateAiPersona = async (
  idea: string,
  problem: string,
  dailyChallenge: string,
  discoveryMethod: string,
  canvasData: Partial<CanvasData>,
  language: Language
): Promise<Partial<Persona> | null> => {
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return null;
  }
    const canvasContextString = Object.entries(canvasData)
    .filter(([, value]) => value && value.trim())
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const langInstructions = language === 'am'
    ? "The generated persona details (name, profession, bio, goals, frustrations, etc.) and JTBD texts MUST be in Amharic. JSON keys and enum-like values (gender, education, maritalStatus) must remain in English. The name should be a common Ethiopian name."
    : "All generated content should be in English. The name should be a common Ethiopian name.";

  const prompt = `You are an expert market researcher and storyteller specializing in creating detailed, realistic user personas for the Ethiopian market.
${langInstructions}

Business Context (from Business Launch Canvas):
${canvasContextString}

User's description of a potential customer:
- Business Idea they are targeting: ${idea}
- Problem it solves for them: ${problem}
- A typical day or key challenge they face: ${dailyChallenge}
- How they might discover this service: ${discoveryMethod}

Based on ALL the information above, create a single, detailed user persona. The persona should feel like a real person living in Ethiopia.

Return the response as a single valid JSON object. This object should contain the following fields:
- "name": "string" (A common Ethiopian name, e.g., 'Abebe Tadesse' or 'Fatuma Ahmed')
- "profession": "string" (e.g., 'University Student', 'Small Kiosk Owner', 'Accountant at a private firm')
- "gender": "string" ('Male' or 'Female')
- "age": number
- "location": "string" (A specific area in an Ethiopian city, e.g., 'Bole, Addis Ababa' or 'Piassa, Bahir Dar')
- "maritalStatus": "string" ('Single', 'Married', 'In a relationship', 'Divorced', 'Widowed')
- "education": "string" ('High School', "Bachelor's Degree", "Master's Degree", 'PhD', 'Other')
- "bio": "string" (A short, compelling background story, 2-3 sentences)
- "goals": "string" (1-2 main goals relevant to the product)
- "frustrations": "string" (1-2 main pain points the product can solve)
- "jobsToBeDone": An array of 1-2 objects, where each object represents a 'Job To Be Done' and has the following keys:
  - "title": "string" (e.g., 'Get fresh produce delivered reliably')
  - "situation": "string" ('WHEN I am planning meals for the week...')
  - "motivation": "string" ('I WANT TO find high-quality, local ingredients...')
  - "outcome": "string" ('SO I CAN cook healthy and delicious food for my family.')

Example (for an organic vegetable delivery service):
{
  "name": "Hana Tsegaye",
  "profession": "Bank Teller",
  "gender": "Female",
  "age": 32,
  "location": "Kazanchis, Addis Ababa",
  "maritalStatus": "Married",
  "education": "Bachelor's Degree",
  "bio": "Hana is a mother of two young children and works full-time at a bank. She values health and nutrition for her family but finds it difficult to find time to visit markets for fresh, trustworthy vegetables amidst her busy schedule.",
  "goals": "To provide healthy, home-cooked meals for her family every day. To save time on weekly errands.",
  "frustrations": "Lack of time for grocery shopping. Uncertainty about the quality and source of vegetables from local vendors.",
  "jobsToBeDone": [
    {
      "title": "Source fresh and reliable ingredients for family meals",
      "situation": "When I'm planning my family's meals for the week",
      "motivation": "I want to easily order fresh, organic vegetables from a trusted source",
      "outcome": "so I can be confident that I'm providing nutritious food for my children without spending hours at the market."
    }
  ]
}
`;
  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.7 }
    });
    const textResponse = response.text;
    if (!textResponse) return null;
    return parseJsonFromText<Partial<Persona>>(textResponse);
  } catch (error) {
    console.error("Error generating AI persona:", error);
    return null;
  }
};

interface GeneratedFeature {
    name: string;
    description: string;
    problemSolved: string;
    priority: FeaturePriority;
}

export const generateProductFeatures = async (
  canvasData: Partial<CanvasData>,
  language: Language
): Promise<GeneratedFeature[] | null> => {
  const localAi = await getAiClient();
  if (!localAi) {
    console.warn(API_KEY_WARNING, "Gemini AI client not initialized.");
    return null;
  }

  const canvasContextString = Object.entries(canvasData)
    .filter(([, value]) => value && value.trim())
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
  
  const langInstructions = language === 'am'
    ? "All generated feature names, descriptions, and problems solved MUST be in Amharic. The JSON keys and priority values must remain in English."
    : "All generated content should be in English.";

  const prompt = `You are a Senior Product Manager AI, expert in creating product roadmaps for startups in the Ethiopian market.
${langInstructions}

Here is the business context from the user's Business Launch Canvas:
${canvasContextString}

Based on this business context, generate a list of 5-7 initial product features.
These features should be a mix of core functionalities and "quick wins".
For each feature, provide a name, a description (what it is), the problem it solves (why it exists), and a suggested priority ('low', 'medium', 'high', 'critical').

Return the response as a valid JSON array of objects, where each object has the following keys: "name" (string), "description" (string), "problemSolved" (string), "priority" (string, one of 'low', 'medium', 'high', 'critical').
Example:
[
  {
    "name": "User Registration (via Phone)",
    "description": "Allows users to sign up and log in using their Ethiopian mobile phone number, receiving an OTP via SMS for verification.",
    "problemSolved": "Addresses the need for simple, accessible registration in a market where email is less common than phone numbers.",
    "priority": "critical"
  },
  {
    "name": "Basic Product Listing",
    "description": "Sellers can list their products with a name, description, price (in ETB), and one photo.",
    "problemSolved": "Provides the core functionality for sellers to showcase what they are selling.",
    "priority": "high"
  }
]`;

  try {
    const response: GenerateContentResponse = await localAi.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.7 }
    });
    const textResponse = response.text;
    if (!textResponse) {
        console.error("Gemini API returned no text for product features.");
        return null;
    }
    return parseJsonFromText<GeneratedFeature[]>(textResponse);
  } catch (error) {
    console.error("Error generating product features:", error);
    return null;
  }
};
