import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("https://urlshortnerbackend-a2xi.onrender.com/history"); // Correct endpoint
        setHistory(response.data);
      } catch (err) {
        console.log("Error fetching history:", err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history" style={{ backgroundColor: "#f0f8ff", padding: "50px 0" }}>
      <div className="container">
        <h2 className="text-center mb-4">URL History</h2>
        {history.length === 0 ? (
          <div className="alert alert-info">No URLs shortened yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Original URL</th>
                  <th>Short URL</th>
                  <th>Clicks</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((url) => (
                  <tr key={url._id}>
                    <td>
                      <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                        {url.originalUrl}
                      </a>
                    </td>
                    <td>
                      <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td>{url.clicks}</td>
                    <td>{new Date(url.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
