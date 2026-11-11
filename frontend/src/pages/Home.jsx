import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import HumanModel3D from '../components/HumanModel3D'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
}

const staticStatsData = [
    { value: '1000+', label: { en: 'Children Images Tested for Model', hi: 'मॉडल के लिए परीक्षण किई गई बाल छवियां', mr: 'मॉडलसाठी तपासलेल्या बाल प्रतिमा' }, icon: '👶', color: '#00f5a0' },
    { value: '97%', label: { en: 'Model Accuracy', hi: 'मॉडल सटीकता', mr: 'मॉडल अचूकता' }, icon: '🎯', color: '#00c3e3' },
    { value: 'Real-time', label: { en: 'Analysis Engine', hi: 'विश्लेषण इंजन', mr: 'विश्लेषण इंजिन' }, icon: '⚡', color: '#7c3aed' },
    { value: '3-in-1', label: { en: 'BMI + AI + PDF Report', hi: 'BMI + AI + PDF रिपोर्ट', mr: 'BMI + AI + PDF अहवाल' }, icon: '📊', color: '#fbbf24' },
]

const content = {
    en: {
        tag: '🌍 Malnutrition Care Initiative',
        title1: 'AI-Powered',
        title2: 'Malnutrition',
        title3: 'Detection',
        sub: 'Empowering NGOs with intelligent child nutrition assessment tools to fight malnutrition — powered by MobileNetV2 deep learning.',
        startBtn: '🔬 Start Screening',
        learnBtn: '💡 Learn More',
        modelLabel: 'Interactive 3D — Drag to Rotate',
        howWorks: 'How It Works',
        accurateResults: 'Accurate Results',
        step1: 'Upload Photo',
        step1Desc: 'Take or upload a child photograph for AI visual analysis.',
        step2: 'Enter Measurements',
        step2Desc: 'Provide height, weight, and age for BMI calculation.',
        step3: 'Get Report',
        step3Desc: 'Receive instant AI assessment with downloadable PDF report.',
    },
    hi: {
        tag: '🌍 कुपोषण देखभाल पहल',
        title1: 'कृत्रिम बुद्धिमत्ता',
        title2: 'कुपोषण',
        title3: 'पहचान',
        sub: 'NGOs को बाल पोषण आकलन उपकरण प्रदान करना जो कुपोषण से लड़ने में मदद करता है — MobileNetV2 गहन शिक्षा द्वारा संचालित।',
        startBtn: '🔬 स्क्रीनिंग शुरू करें',
        learnBtn: '💡 और जानें',
        modelLabel: 'इंटरैक्टिव 3D — खींचकर घुमाएं',
        howWorks: 'यह कैसे काम करता है',
        accurateResults: 'सटीक परिणाम',
        step1: 'फोटो अपलोड करें',
        step1Desc: 'बाल की तस्वीर लें या अपलोड करें AI दृश्य विश्लेषण के लिए।',
        step2: 'माप दर्ज करें',
        step2Desc: 'BMI गणना के लिए ऊंचाई, वजन और आयु प्रदान करें।',
        step3: 'रिपोर्ट प्राप्त करें',
        step3Desc: 'तत्काल AI मूल्यांकन प्राप्त करें डाउनलोड योग्य PDF रिपोर्ट के साथ।',
    },
    mr: {
        tag: '🌍 कुपोषण देखभाल योजना',
        title1: 'कृत्रिम',
        title2: 'कुपोषण',
        title3: 'शोध',
        sub: 'NGO यांना बाल पोषण मूल्यांकन साधने प्रदान करा जे कुपोषणाशी लढते — MobileNetV2 गहन शिक्षण द्वारे.',
        startBtn: '🔬 स्क्रिनिंग सुरू करा',
        learnBtn: '💡 अधिक जाणून घ्या',
        modelLabel: 'परस्पर 3D — ड्रॅग करून फिरवा',
        howWorks: 'हे कसे कार्य करते',
        accurateResults: 'अचूक परिणाम',
        step1: 'फोटो अपलोड करा',
        step1Desc: 'बाल फोटोग्राफ घ्या किंवा अपलोड करा AI व्हिजुअल विश्लेषणासाठी.',
        step2: 'मोजमाप प्रविष्ट करा',
        step2Desc: 'BMI गणनेसाठी उंची, वजन आणि वय प्रदान करा.',
        step3: 'अहवाल मिळवा',
        step3Desc: 'तत्काळ AI मूल्यांकन मिळवा डाउनलोड करण्यायोग्य PDF अहवालासह.',
    },
}

export default function Home() {
    const { language } = useLanguage()
    const t = content[language] || content.en
    const statsData = staticStatsData.map(s => ({ ...s, label: s.label[language] || s.label.en }))
    return (
        <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ minHeight: '100vh', padding: '0 0 60px 0' }}
        >
            {/* ═══ Hero ═══════════════════════════════════════════════ */}
            <section className="hero-section">
                {/* Background grid */}
                <div className="grid-bg" />
                <div className="hero-inner">
                    {/* Left: text */}
                    <motion.div
                        className="hero-text"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={fadeUp}>
                            <span className="section-tag">{t.tag}</span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="hero-title">
                            {t.title1}<br />
                            <span className="gradient-text">{t.title2}</span><br />
                            {t.title3}
                        </motion.h1>

                        <motion.p variants={fadeUp} className="hero-sub">
                            {t.sub}
                        </motion.p>

                        <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <Link to="/screening" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                {t.startBtn}
                            </Link>
                            <Link to="/awareness" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                {t.learnBtn}
                            </Link>
                        </motion.div>

                       
                    </motion.div>

                    {/* Right: 3D model */}
                    <motion.div
                        className="hero-3d"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="model-glow" />
                        <HumanModel3D status={null} />
                        <div className="model-label">
                            <span className="pulse-dot" />
                            {t.modelLabel}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ Stats ═══════════════════════════════════════════════ */}
            <section style={{ padding: '0 40px' }}>
                <motion.div
                    className="stats-grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {statsData.map((s, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="stat-card glass-card"
                            whileHover={{ y: -6, borderColor: s.color }}
                            style={{ '--stat-color': s.color }}
                        >
                            <span className="stat-icon">{s.icon}</span>
                            <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ═══ How it works ═════════════════════════════════════════ */}
            <section style={{ padding: '60px 40px 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 40 }}
                >
                    <span className="section-tag">{t.howWorks}</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginTop: 12 }}>
                        Three Steps to <span className="gradient-text">{t.accurateResults}</span>
                    </h2>
                </motion.div>

                <div className="steps-grid">
                    {[
                        { step: '01', icon: '📷', title: t.step1, desc: t.step1Desc },
                        { step: '02', icon: '📏', title: t.step2, desc: t.step2Desc },
                        { step: '03', icon: '📋', title: t.step3, desc: t.step3Desc },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            className="step-card glass-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="step-num">{s.step}</div>
                            <div className="step-icon">{s.icon}</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style>{`
        .hero-section {
          position: relative;
          padding: 60px 40px 40px;
          min-height: 540px;
          overflow: hidden;
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(0, 195, 227, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 195, 227, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          max-width: 1200px;
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 16px 0 20px;
        }
        .hero-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 500px;
        }
        .hero-3d {
          position: relative;
          height: 500px;
        }
        .model-glow {
          position: absolute;
          inset: 10%;
          background: radial-gradient(ellipse, rgba(0, 245, 160, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .model-label {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }
        .pulse-dot {
          width: 8px; height: 8px;
          background: var(--accent-green);
          border-radius: 50%;
          animation: pulse-glow 2s infinite;
        }
        .tech-badge {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stat-card {
          padding: 28px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .stat-icon { font-size: 1.8rem; }
        .stat-value { font-size: 1.8rem; font-weight: 800; font-family: 'Outfit', sans-serif; }
        .stat-label { font-size: 0.8rem; color: var(--text-secondary); font-weight: 500; }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .step-card {
          padding: 32px 24px;
          text-align: center;
          position: relative;
        }
        .step-num {
          position: absolute;
          top: 16px; right: 20px;
          font-size: 3rem;
          font-weight: 900;
          color: rgba(255,255,255,0.04);
          font-family: 'Outfit', sans-serif;
          line-height: 1;
        }
        .step-icon { font-size: 2.5rem; margin-bottom: 16px; display: block; }

        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-3d { height: 360px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </motion.div>
    )
}
