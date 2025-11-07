import React, { useState, useEffect, useRef } from "react";
import "./index.css";

import sigmaVid from "./assets/sigma.mp4";
import chiVid from "./assets/chi.mp4";
import dareDevil from "./assets/daredevil.mp4";
import nerdVid from "./assets/nerd.mp4";
import cryingVid from "./assets/crying.mp4";
import topgVid from "./assets/topg.mp4";

const App = () => {
    const [cgpa, setCgpa] = useState("");
    const [meme, setMeme] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const videoRef = useRef(null);

    // ✅ Preload all videos once when app loads
    useEffect(() => {
        const vids = [sigmaVid, chiVid, dareDevil, nerdVid, cryingVid, topgVid];
        vids.forEach(src => {
            const v = document.createElement("video");
            v.src = src;
            v.preload = "auto";
            v.muted = true;
            v.playsInline = true;
        });
    }, []);

    const handleShowMeme = () => {
        const value = parseFloat(cgpa);

        if (isNaN(value)) {
            setError("Enter a valid number 😤");
            return;
        }
        if (value < 0 || value > 4) {
            setError("Bro, CGPA can't be outside 0.00–4.00 💀");
            return;
        }

        setError("");

        if (value >= 3.8) {
            setMeme(topgVid);
            setMessage("🏆 Lifeless nerd, touch some grass.");
        } else if (value >= 3.5) {
            setMeme(sigmaVid);
            setMessage("🧠 You are the coach. You are the Sigma");
        } else if (value >= 3.0) {
            setMeme(dareDevil);
            setMessage("Cousin of Sigma");
        } else if (value >= 2.5) {
            setMeme(nerdVid);
            setMessage("💀 Here is a motivation from your friend.");
        } else if (value >= 2) {
            setMeme(chiVid);
            setMessage("You are the disappointment");
        } else {
            setMeme(cryingVid);
            setMessage("You have a ceiling fan. Just saying.");
        }
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        if (value > 4) value = 4;
        if (value < 0) value = 0;
        setCgpa(value);
    };

    const handleCancel = () => {
        setMeme(null);
        setMessage("");
    };

    const handleVideoEnd = () => {
        setMeme(null);
        setMessage("");
    };

    return (
        <main>
            <div className="meme-wrapper">
                <h1>Sigma GPA</h1>

                {!meme ? (
                    <>
                        <p className="subtitle">Enter Your CGPA — Receive Your Fate</p>

                        <div className="input-section">
                            <input
                                type="number"
                                value={cgpa}
                                onChange={handleInputChange}
                                placeholder="3.69"
                                step="0.01"
                                min="0"
                                max="4"
                            />
                            <button onClick={handleShowMeme}>Reveal</button>
                        </div>

                        {error && <p className="error-text">{error}</p>}
                    </>
                ) : (
                    <div className="meme-video-section">
                        <p className="meme-caption">{message}</p>
                        <video
                            ref={videoRef}
                            playsInline // ✅ prevents iOS fullscreen
                            muted={false} // ✅ sound stays on
                            autoPlay
                            preload="auto"
                            src={meme}
                            className="inline-video"
                            onEnded={handleVideoEnd}
                        />
                        <button className="cancel-btn" onClick={handleCancel}>
                            ✖ Cancel
                        </button>
                    </div>
                )}
            </div>

            <footer className="footer">
                <p className="footer-text">
                    ⚠️ This project is for <span>entertainment purposes only</span> — no CGPA was harmed.
                </p>

                <div className="footer-links">
                    <a href="https://github.com/Enmilo-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com/in/raihanx" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://twitter.com/EnmiloX" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>

                <p className="footer-copy">© {new Date().getFullYear()} Emotional Damage. All rights not reserved.</p>
            </footer>
        </main>
    );
};

export default App;
