import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Camera, Upload, Check, Loader2, X, Settings, Key, CheckCircle } from 'lucide-react';

const Scanner = ({ onScanComplete }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) setApiKey(storedKey);
    }, []);

    const saveApiKey = (key) => {
        setApiKey(key);
        localStorage.setItem('gemini_api_key', key);
        setShowSettings(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true); // Show loading processing
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for resizing
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Max dimension limit (e.g., 1024px)
                    const MAX_SIZE = 4096;
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.8 quality
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);

                    setImage({
                        file: file,
                        url: compressedBase64, // Use compressed base64 for preview and API
                        base64: compressedBase64.split(',')[1]
                    });
                    setResult(null);
                    setError('');
                    setLoading(false);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = async () => {
        if (!image) return;
        if (!apiKey) {
            setShowSettings(true);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            // Reverting to stable model version
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `Analyze this ticket image and extract the event details into a valid JSON object. 
      The JSON keys must be: 
      - 'title' (event name)
      - 'date' (YYYY/MM/DD)
      - 'time' (HH:MM)
      - 'venue' (location)
      - 'price' (ticket cost)
      - 'category' (One of: 'Concert', 'Movie', 'Exhibition', 'Sports', 'Other')

      Determine the category based on the visual context (e.g. stadium for sports, cinema for movie, singer for concert).
      If the image is rotated, please still try to read the text in its correct orientation.
      If the text is in Chinese, ensure the extracted fields are correctly formatted. 
      For price, include the currency symbol if present (e.g. NT$500).
      Return ONLY the JSON object, no markdown formatting or extra text.`;

            const imagePart = {
                inlineData: {
                    data: image.base64,
                    mimeType: image.file.type
                }
            };

            const result = await model.generateContent([prompt, imagePart]);
            const response = await result.response;
            let text = response.text();

            // Clean up markdown code blocks if present
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            const data = JSON.parse(text);

            const parsedData = {
                title: data.title || "Unknown Event",
                category: data.category || "Other",
                rawText: text,
                date: data.date || "",
                time: data.time || "",
                venue: data.venue || "",
                price: data.price || "",
                image: image.url
            };

            setResult(parsedData);
            if (onScanComplete) onScanComplete(parsedData);

        } catch (err) {
            console.error(err);
            setError('Failed to analyze ticket. Please check your API Key and try again.');
        } finally {
            setLoading(false);
        }
    };

    const [createStatus, setCreateStatus] = useState('idle'); // 'idle', 'creating', 'success'

    const handleCreate = () => {
        setCreateStatus('creating');
        // Simulate processing
        setTimeout(() => {
            setCreateStatus('success');
            // Reset after delay
            setTimeout(() => {
                setImage(null);
                setResult(null);
                setCreateStatus('idle');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="glass-panel" style={{ padding: '20px', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

            {/* Settings / API Key Button */}
            <button
                onClick={() => setShowSettings(true)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', color: 'var(--text-secondary)' }}
            >
                <Settings size={20} />
            </button>

            {/* ... settings modal ... */}
            {showSettings && (
                <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-secondary)', zIndex: 10, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>API Settings</h3>
                    {/* ... existing settings content ... */}
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Enter your Google Gemini API Key to enable AI scanning.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <Key size={20} color="var(--text-muted)" />
                        <input
                            type="password"
                            placeholder="Paste API Key here"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid var(--text-muted)', color: 'white', outline: 'none' }}
                        />
                    </div>
                    <button onClick={() => saveApiKey(apiKey)} style={{ width: '100%', padding: '12px', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px' }}>Save Key</button>
                    <button onClick={() => setShowSettings(false)} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'var(--text-secondary)', marginTop: '10px' }}>Close</button>
                </div>
            )}

            {!image && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
                        {/* Camera Button */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <div style={{ position: 'absolute', inset: -4, background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))', borderRadius: '50%', opacity: 0.5, filter: 'blur(10px)' }}></div>
                                <button
                                    onClick={() => document.getElementById('camera-input').click()}
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <Camera size={28} color="white" />
                                </button>
                            </div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Camera</span>
                        </div>

                        {/* Gallery Button */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <button
                                    onClick={() => document.getElementById('gallery-input').click()}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <Upload size={28} color="white" />
                                </button>
                            </div>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Gallery</span>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Choose how to scan</p>

                    {/* Camera Input (Forces Camera) */}
                    <input
                        id="camera-input"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />

                    {/* Gallery Input (Standard Picker) */}
                    <input
                        id="gallery-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            )}

            {image && !result && !loading && (
                <div style={{ width: '100%', position: 'relative' }}>
                    <img src={image.url} alt="Preview" style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setImage(null)} className="glass-panel" style={{ flex: 1, padding: '12px', color: 'var(--text-muted)' }}>Retake</button>
                        <button onClick={processImage} style={{ flex: 1, padding: '12px', background: 'var(--accent-primary)', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>AI Analyze</button>
                    </div>
                    {error && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '10px' }}>{error}</p>}
                </div>
            )}

            {loading && (
                <div style={{ textAlign: 'center', width: '100%', padding: '40px 0' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            borderRadius: '50%',
                            boxShadow: '0 0 20px var(--accent-highlight)',
                            opacity: 0.5,
                            animation: 'pulse 1.5s infinite'
                        }} />
                        <Loader2 className="animate-spin" size={50} color="var(--accent-highlight)" style={{ position: 'relative', zIndex: 2 }} />
                    </div>
                    <p style={{ marginTop: '20px', color: 'var(--text-primary)', fontWeight: '500' }}>Analyzing Ticket...</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '5px' }}>Extracting event details</p>
                </div>
            )}

            {result && (
                <div style={{ width: '100%', textAlign: 'left' }}>
                    {createStatus === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }} className="animate-fade-in">
                            <div style={{
                                width: '80px', height: '80px',
                                background: 'var(--accent-secondary)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px auto',
                                boxShadow: '0 0 30px var(--accent-secondary)'
                            }}>
                                <CheckCircle size={40} color="white" />
                            </div>
                            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Event Created!</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Added to your calendar.</p>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h3 style={{ color: 'var(--accent-highlight)' }}>Scan Complete</h3>
                                <button onClick={() => { setImage(null); setResult(null); }}><X size={20} /></button>
                            </div>

                            <div className="glass-panel" style={{ padding: '15px', fontSize: '14px', marginBottom: '15px' }}>
                                <p style={{ marginBottom: '5px' }}><span style={{ color: '#666' }}>Event:</span> <span style={{ color: 'white', fontWeight: 'bold' }}>{result.title}</span></p>
                                <p style={{ marginBottom: '5px' }}>
                                    <span style={{ color: '#666' }}>Type:</span>
                                    <span style={{
                                        marginLeft: '8px',
                                        fontSize: '10px',
                                        textTransform: 'uppercase',
                                        background: 'var(--accent-primary)',
                                        padding: '2px 8px',
                                        borderRadius: '10px',
                                        color: 'white'
                                    }}>
                                        {result.category}
                                    </span>
                                </p>
                                <p style={{ marginBottom: '5px' }}><span style={{ color: '#666' }}>Date:</span> {result.date}</p>
                                <p style={{ marginBottom: '5px' }}><span style={{ color: '#666' }}>Time:</span> {result.time}</p>
                                <p style={{ marginBottom: '5px' }}><span style={{ color: '#666' }}>Venue:</span> {result.venue}</p>
                                <p><span style={{ color: '#666' }}>Price:</span> {result.price}</p>
                            </div>

                            <button
                                onClick={handleCreate}
                                disabled={createStatus === 'creating'}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    background: createStatus === 'creating' ? 'var(--text-muted)' : 'var(--accent-secondary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}>
                                {createStatus === 'creating' ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Creating...
                                    </>
                                ) : 'Create Event'}
                            </button>
                        </>
                    )}
                </div>
            )}

        </div>
    );
};

export default Scanner;
