import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import sendFileToIPFS from '@/sendFileToIPFS';
import IPFSHashStorage from 'C:/Users/aniru/Downloads/pinata_updated/src/artifacts/contracts/IPFSHashStorage.sol/IPFSHashStorage.json';
import './FileUploader.css';

const contractAddress = "0x6391aeCdef740407Eba80A7f69b91579d1479056";

function FileUploader() {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [storedHashes, setStoredHashes] = useState([]);

    useEffect(() => {
        getStoredHashes();
    }, []);

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
            await storeHashOnBlockchain(result);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again.');
        }
        setIsLoading(false);
    };

    const storeHashOnBlockchain = async (hash) => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, IPFSHashStorage.abi, signer);

                const transaction = await contract.storeHash(hash);
                await transaction.wait();
                console.log("Hash stored on blockchain");
                getStoredHashes();
            } catch (error) {
                console.error("Error storing hash on blockchain: ", error);
                alert('Failed to store hash on blockchain. Please try again.');
            }
        } else {
            alert('Please install MetaMask to interact with the blockchain.');
        }
    };

    const getStoredHashes = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, IPFSHashStorage.abi, provider);

                const hashes = await contract.getHashes();
                setStoredHashes(hashes);
            } catch (error) {
                console.error("Error getting stored hashes: ", error);
            }
        }
    };

    const handleReset = () => {
        setFile(null);
        setIpfsHash('');
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="file-uploader">
            <h2>Upload File to IPFS and Blockchain</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    id="fileInput"
                    className="file-input"
                />
                <div className="button-group">
                    <button type="submit" disabled={isLoading || !file} className="upload-btn">
                        {isLoading ? 'Uploading...' : 'Upload to IPFS and Blockchain'}
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
            <div className="stored-hashes">
                <h3>Stored Hashes:</h3>
                <ul>
                    {storedHashes.map((hash, index) => (
                        <li key={index}>
                            <a href={`https://ipfs.io/ipfs/${hash.replace('ipfs://', '')}`} target="_blank" rel="noopener noreferrer">
                                {hash}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileUploader;