
import { Page, SubPage, NavItem, CanvasSection, CanvasSectionHelp, ResearchSection, ResearchSectionHelp, Language, ALL_CANVAS_SECTIONS } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    label: Page.START,
    subItems: [SubPage.STRATEGY, SubPage.RESEARCH, SubPage.COPYWRITING],
  },
  {
    label: Page.BUILD,
    subItems: [SubPage.CRM, SubPage.EXECUTION_TRACKING],
  },
  {
    label: Page.GROW,
    subItems: [SubPage.LEARN, SubPage.AI_ADVISOR],
  },
];

const explicitlyDefinedCanvasHelp: CanvasSectionHelp[] = [
  {
    title: CanvasSection.PROJECT_OVERVIEW,
    explanation: {
      en: "A brief summary of your project, its goals, and scope. Think of it as the elevator pitch for your entire venture, tailored for an Ethiopian context.",
      am: "ስለ ፕሮጀክትዎ፣ ግቦቹ እና ስፋቱ አጭር ማጠቃለያ። ለመላው ድርጅትዎ እንደ ሊፍት ንግግር አድርገው ያስቡት፣ ለኢትዮጵያ ሁኔታ የተዘጋጀ።"
    },
    example: {
      en: "Example: 'To launch \"GebeyaLink,\" a mobile platform connecting smallholder farmers in rural Ethiopia directly with urban consumers and businesses in Addis Ababa, aiming to facilitate 1,000 fair-trade transactions monthly within the first year.'",
      am: "ምሳሌ፦ 'ገበያሊንክ የተባለ የሞባይል መድረክ ገጠር ኢትዮጵያ ውስጥ የሚገኙ አነስተኛ ገበሬዎችን ከአዲስ አበባ ከተማ ነዋሪዎች እና ንግዶች ጋር በቀጥታ በማገናኘት በመጀመሪያው ዓመት ወርሃዊ 1,000 ፍትሃዊ የንግድ ልውውጦችን ለማመቻቸት ያለመ ነው።'"
    }
  },
  {
    title: CanvasSection.PRODUCT_VISION,
    explanation: {
      en: "The overarching long-term goal and aspiration for your product. What ultimate impact do you want to make in Ethiopia and potentially beyond?",
      am: "ለምርትዎ ያለው አጠቃላይ የረጅም ጊዜ ግብ እና ምኞት። በኢትዮጵያ እና ከዚያም በላይ ምን የመጨረሻ ተጽዕኖ ማሳደር ይፈልጋሉ?"
    },
    example: {
      en: "Example: 'To become the leading digital agricultural marketplace in Ethiopia, empowering farmers, improving food security, and fostering transparent supply chains across the Horn of Africa.'",
      am: "ምሳሌ፦ 'በኢትዮጵያ ቀዳሚ የዲጂታል ግብርና የገበያ ቦታ በመሆን ገበሬዎችን ማብቃት፣ የምግብ ዋስትናን ማሻሻል እና በአፍሪካ ቀንድ ግልፅ የአቅርቦት ሰንሰለቶችን ማጎልበት።'"
    }
  },
  {
    title: CanvasSection.NORTH_STAR_METRIC,
    explanation: { en: "The single metric that best captures the core value your product delivers to Ethiopian customers. This metric should reflect customer success and business growth in the local market.", am: "የሰሜን ኮከብ መለኪያ፡ ምርትዎ ለኢትዮጵያውያን ደንበኞች የሚያቀርበውን ዋና እሴት በተሻለ ሁኔታ የሚይዝ ብቸኛው መለኪያ። ይህ መለኪያ የደንበኞችን ስኬት እና የአገር ውስጥ የንግድ ዕድገትን ማንጸባረቅ አለበት።" },
    example: {en: "Example: 'For GebeyaLink: Value of goods (in ETB) successfully transacted between farmers and buyers per month. For a local delivery service: Number of successful deliveries completed daily in Addis Ababa.'", am: "ምሳሌ፦ 'ለገበያሊንክ በወር በገበሬዎችና በገዥዎች መካከል በተሳካ ሁኔታ የተላለፉ ዕቃዎች ዋጋ (በኢትዮጵያ ብር)። ለአገር ውስጥ የማድረስ አገልግሎት፦ በአዲስ አበባ በየቀኑ የሚጠናቀቁ ስኬታማ የማድረስ ብዛት።'"}
  },
  {
    title: CanvasSection.PRODUCT_WHY,
    explanation: {en: "The fundamental reason and motivation behind creating this product, especially considering the needs and opportunities in Ethiopia.", am: "ይህን ምርት ለመፍጠር ዋናው ምክንያትና መነሳሳት፣ በተለይም በኢትዮጵያ ያለውን ፍላጎትና ዕድል ግምት ውስጥ በማስገባት።"},
    example: {en: "Example: 'We believe Ethiopian farmers deserve better market access and fair prices for their produce. GebeyaLink aims to bridge the information and logistics gap, enhancing livelihoods and contributing to Ethiopia's agricultural transformation.'", am: "ምሳሌ፦ 'የኢትዮጵያ ገበሬዎች ለምርቶቻቸው የተሻለ የገበያ ተደራሽነትና ፍትሐዊ ዋጋ ይገባቸዋል ብለን እናምናለን። ገበያሊንክ የመረጃና የሎጂስቲክስ ክፍተቱን በመሙላት የኑሮ ሁኔታን ለማሻሻልና ለኢትዮጵያ የግብርና ለውጥ አስተዋጽኦ ለማድረግ ያለመ ነው።'"}
  },
   {
    title: CanvasSection.PROBLEM,
    explanation: {en: "The specific customer pain point or problem your product aims to solve for Ethiopians. Be precise and focus on the customer's perspective within the local context.", am: "ምርትዎ ለኢትዮጵያውያን ሊፈታው ያሰበው የተለየ የደንበኛ ችግር ወይም ህመም። ትክክለኛ ይሁኑ እና በአካባቢያዊ ሁኔታ የደንበኛውን እይታ ላይ ያተኩሩ።"},
    example: {en: "Example: 'Smallholder farmers in Ethiopia often lack direct access to larger markets, relying on multiple intermediaries who reduce their profit margins. Urban consumers struggle to find consistent, quality local produce at fair prices.'", am: "ምሳሌ፦ 'በኢትዮጵያ ያሉ አነስተኛ ይዞታ ገበሬዎች ብዙውን ጊዜ ትላልቅ ገበያዎችን በቀጥታ የማግኘት ዕድል ስለሌላቸው የትርፍ ህዳጋቸውን በሚቀንሱ በርካታ አማላዮች ላይ ይተማመናሉ። የከተማ ተጠቃሚዎች ወጥ የሆነ ጥራት ያለው የአገር ውስጥ ምርት በተመጣጣኝ ዋጋ ለማግኘት ይቸገራሉ።'"}
  },
  {
    title: CanvasSection.SOLUTION,
    explanation: {en: "How your product addresses the identified problem in Ethiopia. Describe the core functionality and value offered, considering local infrastructure (e.g., mobile penetration, logistics).", am: "ምርትዎ በኢትዮጵያ ውስጥ የተለየውን ችግር እንዴት እንደሚፈታ። የአካባቢውን የመሠረተ ልማት (ለምሳሌ የሞባይል ተደራሽነት፣ ሎጂስቲክስ) ከግምት ውስጥ በማስገባት ዋናውን ተግባራዊነት እና የሚሰጠውን ዋጋ ይግለጹ።"},
    example: {en: "Example: 'GebeyaLink provides an Amharic and English USSD and smartphone app for farmers to list produce and for buyers to place orders. We partner with local transport providers for consolidated delivery and leverage Telebirr for secure payments.'", am: "ምሳሌ፦ 'ገበያሊንክ ገበሬዎች ምርቶቻቸውን እንዲዘረዝሩ እና ገዥዎች ትዕዛዝ እንዲሰጡ በአማርኛ እና በእንግሊዝኛ የUSSD እና የስማርትፎን መተግበሪያ ያቀርባል። ለተጠናከረ አቅርቦት ከአካባቢ የትራንስፖርት አቅራቢዎች ጋር እንተባበራለን እንዲሁም ለደህንነቱ የተጠበቀ ክፍያ በቴሌብር እንጠቀማለን።'"}
  }
];

const remainingCanvasHelp: CanvasSectionHelp[] = ALL_CANVAS_SECTIONS
  .slice(explicitlyDefinedCanvasHelp.length)
  .map(section => ({
    title: section,
    explanation: { en: "Detailed explanation for this section is being prepared.", am: "ለዚህ ክፍል ዝርዝር ማብራሪያ እየተዘጋጀ ነው።" },
    example: { en: "Specific Ethiopian examples are being curated.", am: "የተለዩ የኢትዮጵያ ምሳሌዎች እየተዘጋጁ ነው።" }
  }));

export const CANVAS_SECTIONS_HELP: CanvasSectionHelp[] = [
  ...explicitlyDefinedCanvasHelp,
  ...remainingCanvasHelp
];


const explicitlyDefinedResearchHelp: ResearchSectionHelp[] = [
  {
    title: ResearchSection.QUESTIONS,
    explanation: {
      en: "Develop key questions to ask your target users in Ethiopia. You can create these manually or use AI (which will consider Ethiopian context). For each question, you can record individual responses from different participants to gather granular feedback.",
      am: "ዒላማ ተጠቃሚዎችዎን በኢትዮጵያ ውስጥ ለመጠየቅ ቁልፍ ጥያቄዎችን ያዘጋጁ። እነዚህን በእጅ መፍጠር ወይም AI መጠቀም ይችላሉ (ይህም የኢትዮጵያን ሁኔታ ግምት ውስጥ ያስገባል)። ለእያንዳንዱ ጥያቄ፣ ዝርዝር አስተያየቶችን ለመሰብሰብ ከተለያዩ ተሳታፊዎች የግል ምላሾችን መመዝገብ ይችላሉ።"
    }
  },
  {
    title: ResearchSection.GENERAL_NOTES_IMPORT,
    explanation: {
      en: "Use this section for general research observations related to the Ethiopian market, brainstorming, or to import bulk data like CSV files from Google Forms. This is for broader data that isn't tied to specific questions or structured entries.",
      am: "ይህንን ክፍል ከኢትዮጵያ ገበያ ጋር ለተያያዙ አጠቃላይ የምርምር დაკვირვებები፣ ለአእምሮ ማጎልበት፣ ወይም እንደ CSV ፋይሎች ያሉ የጅምላ መረጃዎችን ከGoogle ቅጾች ለማስመጣት ይጠቀሙበት። ይህ ከተወሰኑ ጥያቄዎች ወይም ከተዋቀሩ ግቤቶች ጋር ያልተያያዘ ሰፋ ያለ መረጃ ለማግኘት ነው።"
    }
  }
];

const remainingResearchHelp: ResearchSectionHelp[] = Object.values(ResearchSection)
  .slice(explicitlyDefinedResearchHelp.length)
  .map(section => ({
    title: section,
    explanation: { en: "Detailed explanation for this section is being prepared.", am: "ለዚህ ክፍል ዝርዝር ማብራሪያ እየተዘጋጀ ነው።" }
  }));

export const RESEARCH_SECTIONS_HELP: ResearchSectionHelp[] = [
  ...explicitlyDefinedResearchHelp,
  ...remainingResearchHelp
];

export const API_KEY_WARNING = "API_KEY environment variable is not set. AI features will be disabled.";
export const GENERIC_ERROR_MESSAGE = "An unexpected error occurred. Please try again.";
