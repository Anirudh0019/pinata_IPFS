import axios from "axios";

const sendFileToIPFS = async (files) => {
  const fileImg = files[0];
  if (fileImg) {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
          pinata_secret_api_key: `${import.meta.env.VITE_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      return ImgHash;
    } catch (error) {
      console.error("Error sending File to IPFS: ", error);
      throw error;
    }
  }
  throw new Error("No file provided");
};

export default sendFileToIPFS;