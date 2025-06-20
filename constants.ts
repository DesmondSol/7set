
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

export const CANVAS_SECTIONS_HELP: CanvasSectionHelp[] = [
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
    title: CanvasSection.PERSONAS,
    explanation: {
      en: "Create 2-3 fictional representations of your ideal Ethiopian customers. Give them names, backstories, motivations, and pain points related to your product/service and the Ethiopian context.",
      am: "2-3 ተስማሚ የኢትዮጵያ ደንበኞችዎን ምናባዊ ውክልናዎች ይፍጠሩ። ከምርትዎ/አገልግሎትዎ እና ከኢትዮጵያ አውድ ጋር የተያያዙ ስሞችን፣ የሕይወት ታሪኮችን፣ ተነሳሽነቶችን እና የችግር ነጥቦችን ይስጧቸው።"
    },
    example: {
      en: "1. Abebe: 45-yr old teff farmer in rural Gojjam, owns a feature phone, struggles with market price info and transport. Wants fair, consistent income. 2. Fatuma: 30-yr old restaurant owner in Bole, Addis Ababa, needs reliable supply of fresh vegetables, values quality and convenience, uses Telebirr.",
      am: "1. አበበ፦ በገጠር ጎጃም የሚኖር የ45 ዓመት የጤፍ ገበሬ፣ የባህሪ ስልክ ያለው፣ የገበያ ዋጋ መረጃ እና የትራንስፖርት ችግር አለበት። ፍትሃዊ፣ ወጥ የሆነ ገቢ ይፈልጋል። 2. ፋጡማ፦ በቦሌ፣ አዲስ አበባ የምትኖር የ30 ዓመት የምግብ ቤት ባለቤት፣ አስተማማኝ ትኩስ አትክልት አቅርቦት ትፈልጋለች፣ ጥራትንና ምቾትን ትመለከታለች፣ ቴሌብር ትጠቀማለች።"
    }
  },
  {
    title: CanvasSection.JOBS_TO_BE_DONE,
    explanation: {
      en: "What 'job' are your Ethiopian customers hiring your product/service to do for them? Focus on the underlying need or progress they are trying to make, not just the features. (e.g., 'help me sell my harvest without hassle', 'find reliable ingredients for my business').",
      am: "የኢትዮጵያ ደንበኞችዎ ምርትዎን/አገልግሎትዎን ምን 'ሥራ' እንዲሰራላቸው ነው የሚቀጥሩት? በባህሪያቱ ላይ ብቻ ሳይሆን ሊያከናውኑት በሚሞክሩት መሠረታዊ ፍላጎት ወይም እድገት ላይ ያተኩሩ። (ለምሳሌ፣ 'ያለምንም ውጣ ውረድ ምርቴን እንድሸጥ እርዳኝ'፣ 'ለንግዴ አስተማማኝ ግብአቶችን እንዳገኝ እርዳኝ')።"
    },
    example: {
      en: "For Farmer Abebe: 'Help me efficiently reach a wider market and get a better price for my teff with minimal technical skill required.' For Restaurant Owner Fatuma: 'Provide me with a consistent and transparent way to source high-quality local ingredients for my restaurant menu via my smartphone.'",
      am: "ለገበሬ አበበ፦ 'በትንሹ የቴክኒክ ክህሎት ሰፋ ያለ ገበያ በብቃት እንዳገኝና ለጤፌ የተሻለ ዋጋ እንዳገኝ እርዳኝ።' ለምግብ ቤት ባለቤት ፋጡማ፦ 'በስማርትፎኔ አማካኝነት ለምግብ ቤቴ ምናሌ ከፍተኛ ጥራት ያላቸውን የአገር ውስጥ ግብአቶች በተከታታይ እና ግልጽ በሆነ መንገድ እንዳገኝ አቅርብልኝ።'"
    }
  },
  {
    title: CanvasSection.USE_CASES,
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
    explanation: {
      en: "What unique benefit does your product provide to Ethiopian customers that competitors don't? How do you solve their problem or improve their situation distinctively? Be clear and concise.",
      am: "ተፎካካሪዎች የማያቀርቡትን ምን ልዩ ጥቅም ነው ምርትዎ ለኢትዮጵያ ደንበኞች የሚያቀርበው? ችግራቸውን እንዴት በተለየ መንገድ ይፈታሉ ወይም ሁኔታቸውን ያሻሽላሉ? ግልጽ እና አጭር ይሁኑ።"
    },
    example: {
      en: "GebeyaLink: The only platform in Ethiopia offering a combined USSD and App access for agricultural trade, with integrated local payment (Telebirr) and logistics partnerships, directly connecting rural farmers to urban markets, reducing intermediaries and increasing transparency.",
      am: "ገበያሊንክ፦ በኢትዮጵያ ብቸኛው የግብርና ንግድ የUSSD እና የመተግበሪያ ተደራሽነትን በአንድ ላይ የሚያቀርብ、 የተቀናጀ የአካባቢ ክፍያ (ቴሌብር) እና የሎጂስቲክስ አጋርነት ያለው፣ የገጠር ገበሬዎችን ከከተማ ገበያዎች ጋር በቀጥታ የሚያገናኝ፣ አማላጆችን የሚቀንስ እና ግልጽነትን የሚጨምር መድረክ።"
    }
  },
  {
    title: CanvasSection.UNFAIR_ADVANTAGE,
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
    explanation: {
      en: "How will your business make money in Ethiopia? Describe your revenue streams (e.g., commission on sales, subscription fees in ETB, data monetization respecting local privacy norms).",
      am: "ንግድዎ በኢትዮጵያ እንዴት ገንዘብ ያገኛል? የገቢ ምንጮችዎን ይግለጹ (ለምሳሌ፣ በሽያጭ ላይ ኮሚሽን፣ የደንበኝነት ምዝገባ ክፍያዎች በኢትዮጵያ ብር፣ የአካባቢ የግላዊነት ደንቦችን የሚያከብር የውሂብ ገቢ መፍጠር)።"
    },
    example: {
      en: "GebeyaLink will charge a 5% commission on the value of each successful transaction facilitated through the platform (deducted from seller payment). Future potential: Premium features for businesses (e.g., data analytics on crop availability for ETB 500/month).",
      am: "ገበያሊንክ በመድረኩ በኩል ለሚከናወን እያንዳንዱ የተሳካ ግብይት ዋጋ 5% ኮሚሽን ያስከፍላል (ከሻጭ ክፍያ ላይ ተቀንሶ)። የወደፊት እምቅ አቅም፦ ለንግዶች ፕሪሚየም ባህሪዎች (ለምሳሌ፣ በወር 500 ብር ስለ ሰብል መገኘት የውሂብ ትንተና)።"
    }
  },
  {
    title: CanvasSection.PRICING,
    explanation: {
      en: "Detail your pricing strategy for Ethiopian customers. How much will your product/service cost (in ETB)? How does this compare to alternatives? Is it value-based, cost-plus, or competitive? Consider local affordability.",
      am: "ለኢትዮጵያ ደንበኞች የዋጋ አወጣጥ ስትራቴጂዎን በዝርዝር ይግለጹ። ምርትዎ/አገልግሎትዎ ስንት ያስከፍላል (በኢትዮጵያ ብር)? ይህ ከአማራጮች ጋር ሲነጻጸር እንዴት ነው? በእሴት ላይ የተመሰረተ፣ ወጪ-ተጨማሪ፣ ወይስ ተወዳዳሪ ነው? የአካባቢውን የመግዛት አቅም ግምት ውስጥ ያስገቡ።"
    },
    example: {
      en: "Commission: 5% of transaction value (ETB). This is competitive compared to traditional intermediaries who might take 20-40%. Value-based for farmers (higher net income) and buyers (fair prices, convenience). No subscription fees for basic access for farmers.",
      am: "ኮሚሽን፦ 5% የግብይት ዋጋ (ብር)። ይህ ከ20-40% ሊወስዱ ከሚችሉ ባህላዊ አማላጆች ጋር ሲነጻጸር ተወዳዳሪ ነው። ለገበሬዎች (ከፍተኛ የተጣራ ገቢ) እና ለገዥዎች (ፍትሃዊ ዋጋ፣ ምቾት) በእሴት ላይ የተመሰረተ። ለገበሬዎች ለመሠረታዊ ተደራሽነት የደንበኝነት ምዝገባ ክፍያ የለም።"
    }
  },
  {
    title: CanvasSection.COMPETITORS,
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
    explanation: {
      en: "Analyze the revenue and costs associated with a single unit of your product/service in Ethiopia (e.g., per customer, per transaction). What is your Customer Acquisition Cost (CAC) in ETB? What is the Lifetime Value (LTV) of an Ethiopian customer?",
      am: "በኢትዮጵያ ውስጥ ካለው አንድ የምርትዎ/አገልግሎትዎ ክፍል ጋር የተያያዙ ገቢዎችን እና ወጪዎችን ይተንትኑ (ለምሳሌ፣ በአንድ ደንበኛ፣ በአንድ ግብይት)። የእርስዎ የደንበኛ ማግኛ ወጪ (CAC) በኢትዮጵያ ብር ስንት ነው? የአንድ ኢትዮጵያዊ ደንበኛ የህይወት ዘመን ዋጋ (LTV) ስንት ነው?"
    },
    example: {
      en: "Per transaction: Avg. transaction value = 5000 ETB. Revenue (5% commission) = 250 ETB. Variable costs (SMS, payment gateway fee) = 10 ETB. Contribution margin = 240 ETB. Target CAC for a farmer: 100 ETB (via local agent outreach). LTV (farmer, 3 yrs): ~15,000 ETB profit contribution.",
      am: "በአንድ ግብይት፦ አማካይ የግብይት ዋጋ = 5000 ብር። ገቢ (5% ኮሚሽን) = 250 ብር። ተለዋዋጭ ወጪዎች (SMS፣ የክፍያ መግቢያ ክፍያ) = 10 ብር። የአስተዋጽኦ ህዳግ = 240 ብር። ለአንድ ገበሬ ዒላማ የደንበኛ ማግኛ ወጪ (CAC)፦ 100 ብር (በአካባቢ ወኪል ተደራሽነት)። የአንድ ገበሬ የህይወት ዘመን ዋጋ (LTV) (3 ዓመታት)፦ ~15,000 ብር የትርፍ አስተዋጽኦ።"
    }
  },
  {
    title: CanvasSection.BRAND_STYLE_GUIDES,
    explanation: {
      en: "Define your brand's personality, voice, and visual identity (logo, colors, typography) as it relates to the Ethiopian market. How will you communicate your brand to resonate with Ethiopian users? (e.g., using local motifs, community-focused imagery).",
      am: "ከኢትዮጵያ ገበያ ጋር በተያያዘ የምርትዎን ስብዕና፣ ድምጽ እና ምስላዊ ማንነት (አርማ፣ ቀለሞች፣ የፊደል አጻጻፍ) ይግለጹ። ከኢትዮጵያ ተጠቃሚዎች ጋር ለመስማማት የምርትዎን ስም እንዴት ያስተላልፋሉ? (ለምሳሌ፣ የአካባቢ ዘይቤዎችን፣ በማህበረሰብ ላይ ያተኮሩ ምስሎችን በመጠቀም)።"
    },
    example: {
      en: "Brand Voice: Trustworthy, empowering, community-oriented. Colors: Green (agriculture, growth), Yellow (optimism, harvest), Blue (technology, reliability). Logo: Stylized 'meskel' flower integrated with a network symbol. Imagery: Focus on real Ethiopian farmers and vibrant local markets.",
      am: "የምርት ድምጽ፦ ታማኝ፣ አቅም ሰጪ፣ በማህበረሰብ ላይ ያተኮረ። ቀለሞች፦ አረንጓዴ (ግብርና፣ ዕድገት)፣ ቢጫ (ብሩህ ተስፋ፣ መከር)፣ ሰማያዊ (ቴክኖሎጂ፣ አስተማማኝነት)። አርማ፦ ከአውታረ መረብ ምልክት ጋር የተዋሃደ ቅጥ ያጣ 'መስቀል' አበባ። ምስሎች፦ በእውነተኛ የኢትዮጵያ ገበሬዎች እና በደመቁ የአካባቢ ገበያዎች ላይ ያተኩሩ።"
    }
  },
  {
    title: CanvasSection.PRODUCT_MARKET_FIT,
    explanation: {
      en: "How will you know if your product has achieved fit with the Ethiopian market? What key metrics (e.g., adoption rate by Ethiopian users, retention, referral rate, positive feedback in local languages) will indicate this?",
      am: "ምርትዎ ከኢትዮጵያ ገበያ ጋር መጣጣሙን እንዴት ያውቃሉ? ይህን የሚያመለክቱት የትኞቹ ቁልፍ መለኪያዎች (ለምሳሌ፣ በኢትዮጵያ ተጠቃሚዎች የመቀበል መጠን፣ የደንበኛ ታማኝነት፣ የማስተዋወቅ መጠን፣ በአካባቢ ቋንቋዎች አዎንታዊ ግብረመልስ) ናቸው?"
    },
    example: {
      en: "Metrics: Achieve 500 active farmer listings and 1000 buyer transactions per month within 6 months. Farmer retention rate of 70% after 3 months. Net Promoter Score (NPS) of +40 from both farmer and buyer segments in Ethiopia. User testimonials in Amharic and Oromiffa praising ease of use and fair pricing.",
      am: "መለኪያዎች፦ በ6 ወራት ውስጥ በወር 500 ንቁ የገበሬ ዝርዝሮችን እና 1000 የገዥ ግብይቶችን ማሳካት። ከ3 ወራት በኋላ የገበሬ የደንበኛ ታማኝነት መጠን 70%። ከኢትዮጵያ የገበሬ እና የገዥ ክፍሎች የተጣራ አራማጅ ነጥብ (NPS) +40። በአማርኛ እና በኦሮምኛ የአጠቃቀም ቀላልነትን እና ፍትሃዊ ዋጋን የሚያወድሱ የተጠቃሚ ምስክርነቶች።"
    }
  }
];

export const RESEARCH_SECTIONS_HELP: ResearchSectionHelp[] = [
  {
    title: ResearchSection.QUESTIONS,
    sidebarTitle: {
      en: "Questions & Responses",
      am: "ጥያቄዎች እና ምላሾች"
    },
    explanation: {
      en: "Develop key questions to ask your target users in Ethiopia. You can create these manually or use AI (which will consider Ethiopian context). For each question, you can record individual responses from different participants to gather granular feedback.",
      am: "ዒላማ ተጠቃሚዎችዎን በኢትዮጵያ ውስጥ ለመጠየቅ ቁልፍ ጥያቄዎችን ያዘጋጁ። እነዚህን በእጅ መፍጠር ወይም AI መጠቀም ይችላሉ (ይህም የኢትዮጵያን ሁኔታ ግምት ውስጥ ያስገባል)። ለእያንዳንዱ ጥያቄ፣ ዝርዝር አስተያየቶችን ለመሰብሰብ ከተለያዩ ተሳታፊዎች የግል ምላሾችን መመዝገብ ይችላሉ።"
    }
  },
  {
    title: ResearchSection.GENERAL_NOTES_IMPORT,
    sidebarTitle: {
      en: "General Notes / Import",
      am: "አጠቃላይ ማስታወሻዎች / አስገባ"
    },
    explanation: {
      en: "Use this section for general research observations related to the Ethiopian market, brainstorming, or to import bulk data like CSV files from Google Forms. This is for broader data that isn't tied to specific questions or structured entries.",
      am: "ይህንን ክፍል ከኢትዮጵያ ገበያ ጋር ለተያያዙ አጠቃላይ የምርምር დაკვირვებები፣ ለአእምሮ ማጎልበት፣ ወይም እንደ CSV ፋይሎች ያሉ የጅምላ መረጃዎችን ከGoogle ቅጾች ለማስመጣት ይጠቀሙበት። ይህ ከተወሰኑ ጥያቄዎች ወይም ከተዋቀሩ ግቤቶች ጋር ያልተያያዘ ሰፋ ያለ መረጃ ለማግኘት ነው።"
    }
  },
  {
    title: ResearchSection.COMPETITOR_ANALYSIS,
    sidebarTitle: {
      en: "Competitor Analysis",
      am: "የተፎካካሪ ትንተና"
    },
    explanation: {
      en: "Systematically evaluate your competitors in the Ethiopian market. Identify who they are, their pricing strategies (in ETB), key features offered to Ethiopians, their perceived strengths and weaknesses, and any market gaps they address or create. Use this to refine your own strategy for Ethiopia.",
      am: "በኢትዮጵያ ገበያ ውስጥ ተወዳዳሪዎችዎን በስርዓት ይገምግሙ። እነማን እንደሆኑ፣ የዋጋ አወጣጥ ስልቶቻቸውን (በኢትዮጵያ ብር)፣ ለኢትዮጵያውያን የሚያቀርቧቸውን ቁልፍ ባህሪያት፣ የሚገመቱ ጥንካሬዎቻቸውን እና ድክመቶቻቸውን፣ እንዲሁም የሚሸፍኗቸውን ወይም የሚፈጥሯቸውን የገበያ ክፍተቶች ይለዩ። ለኢትዮጵያ የራስዎን ስትራቴጂ ለማጥራት ይህንን ይጠቀሙ።"
    }
  },
  {
    title: ResearchSection.TRENDS,
    sidebarTitle: {
      en: "Industry Trends",
      am: "የኢንዱስትሪ አዝማሚያዎች"
    },
    explanation: {
      en: "Identify and document key industry, technological, or consumer behavior trends relevant to your business domain in Ethiopia. For each trend, note its description, source/evidence, timeframe, observed location (e.g. Addis Ababa tech scene, rural mobile adoption), and potential impact on your business within the Ethiopian context.",
      am: "በኢትዮጵያ ውስጥ ከንግድዎ መስክ ጋር ተዛማጅነት ያላቸውን ቁልፍ የኢንዱስትሪ፣ የቴክኖሎጂ ወይም የተጠቃሚ ባህሪ አዝማሚያዎችን ይለዩ እና ይመዝግቡ። ለእያንዳንዱ አዝማሚያ መግለጫውን፣ ምንጩን/ማስረጃውን、 የጊዜ ገደቡን፣ የታየበትን ቦታ (ለምሳሌ የአዲስ አበባ የቴክኖሎጂ ትዕይንት፣ የገጠር የሞባይል ተጠቃሚነት) እና በኢትዮጵያ አውድ ውስጥ በንግድዎ ላይ ሊኖረው የሚችለውን ተጽዕኖ ልብ ይበሉ።"
    }
  },
  {
    title: ResearchSection.AI_SUMMARY,
    sidebarTitle: {
      en: "AI Summary",
      am: "የ AI ማጠቃለያ"
    },
    explanation: {
      en: "Leverage AI to synthesize and analyze all the information you've gathered across the Market Research Accelerator sections (Research Questions, General Notes, Competitor Analysis, Trends), viewed through the lens of your Business Launch Canvas strategy for Ethiopia. The AI will provide key insights, identify opportunities, and suggest actionable recommendations tailored for the Ethiopian market. The summary will be in your selected language (English/Amharic).",
      am: "በገበያ ጥናት ማፋጠኛ ክፍሎች (የምርምር ጥያቄዎች፣ አጠቃላይ ማስታወሻዎች፣ የተፎካካሪ ትንተና፣ አዝማሚያዎች) የሰበሰቡትን መረጃ ሁሉ、 ለኢትዮጵያ ባዘጋጁት የቢዝነስ ማስጀመሪያ ሸራ ስትራቴጂ መነጽር በመጠቀም ለማዋሃድ እና ለመተንተን AI ይጠቀሙ። AI ቁልፍ ግንዛቤዎችን ይሰጣል፣ ዕድሎችን ይለያል፣ እና ለኢትዮጵያ ገበያ የተዘጋጁ ተግባራዊ ምክሮችን ይጠቁማል። ማጠቃለያው እርስዎ በመረጡት ቋንቋ (እንግሊዝኛ/አማርኛ) ይሆናል።"
    }
  }
];

export const API_KEY_WARNING = "API_KEY environment variable is not set. AI features will be disabled.";
export const GENERIC_ERROR_MESSAGE = "An unexpected error occurred. Please try again.";
