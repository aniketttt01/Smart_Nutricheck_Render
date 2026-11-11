import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext'
import HumanModel3D from '../components/HumanModel3D'

const API = 'http://localhost:8000'

const content = {
    en: {
        tag: '🔬 AI Assessment',
        title: 'New Child',
        titleAccent: 'Screening',
        sub: 'Upload a photo and enter measurements for AI-assisted nutrition analysis',
        infoTitle: 'Child Information',
        childName: 'Child Name',
        childNamePlaceholder: 'Enter full name',
        age: 'Age (years)',
        agePlaceholder: 'e.g. 5',
        height: 'Height (cm)',
        heightPlaceholder: 'e.g. 95',
        weight: 'Weight (kg)',
        weightPlaceholder: 'e.g. 12.5',
        photo: 'Child Photo',
        dropPlaceholder: 'Drop photo here',
        dropActive: 'Drop here!',
        dropHint: 'or click to browse',
        photoSelected: '✓ Photo selected — click to change',
        photoError: 'Please upload a child photo.',
        analyzeBtn: '🔬 Analyze Now',
        analyzing: 'Analyzing with AI...',
        model3DText: '3D model will update based on assessment result',
        analyzing3D: 'AI is analyzing...',
        processing: 'Processing image with MobileNetV2',
        nameLabel: '👤 Name',
        ageLabel: '🎂 Age',
        bmiLabel: '📊 BMI',
        confidenceLabel: '🤖 AI Confidence',
        yearsLabel: 'years',
        confidenceTitle: 'AI Confidence',
        aiNote: '⚠️ AI-based prediction — not a medical diagnosis. Please consult a healthcare professional.',
        downloadBtn: '📄 Download PDF Report',
    },
    hi: {
        tag: '🔬 AI मूल्यांकन',
        title: 'नया बाल',
        titleAccent: 'स्क्रीनिंग',
        sub: 'फोटो अपलोड करें और AI-सहायक पोषण विश्लेषण के लिए माप दर्ज करें',
        infoTitle: 'बाल जानकारी',
        childName: 'बाल का नाम',
        childNamePlaceholder: 'पूरा नाम दर्ज करें',
        age: 'आयु (वर्ष)',
        agePlaceholder: 'उदाहरण के लिए 5',
        height: 'ऊंचाई (सेमी)',
        heightPlaceholder: 'उदाहरण के लिए 95',
        weight: 'वजन (किग्रा)',
        weightPlaceholder: 'उदाहरण के लिए 12.5',
        photo: 'बाल फोटो',
        dropPlaceholder: 'फोटो यहां खींचें',
        dropActive: 'यहां खींचें!',
        dropHint: 'या ब्राउज़ करने के लिए क्लिक करें',
        photoSelected: '✓ फोटो चुनी गई — बदलने के लिए क्लिक करें',
        photoError: 'कृपया बाल की फोटो अपलोड करें।',
        analyzeBtn: '🔬 अभी विश्लेषण करें',
        analyzing: 'AI के साथ विश्लेषण चल रहा है...',
        model3DText: '3D मॉडल मूल्यांकन परिणाम के आधार पर अपडेट होगा',
        analyzing3D: 'AI विश्लेषण कर रहा है...',
        processing: 'MobileNetV2 के साथ छवि प्रसंस्करण',
        nameLabel: '👤 नाम',
        ageLabel: '🎂 आयु',
        bmiLabel: '📊 BMI',
        confidenceLabel: '🤖 AI आत्मविश्वास',
        yearsLabel: 'वर्ष',
        confidenceTitle: 'AI आत्मविश्वास',
        aiNote: '⚠️ AI-आधारित भविष्यवाणी — चिकित्सकीय निदान नहीं। कृपया स्वास्थ्य सेवा पेशेवर से परामर्श लें।',
        downloadBtn: '📄 PDF रिपोर्ट डाउनलोड करें',
    },
    mr: {
        tag: '🔬 AI मूल्यांकन',
        title: 'नवीन बाल',
        titleAccent: 'स्क्रिनिंग',
        sub: 'फोटो अपलोड करा आणि AI-सहाय्य पोषण विश्लेषणासाठी मोजमाप प्रविष्ट करा',
        infoTitle: 'बाल माहिती',
        childName: 'बालाचे नाव',
        childNamePlaceholder: 'पूर्ण नाव प्रविष्ट करा',
        age: 'वय (वर्षे)',
        agePlaceholder: 'उदा. 5',
        height: 'उंची (सेमी)',
        heightPlaceholder: 'उदा. 95',
        weight: 'वजन (किग्रा)',
        weightPlaceholder: 'उदा. 12.5',
        photo: 'बाल फोटो',
        dropPlaceholder: 'फोटो येथे ड्रॅग करा',
        dropActive: 'येथे ड्रॅग करा!',
        dropHint: 'किंवा ब्राउज करण्यासाठी क्लिक करा',
        photoSelected: '✓ फोटो निवडला — बदलण्यासाठी क्लिक करा',
        photoError: 'कृपया बालाचा फोटो अपलोड करा.',
        analyzeBtn: '🔬 आता विश्लेषण करा',
        analyzing: 'AI सह विश्लेषण चल रहे...',
        model3DText: '3D मॉडल मूल्यांकन परिणामाच्या आधारावर अपडेट होईल',
        analyzing3D: 'AI विश्लेषण करत आहे...',
        processing: 'MobileNetV2 सह प्रतिमा प्रक्रिया',
        nameLabel: '👤 नाव',
        ageLabel: '🎂 वय',
        bmiLabel: '📊 BMI',
        confidenceLabel: '🤖 AI आत्मविश्वास',
        yearsLabel: 'वर्षे',
        confidenceTitle: 'AI आत्मविश्वास',
        aiNote: '⚠️ AI-आधारित भविष्यवाणी — वैद्यकीय निदान नाही. कृपया स्वास्थ्य सेवा व्यावसायिकाशी सल्ला घ्या.',
        downloadBtn: '📄 PDF अहवाल डाउनलोड करा',
    },
}

export default function Screening() {
    const { language } = useLanguage()
    const t = content[language] || content.en
    const [form, setForm] = useState({ child_name: '', age: '', height: '', weight: '' })
    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    // Dropzone
    const onDrop = useCallback(accepted => {
        const file = accepted[0]
        if (!file) return
        setImageFile(file)
        setPreview(URL.createObjectURL(file))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
    })

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
        e.preventDefault()
        if (!imageFile) { setError(t.photoError); return }
        setError(null)
        setLoading(true)
        setResult(null)

        const data = new FormData()
        Object.entries(form).forEach(([k, v]) => data.append(k, v))
        data.append('child_image', imageFile)

        try {
            const res = await axios.post(`${API}/api/analyze`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setResult(res.data)
        } catch (err) {
            console.error('Analysis Error:', err)
            const errorMsg = err?.response?.data?.detail || err?.message || 'An error occurred during analysis. Make sure backend is running on http://localhost:8000'
            setError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadPDF = () => {
        if (!result) return
        const imgFilename = result.image_path?.split('/').pop() || ''
        const url = `${API}/api/download-pdf?name=${encodeURIComponent(result.name)}&age=${result.age}&bmi=${result.bmi}&confidence=${result.confidence}&final_status=${result.final_status}&image_filename=${imgFilename}`
        window.open(url, '_blank')
    }

    const statusColors = {
        Healthy: '#00f5a0',
        Risk: '#fbbf24',
        Malnourished: '#ef4444',
    }
    const statusIcons = { Healthy: '✅', Risk: '⚠️', Malnourished: '🚨' }

    return (
        <motion.div
            key="screening"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            style={{ padding: '48px 40px', minHeight: '100vh' }}
        >
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="section-tag">{t.tag}</span>
                <h1 style={{ fontFamily: 'Outfit', fontSize: '2.2rem', fontWeight: 800, margin: '12px 0 8px' }}>
                    {t.title} <span className="gradient-text">{t.titleAccent}</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 36 }}>
                    {t.sub}
                </p>
            </motion.div>

            <div className="screening-grid">
                {/* ── Form ──────────────────────────────────────────────── */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="glass-card screening-form"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 28, color: 'var(--accent-cyan)' }}>
                        {t.infoTitle}
                    </h2>

                    <div className="form-2col">
                        {/* Left column */}
                        <div>
                            {[
                                { name: 'child_name', label: t.childName, type: 'text', placeholder: t.childNamePlaceholder },
                                { name: 'age', label: t.age, type: 'number', placeholder: t.agePlaceholder },
                                { name: 'height', label: t.height, type: 'number', placeholder: t.heightPlaceholder },
                                { name: 'weight', label: t.weight, type: 'number', placeholder: t.weightPlaceholder },
                            ].map(f => (
                                <div className="form-group" key={f.name}>
                                    <label>{f.label}</label>
                                    <input
                                        type={f.type}
                                        name={f.name}
                                        value={form[f.name]}
                                        onChange={handleChange}
                                        placeholder={f.placeholder}
                                        required
                                        step={f.type === 'number' ? '0.1' : undefined}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right column — dropzone */}
                        <div>
                            <div className="form-group">
                                <label>{t.photo}</label>
                                <div
                                    {...getRootProps()}
                                    className={`dropzone ${isDragActive ? 'drag-active' : ''} ${preview ? 'has-preview' : ''}`}
                                >
                                    <input {...getInputProps()} />
                                    {preview ? (
                                        <div className="preview-wrap">
                                            <img src={preview} alt="Preview" className="img-preview" />
                                            <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--accent-green)' }}>
                                                {t.photoSelected}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="dropzone-inner">
                                            <span style={{ fontSize: '3rem' }}>📸</span>
                                            <p style={{ fontWeight: 600, margin: '12px 0 6px' }}>
                                                {isDragActive ? t.dropActive : t.dropPlaceholder}
                                            </p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.dropHint}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="error-box"
                        >
                            ❌ {error}
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        style={{ width: '100%', fontSize: '1rem', padding: '16px', marginTop: 8 }}
                    >
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                <span className="spinner" />
                                {t.analyzing}
                            </span>
                        ) : t.analyzeBtn}
                    </motion.button>
                </motion.form>

                {/* ── Results ─────────────────────────────────────────────── */}
                <div>
                    <AnimatePresence mode="wait">
                        {!result && !loading && (
                            <motion.div
                                key="placeholder"
                                className="glass-card model-placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div style={{ height: 400 }}>
                                    <HumanModel3D status={null} />
                                </div>
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', paddingBottom: 20 }}>
                                    {t.model3DText}
                                </p>
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div
                                key="loading"
                                className="glass-card model-placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 60 }}
                            >
                                <div className="analyzing-animation">
                                    <div className="scan-ring" />
                                    <div className="scan-ring" style={{ animationDelay: '-0.5s' }} />
                                    <div className="scan-ring" style={{ animationDelay: '-1s' }} />
                                    <span style={{ fontSize: '3rem' }}>🧠</span>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{t.analyzing3D}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.processing}</p>
                                </div>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                key="result"
                                className="glass-card result-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                                style={{ '--status-color': statusColors[result.final_status] || '#00c3e3' }}
                            >
                                {/* 3D model showing status */}
                                <div style={{ height: 280 }}>
                                    <HumanModel3D status={result.final_status} />
                                </div>

                                {/* Status Badge */}
                                <div style={{ textAlign: 'center', padding: '0 28px 4px' }}>
                                    <motion.div
                                        className="status-badge-big"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: 'spring' }}
                                        style={{ background: `${statusColors[result.final_status]}22`, border: `1px solid ${statusColors[result.final_status]}55`, color: statusColors[result.final_status] }}
                                    >
                                        {statusIcons[result.final_status]} {result.final_status}
                                    </motion.div>
                                </div>

                                {/* Child photo + info */}
                                <div className="result-info">
                                    {result.image_path && (
                                        <img src={`http://localhost:8000${result.image_path}`} alt="Child" className="result-photo" />
                                    )}
                                    <div className="result-details">
                                        <div className="info-row"><span>{t.nameLabel}</span><strong>{result.name}</strong></div>
                                        <div className="info-row"><span>{t.ageLabel}</span><strong>{result.age} {t.yearsLabel}</strong></div>
                                        <div className="info-row"><span>{t.bmiLabel}</span><strong style={{ color: statusColors[result.final_status] }}>{result.bmi}</strong></div>
                                        <div className="info-row"><span>{t.confidenceLabel}</span><strong style={{ color: statusColors[result.final_status] }}>{result.confidence}%</strong></div>
                                    </div>
                                </div>

                                {/* Confidence bar */}
                                <div style={{ padding: '0 28px 12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                        <span>{t.confidenceTitle}</span><span>{result.confidence}%</span>
                                    </div>
                                    <div className="conf-track">
                                        <motion.div
                                            className="conf-fill"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.confidence}%` }}
                                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                                            style={{ background: `linear-gradient(90deg, ${statusColors[result.final_status]}, ${statusColors[result.final_status]}88)` }}
                                        />
                                    </div>
                                </div>

                                <div style={{ padding: '0 28px 28px' }}>
                                    <p className="ai-note">{t.aiNote}</p>
                                    <motion.button
                                        onClick={handleDownloadPDF}
                                        className="btn-primary"
                                        style={{ width: '100%', marginTop: 16 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {t.downloadBtn}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
        .screening-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        .screening-form { padding: 36px; }
        .form-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .dropzone {
          border: 2px dashed var(--border);
          border-radius: var(--radius-md);
          padding: 32px 16px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dropzone:hover, .dropzone.drag-active {
          border-color: var(--accent-cyan);
          background: rgba(0, 195, 227, 0.06);
        }
        .dropzone-inner { display: flex; flex-direction: column; align-items: center; color: var(--text-secondary); }
        .preview-wrap { width: 100%; }
        .img-preview { width: 100%; max-height: 180px; object-fit: contain; border-radius: 8px; }
        .error-box {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          color: #fca5a5;
          font-size: 0.875rem;
          margin-bottom: 16px;
        }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin-slow 0.7s linear infinite;
        }
        .model-placeholder { overflow: hidden; padding: 0; }
        .analyzing-animation {
          position: relative;
          width: 120px; height: 120px;
          display: flex; align-items: center; justify-content: center;
        }
        .scan-ring {
          position: absolute;
          width: 100%; height: 100%;
          border: 2px solid var(--accent-cyan);
          border-radius: 50%;
          opacity: 0;
          animation: scan 1.5s ease-out infinite;
        }
        @keyframes scan {
          0%   { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .result-card { padding: 0; overflow: hidden; }
        .status-badge-big {
          display: inline-block;
          padding: 10px 28px;
          border-radius: 100px;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        .result-info {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 28px 16px;
        }
        .result-photo {
          width: 72px; height: 72px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid var(--border);
          flex-shrink: 0;
        }
        .result-details { flex: 1; }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          color: var(--text-secondary);
        }
        .info-row strong { color: var(--text-primary); }
        .conf-track {
          height: 8px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
        }
        .conf-fill { height: 100%; border-radius: 100px; }
        .ai-note {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.6;
          padding: 10px;
          background: rgba(251, 191, 36, 0.06);
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: var(--radius-sm);
          margin-top: 8px;
        }
        @media (max-width: 900px) {
          .screening-grid { grid-template-columns: 1fr; }
          .form-2col { grid-template-columns: 1fr; }
        }
      `}</style>
        </motion.div>
    )
}
