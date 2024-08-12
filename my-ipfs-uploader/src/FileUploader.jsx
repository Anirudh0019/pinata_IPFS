import React, { useState } from 'react';
import sendFileToIPFS from '@/sendFileToIPFS';
import './FileUploader.css'; // We'll create this file for styling

function FileUploader() {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
        alert('Please select a file first!');
        return;
      }
  
      setIsLoading(true);
      try {
        const result = await sendFileToIPFS([file]);
        setIpfsHash(result);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file. Please try again.');
      }
      setIsLoading(false);
    };
  
    const handleReset = () => {
      setFile(null);
      setIpfsHash('');
      // Reset the file input
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
    };
  
    return (
      <div className="file-uploader">
        <h2>Upload File to IPFS</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="file" 
            onChange={handleFileChange} 
            id="fileInput"
            className="file-input"
          />
          <div className="button-group">
            <button type="submit" disabled={isLoading || !file} className="upload-btn">
              {isLoading ? 'Uploading...' : 'Upload to IPFS'}
            </button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </form>
        {ipfsHash && (
          <div className="result">
            <h3>File uploaded successfully!</h3>
            <p>IPFS Hash: <a href={`https://ipfs.io/ipfs/${ipfsHash.replace('ipfs://', '')}`} target="_blank" rel="noopener noreferrer">{ipfsHash}</a></p>
          </div>
        )}
      </div>
    );
  }
  
  export default FileUploader;