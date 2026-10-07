/* ===================================================================
   KARIGARAI PROTOTYPE — 100% PURE HTML/CSS/JAVASCRIPT IMPLEMENTATION
   Role-Based Views (Buyer: Products Only | Seller: AI Tools & Studio)
   Smart India Hackathon Demo
=================================================================== */

// Global User State
let currentUser = {
    role: "seller", // 'seller' or 'buyer'
    name: "Ramesh Kumar (Artisan)",
    contact: "+91 98765 43210"
};

let activeCategoryFilter = "all";
let originalPreviewSrc = null;
let currentProcessedImage = null;
let voiceTranslationData = { original: "", english: "", hindi: "" };
let domTextNodes = [];
let originalDomTexts = new Map();

// Built-in Comprehensive UI Translation Dictionaries (Instant & Offline-Safe)
const UI_DICTIONARY = {
    hi: {
        "KarigarAI": "कारीगरAI",
        "Smart Business for Artisans": "कारीगरों के लिए स्मार्ट व्यवसाय",
        "Artisan": "कारीगर",
        "Seller": "विक्रेता",
        "Buyer": "खरीदार",
        "Retailer": "खुदरा विक्रेता",
        "AI-POWERED BUSINESS MANAGER": "AI-संचालित व्यवसाय प्रबंधक",
        "HANDMADE MARKETPLACE": "हस्तशिल्प मार्केटप्लेस",
        "Turn your craft into a digital business.": "अपने शिल्प को एक डिजिटल व्यवसाय में बदलें।",
        "Turn your craft": "अपने शिल्प को",
        "into a digital business.": "डिजिटल व्यवसाय में बदलें।",
        "Create professional product listings, discover competitive prices and reach buyers across India — with the power of AI.": "पेशेवर उत्पाद लिस्टिंग बनाएं, प्रतिस्पर्धी मूल्य खोजें और भारत भर के खरीदारों तक पहुंचें — AI की शक्ति के साथ।",
        "Discover authentic handmade crafts from skilled artisans across India with transparent pricing and direct ordering.": "पारदर्शी मूल्य निर्धारण और प्रत्यक्ष ऑर्डर के साथ पूरे भारत के कुशल कारीगरों से प्रामाणिक हस्तनिर्मित शिल्प खोजें।",
        "Add New Product": "नया उत्पाद जोड़ें",
        "Explore Available Products": "उपलब्ध उत्पाद देखें",
        "AI Catalog": "AI कैटलॉग",
        "Generated": "जनरेट हुआ",
        "Smart Price": "स्मार्ट मूल्य",
        "Products Listed": "सूचीबद्ध उत्पाद",
        "Potential Sales": "संभावित बिक्री",
        "Buyer Views": "खरीदार दृश्य",
        "Product Rating": "उत्पाद रेटिंग",
        "YOUR AI ASSISTANT": "आपका AI सहायक",
        "What would you like to do?": "आप क्या करना चाहेंगे?",
        "AI Image Studio": "AI इमेज स्टूडियो",
        "Turn ordinary product photos into professional e-commerce images.": "साधारण उत्पाद तस्वीरों को पेशेवर ई-कॉमर्स छवियों में बदलें।",
        "Background Removal · Lighting · Crop": "पृष्ठभूमि हटाना · प्रकाश · क्रॉप",
        "Smart Catalog": "स्मार्ट कैटलॉग",
        "Describe your product in your regional language and let AI do the rest.": "अपने उत्पाद का वर्णन अपनी क्षेत्रीय भाषा में करें और बाकी AI पर छोड़ दें।",
        "Voice · Translation · SEO": "आवाज़ · अनुवाद · SEO",
        "Dynamic Pricing": "गतिशील मूल्य निर्धारण",
        "Get an AI-powered competitive price based on costs and market trends.": "लागत और बाजार के रुझान के आधार पर AI-संचालित प्रतिस्पर्धी मूल्य प्राप्त करें।",
        "Market · Cost · Demand": "बाजार · लागत · मांग",
        "Market Link": "मार्केट लिंक",
        "Connect your products with buyers, retailers and larger markets.": "अपने उत्पादों को खरीदारों, खुदरा विक्रेताओं और बड़े बाजारों से जोड़ें।",
        "B2B · Buyers · Government": "B2B · खरीदार · सरकार",
        "YOUR INVENTORY": "आपकी सूची",
        "My Products": "मेरे उत्पाद",
        "AUTHENTIC CATALOG": "प्रामाणिक कैटलॉग",
        "Available Handmade Crafts": "उपलब्ध हस्तनिर्मित शिल्प",
        "View All →": "सभी देखें →",
        "Traditional Bamboo Basket": "पारंपरिक बांस की टोकरी",
        "Handcrafted · Eco-friendly": "हस्तनिर्मित · पर्यावरण-अनुकूल",
        "Handwoven Cotton Saree": "हथकरघा सूती साड़ी",
        "Traditional · Handwoven": "पारंपरिक · हथकरघा",
        "Terracotta Pot": "टेराकोटा मिट्टी का बर्तन",
        "Handmade · Traditional": "हस्तनिर्मित · पारंपरिक",
        "Handcrafted Brass Diya Lamp": "हस्तनिर्मित पीतल का दीया",
        "Jaipur Blue Pottery Vase": "जयपुर ब्लू पॉटरी फूलदान",
        "Cane Handcrafted Fruit Tray": "बेंत की हस्तनिर्मित फ्रूट ट्रे",
        "Order Now 🛍": "अभी ऑर्डर करें 🛍",
        "All Crafts": "सभी शिल्प",
        "STEP 01": "चरण 01",
        "Make your product photo ready for online selling.": "अपनी उत्पाद फ़ोटो को ऑनलाइन बिक्री के लिए तैयार करें।",
        "Upload Product Photo": "उत्पाद फ़ोटो अपलोड करें",
        "Take a photo or choose one from your device": "एक फ़ोटो लें या अपने डिवाइस से चुनें",
        "Choose Photo": "फ़ोटो चुनें",
        "AI Enhancement": "AI संवर्धन",
        "Background Removal": "पृष्ठभूमि हटाना",
        "Remove unwanted surroundings": "अवांछित परिवेश हटाएं",
        "Lighting Correction": "प्रकाश सुधार",
        "Improve brightness and clarity": "चमक और स्पष्टता में सुधार करें",
        "E-commerce Format": "ई-कॉमर्स प्रारूप",
        "Optimize image dimensions": "छवि आयामों को अनुकूलित करें",
        "Enhance with AI": "AI के साथ संवर्धित करें",
        "STEP 02": "चरण 02",
        "Multilingual Auto-Cataloger": "बहुभाषी ऑटो-कैटलॉगर",
        "Tell us about your product. AI will create the listing.": "हमें अपने उत्पाद के बारे में बताएं। AI लिस्टिंग तैयार करेगा।",
        "Product Name": "उत्पाद का नाम",
        "Describe your product": "अपने उत्पाद का वर्णन करें",
        "Input Language": "इनपुट भाषा",
        "Generate AI Catalog": "AI कैटलॉग बनाएं",
        "AI GENERATED": "AI द्वारा जनरेट",
        "ENGLISH": "अंग्रेज़ी",
        "हिन्दी": "हिन्दी",
        "SEO KEYWORDS": "SEO कीवर्ड",
        "STEP 03": "चरण 03",
        "Dynamic Pricing Assistant": "गतिशील मूल्य सहायक",
        "Get a competitive price recommendation.": "प्रतिस्पर्धी मूल्य अनुशंसा प्राप्त करें।",
        "Raw Material Cost": "कच्चे माल की लागत",
        "Crafting / Labour Cost": "शिल्प / श्रम लागत",
        "Other Costs": "अन्य लागत",
        "Analyze Market Price": "बाजार मूल्य का विश्लेषण करें",
        "AI RECOMMENDED PRICE": "AI अनुशंसित मूल्य",
        "Based on estimated market demand, production costs and competitive pricing.": "अनुमानित बाजार मांग, उत्पादन लागत और प्रतिस्पर्धी मूल्य निर्धारण पर आधारित।",
        "AI Confidence": "AI विश्वसनीयता",
        "STEP 04": "चरण 04",
        "Market Linkage": "बाजार जुड़ाव",
        "Discover potential markets for your products.": "अपने उत्पादों के लिए संभावित बाजारों की खोज करें।",
        "AI MARKET MATCH": "AI बाजार मिलान",
        "We found 24 potential buyers for your products.": "हमें आपके उत्पादों के लिए 24 संभावित खरीदार मिले हैं।",
        "B2B DIRECT SOURCING": "B2B प्रत्यक्ष स्रोत",
        "Verified Artisan Clusters": "सत्यापित कारीगर क्लस्टर",
        "Request Custom Bulk Quote →": "अनुकूलित थोक मूल्य का अनुरोध करें →",
        "Contact Cooperative & Order": "कारीगर सहकारी समिति से संपर्क करें",
        "OUR IMPACT": "हमारा प्रभाव",
        "From local craftsmanship to global opportunity.": "स्थानीय शिल्प कौशल से वैश्विक अवसर तक।",
        "KarigarAI reduces the digital barrier for marginalized artisans and helps them access continuous, year-round markets.": "कारीगरAI कारीगरों के लिए डिजिटल बाधा को कम करता है और उन्हें वर्ष भर निरंतर बाजारों तक पहुंचने में मदद करता है।",
        "Days of Market Access": "बाजार पहुंच के दिन",
        "Digital Reach Potential": "डिजिटल पहुंच क्षमता",
        "AI Business Assistance": "AI व्यापार सहायता",
        "AI-driven market linkage for artisans.": "कारीगरों के लिए AI-संचालित बाजार जुड़ाव।",
        "Built for Smart India Hackathon": "स्मार्ट इंडिया हैकथॉन के लिए निर्मित"
    },
    ta: {
        "KarigarAI": "காரிகர்AI",
        "Smart Business for Artisans": "கைவினைஞர்களுக்கான ஸ்மார்ட் வணிகம்",
        "Artisan": "கைவினைஞர்",
        "Seller": "விற்பனையாளர்",
        "Buyer": "வாங்குபவர்",
        "Retailer": "சில்லறை விற்பனையாளர்",
        "AI-POWERED BUSINESS MANAGER": "AI-இயங்கும் வணிக மேலாளர்",
        "HANDMADE MARKETPLACE": "கைவினை சந்தை",
        "Turn your craft into a digital business.": "உங்கள் கைவினையை டிஜிட்டல் வணிகமாக மாற்றுங்கள்.",
        "Turn your craft": "உங்கள் கைவினையை",
        "into a digital business.": "டிஜிட்டல் வணிகமாக மாற்றுங்கள்.",
        "Create professional product listings, discover competitive prices and reach buyers across India — with the power of AI.": "தொழில்முறை தயாரிப்பு பட்டியல்களை உருவாக்குங்கள், சிறந்த விலைகளைக் கண்டறியுங்கள் மற்றும் இந்தியா முழுவதும் உள்ள வாங்குபவர்களை சென்றடையுங்கள் — AI ஆற்றலுடன்.",
        "Discover authentic handmade crafts from skilled artisans across India with transparent pricing and direct ordering.": "வெளிப்படையான விலை மற்றும் நேரடி ஆர்டருடன் இந்தியா முழுவதிலும் உள்ள திறமையான கைவினைஞர்களிடமிருந்து உண்மையான கைவினைப் பொருட்களைக் கண்டறியவும்.",
        "Add New Product": "புதிய தயாரிப்பைச் சேர்",
        "Explore Available Products": "கிடைக்கும் தயாரிப்புகளை ஆராயுங்கள்",
        "AI Catalog": "AI பட்டியல்",
        "Generated": "உருவாக்கப்பட்டது",
        "Smart Price": "ஸ்மார்ட் விலை",
        "Products Listed": "பட்டியலிடப்பட்ட தயாரிப்புகள்",
        "Potential Sales": "சாத்தியமான விற்பனை",
        "Buyer Views": "வாங்குபவர் பார்வைகள்",
        "Product Rating": "தயாரிப்பு மதிப்பீடு",
        "YOUR AI ASSISTANT": "உங்கள் AI உதவியாளர்",
        "What would you like to do?": "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
        "AI Image Studio": "AI பட அரங்கம் (ஸ்டுடியோ)",
        "Turn ordinary product photos into professional e-commerce images.": "சாதாரண தயாரிப்பு புகைப்படங்களை தொழில்முறை இ-காமர்ஸ் படங்களாக மாற்றுங்கள்.",
        "Background Removal · Lighting · Crop": "பின்னணி நீக்கம் · வெளிச்சம் · வெட்டுதல்",
        "Smart Catalog": "ஸ்மார்ட் பட்டியல்",
        "Describe your product in your regional language and let AI do the rest.": "உங்கள் தயாரிப்பை உங்கள் தாய்மொழியில் விவரியுங்கள், மீதியை AI செய்யும்.",
        "Voice · Translation · SEO": "குரல் · மொழிபெயர்ப்பு · SEO",
        "Dynamic Pricing": "டைனமிக் விலை நிர்ணயம்",
        "Get an AI-powered competitive price based on costs and market trends.": "செலவுகள் மற்றும் சந்தை போக்குகளின் அடிப்படையில் AI-இயங்கும் போட்டி விலையைப் பெறுங்கள்.",
        "Market · Cost · Demand": "சந்தை · செலவு · தேவை",
        "Market Link": "சந்தை இணைப்பு",
        "Connect your products with buyers, retailers and larger markets.": "உங்கள் தயாரிப்புகளை வாங்குபவர்கள், சில்லறை விற்பனையாளர்கள் மற்றும் பெரிய சந்தைகளுடன் இணைக்கவும்.",
        "B2B · Buyers · Government": "B2B · வாங்குபவர்கள் · அரசு",
        "YOUR INVENTORY": "உங்கள் இருப்பு",
        "My Products": "என் தயாரிப்புகள்",
        "AUTHENTIC CATALOG": "உண்மையான பட்டியல்",
        "Available Handmade Crafts": "கிடைக்கும் கைவினை பொருட்கள்",
        "View All →": "அனைத்தையும் காண்க →",
        "Traditional Bamboo Basket": "பாரம்பரிய மூங்கில் கூடை",
        "Handcrafted · Eco-friendly": "கைவினை · சூழல் நட்பு",
        "Handwoven Cotton Saree": "கைத்தறி பருத்தி சேலை",
        "Traditional · Handwoven": "பாரம்பரிய · கைத்தறி",
        "Terracotta Pot": "சுடுமண் பானை",
        "Handmade · Traditional": "கைவினை · பாரம்பரியம்",
        "Handcrafted Brass Diya Lamp": "பித்தளை தீப விளக்கு",
        "Jaipur Blue Pottery Vase": "ஜெய்ப்பூர் நீல மட்பாண்ட பூந்தொட்டி",
        "Cane Handcrafted Fruit Tray": "பிரம்பு பழ தட்டு",
        "Order Now 🛍": "இப்போது ஆர்டர் செய்க 🛍",
        "All Crafts": "அனைத்து கைவினைகளும்",
        "STEP 01": "படி 01",
        "Make your product photo ready for online selling.": "உங்கள் தயாரிப்பு புகைப்படத்தை ஆன்லைன் விற்பனைக்கு தயார் செய்யுங்கள்.",
        "Upload Product Photo": "தயாரிப்பு புகைப்படத்தை பதிவேற்றவும்",
        "Take a photo or choose one from your device": "புகைப்படம் எடுக்கவும் அல்லது சாதனத்திலிருந்து தேர்வு செய்யவும்",
        "Choose Photo": "புகைப்படத்தை தேர்வு செய்",
        "AI Enhancement": "AI மேம்பாடு",
        "Background Removal": "பின்னணி நீக்கம்",
        "Remove unwanted surroundings": "தேவையற்ற பின்னணியை நீக்குங்கள்",
        "Lighting Correction": "வெளிச்ச திருத்தம்",
        "Improve brightness and clarity": "பிரகாசம் மற்றும் தெளிவை மேம்படுத்துங்கள்",
        "E-commerce Format": "இ-காமர்ஸ் வடிவம்",
        "Optimize image dimensions": "பட பரிமாணங்களை உகந்ததாக்குங்கள்",
        "Enhance with AI": "AI மூலம் மேம்படுத்துங்கள்",
        "STEP 02": "படி 02",
        "Multilingual Auto-Cataloger": "பன்மொழி தானியங்கி பட்டியல்",
        "Tell us about your product. AI will create the listing.": "உங்கள் தயாரிப்பு பற்றி சொல்லுங்கள். AI பட்டியலை உருவாக்கும்.",
        "Product Name": "தயாரிப்பு பெயர்",
        "Describe your product": "உங்கள் தயாரிப்பை விவரியுங்கள்",
        "Input Language": "உள்ளீட்டு மொழி",
        "Generate AI Catalog": "AI பட்டியலை உருவாக்கு",
        "AI GENERATED": "AI உருவாக்கியது",
        "ENGLISH": "ஆங்கிலம்",
        "हिन्दी": "இந்தி",
        "SEO KEYWORDS": "SEO முக்கிய வார்த்தைகள்",
        "STEP 03": "படி 03",
        "Dynamic Pricing Assistant": "டைனமிக் விலை உதவியாளர்",
        "Get a competitive price recommendation.": "போட்டி விலை பரிந்துரையைப் பெறுங்கள்.",
        "Raw Material Cost": "மூலப்பொருள் செலவு",
        "Crafting / Labour Cost": "கைவினை / உழைப்பு செலவு",
        "Other Costs": "இதர செலவுகள்",
        "Analyze Market Price": "சந்தை விலையை பகுப்பாய்வு செய்",
        "AI RECOMMENDED PRICE": "AI பரிந்துரைத்த விலை",
        "Based on estimated market demand, production costs and competitive pricing.": "மதிப்பிடப்பட்ட சந்தை தேவை, உற்பத்தி செலவுகள் மற்றும் போட்டி விலையின் அடிப்படையில்.",
        "AI Confidence": "AI நம்பிக்கை",
        "STEP 04": "படி 04",
        "Market Linkage": "சந்தை இணைப்பு",
        "Discover potential markets for your products.": "உங்கள் தயாரிப்புகளுக்கான சாத்தியமான சந்தைகளைக் கண்டறியுங்கள்.",
        "AI MARKET MATCH": "AI சந்தை பொருத்தம்",
        "We found 24 potential buyers for your products.": "உங்கள் தயாரிப்புகளுக்கு 24 சாத்தியமான வாங்குபவர்களை நாங்கள் கண்டறிந்துள்ளோம்.",
        "B2B DIRECT SOURCING": "B2B நேரடி ஆதாரம்",
        "Verified Artisan Clusters": "சரிபார்க்கப்பட்ட கைவினைஞர் கிளஸ்டர்கள்",
        "Request Custom Bulk Quote →": "மொத்த விலையைக் கோருங்கள் →",
        "Contact Cooperative & Order": "கூட்டுறவு அமைப்பைத் தொடர்புகொண்டு ஆர்டர் செய்யுங்கள்",
        "OUR IMPACT": "எங்கள் தாக்கம்",
        "From local craftsmanship to global opportunity.": "உள்ளூர் கைவினைத்திறனிலிருந்து உலகளாவிய வாய்ப்பிற்கு.",
        "KarigarAI reduces the digital barrier for marginalized artisans and helps them access continuous, year-round markets.": "காரிகர்AI கைவினைஞர்களுக்கான டிஜிட்டல் தடையைக் குறைத்து, ஆண்டு முழுவதும் தொடர்ச்சியான சந்தைகளை அணுக உதவுகிறது.",
        "Days of Market Access": "சந்தை அணுகல் நாட்கள்",
        "Digital Reach Potential": "டிஜிட்டல் சென்றடையும் திறன்",
        "AI Business Assistance": "AI வணிக உதவி",
        "AI-driven market linkage for artisans.": "கைவினைஞர்களுக்கான AI-இயங்கும் சந்தை இணைப்பு.",
        "Built for Smart India Hackathon": "ஸ்மார்ட் இந்தியா ஹேக்கத்தானுக்காக உருவாக்கப்பட்டது"
    }
};

// Cache manager
const i18nCache = {
    hi: Object.assign({}, UI_DICTIONARY.hi),
    ta: Object.assign({}, UI_DICTIONARY.ta)
};

try {
    const savedHi = localStorage.getItem("karigar_i18n_hi");
    if (savedHi) Object.assign(i18nCache.hi, JSON.parse(savedHi));
    const savedTa = localStorage.getItem("karigar_i18n_ta");
    if (savedTa) Object.assign(i18nCache.ta, JSON.parse(savedTa));
    const savedUser = localStorage.getItem("karigar_user");
    if (savedUser) currentUser = JSON.parse(savedUser);
} catch (e) {
    console.warn("localStorage init error:", e);
}


/* ================= USER AUTH & ROLE MANAGEMENT ================= */

let selectedRoleInModal = "seller";
let otpSent = false;

function openAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) {
        modal.classList.remove("hidden");
        selectRole(currentUser.role || "seller");
    }
}

function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) modal.classList.add("hidden");
}

function selectRole(role) {
    selectedRoleInModal = role;
    const sellerCard = document.getElementById("roleCardSeller");
    const buyerCard = document.getElementById("roleCardBuyer");
    const submitBtn = document.getElementById("authSubmitBtn");
    const nameInput = document.getElementById("authUserName");
    const aadhaarContainer = document.getElementById("authAadhaarContainer");

    if (role === "seller") {
        if (sellerCard) sellerCard.classList.add("active");
        if (buyerCard) buyerCard.classList.remove("active");
        if (submitBtn) submitBtn.innerText = "✦ Enter KarigarAI as Seller";
        if (nameInput && (!nameInput.value || nameInput.value.includes("Buyer") || nameInput.value.includes("Retailer"))) {
            nameInput.value = "Ramesh Kumar (Artisan)";
        }
        if (aadhaarContainer) aadhaarContainer.style.display = "block"; // Show Aadhaar for seller
    } else {
        if (buyerCard) buyerCard.classList.add("active");
        if (sellerCard) sellerCard.classList.remove("active");
        if (submitBtn) submitBtn.innerText = "🛍 Enter KarigarAI as Buyer";
        if (nameInput && (!nameInput.value || nameInput.value.includes("Artisan") || nameInput.value.includes("Seller"))) {
            nameInput.value = "Priya Sharma (Craft Boutique Buyer)";
        }
        if (aadhaarContainer) aadhaarContainer.style.display = "none"; // Hide Aadhaar for buyer
    }
}

function sendOtp() {
    const contact = document.getElementById("authUserContact").value;
    if (!contact) {
        alert("Please enter your mobile number first.");
        return;
    }
    otpSent = true;
    const otpBox = document.getElementById("otpContainer");
    if (otpBox) otpBox.classList.remove("hidden");
    alert("OTP sent successfully to " + contact + "! (Demo OTP: 123456)");
}

function quickLogin(role) {
    selectRole(role);
    const nameInput = document.getElementById("authUserName");
    const contactInput = document.getElementById("authUserContact");

    if (role === "seller") {
        nameInput.value = "Ramesh Kumar (Artisan)";
        contactInput.value = "+91 98765 43210";
    } else {
        nameInput.value = "Priya Sharma (Craft Boutique Buyer)";
        contactInput.value = "+91 91234 56789";
    }

    applyUserLogin(role, nameInput.value, contactInput.value);
    closeAuthModal();
}

function handleAuthSubmit(event) {
    event.preventDefault();
    
    // If logging in as seller, verify OTP
    if (selectedRoleInModal === "seller") {
        const otpInput = document.getElementById("otpInput");
        const enteredOtp = otpInput ? otpInput.value.trim() : "";
        if (!otpSent || enteredOtp !== "123456") {
            alert("Please verify your mobile number with OTP first. (Demo OTP is 123456)");
            return;
        }
    }

    const nameInput = document.getElementById("authUserName");
    const contactInput = document.getElementById("authUserContact");

    const name = nameInput ? nameInput.value.trim() : "User";
    const contact = contactInput ? contactInput.value.trim() : "";

    applyUserLogin(selectedRoleInModal, name, contact);
    closeAuthModal();
}

function applyUserLogin(role, name, contact) {
    currentUser = { role, name, contact };
    try {
        localStorage.setItem("karigar_user", JSON.stringify(currentUser));
    } catch (e) {}

    updateUIRole();

    const roleName = role === "seller" ? "Artisan / Seller" : "Buyer / Retailer";
    alert(
        `Welcome, ${name}!\n\n` +
        `Logged in as ${roleName}.\n` +
        (role === "seller" 
            ? "Your AI Creator Studio, Pricing & Auto-Cataloger are ready." 
            : "Available artisan products and direct maker orders are ready.")
    );
}

function updateUIRole() {
    const isSeller = currentUser.role === "seller";
    const avatar = document.getElementById("headerAvatar");
    const userName = document.getElementById("headerUserName");
    const roleBadge = document.getElementById("headerRoleBadge");
    const notifText = document.getElementById("roleNotifText");
    const notifIcon = document.getElementById("notifIcon");
    const heroBadge = document.getElementById("heroBadge");
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const heroBtn = document.getElementById("heroActionBtn");
    const heroCardOne = document.getElementById("heroCardOne");
    const heroCardTwo = document.getElementById("heroCardTwo");
    const inventoryEyebrow = document.getElementById("inventoryEyebrow");
    const inventoryTitle = document.getElementById("inventoryTitle");

    // Header Profile Elements
    if (avatar) avatar.innerText = isSeller ? "A" : "B";
    if (userName) userName.innerText = isSeller ? "Artisan" : "Retailer";
    if (roleBadge) {
        roleBadge.innerText = isSeller ? "Seller" : "Buyer";
        roleBadge.style.color = isSeller ? "#8b6528" : "#2f6f4e";
    }

    // Role Notification Bar
    if (notifIcon) notifIcon.innerText = isSeller ? "✦" : "🛍";
    if (notifText) {
        notifText.innerHTML = isSeller
            ? `Logged in as <strong>${currentUser.name} (Seller Mode)</strong>. AI creator studio, dynamic pricing, and cataloger are active.`
            : `Logged in as <strong>${currentUser.name} (Buyer Mode)</strong>. Showing available handmade crafts and direct artisan order options.`;
    }

    // Hero Section Content
    if (heroBadge) {
        heroBadge.innerHTML = isSeller
            ? `<span>✦</span> AI-POWERED BUSINESS MANAGER`
            : `<span>🛍</span> HANDMADE MARKETPLACE`;
    }

    if (heroTitle) {
        heroTitle.innerHTML = isSeller
            ? `Turn your craft<br>into a <span>digital business.</span>`
            : `Discover authentic crafts<br><span>directly from Indian artisans.</span>`;
    }

    if (heroSubtitle) {
        heroSubtitle.innerText = isSeller
            ? `Create professional product listings, discover competitive prices and reach buyers across India — with the power of AI.`
            : `Discover authentic handmade crafts from skilled artisans across India with transparent pricing and direct ordering.`;
    }

    if (heroBtn) {
        heroBtn.innerHTML = isSeller
            ? `<span>＋</span> Add New Product`
            : `<span>🛍</span> Explore Available Products`;
    }

    if (heroCardOne) {
        heroCardOne.innerHTML = isSeller
            ? `<span>✦</span> AI Catalog<strong>Generated</strong>`
            : `<span>✦</span> Verified<strong>500+ Makers</strong>`;
    }

    if (heroCardTwo) {
        heroCardTwo.innerHTML = isSeller
            ? `<span>₹</span> Smart Price<strong>₹1,250</strong>`
            : `<span>🤝</span> Direct<strong>0% Commission</strong>`;
    }

    // Section Titles
    if (inventoryEyebrow) inventoryEyebrow.innerText = isSeller ? "YOUR INVENTORY" : "AUTHENTIC CATALOG";
    if (inventoryTitle) inventoryTitle.innerText = isSeller ? "My Products" : "Available Handmade Crafts";

    // Toggle SELLER-ONLY elements
    document.querySelectorAll(".seller-only").forEach(el => {
        if (isSeller) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });

    // Toggle BUYER-ONLY elements
    document.querySelectorAll(".buyer-only").forEach(el => {
        if (!isSeller) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });

    // If switching to buyer, close all open seller workspaces
    if (!isSeller) {
        hideAllWorkspaces();
    } else {
        checkSellerNotifications();
    }
}

function handleHeroAction() {
    if (currentUser.role === "seller") {
        openStudio();
    } else {
        const prodSec = document.getElementById("buyerFilterSection") || document.getElementById("productsSection");
        if (prodSec) {
            prodSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
}


/* ================= BUYER SOURCING & ORDERING ================= */

function setCategoryFilter(category, buttonElement) {
    activeCategoryFilter = category;
    document.querySelectorAll(".category-pills .pill").forEach(p => p.classList.remove("active"));
    if (buttonElement) buttonElement.classList.add("active");
    filterBuyerProducts();
}

function filterBuyerProducts() {
    const searchVal = (document.getElementById("buyerSearchInput")?.value || "").toLowerCase().trim();
    const cards = document.querySelectorAll("#productsGrid .product-card");

    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category") || "";
        const cardName = (card.getAttribute("data-name") || "").toLowerCase();

        const matchesCategory = activeCategoryFilter === "all" || cardCategory === activeCategoryFilter;
        const matchesSearch = !searchVal || cardName.includes(searchVal) || cardCategory.includes(searchVal);

        if (matchesCategory && matchesSearch) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function orderProduct(name, price) {
    const modal = document.getElementById("orderModal");
    const nameInput = document.getElementById("orderProductName");
    const priceInput = document.getElementById("orderProductPrice");
    const qtyInput = document.getElementById("orderQuantity");

    if (nameInput) nameInput.value = name;
    if (priceInput) priceInput.value = price;
    if (qtyInput) qtyInput.value = "1";

    if (modal) modal.classList.remove("hidden");
}

function closeOrderModal() {
    const modal = document.getElementById("orderModal");
    if (modal) modal.classList.add("hidden");
}

function handleOrderSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("orderProductName")?.value || "Craft Item";
    const price = document.getElementById("orderProductPrice")?.value || "";
    const qty = document.getElementById("orderQuantity")?.value || "1";
    const address = document.getElementById("orderAddress")?.value || "";

    // Close the order input modal
    closeOrderModal();

    // Save order for the seller dashboard
    const newOrder = {
        item: name,
        quantity: qty,
        totalPrice: price,
        shippingAddress: address,
        date: new Date().toLocaleDateString()
    };

    try {
        let existingOrders = JSON.parse(localStorage.getItem("karigar_seller_orders") || "[]");
        existingOrders.unshift(newOrder);
        localStorage.setItem("karigar_seller_orders", JSON.stringify(existingOrders));
        localStorage.setItem("karigar_new_order_alert", "true");
    } catch (e) {
        console.warn("Storage error:", e);
    }

    // Populate data into the visual Artisan Details Modal
    const summaryName = document.getElementById("summaryItemName");
    const summaryQty = document.getElementById("summaryItemQty");
    const summaryPrice = document.getElementById("summaryItemPrice");
    const summaryAddress = document.getElementById("summaryShippingAddress");

    if (summaryName) summaryName.innerText = name;
    if (summaryQty) summaryQty.innerText = qty;
    if (summaryPrice) summaryPrice.innerText = price + " each";
    if (summaryAddress) summaryAddress.innerText = address;

    // Show the Artisan Details Modal
    const artisanModal = document.getElementById("artisanDetailsModal");
    if (artisanModal) {
        artisanModal.classList.remove("hidden");
    }
}

function closeArtisanDetailsModal() {
    const artisanModal = document.getElementById("artisanDetailsModal");
    if (artisanModal) {
        artisanModal.classList.add("hidden");
    }
}


/* ================= SELLER DASHBOARD LIVE ORDERS ================= */

function renderSellerDashboardOrders() {
    const container = document.getElementById("liveOrderCardContainer");
    if (!container) return;

    let orders = [];
    try {
        orders = JSON.parse(localStorage.getItem("karigar_seller_orders") || "[]");
    } catch (e) {}

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="buyer-filter-card" style="text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 16px;">No pending customer orders right now. New orders placed by buyers will appear here live!</p>
            </div>
        `;
        return;
    }

    const latest = orders[0];
    const buyerName = currentUser.name.includes("Artisan") ? "Priya Sharma (Retailer)" : currentUser.name;

    container.innerHTML = `
        <div class="live-order-card">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2e5a36; padding-bottom: 15px; margin-bottom: 15px;">
                <h3 style="margin: 0; color: #2e5a36; font-size: 20px; display: flex; align-items: center; gap: 8px;">
                    📦 Live Customer Order Details
                </h3>
                <span style="background: #fef3c7; color: #d97706; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: bold;">
                    ⏳ Pending Confirmation
                </span>
            </div>

            <p style="color: #475569; margin-bottom: 20px;">
                Review the buyer's delivery information and click below to confirm processing for the customer:
            </p>

            <div class="order-details-grid">
                <div class="order-detail-item">📦 <strong>Product:</strong> ${latest.item}</div>
                <div class="order-detail-item">📊 <strong>Quantity:</strong> ${latest.quantity}</div>
                <div class="order-detail-item">💰 <strong>Total Price:</strong> ${latest.totalPrice}</div>
                <div class="order-detail-item">👤 <strong>Buyer Name:</strong> ${buyerName}</div>
                <div class="order-detail-item">📞 <strong>Contact Phone:</strong> +91 91234 56789</div>
                <div class="order-detail-item">📍 <strong>Shipping Address:</strong> ${latest.shippingAddress}</div>
            </div>

            <button onclick="markOrderAsProcessing()" class="primary-btn full" style="background: #ea580c; color: white; padding: 14px; font-size: 16px; border-radius: 10px; margin-top: 10px; border: none; cursor: pointer; font-weight: bold;">
                📦 Mark As Processing
            </button>
        </div>
    `;
}

function markOrderAsProcessing() {
    alert("✅ Order marked as Processing! The artisan cluster has been instructed to package and dispatch.");
    try {
        localStorage.removeItem("karigar_seller_orders");
    } catch (e) {}
    renderSellerDashboardOrders();
}

function scrollToLiveOrders() {
    const section = document.getElementById("sellerDashboardSection");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const notifBar = document.getElementById("sellerNotificationBar");
    if (notifBar) notifBar.classList.add("hidden");
}

function checkSellerNotifications() {
    if (currentUser.role === "seller") {
        renderSellerDashboardOrders();
        const hasNewOrder = localStorage.getItem("karigar_new_order_alert");
        const notifBar = document.getElementById("sellerNotificationBar");
        
        if (hasNewOrder === "true" && notifBar) {
            notifBar.classList.remove("hidden");
        }
    }
}

function requestBulkQuote() {
    alert(
        "📦 B2B Bulk Sourcing Request Initiated!\n\n" +
        "We have forwarded your wholesale inquiry to the Artisan Craft Cluster Coordinator.\n" +
        "You will receive customized bulk pricing and sample dispatch details within 24 hours."
    );
}

function contactArtisan(clusterName) {
    alert(
        `✦ Connected to ${clusterName}!\n\n` +
        `Direct maker connection established.\n` +
        `You can now chat, discuss custom dimensions, and place wholesale craft orders.`
    );
}


/* ================= WORKSPACE SHOW/HIDE (SELLER) ================= */

function hideAllWorkspaces() {
    document
        .querySelectorAll(".workspace")
        .forEach(section => {
            section.classList.add("hidden");
        });
}

function openWorkspace(id) {
    if (currentUser.role !== "seller") {
        alert("Please switch to Seller Mode to use AI creator tools.");
        openAuthModal();
        return;
    }

    hideAllWorkspaces();

    const section =
        document.getElementById(id);

    if (section) {
        section.classList.remove("hidden");

        setTimeout(() => {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    }
}

function closeWorkspace() {
    hideAllWorkspaces();
}


/* ================= QUICK ACTIONS ================= */

function openStudio() {
    openWorkspace("studio");
}

function openCatalog() {
    openWorkspace("catalog");
}

function openPricing() {
    openWorkspace("pricing");
}

function openMarket() {
    openWorkspace("market");
}


/* ================= IMAGE PREVIEW ================= */

function previewImage(event) {
    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function(e) {
        const preview =
            document.getElementById("preview");
        const message =
            document.getElementById("uploadMessage");

        originalPreviewSrc = e.target.result;
        currentProcessedImage = originalPreviewSrc;

        preview.src = e.target.result;
        preview.classList.remove("hidden");
        message.classList.add("hidden");
    };

    reader.readAsDataURL(file);
}


/* ================= REAL CLIENT-SIDE AI IMAGE PROCESSING ================= */

function loadImageElement(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error("Image load error: " + err));
        img.src = src;
    });
}

function applyBackgroundRemoval(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const w = imageElement.naturalWidth || imageElement.width || 600;
    const h = imageElement.naturalHeight || imageElement.height || 600;

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(imageElement, 0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let sampleR = 0, sampleG = 0, sampleB = 0, count = 0;
    const stepX = Math.max(1, Math.floor(w / 30));
    const stepY = Math.max(1, Math.floor(h / 30));

    for (let x = 0; x < w; x += stepX) {
        let idx = (0 * w + x) * 4;
        sampleR += data[idx]; sampleG += data[idx+1]; sampleB += data[idx+2]; count++;
        idx = ((h - 1) * w + x) * 4;
        sampleR += data[idx]; sampleG += data[idx+1]; sampleB += data[idx+2]; count++;
    }

    for (let y = 0; y < h; y += stepY) {
        let idx = (y * w + 0) * 4;
        sampleR += data[idx]; sampleG += data[idx+1]; sampleB += data[idx+2]; count++;
        idx = (y * w + (w - 1)) * 4;
        sampleR += data[idx]; sampleG += data[idx+1]; sampleB += data[idx+2]; count++;
    }

    const bgR = sampleR / count;
    const bgG = sampleG / count;
    const bgB = sampleB / count;

    const strictThreshold = 30;
    const featherThreshold = 60;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        const dist = Math.sqrt(
            Math.pow(r - bgR, 2) +
            Math.pow(g - bgG, 2) +
            Math.pow(b - bgB, 2)
        );

        if (dist < strictThreshold) {
            data[i+3] = 0;
        } else if (dist < featherThreshold) {
            const alphaFactor = (dist - strictThreshold) / (featherThreshold - strictThreshold);
            data[i+3] = Math.round(data[i+3] * alphaFactor);
        }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/png");
}

function applyLightingCorrection(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const w = imageElement.naturalWidth || imageElement.width || 600;
    const h = imageElement.naturalHeight || imageElement.height || 600;

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(imageElement, 0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let minR = 255, minG = 255, minB = 255;
    let maxR = 0, maxG = 0, maxB = 0;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 20) {
            if (data[i] < minR) minR = data[i];
            if (data[i] > maxR) maxR = data[i];
            if (data[i + 1] < minG) minG = data[i + 1];
            if (data[i + 1] > maxG) maxG = data[i + 1];
            if (data[i + 2] < minB) minB = data[i + 2];
            if (data[i + 2] > maxB) maxB = data[i + 2];
        }
    }

    const rangeR = Math.max(1, maxR - minR);
    const rangeG = Math.max(1, maxG - minG);
    const rangeB = Math.max(1, maxB - minB);

    const contrastFactor = 1.16;
    const brightnessOffset = 14;
    const vibranceFactor = 1.15;

    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue;

        let r = ((data[i] - minR) / rangeR) * 255;
        let g = ((data[i + 1] - minG) / rangeG) * 255;
        let b = ((data[i + 2] - minB) / rangeB) * 255;

        r = (r - 128) * contrastFactor + 128 + brightnessOffset;
        g = (g - 128) * contrastFactor + 128 + brightnessOffset;
        b = (b - 128) * contrastFactor + 128 + brightnessOffset;

        const avg = (r + g + b) / 3;
        const maxChan = Math.max(r, g, b);
        const satAmt = ((maxChan - avg) / 255) * vibranceFactor;
        r += (r - avg) * satAmt;
        g += (g - avg) * satAmt;
        b += (b - avg) * satAmt;

        data[i] = Math.min(255, Math.max(0, Math.round(r)));
        data[i + 1] = Math.min(255, Math.max(0, Math.round(g)));
        data[i + 2] = Math.min(255, Math.max(0, Math.round(b)));
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/png");
}

function applyEcommerceFormat(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const targetSize = 1000;

    canvas.width = targetSize;
    canvas.height = targetSize;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetSize, targetSize);

    const origW = imageElement.naturalWidth || imageElement.width || 600;
    const origH = imageElement.naturalHeight || imageElement.height || 600;

    const maxContentSize = targetSize * 0.84;
    const scale = Math.min(maxContentSize / origW, maxContentSize / origH);

    const drawW = origW * scale;
    const drawH = origH * scale;
    const drawX = (targetSize - drawW) / 2;
    const drawY = (targetSize - drawH) / 2;

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;
    ctx.drawImage(imageElement, drawX, drawY, drawW, drawH);
    ctx.restore();

    return canvas.toDataURL("image/png");
}

async function enhanceImage() {
    const preview = document.getElementById("preview");

    if (preview.classList.contains("hidden") || !preview.src) {
        alert("Please upload a product image first.");
        return;
    }

    const button = document.querySelector("#studio .primary-btn");
    button.innerText = "✦ AI Enhancing...";
    button.disabled = true;

    const bgToggle = document.getElementById("bgRemovalToggle") || document.querySelectorAll("#studio .switch input")[0];
    const lightToggle = document.getElementById("lightingToggle") || document.querySelectorAll("#studio .switch input")[1];
    const ecomToggle = document.getElementById("ecommerceToggle") || document.querySelectorAll("#studio .switch input")[2];

    const doBgRemoval = bgToggle ? bgToggle.checked : true;
    const doLighting = lightToggle ? lightToggle.checked : true;
    const doEcommerce = ecomToggle ? ecomToggle.checked : true;

    const completedSteps = [];

    try {
        let currentSrc = originalPreviewSrc || preview.src;
        let imgElem = await loadImageElement(currentSrc);

        if (doBgRemoval) {
            currentSrc = applyBackgroundRemoval(imgElem);
            imgElem = await loadImageElement(currentSrc);
            completedSteps.push("✓ Background removed");
        }

        if (doLighting) {
            currentSrc = applyLightingCorrection(imgElem);
            imgElem = await loadImageElement(currentSrc);
            completedSteps.push("✓ Lighting corrected");
        }

        if (doEcommerce) {
            currentSrc = applyEcommerceFormat(imgElem);
            completedSteps.push("✓ E-commerce format optimized (1000×1000)");
        }

        preview.src = currentSrc;
        currentProcessedImage = currentSrc;

        button.innerText = "✓ AI Enhancement Complete";
        button.disabled = false;

        const summary = completedSteps.length > 0
            ? completedSteps.join("\n")
            : "No enhancements selected.";

        setTimeout(() => {
            alert(`AI enhancement completed!\n\n${summary}`);
        }, 150);

    } catch (err) {
        console.error("AI enhancement error:", err);
        button.innerText = "✦ Enhance with AI";
        button.disabled = false;
        alert("AI enhancement notice: Partial processing applied. Your original image is preserved.");
    }
}


/* ================= REAL CLIENT-SIDE TRANSLATION PIPELINE ================= */

async function translateTextClientSide(text, targetLang, sourceLang = "auto") {
    if (!text || !text.trim()) return text;
    const clean = text.trim();
    const tLang = (targetLang || "en").split("-")[0];
    const sLang = (sourceLang || "en").split("-")[0];

    if (tLang === sLang) return clean;

    if (i18nCache[tLang] && i18nCache[tLang][clean]) {
        return i18nCache[tLang][clean];
    }

    if (tLang === "en") {
        for (const langKey of ["hi", "ta"]) {
            const dict = i18nCache[langKey] || {};
            for (const [enKey, val] of Object.entries(dict)) {
                if (val === clean) return enKey;
            }
        }
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=${sLang}|${tLang}`;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            const data = await res.json();
            const translated = data?.responseData?.translatedText;
            if (translated && !translated.toLowerCase().includes("warning")) {
                if (!i18nCache[tLang]) i18nCache[tLang] = {};
                i18nCache[tLang][clean] = translated;
                return translated;
            }
        }
    } catch (e) {
        console.warn("Client translation lookup note:", e);
    }

    return clean;
}


/* ================= VOICE INPUT (WEB SPEECH API) ================= */

function startVoice() {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    const inputLangElem = document.getElementById("inputLanguage");
    const selectedInputLang = inputLangElem ? inputLangElem.value : "ta-IN";

    recognition.lang = selectedInputLang;
    recognition.interimResults = false;
    recognition.continuous = false;

    const button = document.querySelector(".mic-btn");
    const translatingIndicator = document.getElementById("voiceTranslatingState");

    button.innerText = "●";

    recognition.start();

    recognition.onresult = async function(event) {
        const transcript = event.results[0][0].transcript;

        document.getElementById("productDescription").value = transcript;
        button.innerText = "🎙";

        if (translatingIndicator) translatingIndicator.classList.remove("hidden");

        try {
            const [enTranslation, hiTranslation] = await Promise.all([
                translateTextClientSide(transcript, "en", selectedInputLang),
                translateTextClientSide(transcript, "hi", selectedInputLang)
            ]);

            voiceTranslationData = {
                original: transcript,
                english: enTranslation || transcript,
                hindi: hiTranslation || transcript
            };
        } catch (e) {
            console.warn("Voice translation pipeline note:", e);
        } finally {
            if (translatingIndicator) translatingIndicator.classList.add("hidden");
        }
    };

    recognition.onerror = function() {
        button.innerText = "🎙";
        if (translatingIndicator) translatingIndicator.classList.add("hidden");
        alert("Voice input could not be detected. Please try again.");
    };

    recognition.onend = function() {
        button.innerText = "🎙";
    };
}


/* ================= AI MULTILINGUAL CATALOGER ================= */

async function generateCatalog() {
    const nameInput = document.getElementById("productName");
    const descInput = document.getElementById("productDescription");
    const inputLangElem = document.getElementById("inputLanguage");

    const name = nameInput ? nameInput.value.trim() : "";
    const description = descInput ? descInput.value.trim() : "";
    const selectedInputLang = inputLangElem ? inputLangElem.value : "en-IN";

    if (!name) {
        alert("Please enter or describe your product.");
        return;
    }

    const result = document.getElementById("catalogResult");
    const resultName = document.getElementById("resultName");
    const english = document.getElementById("englishDescription");
    const hindi = document.getElementById("hindiDescription");
    const keywords = document.getElementById("keywordTags");

    resultName.innerText = name;

    let enName = name;
    let hiName = name;
    let enDesc = description;
    let hiDesc = description;

    if (voiceTranslationData && voiceTranslationData.original === description && voiceTranslationData.english) {
        enDesc = voiceTranslationData.english;
        hiDesc = voiceTranslationData.hindi;
    } else if (description || name) {
        try {
            const [tEnName, tHiName, tEnDesc, tHiDesc] = await Promise.all([
                translateTextClientSide(name, "en", selectedInputLang),
                translateTextClientSide(name, "hi", selectedInputLang),
                translateTextClientSide(description, "en", selectedInputLang),
                translateTextClientSide(description, "hi", selectedInputLang)
            ]);
            enName = tEnName || name;
            hiName = tHiName || name;
            enDesc = tEnDesc || description;
            hiDesc = tHiDesc || description;
        } catch (err) {
            console.warn("Catalog translation fallback:", err);
        }
    }

    english.innerText =
        `Discover our beautifully handcrafted ${enName}, ` +
        `created by skilled Indian artisans using traditional ` +
        `craftsmanship. ${enDesc || "Each piece is carefully made with attention to detail, making it unique and authentic."} ` +
        `Perfect for customers who value traditional craftsmanship, ` +
        `quality and sustainable handmade products.`;

    hindi.innerText =
        `यह सुंदर हस्तनिर्मित ${hiName} ` +
        `कुशल भारतीय कारीगरों द्वारा पारंपरिक शिल्प कौशल से बनाया गया है। ` +
        `${hiDesc || "हर उत्पाद को विशेष ध्यान और मेहनत से तैयार किया गया है।"} ` +
        `यह उन ग्राहकों के लिए एक शानदार विकल्प है जो पारंपरिक कला और हस्तनिर्मित उत्पादों को पसंद करते हैं।`;

    keywords.innerHTML = "";

    const baseKeywords = ["Handmade", "Indian Craft", "Traditional", "Artisan Made", "Eco Friendly", "Handcrafted", "Made in India"];
    const lowerName = name.toLowerCase();

    if (lowerName.includes("bamboo") || lowerName.includes("basket") || lowerName.includes("बांस") || lowerName.includes("கூடை")) {
        baseKeywords.unshift("Bamboo Craft", "Natural Fiber");
    } else if (lowerName.includes("saree") || lowerName.includes("silk") || lowerName.includes("cotton") || lowerName.includes("साड़ी") || lowerName.includes("சேலை")) {
        baseKeywords.unshift("Handloom Saree", "Traditional Weaving");
    } else if (lowerName.includes("pot") || lowerName.includes("terracotta") || lowerName.includes("clay") || lowerName.includes("मिट्टी") || lowerName.includes("பானை")) {
        baseKeywords.unshift("Terracotta Art", "Clay Pottery");
    }

    baseKeywords.forEach(keyword => {
        const tag = document.createElement("span");
        tag.innerText = keyword;
        keywords.appendChild(tag);
    });

    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ================= DYNAMIC PRICING ================= */

function calculatePrice() {
    const material =
        Number(
            document.getElementById(
                "materialCost"
            ).value
        ) || 0;

    const labour =
        Number(
            document.getElementById(
                "labourCost"
            ).value
        ) || 0;

    const other =
        Number(
            document.getElementById(
                "otherCost"
            ).value
        ) || 0;

    const totalCost =
        material +
        labour +
        other;

    const marketMultiplier = 1.35;

    const recommended =
        Math.round(
            totalCost *
            marketMultiplier
        );

    document.getElementById(
        "recommendedPrice"
    ).innerText =
        "₹" +
        recommended.toLocaleString("en-IN");

    const range =
        document.querySelectorAll(
            ".price-range strong"
        );

    const low =
        Math.round(
            recommended * .85
        );

    const high =
        Math.round(
            recommended * 1.17
        );

    if (range.length >= 3) {
        range[0].innerText =
            "₹" +
            low.toLocaleString("en-IN");

        range[1].innerText =
            "₹" +
            recommended.toLocaleString("en-IN");

        range[2].innerText =
            "₹" +
            high.toLocaleString("en-IN");
    }

    alert(
        "AI Market Analysis Complete!\n\n" +
        "Production Cost: ₹" +
        totalCost.toLocaleString("en-IN") +
        "\nRecommended Price: ₹" +
        recommended.toLocaleString("en-IN")
    );
}


/* ================= FULL-PAGE UI TRANSLATION ================= */

function collectTranslatableTextNodes() {
    const containers = [
        document.querySelector("header"),
        document.querySelector("main"),
        document.querySelector("footer"),
        document.getElementById("authModal"),
        document.getElementById("orderModal"),
        document.getElementById("artisanDetailsModal")
    ].filter(Boolean);

    const nodes = [];

    function walk(elem) {
        if (!elem) return;

        const tagName = elem.tagName ? elem.tagName.toLowerCase() : "";
        if (["script", "style", "textarea", "input", "select", "svg", "canvas"].includes(tagName)) {
            return;
        }

        for (let child = elem.firstChild; child; child = child.nextSibling) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.nodeValue.trim();
                const isNumericOrSymbol = /^[\d\s₹.,★%+\-×/()·–—✦♢↗🏪🛒🏛🌎🎙📷✎◉⇄🛍🔍🎋🧵🏺🪔]+$/.test(text);
                if (text.length > 1 && !isNumericOrSymbol) {
                    nodes.push(child);
                    if (!originalDomTexts.has(child)) {
                        originalDomTexts.set(child, child.nodeValue);
                    }
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                walk(child);
            }
        }
    }

    containers.forEach(container => walk(container));
    return nodes;
}

async function translateFullPage(targetLang) {
    if (domTextNodes.length === 0) {
        domTextNodes = collectTranslatableTextNodes();
    }

    if (targetLang === "en") {
        domTextNodes.forEach(node => {
            if (originalDomTexts.has(node)) {
                node.nodeValue = originalDomTexts.get(node);
            }
        });
        return;
    }

    const targetDict = i18nCache[targetLang] || {};

    for (const node of domTextNodes) {
        const origRaw = originalDomTexts.get(node) || node.nodeValue;
        const origTrimmed = origRaw.trim();

        if (targetDict[origTrimmed]) {
            const leading = origRaw.match(/^\s*/)[0];
            const trailing = origRaw.match(/\s*$/)[0];
            node.nodeValue = leading + targetDict[origTrimmed] + trailing;
        } else {
            translateTextClientSide(origTrimmed, targetLang, "en").then(translated => {
                if (translated && translated !== origTrimmed) {
                    const leading = origRaw.match(/^\s*/)[0];
                    const trailing = origRaw.match(/\s*$/)[0];
                    node.nodeValue = leading + translated + trailing;
                }
            });
        }
    }
}

const languageSelectElem = document.getElementById("languageSelect");
if (languageSelectElem) {
    languageSelectElem.addEventListener("change", async function() {
        const language = this.value;

        try {
            await translateFullPage(language);
        } catch (err) {
            if (language === "ta") {
                alert("தமிழ் மொழி ஆதரவு தேர்ந்தெடுக்கப்பட்டது.");
            } else if (language === "hi") {
                alert("हिन्दी भाषा समर्थन चुना गया है।");
            }
        }
    });
}


/* ================= INITIALIZATION & EVENT LISTENERS ================= */

document.addEventListener("DOMContentLoaded", () => {
    updateUIRole();
});

// Close modals when clicking outside
window.addEventListener("click", function(event) {
    const authModal = document.getElementById("authModal");
    const orderModal = document.getElementById("orderModal");
    const artisanModal = document.getElementById("artisanDetailsModal");
    if (event.target === authModal) closeAuthModal();
    if (event.target === orderModal) closeOrderModal();
    if (event.target === artisanModal) closeArtisanDetailsModal();
});

// Publish Product Button Handler
document.addEventListener(
    "click",
    function(event) {
        if (
            event.target.innerText ===
            "Publish Product"
        ) {
            alert(
                "🎉 Product Published Successfully!\n\n" +
                "Your product is now ready to be discovered by potential buyers."
            );
        }
    }
);