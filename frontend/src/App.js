import React, { useState } from 'react';
import './App.css';

function App() {
    const [link, setLink] = useState('');
    const [color, setColor] = useState('#FFA500');
    const [pattern, setPattern] = useState('extra-rounded');
    const [cornerType, setCornerType] = useState('square');
    const [cornerColor, setCornerColor] = useState('#000000');
    const [image, setImage] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [error, setError] = useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setQrCode(null);

        console.log("Form submitted");
        console.log("Link:", link);
        console.log("Color:", color);
        console.log("Pattern:", pattern);
        console.log("Corner Type:", cornerType);
        console.log("Corner Color:", cornerColor);
        console.log("Image:", image);

        let imageBase64 = null;
        if (image) {
            imageBase64 = await toBase64(image);
        }

        try {
            console.log("Sending request to backend...");
            const response = await fetch('http://localhost:3001/api/generate-qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    link,
                    color,
                    pattern,
                    cornerType,
                    cornerColor,
                    imageBase64,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to generate QR code');
            }

            const data = await response.json();
            console.log("Response from backend:", data);
            setQrCode(data.qr);
        } catch (err) {
            console.error("Error generating QR code:", err);
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>Jumpify QR Generator</h1>
            <div className="content-wrapper">
                <form className="form-card" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Link:</label>
                        <input type="url" value={link} onChange={(e) => setLink(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Color:</label>
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Pattern:</label>
                        <select value={pattern} onChange={(e) => setPattern(e.target.value)}>
                            <option value="square">Square</option>
                            <option value="dots">Dots</option>
                            <option value="rounded">Rounded</option>
                            <option value="classy">Classy</option>
                            <option value="classy-rounded">Classy Rounded</option>
                            <option value="extra-rounded">Extra Rounded</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Corner Style:</label>
                        <select value={cornerType} onChange={(e) => setCornerType(e.target.value)}>
                            <option value="square">Square</option>
                            <option value="dot">Dot</option>
                            <option value="extra-rounded">Extra Rounded</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Corner Color:</label>
                        <input type="color" value={cornerColor} onChange={(e) => setCornerColor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <button className="generate-button" type="submit">Generate QR Code</button>
                </form>
                {qrCode && (
                    <div className="qr-code">
                        <img src={`data:image/png;base64,${qrCode}`} alt="Generated QR Code" />
                    </div>
                )}
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default App;
