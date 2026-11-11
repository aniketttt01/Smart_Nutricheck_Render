import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const content = {
  en: {
    tag: '💡 Education & Awareness',
    title: 'Understanding',
    titleAccent: 'Malnutrition',
    sub: 'Knowledge is the first step to action. Learn the facts, signs, and solutions to child malnutrition.',
    globalImpact: '🌍 Global Impact',
    typesTitle: '📂 Types of Malnutrition',
    warningTitle: '🚨 Warning Signs',
    preventionTitle: '✅ Prevention & Treatment',
    foodTitle: '🥗 Foods That Help Children Recover',
    ctaTitle: 'Have Questions? Ask Our AI Medical Expert',
    ctaSub: 'Use the chat button in the bottom-right corner to ask our AI medical expert anything about malnutrition, nutrition, or child health.',
    online: 'AI Expert Online',
  },
  hi: {
    tag: '💡 शिक्षा और जागरूकता',
    title: 'समझें',
    titleAccent: 'कुपोषण',
    sub: 'जानकारी ही कार्रवाई की पहली सीढ़ी है। बच्चों के कुपोषण के तथ्य, संकेत और समाधान जाणें।',
    globalImpact: '🌍 वैश्विक परिणाम',
    typesTitle: '📂 कुपोषण के प्रकार',
    warningTitle: '🚨 चेतावनी के संकेत',
    preventionTitle: '✅ रोकथाम और उपचार',
    foodTitle: '🥗 वे खाद्य पदार्थ जो बच्चे को स्वस्थ बनने में मदद करते हैं',
    ctaTitle: 'कोई प्रश्न है? हमारे AI मेडिकल एक्सपर्ट से पूछें',
    ctaSub: 'नीचे दाईं ओर दिए गए चैट बटन का उपयोग करके कुपोषण, पोषण किंवा बाल स्वास्थ्य के बारे में AI विशेषज्ञ से पूछें।',
    online: 'AI विशेषज्ञ ऑनलाइन',
  },
  mr: {
    tag: '💡 शिक्षण आणि जागरूकता',
    title: 'समजून घ्या',
    titleAccent: 'कुपोषण',
    sub: 'माहिती ही कृतीची पहिली पायरी आहे. बाल कुपोषणाची तथ्ये, लक्षणे आणि उपाय जाणून घ्या.',
    globalImpact: '🌍 जागतिक परिणाम',
    typesTitle: '📂 कुपोषणाचे प्रकार',
    warningTitle: '🚨 इशारतीची लक्षणे',
    preventionTitle: '✅ प्रतिबंध आणि उपचार',
    foodTitle: '🥗 मुलांना बरे होण्यास मदत करणारे अन्नपदार्थ',
    ctaTitle: 'प्रश्न आहेत? आमच्या AI मेडिकल तज्ञाला विचारा',
    ctaSub: 'कुपोषण, पोषण किंवा बाल आरोग्याबद्दल खालच्या उजव्या कोपऱ्यातील चॅट बटणाद्वारे AI तज्ञाला विचारा.',
    online: 'AI तज्ञ ऑनलाइन',
  },
}

const globalStats = [
  { icon: '👶', num: '149M', label: { en: 'children stunted globally', hi: 'दुनिया भर में बौनेपन से प्रभावित बच्चे', mr: 'जगभरातील खुंटलेली वाढ असलेली मुले' }, color: '#00c3e3', src: 'WHO 2023' },
  { icon: '⚡', num: '45M', label: { en: 'children wasted (acute)', hi: 'तीव्र कुपोषण से प्रभावित बच्चे', mr: 'तीव्र कुपोषण असलेली मुले' }, color: '#f97316', src: 'UNICEF 2023' },
  { icon: '💀', num: '3.1M', label: { en: 'child deaths linked to malnutrition/yr', hi: 'प्रति वर्ष कुपोषण से जुड़ी बाल मृत्यु', mr: 'दरवर्षी कुपोषणाशी संबंधित बालमृत्यू' }, color: '#ef4444', src: 'WHO' },
  { icon: '🌍', num: '1 in 3', label: { en: 'children malnourished worldwide', hi: 'दुनिया भर में हर 3 में से 1 बच्चा कुपोषित', mr: 'जगभरात 3 पैकी 1 मूल कुपोषित' }, color: '#fbbf24', src: 'UNICEF' },
]

const types = [
  {
    icon: '📉',
    title: { en: 'Stunting', hi: 'बौना विकास', mr: 'उंची वाढ खुंटणे' },
    desc: {
      en: 'Low height-for-age due to chronic malnutrition. Affects long-term cognitive development and future earning potential.',
      hi: 'दीर्घकालिक कुपोषण के कारण उम्र के हिसाब से कम लंबाई। यह मानसिक विकास और भविष्य की क्षमता को प्रभावित करता है।',
      mr: 'दीर्घकालीन कुपोषणामुळे वयानुसार कमी उंची. याचा मेंदू विकास आणि भविष्यातील क्षमतेवर परिणाम होतो.',
    },
    tag: { en: 'Chronic', hi: 'दीर्घकालिक', mr: 'दीर्घकालीन' },
    color: '#00c3e3',
  },
  {
    icon: '🪶',
    title: { en: 'Wasting', hi: 'दुबलापन', mr: 'कृशता' },
    desc: {
      en: 'Low weight-for-height. A sign of acute malnutrition — children can deteriorate rapidly and face a higher risk of death.',
      hi: 'लंबाई के हिसाब से कम वजन। यह तीव्र कुपोषण का संकेत है।',
      mr: 'उंचीच्या तुलनेत कमी वजन. हे तीव्र कुपोषणाचे लक्षण आहे.',
    },
    tag: { en: 'Acute', hi: 'तीव्र', mr: 'तीव्र' },
    color: '#f97316',
  },
  {
    icon: '⚖️',
    title: { en: 'Underweight', hi: 'कम वजन', mr: 'कमी वजन' },
    desc: {
      en: 'Low weight-for-age. Can reflect both stunting and wasting — often used as a composite indicator.',
      hi: 'उम्र के हिसाब से कम वजन। यह बौनेपन और दुबलापन दोनों को दर्शा सकता है।',
      mr: 'वयानुसार कमी वजन. हे खुंटलेली वाढ आणि कृशता दोन्ही दर्शवू शकते.',
    },
    tag: { en: 'Composite', hi: 'संयुक्त', mr: 'संयुक्त' },
    color: '#fbbf24',
  },
  {
    icon: '💊',
    title: { en: 'Micronutrient Deficiency', hi: 'सूक्ष्म पोषक तत्वों की कमी', mr: 'सूक्ष्मपोषक घटकांची कमतरता' },
    desc: {
      en: 'Lack of essential vitamins & minerals (iron, vitamin A, iodine). Called "hidden hunger" — often no visible symptoms.',
      hi: 'आवश्यक विटामिन और खनिजों की कमी। इसे "छिपी हुई भूख" भी कहा जाता है।',
      mr: 'आवश्यक जीवनसत्त्वे आणि खनिजांची कमतरता. याला "लपलेली भूक" म्हणतात.',
    },
    tag: { en: 'Hidden', hi: 'छिपी', mr: 'लपलेली' },
    color: '#7c3aed',
  },
]

const warningSigns = {
  en: [
    '🔴 Visible weight loss or swollen limbs/abdomen',
    '🔴 Growth that is noticeably below average',
    '🔴 Persistent fatigue, apathy, or irritability',
    '🔴 Pale or dry skin, brittle hair and nails',
    '🔴 Slow healing of wounds and frequent illness',
    '🔴 Delayed development of motor/cognitive skills',
  ],
  hi: [
    '🔴 स्पष्ट वजन घटना या हाथ-पैर/पेट में सूजन',
    '🔴 वृद्धि का सामान्य से बहुत कम होना',
    '🔴 लगातार थकान, उदासीनता या चिड़चिड़ापन',
    '🔴 पीली या रूखी त्वचा, टूटते बाल और नाखून',
    '🔴 घावों का धीरे भरना और बार-बार बीमारी',
    '🔴 मोटर/मानसिक विकास में देरी',
  ],
  mr: [
    '🔴 स्पष्ट वजन घटणे किंवा हातपाय/पोट सुजणे',
    '🔴 वाढ सरासरीपेक्षा कमी दिसणे',
    '🔴 सतत थकवा, उदासीनता किंवा चिडचिड',
    '🔴 फिकट किंवा कोरडी त्वचा, ठिसूळ केस व नखे',
    '🔴 घावा हळू भरून येणे आणि वारंवार आजार',
    '🔴 मोटर/बौद्धिक विकासात उशीर',
  ],
}

const prevention = {
  en: [
    { icon: '🤱', title: 'Exclusive Breastfeeding', desc: 'For the first 6 months — provides all essential nutrients.' },
    { icon: '🥦', title: 'Diverse, Nutritious Diet', desc: 'Include proteins, vegetables, fruits, and fortified foods.' },
    { icon: '🏥', title: 'Regular Health Check-ups', desc: 'Growth monitoring and early detection saves lives.' },
    { icon: '💧', title: 'Clean Water & Sanitation', desc: 'Prevents diarrheal diseases that worsen malnutrition.' },
    { icon: '💉', title: 'Immunization', desc: 'Reduces infection burden that depletes nutritional stores.' },
    { icon: '📚', title: 'Parental Education', desc: 'Awareness about feeding practices is critical for prevention.' },
  ],
  hi: [
    { icon: '🤱', title: 'केवल स्तनपान', desc: 'पहले 6 महीनों तक — सभी आवश्यक पोषक तत्व देता है।' },
    { icon: '🥦', title: 'विविध और पौष्टिक आहार', desc: 'प्रोटीन, सब्ज़ियाँ, फल और फोर्टिफाइड भोजन शामिल करें।' },
    { icon: '🏥', title: 'नियमित स्वास्थ्य जाँच', desc: 'वृद्धि की निगरानी और समय पर पहचान जीवन बचाती है।' },
    { icon: '💧', title: 'स्वच्छ पानी और स्वच्छता', desc: 'दस्त जैसी बीमारियों से बचाव करता है।' },
    { icon: '💉', title: 'टीकाकरण', desc: 'संक्रमण का बोझ कम करता है।' },
    { icon: '📚', title: 'अभिभावक शिक्षा', desc: 'भोजन संबंधी जानकारी रोकथाम के लिए जरूरी है।' },
  ],
  mr: [
    { icon: '🤱', title: 'फक्त स्तनपान', desc: 'पहिल्या 6 महिन्यांसाठी — सर्व आवश्यक पोषक घटक मिळतात.' },
    { icon: '🥦', title: 'विविध आणि पौष्टिक आहार', desc: 'प्रथिने, भाज्या, फळे आणि फोर्टिफाइड अन्न द्या.' },
    { icon: '🏥', title: 'नियमित आरोग्य तपासणी', desc: 'वाढीचे निरीक्षण आणि लवकर ओळख जीवन वाचवू शकते.' },
    { icon: '💧', title: 'स्वच्छ पाणी आणि स्वच्छता', desc: 'जुलाबासारखे आजार टाळते.' },
    { icon: '💉', title: 'लसीकरण', desc: 'संक्रमणाचा भार कमी करते.' },
    { icon: '📚', title: 'पालक शिक्षण', desc: 'आहार पद्धतींबद्दल जागरूकता अत्यंत महत्त्वाची आहे.' },
  ],
}

const foods = [
  {
    name: { en: 'Banana', hi: 'केला', mr: 'केळे' },
    desc: {
      en: 'Easy to digest and gives quick energy.',
      hi: 'पचाने में आसान और तुरंत ऊर्जा देता है।',
      mr: 'पचायला सोपे आणि झटपट ऊर्जा देते.',
    },
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: { en: 'Milk', hi: 'दूध', mr: 'दूध' },
    desc: {
      en: 'Helps bone growth, protein intake, and recovery.',
      hi: 'हड्डियों की वृद्धि और ताकत में मदद करता है।',
      mr: 'हाडांची वाढ, प्रथिने आणि रिकव्हरीस मदत करते.',
    },
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: { en: 'Eggs', hi: 'अंडे', mr: 'अंडी' },
    desc: {
      en: 'Rich in protein for muscle and tissue repair.',
      hi: 'मांसपेशियों और ऊतकों की मरम्मत के लिए प्रोटीन से भरपूर।',
      mr: 'स्नायू आणि ऊतक दुरुस्तीसाठी प्रथिनांनी समृद्ध.',
    },
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: { en: 'Dal / Lentils', hi: 'दाल', mr: 'डाळ' },
    desc: {
      en: 'Affordable protein source that supports growth.',
      hi: 'सस्ता प्रोटीन स्रोत जो वृद्धि में मदद करता है।',
      mr: 'कमी किमतीचे प्रथिन स्रोत, वाढीसाठी उपयुक्त.',
    },
    image: 'https://images.unsplash.com/photo-1708436477916-f97964f3ccf1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Curd / Yogurt', hi: 'दही', mr: 'दही' },
    desc: {
      en: 'Good for digestion and gut health.',
      hi: 'पाचन और आंतों के स्वास्थ्य के लिए अच्छा।',
      mr: 'पचन आणि पोटाच्या आरोग्यासाठी चांगले.',
    },
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?q=80&w=382&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Peanuts', hi: 'मूंगफली', mr: 'शेंगदाणे' },
    desc: {
      en: 'Dense in calories and healthy fats for weight gain.',
      hi: 'वजन बढ़ाने के लिए कैलोरी और स्वस्थ वसा से भरपूर।',
      mr: 'वजन वाढीसाठी कॅलरी आणि निरोगी स्निग्ध पदार्थांनी समृद्ध.',
    },
    image: 'https://images.unsplash.com/photo-1596503799872-5c5f052c27b9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Rice & Wheat', hi: 'चावल और गेहूं', mr: 'भातआणि गव्हार' },
    desc: {
      en: 'Staple grains providing carbohydrates and energy for rural areas.',
      hi: 'मुख्य अनाज जो ग्रामीण क्षेत्रों में कार्बोहाइड्रेट और ऊर्जा देता है।',
      mr: 'मुख्य धान्य जे ग्रामीण भागात कार्बोहायड्रेट आणि ऊर्जा देतात.',
    },
    image: 'https://plus.unsplash.com/premium_photo-1675814316651-3ce3c6409922?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Sweet Potato', hi: 'शकरकंद', mr: 'साखरे परणाले' },
    desc: {
      en: 'Rich in vitamins and affordable carbohydrate source.',
      hi: 'विटामिन में समृद्ध और सस्ता कार्बोहाइड्रेट स्रोत।',
      mr: 'जीवनसत्त्वांनी समृद्ध आणि किफायती कार्बोहायड्रेट स्रोत.',
    },
    image: 'https://images.unsplash.com/photo-1730815048561-45df6f7f331d?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Local Green Vegetables', hi: 'स्थानीय हरी सब्जियां', mr: 'स्थानिक हिरव्या भाज्या' },
    desc: {
      en: 'Spinach, mustard greens provide iron and minerals.',
      hi: 'पालक, सरसों का साग लोहा और खनिज देते हैं।',
      mr: 'पालक आणि सरसोंचा साग लोह आणि खनिज देतात.',
    },
    image: 'https://images.unsplash.com/photo-1720720406887-79b2d0420cb1?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Fish', hi: 'मछली', mr: 'मासे' },
    desc: {
      en: 'Excellent protein and omega-3 fatty acids for brain development.',
      hi: 'मस्तिष्क विकास के लिए उत्कृष्ट प्रोटीन और ओमेगा-3 फैटी एसिड।',
      mr: 'मेंदूच्या विकासासाठी उत्तम प्रथिन आणि ओमेगा-3 फॅटी ऍसिड.',
    },
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Beans & Pulses', hi: 'सेम और दालें', mr: 'सिमला मिरची आणि डाळ' },
    desc: {
      en: 'Budget-friendly protein source with fiber.',
      hi: 'फाइबर के साथ किफायती प्रोटीन स्रोत।',
      mr: 'फायबर सह किफायती प्रथिन स्रोत.',
    },
    image: 'https://plus.unsplash.com/premium_photo-1664007711002-69f7fbe493ef?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: { en: 'Jaggery (Gur)', hi: 'गुड़', mr: 'गुळ' },
    desc: {
      en: 'Natural sweetener with iron, energy booster for rural children.',
      hi: 'लोहे के साथ प्राकृतिक मिठास, ग्रामीण बच्चों के लिए ऊर्जा बूस्टर।',
      mr: 'लोहे सह नैसर्गिक मिठाई, ग्रामीण मुलांसाठी ऊर्जा बूस्टर.',
    },
    image: 'https://media.istockphoto.com/id/1446501276/photo/indian-palm-jaggery-or-gur-in-a-white-bowl-isolated-on-a-palm-leaf-in-vertical-orientation.webp?a=1&b=1&s=612x612&w=0&k=20&c=8Qpg3-lHqwkih3G8fBgCvkLsE7AubgCM0goQ0cl5rVk=',
  },
]

export default function Awareness() {
  const { language } = useLanguage()
  const t = content[language] || content.en

  return (
    <motion.div
      key="awareness"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      style={{ padding: '48px 40px 80px', minHeight: '100vh' }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="section-tag">{t.tag}</span>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '2.2rem', fontWeight: 800, margin: '12px 0 8px' }}>
          {t.title} <span className="gradient-text">{t.titleAccent}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 48, maxWidth: 600 }}>
          {t.sub}
        </p>
      </motion.div>

      <section style={{ marginBottom: 60 }}>
        <motion.h2 className="section-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t.globalImpact}
        </motion.h2>
        <motion.div className="aw-stats-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {globalStats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-card aw-stat-card" whileHover={{ y: -5, borderColor: s.color }}>
              <div className="aw-stat-icon" style={{ background: `${s.color}18` }}>{s.icon}</div>
              <div className="aw-stat-num" style={{ color: s.color }}>{s.num}</div>
              <div className="aw-stat-label">{s.label[language] || s.label.en}</div>
              <div className="aw-stat-src">Source: {s.src}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section style={{ marginBottom: 60 }}>
        <motion.h2 className="section-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t.typesTitle}
        </motion.h2>
        <motion.div className="types-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {types.map((tItem, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="glass-card type-card"
              whileHover={{ y: -5 }}
              style={{ borderTop: `3px solid ${tItem.color}` }}
            >
              <div className="type-icon">{tItem.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>{tItem.title[language] || tItem.title.en}</h3>
                <span className="type-tag" style={{ background: `${tItem.color}22`, color: tItem.color }}>
                  {tItem.tag[language] || tItem.tag.en}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {tItem.desc[language] || tItem.desc.en}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section style={{ marginBottom: 60 }}>
        <motion.h2 className="section-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t.warningTitle}
        </motion.h2>
        <div className="glass-card" style={{ padding: 32 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(warningSigns[language] || warningSigns.en).map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <div className="warn-prev-grid">
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: 32 }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24, color: 'var(--accent-green)' }}>
            {t.preventionTitle}
          </h2>
          <div className="prev-grid">
            {(prevention[language] || prevention.en).map((p, i) => (
              <motion.div
                key={i}
                className="prev-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ background: 'rgba(0, 245, 160, 0.06)' }}
              >
                <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass-card"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ padding: 32 }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 24, color: '#fbbf24' }}>
            {t.foodTitle}
          </h2>
          <div className="food-grid">
            {foods.map((food, i) => (
              <motion.div
                key={i}
                className="food-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <img src={food.image} alt={food.name[language] || food.name.en} className="food-image" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: 12 }}>
                  {food.name[language] || food.name.en}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 6 }}>
                  {food.desc[language] || food.desc.en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="glass-card cta-block"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginTop: 48 }}
      >
        <div className="cta-glow" />
        <span style={{ fontSize: '3rem' }}>💬</span>
        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700, margin: '16px 0 10px' }}>
          {t.ctaTitle}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 500, textAlign: 'center', lineHeight: 1.7 }}>
          {t.ctaSub}
        </p>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse-dot-green" />
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }}>{t.online}</span>
        </div>
      </motion.div>

      <style>{`
        .section-heading {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
        }
        .aw-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .aw-stat-card {
          padding: 28px 20px;
          text-align: center;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .aw-stat-icon {
          width: 52px; height: 52px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 14px;
        }
        .aw-stat-num { font-size: 2rem; font-weight: 800; font-family: 'Outfit', sans-serif; margin-bottom: 6px; }
        .aw-stat-label { font-size: 0.83rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4; }
        .aw-stat-src { font-size: 0.7rem; color: var(--text-muted); }
        .types-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .type-card { padding: 28px 22px; }
        .type-icon { font-size: 2rem; margin-bottom: 14px; }
        .type-tag {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          letter-spacing: 0.5px;
        }
        .warn-prev-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .prev-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .prev-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px;
          border-radius: var(--radius-sm);
          transition: background 0.2s;
          cursor: default;
        }
        .food-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .food-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          padding: 12px;
        }
        .food-image {
          width: 100%;
          height: 130px;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }
        .cta-block {
          padding: 48px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .cta-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(0, 245, 160, 0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .pulse-dot-green {
          width: 10px; height: 10px;
          background: var(--accent-green);
          border-radius: 50%;
          animation: pulse-glow 1.5s infinite;
        }
        @media (max-width: 1100px) {
          .aw-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .types-grid { grid-template-columns: repeat(2, 1fr); }
          .food-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .warn-prev-grid { grid-template-columns: 1fr; }
          .prev-grid { grid-template-columns: 1fr; }
          .aw-stats-grid { grid-template-columns: 1fr 1fr; }
          .food-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </motion.div>
  )
}
