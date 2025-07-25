

import { Page, SubPage, NavItem, CanvasSection, CanvasSectionHelp, ResearchSection, ResearchSectionHelp, Language, ALL_CANVAS_SECTIONS, CopywritingSubSection, CopywritingSectionHelp, MindsetSubSection, MindsetSectionHelp, TranslationKey, AssessmentQuestion, Partner, Trainer, Testimonial, ProductDesignSubSection, ProductDesignSectionHelp, EconomicsSubSection, EconomicsSectionHelp, SalesSubSection, SalesSectionHelp, StrategySubSection, StrategySectionHelp, GrowSection, GrowSectionHelp, LegalTool, InvestmentTool, ManagementTool, ChecklistTool, ChecklistTab } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    label: Page.START,
    subItems: [SubPage.MINDSET, SubPage.STRATEGY, SubPage.RESEARCH, SubPage.COPYWRITING],
  },
  {
    label: Page.BUILD,
    subItems: [SubPage.PRODUCT_DESIGN, SubPage.ECONOMICS, SubPage.SALES],
  },
  {
    label: Page.GROW,
    subItems: [SubPage.LEGAL, SubPage.INVESTMENT, SubPage.MANAGEMENT, SubPage.CHECKLISTS],
  },
];

export const API_KEY_WARNING = "API key is not set. AI features will be disabled.";
export const GENERIC_ERROR_MESSAGE = "An unexpected error occurred. Please try again later.";


export const STRATEGY_SECTIONS_HELP: StrategySectionHelp[] = [
  {
    title: StrategySubSection.BUSINESS_CANVAS,
    sidebarTitle: { en: StrategySubSection.BUSINESS_CANVAS, am: StrategySubSection.BUSINESS_CANVAS },
    explanationKey: 'canvas_explanation'
  },
  {
    title: StrategySubSection.PERSONAS,
    sidebarTitle: { en: StrategySubSection.PERSONAS, am: StrategySubSection.PERSONAS },
    explanationKey: 'personas_explanation'
  }
];


export const CANVAS_SECTIONS_HELP: CanvasSectionHelp[] = [
  {
    title: CanvasSection.PROJECT_OVERVIEW,
    sidebarTitle: { en: CanvasSection.PROJECT_OVERVIEW, am: CanvasSection.PROJECT_OVERVIEW },
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
    sidebarTitle: { en: CanvasSection.PRODUCT_VISION, am: CanvasSection.PRODUCT_VISION },
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
    sidebarTitle: { en: CanvasSection.NORTH_STAR_METRIC, am: CanvasSection.NORTH_STAR_METRIC },
    explanation: { 
        en: "The single metric that best captures the core value your product delivers to Ethiopian customers. This metric should reflect customer success and business growth in the local market.", 
        am: "የሰሜን ኮከብ መለኪያ፡ ምርትዎ ለኢትዮጵያውያን ደንበኞች የሚያቀርበውን ዋና እሴት በተሻለ ሁኔታ የሚይዝ ብቸኛው መለኪያ። ይህ መለኪያ የደንበኞችን ስኬት እና የአገር ውስጥ የንግድ ዕድገትን ማንጸባረቅ አለበት።" 
    },
    example: {
        en: "Example: 'For GebeyaLink: Value of goods (in ETB) successfully transacted between farmers and buyers per month. For a local delivery service: Number of successful deliveries completed daily in Addis Ababa.'", 
        am: "ምሳሌ፦ 'ለገበያሊንክ በወር በገበሬዎችና በገዥዎች መካከል በተሳካ ሁኔታ የተላለፉ ዕቃዎች ዋጋ (በኢትዮጵያ ብር)። ለአገር ውስጥ የማድረስ አገልግሎት፦ በአዲስ አበባ በየቀኑ የሚጠናቀቁ ስኬታማ የማድረስ ብዛት።'"
    }
  },
  {
    title: CanvasSection.PRODUCT_WHY,
    sidebarTitle: { en: CanvasSection.PRODUCT_WHY, am: CanvasSection.PRODUCT_WHY },
    explanation: {
        en: "The fundamental reason and motivation behind creating this product, especially considering the needs and opportunities in Ethiopia.", 
        am: "ይህን ምርት ለመፍጠር ዋናው ምክንያትና መነሳሳት፣ በተለይም በኢትዮጵያ ያለውን ፍላጎትና ዕድል ግምት ውስጥ በማስገባት።"
    },
    example: {
        en: "Example: 'We believe Ethiopian farmers deserve better market access and fair prices for their produce. GebeyaLink aims to bridge the information and logistics gap, enhancing livelihoods and contributing to Ethiopia's agricultural transformation.'", 
        am: "ምሳሌ፦ 'የኢትዮጵያ ገበሬዎች ለምርቶቻቸው የተሻለ የገበያ ተደራሽነትና ፍትሐዊ ዋጋ ይገባቸዋል ብለን እናምናለን። ገበያሊንክ የመረጃና የሎጂስቲክስ ክፍተቱን በመሙላት የኑሮ ሁኔታን ለማሻሻልና ለኢትዮጵያ የግብርና ለውጥ አስተዋጽኦ ለማድረግ ያለመ ነው።'"
    }
  },
   {
    title: CanvasSection.PROBLEM,
    sidebarTitle: { en: CanvasSection.PROBLEM, am: CanvasSection.PROBLEM },
    explanation: {
        en: "The specific customer pain point or problem your product aims to solve for Ethiopians. Be precise and focus on the customer's perspective within the local context.", 
        am: "ምርትዎ ለኢትዮጵያውያን ሊፈታው ያሰበው የተለየ የደንበኛ ችግር ወይም ህመም። ትክክለኛ ይሁኑ እና በአካባቢያዊ ሁኔታ የደንበኛውን እይታ ላይ ያተኩሩ።"
    },
    example: {
        en: "Example: 'Smallholder farmers in Ethiopia often lack direct access to larger markets, relying on multiple intermediaries who reduce their profit margins. Urban consumers struggle to find consistent, quality local produce at fair prices.'", 
        am: "ምሳሌ፦ 'በኢትዮጵያ ያሉ አነስተኛ ይዞታ ገበሬዎች ብዙውን ጊዜ ትላልቅ ገበያዎችን በቀጥታ የማግኘት ዕድል ስለሌላቸው የትርፍ ህዳጋቸውን በሚቀንሱ በርካታ አማላዮች ላይ ይተማመናሉ። የከተማ ተጠቃሚዎች ወጥ የሆነ ጥራት ያለው የአገር ውስጥ ምርት በተመጣጣኝ ዋጋ ለማግኘት ይቸገራሉ።'"
    }
  },
  {
    title: CanvasSection.SOLUTION,
    sidebarTitle: { en: CanvasSection.SOLUTION, am: CanvasSection.SOLUTION },
    explanation: {
        en: "How your product addresses the identified problem in Ethiopia. Describe the core functionality and value offered, considering local infrastructure (e.g., mobile penetration, logistics).", 
        am: "ምርትዎ በኢትዮጵያ ውስጥ የተለየውን ችግር እንዴት እንደሚፈታ። የአካባቢውን የመሠረተ ልማት (ለምሳሌ የሞባይል ተደራሽነት፣ ሎጂስቲክስ) ከግምት ውስጥ በማስገባት ዋናውን ተግባራዊነት እና የሚሰጠውን ዋጋ ይግለጹ።"
    },
    example: {
        en: "Example: 'GebeyaLink provides an Amharic and English USSD and smartphone app for farmers to list produce and for buyers to place orders. We partner with local transport providers for consolidated delivery and leverage Telebirr for secure payments.'", 
        am: "ምሳሌ፦ 'ገበያሊንክ ገበሬዎች ምርቶቻቸውን እንዲዘረዝሩ እና ገዥዎች ትዕዛዝ እንዲሰጡ በአማርኛ እና በእንግሊዝኛ የUSSD እና የስማርትፎን መተግበሪያ ያቀርባል። ለተጠናከረ አቅርቦት ከአካባቢ የትራንስፖርት አቅራቢዎች ጋር እንተባበራለን እንዲሁም ለደህንነቱ የተጠበቀ ክፍያ በቴሌብር እንጠቀማለን።'"
    }
  },
  {
    title: CanvasSection.PRODUCT_DETAIL,
    sidebarTitle: { en: CanvasSection.PRODUCT_DETAIL, am: CanvasSection.PRODUCT_DETAIL },
    explanation: {
      en: "Describe the key features, functionalities, and technical aspects of your product or service. How does it work? What makes it distinct in its operation for the Ethiopian user? (e.g., USSD interface, Amharic language support, offline capabilities).",
      am: "የምርትዎን ወይም የአገልግሎትዎን ቁልፍ ባህሪዎች፣ ተግባራት እና ቴክኒካዊ ገጽታዎች ይግለጹ። እንዴት ነው የሚሰራው? ለኢትዮጵያ ተጠቃሚ በአሰራሩ የተለየ የሚያደርገው ምንድን ነው? (ለምሳሌ፣ የUSSD በይነገጽ፣ የአማርኛ ቋንቋ ድጋፍ፣ ከመስመር ውጭ የመስራት ችሎታዎች)።"
    },
    example: {
      en: "GebeyaLink will offer a USSD interface for feature phone users and a lightweight Android app. Key features include produce listing by farmers (with categories like 'Teff', 'Maize', 'Vegetables'), order placement by buyers, integrated Telebirr payment gateway, and SMS notifications for order status in Amharic and English.",
      am: "ገበያሊንክ የUSSD በይነገጽ ለባለ ባህሪ ስልክ ተጠቃሚዎች እና ቀላል ክብደት ያለው አንድሮይድ መተግበሪያ ያቀርባል። ቁልፍ ባህሪዎች ገበሬዎች ምርት የሚዘረዝሩበት (እንደ 'ጤፍ'፣ 'በቆሎ'፣ 'አትክልት' ያሉ ምድቦች ያሉት)፣ ገዥዎች ትዕዛዝ የሚሰጡበት፣ የተቀናጀ የቴሌብር ክፍያ መግቢያ፣ እና የትዕዛዝ ሁኔታን በአማርኛ እና በእንግሊዝኛ በSMS ማሳወቂያዎች ያካትታሉ።"
    }
  },
  {
    title: CanvasSection.MARKET,
    sidebarTitle: { en: CanvasSection.MARKET, am: CanvasSection.MARKET },
    explanation: {
      en: "Define your target market in Ethiopia. Include its size, demographics (age, location e.g. Addis Ababa, regional cities), psychographics (lifestyle, values relevant in Ethiopia), and specific needs. Who are your primary customers?",
      am: "በኢትዮጵያ ውስጥ ያለዎትን ዒላማ ገበያ ይግለጹ። መጠኑን፣ የሕዝብ ስብጥር (ዕድሜ፣ ቦታ ለምሳሌ አዲስ አበባ፣ የክልል ከተሞች)፣ ሥነ-ልቦናዊ ገጽታዎች (በኢትዮጵያ ውስጥ ተገቢነት ያለው የአኗኗር ዘይቤ፣ እሴቶች)፣ እና የተወሰኑ ፍላጎቶችን ያካትቱ። የእርስዎ ዋና ደንበኞች እነማን ናቸው?"
    },
    example: {
      en: "Primary market: Smallholder farmers in Oromia and Amhara regions (estimated 2 million with mobile access) and urban consumers/small businesses in Addis Ababa (initial target of 50,000 tech-savvy individuals/businesses seeking quality local produce). Secondary market: NGOs and larger food processors.",
      am: "ዋና ገበያ፦ በኦሮሚያ እና በአማራ ክልሎች ያሉ አነስተኛ ይዞታ ገበሬዎች (በግምት 2 ሚሊዮን የሞባይል ተደራሽነት ያላቸው) እና በአዲስ አበባ ያሉ የከተማ ተጠቃሚዎች/አነስተኛ ንግዶች (የመጀመሪያ ዒላማ 50,000 ጥራት ያለው የአገር ውስጥ ምርት የሚፈልጉ በቴክኖሎጂ የተካኑ ግለሰቦች/ንግዶች)። ሁለተኛ ገበያ፦ መንግስታዊ ያልሆኑ ድርጅቶች እና ትላልቅ የምግብ አቀናባሪዎች።"
    }
  },
  {
    title: CanvasSection.USE_CASES,
    sidebarTitle: { en: CanvasSection.USE_CASES, am: CanvasSection.USE_CASES },
    explanation: {
      en: "Describe specific scenarios of how different Ethiopian customer personas will interact with your product to achieve their 'Jobs To Be Done'. (e.g., 'Farmer Abebe uses USSD to list 10 quintals of teff...').",
      am: "የተለያዩ የኢትዮጵያ ደንበኛ ዓይነቶች 'ሥራዎቻቸውን' ለማከናወን ከምርትዎ ጋር እንዴት እንደሚገናኙ የተወሰኑ ሁኔታዎችን ይግለጹ። (ለምሳሌ፣ 'ገበሬ አበበ 10 ኩንታል ጤፍ ለመዘርዘር USSD ይጠቀማል...')።"
    },
    example: {
      en: "1. Farmer Abebe dials *XYZ# on his feature phone, selects 'Sell Produce', chooses 'Teff', enters quantity '10 quintals', sets indicative price '3000 ETB/quintal', and receives SMS confirmation. 2. Fatuma opens GebeyaLink app, searches 'tomatoes', sees Abebe's listing (among others), compares prices, adds to cart, and pays via Telebirr.",
      am: "1. ገበሬ አበበ በባህሪ ስልኩ *XYZ# ይደውላል፣ 'ምርት ሽጥ' የሚለውን ይመርጣል፣ 'ጤፍ' ይመርጣል፣ ብዛት '10 ኩንታል' ያስገባል፣ አመላካች ዋጋ '3000 ብር/ኩንታል' ያስቀምጣል፣ እና የSMS ማረጋገጫ ይቀበላል። 2. ፋጡማ የገበያሊንክ መተግበሪያን ትከፍታለች፣ 'ቲማቲም' ትፈልጋለች፣ የአበበን ዝርዝር (ከሌሎች ጋር) ታያለች፣ ዋጋዎችን ታወዳድራለች፣ ወደ ጋሪ ትጨምራለች፣ እና በቴሌብር ትከፍላለች።"
    }
  },
  {
    title: CanvasSection.UNIQUE_VALUE_PROPOSITION,
    sidebarTitle: { en: CanvasSection.UNIQUE_VALUE_PROPOSITION, am: CanvasSection.UNIQUE_VALUE_PROPOSITION },
    explanation: {
      en: "What unique benefit does your product provide to Ethiopian customers that competitors don't? How do you solve their problem or improve their situation distinctively? Be clear and concise.",
      am: "ተፎካካሪዎች የማያቀርቡትን ምን ልዩ ጥቅም ነው ምርትዎ ለኢትዮጵያ ደንበኞች የሚያቀርበው? ችግራቸውን እንዴት በተለየ መንገድ ይፈታሉ ወይም ሁኔታቸውን ያሻሽላሉ? ግልጽ እና አጭር ይሁኑ።"
    },
    example: {
      en: "GebeyaLink: The only platform in Ethiopia offering a combined USSD and App access for agricultural trade, with integrated local payment (Telebirr) and logistics partnerships, directly connecting rural farmers to urban markets, reducing intermediaries and increasing transparency.",
      am: "ገበያሊንክ፦ በኢትዮጵያ ብቸኛው የግብርና ንግድ የUSSD እና የመተግበሪያ ተደራሽነትን በአንድ ላይ የሚያቀርብ、 የተቀናጀ የአካባቢ ክፍያ (ቴሌብር) እና የሎጂስቲክስ አጋርነት ያለው፣ የገጠር ገበሬዎችን ከከተማ ገበያዎች ጋር በቀጥታ የሚያገናኝ、 አማላጆችን የሚቀንስ እና ግልጽነትን የሚጨምር መድረክ።"
    }
  },
  {
    title: CanvasSection.UNFAIR_ADVANTAGE,
    sidebarTitle: { en: CanvasSection.UNFAIR_ADVANTAGE, am: CanvasSection.UNFAIR_ADVANTAGE },
    explanation: {
      en: "What is something your business has that cannot be easily copied or bought by competitors in Ethiopia? (e.g., unique local partnerships, proprietary tech adapted for Ethiopia, strong brand loyalty, deep understanding of specific Ethiopian sub-cultures).",
      am: "በኢትዮጵያ ውስጥ በተወዳዳሪዎች በቀላሉ ሊገለበጥ ወይም ሊገዛ የማይችል ንግድዎ ያለው ነገር ምንድን ነው? (ለምሳሌ፣ ልዩ የአካባቢ አጋርነቶች፣ ለኢትዮጵያ የተስማማ የባለቤትነት ቴክኖሎጂ፣ ጠንካራ የምርት ስም ታማኝነት፣ ስለተወሰኑ የኢትዮጵያ ንዑስ ባህሎች ጥልቅ ግንዛቤ)።"
    },
    example: {
      en: "Exclusive partnership with a major Ethiopian transport union for optimized rural logistics. First-mover advantage with a widely adopted Amharic USSD interface tailored for farmers with low digital literacy. Strong relationships built with key agricultural cooperatives.",
      am: "ለገጠር ሎጂስቲክስ ከተመቻቸ ዋና የኢትዮጵያ ትራንስፖርት ማህበር ጋር ብቸኛ አጋርነት። ዝቅተኛ የዲጂታል እውቀት ላላቸው ገበሬዎች በተዘጋጀ በአማርኛ የUSSD በይነገጽ ሰፊ ተቀባይነት በማግኘት የመጀመሪያ የመሆን ጥቅም። ከቁልፍ የግብርና ህብረት ስራ ማህበራት ጋር የተገነቡ ጠንካራ ግንኙነቶች።"
    }
  },
  {
    title: CanvasSection.BUSINESS_MODEL,
    sidebarTitle: { en: CanvasSection.BUSINESS_MODEL, am: CanvasSection.BUSINESS_MODEL },
    explanation: {
      en: "How will your business make money in Ethiopia? Describe your revenue streams (e.g., commission on sales, subscription fees in ETB, data monetization respecting local privacy norms).",
      am: "ንግድዎ በኢትዮጵያ እንዴት ገንዘብ ያገኛል? የገቢ ምንጮችዎን ይግለጹ (ለምሳሌ፣ በሽያጭ ላይ ኮሚሽን፣ የደንበኝነት ምዝገባ ክፍያዎች በኢትዮጵያ ብር፣ የአካባቢ የግላዊነት ደንቦችን የሚያከብር የውሂብ ገቢ መፍጠር)።"
    },
    example: {
      en: "GebeyaLink will charge a 5% commission on the value of each successful transaction facilitated through the platform (deducted from seller payment). Future potential: Premium features for businesses (e.g., data analytics on crop availability for ETB 500/month).",
      am: "ገበያሊንክ በመድረኩ በኩል ለሚከናወን እያንዳንዱ የተሳካ ግብይት ዋጋ 5% ኮሚሽን ያስከፍላል (ከሻጭ ክፍያ ላይ ተቀንሶ)። የወደፊት እምቅ አቅም፦ ለንግዶች ፕሪሚየም ባህሪዎች (ለምሳሌ፣ በወር 500 ብр ስለ ሰብል መገኘት የውሂብ ትንተና)።"
    }
  },
  {
    title: CanvasSection.PRICING,
    sidebarTitle: { en: CanvasSection.PRICING, am: CanvasSection.PRICING },
    explanation: {
      en: "Detail your pricing strategy for Ethiopian customers. How much will your product/service cost (in ETB)? How does this compare to alternatives? Is it value-based, cost-plus, or competitive? Consider local affordability.",
      am: "ለኢትዮጵያ ደንበኞች የዋጋ አወጣጥ ስትራቴጂዎን በዝርዝር ይግለጹ። ምርትዎ/አገልግሎትዎ ስንት ያስከፍላል (በኢትዮጵያ ብር)? ይህ ከአማራጮች ጋር ሲነጻጸር እንዴት ነው? በእሴት ላይ የተመሰረተ、 ወጪ-ተጨማሪ、 ወይስ ተወዳዳሪ ነው? የአካባቢውን የመግዛት አቅም ግምት ውስጥ ያስገቡ።"
    },
    example: {
      en: "Commission: 5% of transaction value (ETB). This is competitive compared to traditional intermediaries who might take 20-40%. Value-based for farmers (higher net income) and buyers (fair prices, convenience). No subscription fees for basic access for farmers.",
      am: "ኮሚሽን፦ 5% የግብይት ዋጋ (ብር)። ይህ ከ20-40% ሊወስዱ ከሚችሉ ባህላዊ አማላጆች ጋር ሲነጻጸር ተወዳዳሪ ነው። ለገበሬዎች (ከፍተኛ የተጣራ ገቢ) እና ለገዥዎች (ፍትሃዊ ዋጋ፣ ምቾት) በእሴት ላይ የተመሰረተ። ለገበሬዎች ለመሠረታዊ ተደራሽነት የደንበኝነት ምዝገባ ክፍያ የለም።"
    }
  },
  {
    title: CanvasSection.COMPETITORS,
    sidebarTitle: { en: CanvasSection.COMPETITORS, am: CanvasSection.COMPETITORS },
    explanation: {
      en: "Identify your main competitors in the Ethiopian market. These could be direct (offering similar solutions) or indirect (alternative ways customers solve the problem). What are their strengths and weaknesses in the Ethiopian context?",
      am: "በኢትዮጵያ ገበያ ውስጥ ዋና ተፎካካሪዎችዎን ይለዩ። እነዚህ ቀጥተኛ (ተመሳሳይ መፍትሄዎችን የሚያቀርቡ) ወይም ቀጥተኛ ያልሆኑ (ደንበኞች ችግሩን የሚፈቱባቸው አማራጭ መንገዶች) ሊሆኑ ይችላሉ። በኢትዮጵያ አውድ ጥንካሬዎቻቸው እና ድክመቶቻቸው ምንድን ናቸው?"
    },
    example: {
      en: "Direct: Other emerging agri-tech platforms (e.g., 'HelloGebeya' - strengths: existing user base; weaknesses: app-only, limited rural reach). Indirect: Traditional brokers/middlemen (strengths: established relationships, cash-based; weaknesses: opaque pricing, higher cuts).",
      am: "ቀጥተኛ፦ ሌሎች ታዳጊ የአግሪ-ቴክ መድረኮች (ለምሳሌ፣ 'ሀሎገበያ' - ጥንካሬዎች፦ ነባር የተጠቃሚ መሠረት፤ ድክመቶች፦ በመተግበሪያ ብቻ፣ የተወሰነ የገጠር ተደራሽነት)። ቀጥተኛ ያልሆነ፦ ባህላዊ ደላሎች/አማላጆች (ጥንካሬዎች፦ የተመሰረቱ ግንኙነቶች፣ በጥሬ ገንዘብ ላይ የተመሰረተ፤ ድክመቶች፦ ግልጽ ያልሆነ የዋጋ አሰጣጥ፣ ከፍተኛ ቅናሾች)።"
    }
  },
  {
    title: CanvasSection.UNIT_ECONOMICS,
    sidebarTitle: { en: CanvasSection.UNIT_ECONOMICS, am: CanvasSection.UNIT_ECONOMICS },
    explanation: {
      en: "Analyze the revenue and costs associated with a single unit of your product/service in Ethiopia (e.g., per customer, per transaction). What is your Customer Acquisition Cost (CAC) in ETB? What is the Lifetime Value (LTV) of an Ethiopian customer?",
      am: "በኢትዮጵያ ውስጥ ካለው አንድ የምርትዎ/አገልግሎትዎ ክፍል ጋር የተያያዙ ገቢዎችን እና ወጪዎችን ይተንትኑ (ለምሳሌ፣ በአንድ ደንበኛ、 በአንድ ግብይት)። የእርስዎ የደንበኛ ማግኛ ወጪ (CAC) በኢትዮጵያ ብር ስንት ነው? የአንድ ኢትዮጵያዊ ደንበኛ የህይወት ዘመን ዋጋ (LTV) ስንት ነው?"
    },
    example: {
      en: "Per transaction: Avg. transaction value = 5000 ETB. Revenue (5% commission) = 250 ETB. Variable costs (SMS, payment gateway fee) = 10 ETB. Contribution margin = 240 ETB. Target CAC for a farmer: 100 ETB (via local agent outreach). LTV (farmer, 3 yrs): ~15,000 ETB profit contribution.",
      am: "በአንድ ግብይት፦ አማካይ የግብይት ዋጋ = 5000 ብር። ገቢ (5% ኮሚሽን) = 250 ብር። ተለዋዋጭ ወጪዎች (SMS፣ የክፍያ መግቢያ ክፍያ) = 10 ብр። የአስተዋጽኦ ህዳግ = 240 ብр። ለአንድ ገበሬ ዒላማ የደንበኛ ማግኛ ወጪ (CAC)፦ 100 ብር (በአካባቢ ወኪል ተደራሽነት)። የአንድ ገበሬ የህይወት ዘመን ዋጋ (LTV) (3 ዓመታት)፦ ~15,000 ብር የትርፍ አስተዋጽኦ።"
    }
  },
  {
    title: CanvasSection.BRAND_STYLE_GUIDES,
    sidebarTitle: { en: CanvasSection.BRAND_STYLE_GUIDES, am: CanvasSection.BRAND_STYLE_GUIDES },
    explanation: {
      en: "Define your brand's personality, voice, and visual identity (logo, colors, typography) as it relates to the Ethiopian market. How will you communicate your brand to resonate with Ethiopian users? (e.g., using local motifs, community-focused imagery).",
      am: "ከኢትዮጵያ ገበያ ጋር በተያያዘ የምርትዎን ስብዕና፣ ድምጽ እና ምስላዊ ማንነት (አርማ፣ ቀለሞች、 የፊደል አጻጻፍ) ይግለጹ። ከኢትዮጵያ ተጠቃሚዎች ጋር ለመስማማት የምርትዎን ስም እንዴት ያስተላልፋሉ? (ለምሳሌ፣ የአካባቢ ዘይቤዎችን፣ በማህበረሰብ ላይ ያተኮሩ ምስሎችን በመጠቀም)።"
    },
    example: {
      en: "Brand Voice: Trustworthy, empowering, community-oriented. Colors: Green (agriculture, growth), Yellow (optimism, harvest), Blue (technology, reliability). Logo: Stylized 'meskel' flower integrated with a network symbol. Imagery: Focus on real Ethiopian farmers and vibrant local markets.",
      am: "የምርት ድምጽ፦ ታማኝ፣ አቅም ሰጪ፣ በማህበረሰብ ላይ ያተኮረ። ቀለሞች፦ አረንጓዴ (ግብርና፣ ዕድገት)፣ ቢጫ (ብሩህ ተስፋ、 መከር)፣ ሰማያዊ (ቴክኖሎጂ፣ አስተማማኝነት)። አርማ፦ ከአውታረ መረብ ምልክት ጋር የተዋሃደ ቅጥ ያጣ 'መስቀል' አበባ። ምስሎች፦ በእውነተኛ የኢትዮጵያ ገበሬዎች እና በደመቁ የአካባቢ ገበያዎች ላይ ያተኩሩ።"
    }
  },
  {
    title: CanvasSection.PRODUCT_MARKET_FIT,
    sidebarTitle: { en: CanvasSection.PRODUCT_MARKET_FIT, am: CanvasSection.PRODUCT_MARKET_FIT },
    explanation: {
      en: "How will you know if your product has achieved fit with the Ethiopian market? What key metrics (e.g., adoption rate by Ethiopian users, retention, referral rate, positive feedback in local languages) will indicate this?",
      am: "ምርትዎ ከኢትዮጵያ ገበያ ጋር መጣጣሙን እንዴት ያውቃሉ? ይህን የሚያመለክቱት የትኞቹ ቁልፍ መለኪያዎች (ለምሳሌ፣ በኢትዮጵያ ተጠቃሚዎች የመቀበል መጠን፣ የደንበኛ ታማኝነት፣ የማስተዋወቅ መጠን፣ በአካባቢ ቋንቋዎች አዎንታዊ ግብረመልስ) ናቸው?"
    },
    example: {
      en: "Metrics: Achieve 500 active farmer listings and 1000 buyer transactions per month within 6 months. Farmer retention rate of 70% after 3 months. Net Promoter Score (NPS) of +40 from both farmer and buyer segments in Ethiopia. User testimonials in Amharic and Oromiffa praising ease of use and fair pricing.",
      am: "መለኪያዎች፦ በ6 ወራት ውስጥ በወር 500 ንቁ የገበሬዎች ዝርዝሮችን እና 1000 የገዢ ግብይቶችን ማሳካት። ከ3 ወራት በኋላ 70% የገበሬዎች ታማኝነት መጠን። በኢትዮጵያ ውስጥ ካሉ የገበሬ እና የገዢ ክፍሎች +40 የተጣራ አራማጅ ውጤት (NPS)። በአማርኛ እና በኦሮምኛ የተጠቃሚ ምስክርነቶች የአጠቃቀም ቀላልነትን እና ፍትሃዊ ዋጋን የሚያወድሱ።"
    }
  },
];

export const RESEARCH_SECTIONS_HELP: ResearchSectionHelp[] = [
  {
    title: ResearchSection.QUESTIONS,
    sidebarTitle: { en: 'sidebar_research_qa', am: 'sidebar_research_qa' },
    explanation: {
      en: 'Define and answer key questions to understand your market. Use AI to generate culturally relevant questions based on your strategy.',
      am: 'ገበያዎን ለመረዳት ቁልፍ ጥያቄዎችን ይግለጹ እና ይመልሱ። በስትራቴጂዎ ላይ በመመስረት ከባህል ጋር ተዛማጅነት ያላቸውን ጥያቄዎች ለማመንጨት AI ይጠቀሙ።'
    }
  },
  {
    title: ResearchSection.GENERAL_NOTES_IMPORT,
    sidebarTitle: { en: 'sidebar_research_notes', am: 'sidebar_research_notes' },
    explanation: {
      en: 'A scratchpad for all your research thoughts, interview notes, and observations. You can also import data from CSV files like Google Forms responses.',
      am: 'ለሁሉም የምርምር ሀሳቦችዎ፣ የቃለ መጠይቅ ማስታወሻዎችዎ እና ምልከታዎችዎ ማስታወሻ ደብተር። እንዲሁም እንደ የጉግል ቅጾች ምላሾች ካሉ የCSV ፋይሎች ውሂብ ማስመጣት ይችላሉ።'
    }
  },
  {
    title: ResearchSection.COMPETITOR_ANALYSIS,
    sidebarTitle: { en: 'sidebar_research_competitors', am: 'sidebar_research_competitors' },
    explanation: {
      en: 'Identify and analyze your competitors in the Ethiopian market. Document their strengths, weaknesses, pricing, and key features to find your unique edge.',
      am: 'በኢትዮጵያ ገበያ ውስጥ ተወዳዳሪዎችዎን ይለዩ እና ይተንትኑ። ልዩ ጠርዝዎን ለማግኘት ጥንካሬዎቻቸውን፣ ድክመቶቻቸውን、 የዋጋ አወጣጣቸውን እና ቁልፍ ባህሪያቶቻቸውን ይመዝግቡ።'
    }
  },
  {
    title: ResearchSection.TRENDS,
    sidebarTitle: { en: 'sidebar_research_trends', am: 'sidebar_research_trends' },
    explanation: {
      en: 'Keep track of key trends in your industry, both locally in Ethiopia and globally. Note their potential impact on your business.',
      am: 'በኢንዱስትሪዎ ውስጥ ያሉ ቁልፍ አዝማሚያዎችን በአገር ውስጥ በኢትዮጵያ እና በዓለም አቀፍ ደረጃ ይከታተሉ። በንግድዎ ላይ ሊኖራቸው የሚችለውን ተጽዕኖ ልብ ይበሉ።'
    }
  },
  {
    title: ResearchSection.AI_SUMMARY,
    sidebarTitle: { en: 'sidebar_research_ai_summary', am: 'sidebar_research_ai_summary' },
    explanation: {
      en: 'Use AI to synthesize all your research data from the other sections into a cohesive summary. This helps identify key insights, challenges, and opportunities.',
      am: 'ከሌሎች ክፍሎች ሁሉንም የምርምር መረጃዎችዎን ወደ አንድ ወጥ ማጠቃለያ ለማዋሃድ AI ይጠቀሙ። ይህ ቁልፍ ግንዛቤዎችን፣ ተግዳሮቶችን እና እድሎችን ለመለየት ይረዳል።'
    }
  },
];

export const COPYWRITING_SECTIONS_HELP: CopywritingSectionHelp[] = [
  {
    title: CopywritingSubSection.MARKETING,
    sidebarTitle: { en: 'sidebar_copywriting_marketing', am: 'sidebar_copywriting_marketing' },
    explanation: {
        en: 'Create and manage your social media posts, blog articles, and other marketing materials. Use the calendar view to plan your content schedule. Leverage AI to generate a full marketing plan based on your strategy.',
        am: 'የማህበራዊ ሚዲያ ጽሑፎችዎን፣ የብሎግ ጽሑፎችዎን እና ሌሎች የግብይት ቁሳቁሶችን ይፍጠሩ እና ያስተዳድሩ። የይዘት መርሃ ግብርዎን ለማቀድ የቀን መቁጠሪያ እይታን ይጠቀሙ። በስትራቴጂዎ ላይ በመመስረት ሙሉ የግብይት እቅድ ለማመንጨት AI ይጠቀሙ።'
    }
  },
  {
    title: CopywritingSubSection.PITCH_REFINEMENT,
    sidebarTitle: { en: 'sidebar_copywriting_pitch', am: 'sidebar_copywriting_pitch' },
    explanation: {
        en: 'Draft, refine, and store various pitches—whether for investors, sales, or email campaigns. Use the AI assistant to get a head start by generating drafts tailored to your specific audience and goals in the Ethiopian context.',
        am: 'ለባለሀብቶች፣ ለሽያጭ ወይም ለኢሜል ዘመቻዎች ይሁኑ የተለያዩ የሀሳብ ማቅረቢያዎችን ይቅረጹ、 ያሻሽሉ እና ያከማቹ። በኢትዮጵያ አውድ ውስጥ ለተወሰኑ ታዳሚዎችዎ እና ግቦችዎ የተዘጋጁ ረቂቆችን በማመንጨት ለመጀመር የ AI ረዳትን ይጠቀሙ።'
    }
  }
];

export const MINDSET_SECTIONS_HELP: MindsetSectionHelp[] = [
  {
    title: MindsetSubSection.ENTREPRENEURIAL_ASSESSMENT,
    sidebarTitle: { en: MindsetSubSection.ENTREPRENEURIAL_ASSESSMENT, am: MindsetSubSection.ENTREPRENEURIAL_ASSESSMENT },
    explanationKey: 'mindset_assessment_explanation'
  },
  {
    title: MindsetSubSection.PROFILE_REPORT,
    sidebarTitle: { en: MindsetSubSection.PROFILE_REPORT, am: MindsetSubSection.PROFILE_REPORT },
    explanationKey: 'mindset_profile_report_explanation'
  },
  {
    title: MindsetSubSection.GOAL_SETTING,
    sidebarTitle: { en: MindsetSubSection.GOAL_SETTING, am: MindsetSubSection.GOAL_SETTING },
    explanationKey: 'mindset_goal_setting_explanation'
  }
];

export const PRODUCT_DESIGN_SECTIONS_HELP: ProductDesignSectionHelp[] = [
    {
        title: ProductDesignSubSection.BRAINSTORM_BOARD,
        sidebarTitle: { en: ProductDesignSubSection.BRAINSTORM_BOARD, am: ProductDesignSubSection.BRAINSTORM_BOARD },
        explanationKey: 'brainstorm_board_explanation'
    },
    {
        title: ProductDesignSubSection.PRODUCT_PLANNING,
        sidebarTitle: { en: ProductDesignSubSection.PRODUCT_PLANNING, am: ProductDesignSubSection.PRODUCT_PLANNING },
        explanationKey: 'product_planning_explanation'
    },
    {
        title: ProductDesignSubSection.ACTION_BOARD,
        sidebarTitle: { en: ProductDesignSubSection.ACTION_BOARD, am: ProductDesignSubSection.ACTION_BOARD },
        explanationKey: 'action_board_explanation'
    },
    {
        title: ProductDesignSubSection.FEEDBACK_AGGREGATOR,
        sidebarTitle: { en: ProductDesignSubSection.FEEDBACK_AGGREGATOR, am: ProductDesignSubSection.FEEDBACK_AGGREGATOR },
        explanationKey: 'feedback_aggregator_explanation'
    }
];

export const ECONOMICS_SECTIONS_HELP: EconomicsSectionHelp[] = [
    {
        title: EconomicsSubSection.COST_REVENUE,
        sidebarTitle: { en: EconomicsSubSection.COST_REVENUE, am: EconomicsSubSection.COST_REVENUE },
        explanationKey: 'cost_revenue_explanation'
    },
    {
        title: EconomicsSubSection.UNIT_ECONOMICS,
        sidebarTitle: { en: EconomicsSubSection.UNIT_ECONOMICS, am: EconomicsSubSection.UNIT_ECONOMICS },
        explanationKey: 'unit_economics_explanation'
    },
    {
        title: EconomicsSubSection.BURN_RATE,
        sidebarTitle: { en: EconomicsSubSection.BURN_RATE, am: EconomicsSubSection.BURN_RATE },
        explanationKey: 'burn_rate_explanation'
    },
    {
        title: EconomicsSubSection.FINANCIAL_PROJECTION,
        sidebarTitle: { en: EconomicsSubSection.FINANCIAL_PROJECTION, am: EconomicsSubSection.FINANCIAL_PROJECTION },
        explanationKey: 'financial_projection_explanation'
    }
];

export const SALES_SECTIONS_HELP: SalesSectionHelp[] = [
    {
        title: SalesSubSection.GO_TO_MARKET,
        sidebarTitle: { en: SalesSubSection.GO_TO_MARKET, am: SalesSubSection.GO_TO_MARKET },
        explanationKey: 'goto_market_explanation'
    },
    {
        title: SalesSubSection.CRM_PIPELINE,
        sidebarTitle: { en: SalesSubSection.CRM_PIPELINE, am: SalesSubSection.CRM_PIPELINE },
        explanationKey: 'crm_pipeline_explanation'
    }
];

export const GROW_SECTIONS_HELP: GrowSectionHelp[] = [
  {
    title: GrowSection.LEGAL,
    sidebarTitle: { en: SubPage.LEGAL, am: SubPage.LEGAL },
    explanationKey: 'grow_legal_explanation',
    tools: [
      { tool: LegalTool.DOCUMENT_AUTOMATION, explanationKey: 'grow_legal_doc_auto_explanation' },
      { tool: LegalTool.COMPLIANCE_MANAGEMENT, explanationKey: 'grow_legal_compliance_explanation' }
    ]
  },
  {
    title: GrowSection.INVESTMENT,
    sidebarTitle: { en: SubPage.INVESTMENT, am: SubPage.INVESTMENT },
    explanationKey: 'grow_investment_explanation',
    tools: [
      { tool: InvestmentTool.CAP_TABLE_MANAGEMENT, explanationKey: 'grow_investment_cap_table_explanation' },
      { tool: InvestmentTool.INVESTOR_RELATIONS_CRM, explanationKey: 'grow_investment_ir_crm_explanation' }
    ]
  },
  {
    title: GrowSection.MANAGEMENT,
    sidebarTitle: { en: SubPage.MANAGEMENT, am: SubPage.MANAGEMENT },
    explanationKey: 'grow_management_explanation',
    tools: [
        { tool: ManagementTool.SUPPLY_CHAIN, explanationKey: 'grow_management_scm_explanation'},
        { tool: ManagementTool.QUALITY_MANAGEMENT, explanationKey: 'grow_management_qms_explanation'},
        { tool: ManagementTool.CUSTOMER_SERVICE, explanationKey: 'grow_management_cs_explanation'}
    ]
  },
  {
    title: GrowSection.CHECKLISTS,
    sidebarTitle: { en: SubPage.CHECKLISTS, am: SubPage.CHECKLISTS },
    explanationKey: 'grow_checklists_explanation',
    tools: [
        { tool: ChecklistTool.RELEASE_LIST, explanationKey: 'grow_checklists_release_explanation'},
        { tool: ChecklistTool.GROWTH_LIST, explanationKey: 'grow_checklists_growth_explanation'}
    ]
  }
];

export const INITIAL_RELEASE_LIST_DATA: ChecklistTab[] = [
  {
    id: 'rl-tab-1', titleKey: 'checklist_rl_tab_product',
    cards: [
      { id: 'rl-card-1', titleKey: 'checklist_rl_card_legal', items: [
        { id: 'rli-1-1', textKey: 'checklist_rl_item_legal_1', completed: false },
        { id: 'rli-1-2', textKey: 'checklist_rl_item_legal_2', completed: false },
        { id: 'rli-1-3', textKey: 'checklist_rl_item_legal_3', completed: false },
        { id: 'rli-1-4', textKey: 'checklist_rl_item_legal_4', completed: false },
      ]},
      { id: 'rl-card-2', titleKey: 'checklist_rl_card_pmf', items: [
        { id: 'rli-2-1', textKey: 'checklist_rl_item_pmf_1', completed: false },
        { id: 'rli-2-2', textKey: 'checklist_rl_item_pmf_2', completed: false },
        { id: 'rli-2-3', textKey: 'checklist_rl_item_pmf_3', completed: false },
        { id: 'rli-2-4', textKey: 'checklist_rl_item_pmf_4', completed: false },
        { id: 'rli-2-5', textKey: 'checklist_rl_item_pmf_5', completed: false },
      ]},
      { id: 'rl-card-3', titleKey: 'checklist_rl_card_dev', items: [
        { id: 'rli-3-1', textKey: 'checklist_rl_item_dev_1', completed: false },
        { id: 'rli-3-2', textKey: 'checklist_rl_item_dev_2', completed: false },
        { id: 'rli-3-3', textKey: 'checklist_rl_item_dev_3', completed: false },
        { id: 'rli-3-4', textKey: 'checklist_rl_item_dev_4', completed: false },
        { id: 'rli-3-5', textKey: 'checklist_rl_item_dev_5', completed: false },
        { id: 'rli-3-6', textKey: 'checklist_rl_item_dev_6', completed: false },
      ]},
      { id: 'rl-card-4', titleKey: 'checklist_rl_card_cx', items: [
        { id: 'rli-4-1', textKey: 'checklist_rl_item_cx_1', completed: false },
        { id: 'rli-4-2', textKey: 'checklist_rl_item_cx_2', completed: false },
        { id: 'rli-4-3', textKey: 'checklist_rl_item_cx_3', completed: false },
        { id: 'rli-4-4', textKey: 'checklist_rl_item_cx_4', completed: false },
        { id: 'rli-4-5', textKey: 'checklist_rl_item_cx_5', completed: false },
        { id: 'rli-4-6', textKey: 'checklist_rl_item_cx_6', completed: false },
      ]},
      { id: 'rl-card-5', titleKey: 'checklist_rl_card_metrics', items: [
        { id: 'rli-5-1', textKey: 'checklist_rl_item_metrics_1', completed: false },
        { id: 'rli-5-2', textKey: 'checklist_rl_item_metrics_2', completed: false },
        { id: 'rli-5-3', textKey: 'checklist_rl_item_metrics_3', completed: false },
      ]},
    ]
  },
  { id: 'rl-tab-2', titleKey: 'checklist_rl_tab_marketing', cards: [
      { id: 'rl-card-press', titleKey: 'checklist_rl_card_press', items: [
        { id: 'rli-press-1', textKey: 'checklist_rl_item_press_1', completed: false },
        { id: 'rli-press-2', textKey: 'checklist_rl_item_press_2', completed: false },
        { id: 'rli-press-3', textKey: 'checklist_rl_item_press_3', completed: false },
      ]},
      { id: 'rl-card-brand', titleKey: 'checklist_rl_card_brand', items: [
        { id: 'rli-brand-1', textKey: 'checklist_rl_item_brand_1', completed: false },
        { id: 'rli-brand-2', textKey: 'checklist_rl_item_brand_2', completed: false },
      ]},
      { id: 'rl-card-ext-comms', titleKey: 'checklist_rl_card_ext_comms', items: [
        { id: 'rli-ext-comms-1', textKey: 'checklist_rl_item_ext_comms_1', completed: false },
        { id: 'rli-ext-comms-2', textKey: 'checklist_rl_item_ext_comms_2', completed: false },
        { id: 'rli-ext-comms-3', textKey: 'checklist_rl_item_ext_comms_3', completed: false },
        { id: 'rli-ext-comms-4', textKey: 'checklist_rl_item_ext_comms_4', completed: false },
        { id: 'rli-ext-comms-5', textKey: 'checklist_rl_item_ext_comms_5', completed: false },
        { id: 'rli-ext-comms-6', textKey: 'checklist_rl_item_ext_comms_6', completed: false },
      ]},
      { id: 'rl-card-acq-growth', titleKey: 'checklist_rl_card_acq_growth', items: [
        { id: 'rli-acq-growth-1', textKey: 'checklist_rl_item_acq_growth_1', completed: false },
        { id: 'rli-acq-growth-2', textKey: 'checklist_rl_item_acq_growth_2', completed: false },
        { id: 'rli-acq-growth-3', textKey: 'checklist_rl_item_acq_growth_3', completed: false },
        { id: 'rli-acq-growth-4', textKey: 'checklist_rl_item_acq_growth_4', completed: false },
        { id: 'rli-acq-growth-5', textKey: 'checklist_rl_item_acq_growth_5', completed: false },
        { id: 'rli-acq-growth-6', textKey: 'checklist_rl_item_acq_growth_6', completed: false },
        { id: 'rli-acq-growth-7', textKey: 'checklist_rl_item_acq_growth_7', completed: false },
        { id: 'rli-acq-growth-8', textKey: 'checklist_rl_item_acq_growth_8', completed: false },
      ]},
      { id: 'rl-card-int-comms', titleKey: 'checklist_rl_card_int_comms', items: [
        { id: 'rli-int-comms-1', textKey: 'checklist_rl_item_int_comms_1', completed: false },
        { id: 'rli-int-comms-2', textKey: 'checklist_rl_item_int_comms_2', completed: false },
        { id: 'rli-int-comms-3', textKey: 'checklist_rl_item_int_comms_3', completed: false },
        { id: 'rli-int-comms-4', textKey: 'checklist_rl_item_int_comms_4', completed: false },
        { id: 'rli-int-comms-5', textKey: 'checklist_rl_item_int_comms_5', completed: false },
        { id: 'rli-int-comms-6', textKey: 'checklist_rl_item_int_comms_6', completed: false },
      ]},
  ] },
  { id: 'rl-tab-3', titleKey: 'checklist_rl_tab_pricing', cards: [
      { id: 'rl-card-pricing-structure', titleKey: 'checklist_rl_card_pricing_structure', items: [
        { id: 'rli-ps-1', textKey: 'checklist_rl_item_pricing_structure_1', completed: false },
        { id: 'rli-ps-2', textKey: 'checklist_rl_item_pricing_structure_2', completed: false },
        { id: 'rli-ps-3', textKey: 'checklist_rl_item_pricing_structure_3', completed: false },
      ]},
      { id: 'rl-card-channel-pricing', titleKey: 'checklist_rl_card_channel_pricing', items: [
        { id: 'rli-cp-1', textKey: 'checklist_rl_item_channel_pricing_1', completed: false },
        { id: 'rli-cp-2', textKey: 'checklist_rl_item_channel_pricing_2', completed: false },
        { id: 'rli-cp-3', textKey: 'checklist_rl_item_channel_pricing_3', completed: false },
        { id: 'rli-cp-4', textKey: 'checklist_rl_item_channel_pricing_4', completed: false },
      ]},
      { id: 'rl-card-pricing-tools', titleKey: 'checklist_rl_card_pricing_tools', items: [
        { id: 'rli-pt-1', textKey: 'checklist_rl_item_pricing_tools_1', completed: false },
        { id: 'rli-pt-2', textKey: 'checklist_rl_item_pricing_tools_2', completed: false },
        { id: 'rli-pt-3', textKey: 'checklist_rl_item_pricing_tools_3', completed: false },
      ]},
      { id: 'rl-card-pricing-analysis', titleKey: 'checklist_rl_card_pricing_analysis', items: [
        { id: 'rli-pa-1', textKey: 'checklist_rl_item_pricing_analysis_1', completed: false },
        { id: 'rli-pa-2', textKey: 'checklist_rl_item_pricing_analysis_2', completed: false },
        { id: 'rli-pa-3', textKey: 'checklist_rl_item_pricing_analysis_3', completed: false },
      ]},
  ] },
  { id: 'rl-tab-4', titleKey: 'checklist_rl_tab_ops', cards: [
      { id: 'rl-card-ops-partners', titleKey: 'checklist_rl_card_ops_partners', items: [
        { id: 'rli-op-1', textKey: 'checklist_rl_item_ops_partners_1', completed: false },
        { id: 'rli-op-2', textKey: 'checklist_rl_item_ops_partners_2', completed: false },
        { id: 'rli-op-3', textKey: 'checklist_rl_item_ops_partners_3', completed: false },
        { id: 'rli-op-4', textKey: 'checklist_rl_item_ops_partners_4', completed: false },
      ]},
      { id: 'rl-card-ops-plans', titleKey: 'checklist_rl_card_ops_plans', items: [
        { id: 'rli-opl-1', textKey: 'checklist_rl_item_ops_plans_1', completed: false },
        { id: 'rli-opl-2', textKey: 'checklist_rl_item_ops_plans_2', completed: false },
        { id: 'rli-opl-3', textKey: 'checklist_rl_item_ops_plans_3', completed: false },
        { id: 'rli-opl-4', textKey: 'checklist_rl_item_ops_plans_4', completed: false },
        { id: 'rli-opl-5', textKey: 'checklist_rl_item_ops_plans_5', completed: false },
      ]},
      { id: 'rl-card-ops-post-launch', titleKey: 'checklist_rl_card_ops_post_launch', items: [
        { id: 'rli-pl-1', textKey: 'checklist_rl_item_ops_post_launch_1', completed: false },
        { id: 'rli-pl-2', textKey: 'checklist_rl_item_ops_post_launch_2', completed: false },
        { id: 'rli-pl-3', textKey: 'checklist_rl_item_ops_post_launch_3', completed: false },
        { id: 'rli-pl-4', textKey: 'checklist_rl_item_ops_post_launch_4', completed: false },
        { id: 'rli-pl-5', textKey: 'checklist_rl_item_ops_post_launch_5', completed: false },
        { id: 'rli-pl-6', textKey: 'checklist_rl_item_ops_post_launch_6', completed: false },
        { id: 'rli-pl-7', textKey: 'checklist_rl_item_ops_post_launch_7', completed: false },
        { id: 'rli-pl-8', textKey: 'checklist_rl_item_ops_post_launch_8', completed: false },
        { id: 'rli-pl-9', textKey: 'checklist_rl_item_ops_post_launch_9', completed: false },
      ]},
      { id: 'rl-card-ops-pc', titleKey: 'checklist_rl_card_ops_partner_channel', items: [
        { id: 'rli-opc-1', textKey: 'checklist_rl_item_ops_pc_1', completed: false },
        { id: 'rli-opc-2', textKey: 'checklist_rl_item_ops_pc_2', completed: false },
        { id: 'rli-opc-3', textKey: 'checklist_rl_item_ops_pc_3', completed: false },
        { id: 'rli-opc-4', textKey: 'checklist_rl_item_ops_pc_4', completed: false },
      ]},
      { id: 'rl-card-ops-support', titleKey: 'checklist_rl_card_ops_support', items: [
        { id: 'rli-os-1', textKey: 'checklist_rl_item_ops_support_1', completed: false },
        { id: 'rli-os-2', textKey: 'checklist_rl_item_ops_support_2', completed: false },
        { id: 'rli-os-3', textKey: 'checklist_rl_item_ops_support_3', completed: false },
        { id: 'rli-os-4', textKey: 'checklist_rl_item_ops_support_4', completed: false },
      ]},
      { id: 'rl-card-ops-sm', titleKey: 'checklist_rl_card_ops_sales_marketing', items: [
        { id: 'rli-osm-1', textKey: 'checklist_rl_item_ops_sm_1', completed: false },
        { id: 'rli-osm-2', textKey: 'checklist_rl_item_ops_sm_2', completed: false },
        { id: 'rli-osm-3', textKey: 'checklist_rl_item_ops_sm_3', completed: false },
        { id: 'rli-osm-4', textKey: 'checklist_rl_item_ops_sm_4', completed: false },
      ]},
      { id: 'rl-card-ops-ops', titleKey: 'checklist_rl_card_ops_operations', items: [
        { id: 'rli-oo-1', textKey: 'checklist_rl_item_ops_ops_1', completed: false },
        { id: 'rli-oo-2', textKey: 'checklist_rl_item_ops_ops_2', completed: false },
        { id: 'rli-oo-3', textKey: 'checklist_rl_item_ops_ops_3', completed: false },
        { id: 'rli-oo-4', textKey: 'checklist_rl_item_ops_ops_4', completed: false },
      ]},
  ] },
];

export const INITIAL_GROWTH_LIST_DATA: ChecklistTab[] = [
    { id: 'gl-tab-1', titleKey: 'checklist_gl_tab_plg', cards: [
        { id: 'gl-card-1', titleKey: 'checklist_gl_card_acq', items: [
            { id: 'gli-1-1', textKey: 'checklist_gl_item_acq_1', completed: false },
            { id: 'gli-1-2', textKey: 'checklist_gl_item_acq_2', completed: false },
            { id: 'gli-1-3', textKey: 'checklist_gl_item_acq_3', completed: false },
            { id: 'gli-1-4', textKey: 'checklist_gl_item_acq_4', completed: false },
            { id: 'gli-1-5', textKey: 'checklist_gl_item_acq_5', completed: false },
            { id: 'gli-1-6', textKey: 'checklist_gl_item_acq_6', completed: false },
            { id: 'gli-1-7', textKey: 'checklist_gl_item_acq_7', completed: false },
            { id: 'gli-1-8', textKey: 'checklist_gl_item_acq_8', completed: false },
            { id: 'gli-1-9', textKey: 'checklist_gl_item_acq_9', completed: false },
        ]},
        { id: 'gl-card-2', titleKey: 'checklist_gl_card_landing', items: [
            { id: 'gli-2-1', textKey: 'checklist_gl_item_landing_1', completed: false },
            { id: 'gli-2-2', textKey: 'checklist_gl_item_landing_2', completed: false },
            { id: 'gli-2-3', textKey: 'checklist_gl_item_landing_3', completed: false },
            { id: 'gli-2-4', textKey: 'checklist_gl_item_landing_4', completed: false },
        ]},
        { id: 'gl-card-3', titleKey: 'checklist_gl_card_onboarding', items: [
            { id: 'gli-3-1', textKey: 'checklist_gl_item_onboarding_1', completed: false },
            { id: 'gli-3-2', textKey: 'checklist_gl_item_onboarding_2', completed: false },
            { id: 'gli-3-3', textKey: 'checklist_gl_item_onboarding_3', completed: false },
            { id: 'gli-3-4', textKey: 'checklist_gl_item_onboarding_4', completed: false },
            { id: 'gli-3-5', textKey: 'checklist_gl_item_onboarding_5', completed: false },
        ]},
        { id: 'gl-card-4', titleKey: 'checklist_gl_card_retention', items: [
            { id: 'gli-4-1', textKey: 'checklist_gl_item_retention_1', completed: false },
            { id: 'gli-4-2', textKey: 'checklist_gl_item_retention_2', completed: false },
            { id: 'gli-4-3', textKey: 'checklist_gl_item_retention_3', completed: false },
            { id: 'gli-4-4', textKey: 'checklist_gl_item_retention_4', completed: false },
        ]},
    ]},
    { id: 'gl-tab-2', titleKey: 'checklist_gl_tab_paid', cards: [
        { id: 'gl-card-paid-linkedin', titleKey: 'checklist_gl_card_paid_linkedin', items: [
            { id: 'gli-pl-1', textKey: 'checklist_gl_item_paid_linkedin_1', completed: false },
            { id: 'gli-pl-2', textKey: 'checklist_gl_item_paid_linkedin_2', completed: false },
            { id: 'gli-pl-3', textKey: 'checklist_gl_item_paid_linkedin_3', completed: false },
            { id: 'gli-pl-4', textKey: 'checklist_gl_item_paid_linkedin_4', completed: false },
        ]},
        { id: 'gl-card-paid-lead-auto', titleKey: 'checklist_gl_card_paid_lead_auto', items: [
            { id: 'gli-pla-1', textKey: 'checklist_gl_item_paid_lead_auto_1', completed: false },
            { id: 'gli-pla-2', textKey: 'checklist_gl_item_paid_lead_auto_2', completed: false },
        ]},
        { id: 'gl-card-paid-google', titleKey: 'checklist_gl_card_paid_google', items: [
            { id: 'gli-pg-1', textKey: 'checklist_gl_item_paid_google_1', completed: false },
        ]},
        { id: 'gl-card-paid-instagram', titleKey: 'checklist_gl_card_paid_instagram', items: [
            { id: 'gli-pi-1', textKey: 'checklist_gl_item_paid_instagram_1', completed: false },
            { id: 'gli-pi-2', textKey: 'checklist_gl_item_paid_instagram_2', completed: false },
        ]},
        { id: 'gl-card-paid-twitter', titleKey: 'checklist_gl_card_paid_twitter', items: [
            { id: 'gli-pt-1', textKey: 'checklist_gl_item_paid_twitter_1', completed: false },
            { id: 'gli-pt-2', textKey: 'checklist_gl_item_paid_twitter_2', completed: false },
        ]},
        { id: 'gl-card-paid-tiktok', titleKey: 'checklist_gl_card_paid_tiktok', items: [
            { id: 'gli-ptt-1', textKey: 'checklist_gl_item_paid_tiktok_1', completed: false },
            { id: 'gli-ptt-2', textKey: 'checklist_gl_item_paid_tiktok_2', completed: false },
        ]},
        { id: 'gl-card-paid-reddit', titleKey: 'checklist_gl_card_paid_reddit', items: [
            { id: 'gli-pr-1', textKey: 'checklist_gl_item_paid_reddit_1', completed: false },
            { id: 'gli-pr-2', textKey: 'checklist_gl_item_paid_reddit_2', completed: false },
        ]},
        { id: 'gl-card-paid-email', titleKey: 'checklist_gl_card_paid_email', items: [
            { id: 'gli-pe-1', textKey: 'checklist_gl_item_paid_email_1', completed: false },
            { id: 'gli-pe-2', textKey: 'checklist_gl_item_paid_email_2', completed: false },
            { id: 'gli-pe-3', textKey: 'checklist_gl_item_paid_email_3', completed: false },
        ]},
    ]},
    { id: 'gl-tab-3', titleKey: 'checklist_gl_tab_thought', cards: [
        { id: 'gl-card-thought-social', titleKey: 'checklist_gl_card_thought_social', items: [
            { id: 'gli-ts-1', textKey: 'checklist_gl_item_thought_social_1', completed: false },
            { id: 'gli-ts-2', textKey: 'checklist_gl_item_thought_social_2', completed: false },
            { id: 'gli-ts-3', textKey: 'checklist_gl_item_thought_social_3', completed: false },
            { id: 'gli-ts-4', textKey: 'checklist_gl_item_thought_social_4', completed: false },
            { id: 'gli-ts-5', textKey: 'checklist_gl_item_thought_social_5', completed: false },
            { id: 'gli-ts-6', textKey: 'checklist_gl_item_thought_social_6', completed: false },
        ]},
        { id: 'gl-card-thought-content', titleKey: 'checklist_gl_card_thought_content', items: [
            { id: 'gli-tc-1', textKey: 'checklist_gl_item_thought_content_1', completed: false },
            { id: 'gli-tc-2', textKey: 'checklist_gl_item_thought_content_2', completed: false },
            { id: 'gli-tc-3', textKey: 'checklist_gl_item_thought_content_3', completed: false },
        ]},
        { id: 'gl-card-thought-speaking', titleKey: 'checklist_gl_card_thought_speaking', items: [
            { id: 'gli-tse-1', textKey: 'checklist_gl_item_thought_speaking_1', completed: false },
            { id: 'gli-tse-2', textKey: 'checklist_gl_item_thought_speaking_2', completed: false },
            { id: 'gli-tse-3', textKey: 'checklist_gl_item_thought_speaking_3', completed: false },
        ]},
        { id: 'gl-card-thought-podcasts', titleKey: 'checklist_gl_card_thought_podcasts', items: [
            { id: 'gli-tp-1', textKey: 'checklist_gl_item_thought_podcasts_1', completed: false },
            { id: 'gli-tp-2', textKey: 'checklist_gl_item_thought_podcasts_2', completed: false },
            { id: 'gli-tp-3', textKey: 'checklist_gl_item_thought_podcasts_3', completed: false },
        ]},
    ]},
    { id: 'gl-tab-4', titleKey: 'checklist_gl_tab_partners', cards: [
        { id: 'gl-card-partners-events', titleKey: 'checklist_gl_card_partners_events', items: [
            { id: 'gli-pe-1', textKey: 'checklist_gl_item_partners_events_1', completed: false },
            { id: 'gli-pe-2', textKey: 'checklist_gl_item_partners_events_2', completed: false },
            { id: 'gli-pe-3', textKey: 'checklist_gl_item_partners_events_3', completed: false },
        ]},
        { id: 'gl-card-partners-channel', titleKey: 'checklist_gl_card_partners_channel', items: [
            { id: 'gli-pc-1', textKey: 'checklist_gl_item_partners_channel_1', completed: false },
            { id: 'gli-pc-2', textKey: 'checklist_gl_item_partners_channel_2', completed: false },
            { id: 'gli-pc-3', textKey: 'checklist_gl_item_partners_channel_3', completed: false },
        ]},
        { id: 'gl-card-partners-orgs', titleKey: 'checklist_gl_card_partners_orgs', items: [
            { id: 'gli-po-1', textKey: 'checklist_gl_item_partners_orgs_1', completed: false },
            { id: 'gli-po-2', textKey: 'checklist_gl_item_partners_orgs_2', completed: false },
            { id: 'gli-po-3', textKey: 'checklist_gl_item_partners_orgs_3', completed: false },
            { id: 'gli-po-4', textKey: 'checklist_gl_item_partners_orgs_4', completed: false },
        ]},
    ]},
    { id: 'gl-tab-5', titleKey: 'checklist_gl_tab_enterprise', cards: [
        { id: 'gl-card-enterprise-bdr', titleKey: 'checklist_gl_card_enterprise_bdr', items: [
            { id: 'gli-eb-1', textKey: 'checklist_gl_item_enterprise_bdr_1', completed: false },
            { id: 'gli-eb-2', textKey: 'checklist_gl_item_enterprise_bdr_2', completed: false },
            { id: 'gli-eb-3', textKey: 'checklist_gl_item_enterprise_bdr_3', completed: false },
        ]},
        { id: 'gl-card-enterprise-ae', titleKey: 'checklist_gl_card_enterprise_ae', items: [
            { id: 'gli-ea-1', textKey: 'checklist_gl_item_enterprise_ae_1', completed: false },
            { id: 'gli-ea-2', textKey: 'checklist_gl_item_enterprise_ae_2', completed: false },
            { id: 'gli-ea-3', textKey: 'checklist_gl_item_enterprise_ae_3', completed: false },
        ]},
        { id: 'gl-card-enterprise-cs', titleKey: 'checklist_gl_card_enterprise_cs', items: [
            { id: 'gli-ec-1', textKey: 'checklist_gl_item_enterprise_cs_1', completed: false },
            { id: 'gli-ec-2', textKey: 'checklist_gl_item_enterprise_cs_2', completed: false },
            { id: 'gli-ec-3', textKey: 'checklist_gl_item_enterprise_cs_3', completed: false },
        ]},
    ]},
];


export const PARTNERS_DATA: Partner[] = [
  {
    id: 'p1',
    name: 'IntelMotion Lifts',
    logoUrl: 'https://intelmotionlifts.com/wp-content/uploads/2023/06/cropped-image-removebg-preview-32-e1687085450126-234x70.png.webp',
    description: 'IntelMotion is one of the leading lift/elevator provider company who has been working to provide top quality residential or commercial passenger and freight lifts, escalators, moving walks, together with training, maintenance and consultancy services from top experts.',
    website: 'https://intelmotionlifts.com/'
  },
  {
    id: 'p2',
    name: 'Efuye Gela',
    logoUrl: 'https://cdn.dribbble.com/userupload/15780745/file/original-e8c56ef20437f831d766a7376672402f.png',
    description: 'Efuye Gela is a solutions company that employs a variety of resources, tools, and frameworks to design and deliver dynamic high-impact solutions that cater to specific ecosystems and audiences.',
    website: 'https://efuyegela.com/'
  },
  {
    id: 'p3',
    name: 'GOMIDA Solutions',
    logoUrl: 'https://www.gomidasolutions.com/gomidalogo.png',
    description: 'GOMIDA Solutions is a pioneering technology company that leverages gamification to create interactive experiences for users while providing brands and influencers with new ways to engage and monetize. Through our House of Chewata platform, we develop hyper-casual, skill-based games that entertain, educate, and reward players—all seamlessly integrated into Telegram!',
    website: 'https://www.gomidasolutions.com/'
  }
];

export const TRAINERS_DATA: Trainer[] = [
  { id: 't1', name: 'Bruk Anbessie', photoUrl: 'https://i.pravatar.cc/150?u=t1', specialty: 'Digital Marketing & Growth Hacking', bio: 'With over 10 years of experience, Bruk has helped scale multiple Ethiopian startups through innovative digital strategies.' },
  { id: 't2', name: 'Hana Tadesse', photoUrl: 'https://i.pravatar.cc/150?u=t2', specialty: 'Financial Modeling & Investment Readiness', bio: 'Hana is a certified financial analyst who specializes in preparing early-stage ventures for investment.' },
  { id: 't3', name: 'Yared Lemma', photoUrl: 'https://i.pravatar.cc/150?u=t3', specialty: 'Product Management & Agile Development', bio: 'A former product lead at a major tech company, Yared now mentors founders on building user-centric products.' }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  { id: 'tes1', authorName: 'Abebe Kebede', authorTitle: 'Founder, Sheba Fresh', photoUrl: 'https://i.pravatar.cc/150?u=tes1', quote: '7set Spark was a game-changer. The hands-on approach helped us go from a simple idea to a revenue-generating business in months.' },
  { id: 'tes2', authorName: 'Fatima Mohammed', authorTitle: 'CEO, Konjo Designs', photoUrl: 'https://i.pravatar.cc/150?u=tes2', quote: 'The mentorship and network are invaluable. I connected with my first investor through a 7set Spark event.' }
];

export const PERSONALITY_QUESTIONS: AssessmentQuestion[] = [
  { id: 'p1', textKey: 'q_p1_text', type: 'multiple-choice-scale', category: 'personality', scaleMin: 1, scaleMax: 5 },
  { id: 'p2', textKey: 'q_p2_text', type: 'multiple-choice-options', category: 'personality', options: [ { value: 'analyze', labelKey: 'q_p2_opt_analyze'}, { value: 'action', labelKey: 'q_p2_opt_action'}, { value: 'seek_help', labelKey: 'q_p2_opt_seek_help'}, { value: 'wait', labelKey: 'q_p2_opt_wait'} ]},
  { id: 'p3', textKey: 'q_p3_text', type: 'multiple-choice-options', category: 'personality', options: [ { value: 'delegate', labelKey: 'q_p3_opt_delegate'}, { value: 'control', labelKey: 'q_p3_opt_control'}, { value: 'collaborate', labelKey: 'q_p3_opt_collaborate'}, { value: 'avoid', labelKey: 'q_p3_opt_avoid'} ]},
  { id: 'p4', textKey: 'q_p4_text', type: 'multiple-choice-scale', category: 'personality', scaleMin: 1, scaleMax: 5 },
  { id: 'p5', textKey: 'q_p5_text', type: 'multiple-choice-options', category: 'personality', options: [ { value: 'data', labelKey: 'q_p5_opt_data'}, { value: 'intuition', labelKey: 'q_p5_opt_intuition'}, { value: 'advice', labelKey: 'q_p5_opt_advice'}, { value: 'trial_error', labelKey: 'q_p5_opt_trial_error'} ]}
];

export const BUSINESS_ACUMEN_QUESTIONS: AssessmentQuestion[] = [
  { id: 'ba1', textKey: 'q_ba1_text', type: 'multiple-choice-options', category: 'businessAcumen', options: [ { value: 'detailed_plan', labelKey: 'q_ba1_opt_detailed_plan'}, { value: 'flexible_approach', labelKey: 'q_ba1_opt_flexible_approach'}, { value: 'customer_feedback', labelKey: 'q_ba1_opt_customer_feedback'}, { value: 'competitor_focus', labelKey: 'q_ba1_opt_competitor_focus'} ]},
  { id: 'ba2', textKey: 'q_ba2_text', type: 'multiple-choice-options', category: 'businessAcumen', options: [ { value: 'revenue_first', labelKey: 'q_ba2_opt_revenue_first'}, { value: 'profit_first', labelKey: 'q_ba2_opt_profit_first'}, { value: 'growth_first', labelKey: 'q_ba2_opt_growth_first'}, { value: 'balance', labelKey: 'q_ba2_opt_balance'} ]},
  { id: 'ba3', textKey: 'q_ba3_text', type: 'multiple-choice-scale', category: 'businessAcumen', scaleMin: 1, scaleMax: 5 },
  { id: 'ba4', textKey: 'q_ba4_text', type: 'multiple-choice-options', category: 'businessAcumen', options: [ { value: 'organic', labelKey: 'q_ba4_opt_organic'}, { value: 'paid_ads', labelKey: 'q_ba4_opt_paid_ads'}, { value: 'partnerships', labelKey: 'q_ba4_opt_partnerships'}, { value: 'sales_team', labelKey: 'q_ba4_opt_sales_team'} ]},
  { id: 'ba5', textKey: 'q_ba5_text', type: 'scenario-options', category: 'businessAcumen', options: [ { value: 'cut_costs', labelKey: 'q_ba5_opt_cut_costs'}, { value: 'increase_marketing', labelKey: 'q_ba5_opt_increase_marketing'}, { value: 'pivot_product', labelKey: 'q_ba5_opt_pivot_product'}, { value: 'seek_funding', labelKey: 'q_ba5_opt_seek_funding'} ]}
];

export const STARTUP_KNOWLEDGE_QUESTIONS: AssessmentQuestion[] = [
  { id: 'sk1', textKey: 'q_sk1_text', type: 'multiple-choice-options', category: 'startupKnowledge', options: [ { value: 'mvp_basic', labelKey: 'q_sk1_opt_mvp_basic'}, { value: 'mvp_polished', labelKey: 'q_sk1_opt_mvp_polished'}, { value: 'mvp_many_features', labelKey: 'q_sk1_opt_mvp_many_features'}, { value: 'mvp_no_need', labelKey: 'q_sk1_opt_mvp_no_need'} ]},
  { id: 'sk2', textKey: 'q_sk2_text', type: 'multiple-choice-scale', category: 'startupKnowledge', scaleMin: 1, scaleMax: 5 },
  { id: 'sk3', textKey: 'q_sk3_text', type: 'multiple-choice-options', category: 'startupKnowledge', options: [ { value: 'bootstrapping', labelKey: 'q_sk3_opt_bootstrapping'}, { value: 'friends_family', labelKey: 'q_sk3_opt_friends_family'}, { value: 'angel_investors', labelKey: 'q_sk3_opt_angel_investors'}, { value: 'venture_capital', labelKey: 'q_sk3_opt_venture_capital'} ]},
  { id: 'sk4', textKey: 'q_sk4_text', type: 'scenario-options', category: 'startupKnowledge', options: [ { value: 'surveys', labelKey: 'q_sk4_opt_surveys'}, { value: 'interviews', labelKey: 'q_sk4_opt_interviews'}, { value: 'presales', labelKey: 'q_sk4_opt_presales'}, { value: 'analytics', labelKey: 'q_sk4_opt_analytics'} ]},
  { id: 'sk5', textKey: 'q_sk5_text', type: 'multiple-choice-options', category: 'startupKnowledge', options: [ { value: 'solo', labelKey: 'q_sk5_opt_solo'}, { value: 'complementary', labelKey: 'q_sk5_opt_complementary'}, { value: 'similar_skills', labelKey: 'q_sk5_opt_similar_skills'}, { value: 'friends', labelKey: 'q_sk5_opt_friends'} ]}
];
