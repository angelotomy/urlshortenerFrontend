import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic URL validation
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlPattern.test(originalUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      // Make POST request to backend for shortening the URL
      const response = await axios.post("https://urlshortnerbackend-a2xi.onrender.com/shorten", {
        originalUrl,
      });
      /* setShortUrl(response.data.shortUrl);  // Set shortened URL */
      setShortUrl(`https://urlshortnerbackend-a2xi.onrender.com/${response.data.shortUrl}`);
      setError("");  // Clear error if successful
    } catch (err) {
      setError("An error occurred while shortening the URL");
    }
  };

  return (
    <div className="home" style={{ backgroundColor: "#f0f8ff", padding: "50px 0" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Shorten Your URL</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="input-group">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Enter URL to shorten"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Shorten</button>
              </div>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {shortUrl && (
              <div className="alert alert-success">
                Shortened URL:{" "}
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
