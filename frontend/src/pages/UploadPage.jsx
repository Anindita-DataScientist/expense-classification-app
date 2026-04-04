import { useState } from "react";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Server returned an error");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload CSV</h2>

      <form onSubmit={handleUpload}>
        <div className="file-input">
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>

        <button className="primary-btn" type="submit">
          Upload CSV
        </button>
      </form>

      {result && (
        <div className="result-box">
          <h3>Upload Result</h3>
          <p>
            <strong>Filename:</strong> {result.filename}
          </p>
          <p>
            <strong>Total Rows:</strong> {result.row_count}
          </p>
          <p>
            <strong>Saved Rows:</strong> {result.saved_count}
          </p>
          <p>
            <strong>Skipped Duplicates:</strong> {result.skipped_duplicates}
          </p>

          <h4>Columns</h4>
          <ul>
            {result.columns.map((col, index) => (
              <li key={index}>{col}</li>
            ))}
          </ul>

          <h4>Preview</h4>
          <table className="preview-table">
            <thead>
              <tr>
                {result.columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.preview.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {result.columns.map((col, colIndex) => (
                    <td key={colIndex}>{String(row[col] ?? "")}</td>
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