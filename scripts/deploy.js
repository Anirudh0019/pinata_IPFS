const hre = require("hardhat");

async function main() {
  const IPFSHashStorage = await hre.ethers.getContractFactory("IPFSHashStorage");
  const ipfsHashStorage = await IPFSHashStorage.deploy();

  await ipfsHashStorage.waitForDeployment();

  console.log("IPFSHashStorage deployed to:", await ipfsHashStorage.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});