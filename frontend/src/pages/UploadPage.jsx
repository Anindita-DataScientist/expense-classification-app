import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setMessage("");
    setPreview([]);
    setColumns([]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload/csv`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.detail || data?.message || JSON.stringify(data);
        setMessage(`Upload failed: ${errorMessage}`);
        alert(`Upload failed: ${errorMessage}`);
        return;
      }

      setMessage(data.message || "Upload successful");
      setPreview(data.preview || []);
      setColumns(data.columns || []);
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
      alert(`Upload failed: ${error.message}`);
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload CSV</h2>

      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button className="primary-btn" onClick={handleUpload}>
        Upload CSV
      </button>

      {message && <p className="message-text">{message}</p>}

      {preview.length > 0 && (
        <div className="result-box">
          <h3>Preview</h3>
          <table className="preview-table">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UploadPage;