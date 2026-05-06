import { useState, useEffect } from "react";
import "./IssueDetails.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [getfiles, setGetFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
   const API = import.meta.env.VITE_API_URL || "/api";
  const fetchFiles = async () => {
    try {
      const res = await fetch(`${API}/api/files`);
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();
      setGetFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API}/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("File uploaded successfully");

      fetchFiles(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="file-btn">
      <button  className="hp-btn-primary"

       onClick={() => {
        setShowUpload(true);
        setShowFiles(false);
      }}>
        <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
         Add Files
      </button>


      <button className="hp-btn-primary"
      
      onClick={() => {
        setShowFiles(true);
        setShowUpload(false);
        fetchFiles(); 
      }}>
        👁️ See Files
      </button>
</div>
      {showUpload && (
        <div>
          <h3>Upload File</h3>
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      {showFiles && (
        <div>
          <h2>Uploaded Files</h2>

          {getfiles.length === 0 ? (
            <p>No files found</p>
          ) : (
            getfiles.map(file => (
              <div key={file.id}>
                <p>{file.fileName}</p>

                <a
                  href={`http://localhost:8080${file.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default FileUpload;