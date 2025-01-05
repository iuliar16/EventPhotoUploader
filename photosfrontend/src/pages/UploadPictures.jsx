import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./uploadPictures.css"; // Import the CSS file

function UploadPhoto() {
  const { albumId } = useParams(); // Extract albumId from the URL
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8080/api/albums/upload/${albumId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.text();
        setMessage(`Upload successful: ${result}`);
      } else {
        const errorText = await response.text();
        setMessage(`Error uploading photo: ${errorText}`);
      }
    } catch (error) {
      setMessage(`An unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <div className="upload-pictures">
      <h1>Upload Photo to Album</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UploadPhoto;
