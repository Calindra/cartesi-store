// scripts/GLDToken_deploy.js

const hre = require("hardhat");

async function main() {
  const NonFunToken = await hre.ethers.getContractFactory("NonFunToken");
  console.log('Deploying NonFunToken...');
  const token = await NonFunToken.deploy();

  await token.deployed();
  console.log("NonFunToken deployed to:", token.address);
  const nonFunToken = await ethers.getContractAt('NonFunToken', token.address);

  const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  let tx = await nonFunToken.mintNFT(address, '0', "https://xxx.com/");
  await tx.wait();
  let tx1 = await nonFunToken.mintNFT(address, '1', "https://xxx.com/");
  await tx1.wait();
  let tx2 = await nonFunToken.mintNFT(address, '2', "https://xxx.com/");
  await tx2.wait();
  let tx3 = await nonFunToken.mintNFT(address, '3', "https://xxx.com/");
  await tx3.wait();
  let tx4 = await nonFunToken.mintNFT(address, '4', "https://xxx.com/");
  await tx4.wait();
  let tx5 = await nonFunToken.mintNFT(address, '5', "https://xxx.com/");
  await tx5.wait();
  console.log(`Mint NFT to ${address}`)

  const url = await nonFunToken.tokenURI("0")
  console.log(url)
}

// module.exports = main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
