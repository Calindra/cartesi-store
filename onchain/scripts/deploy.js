// scripts/GLDToken_deploy.js
const { ERC721Portal__factory, IERC721__factory, EtherPortal__factory } = require("@cartesi/rollups");
const hre = require("hardhat");

async function main() {
  const { Cartesify } = await import("@calindra/cartesify")
  const provider = ethers.getDefaultProvider("http://localhost:8545");
  const pk = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const signer = new ethers.Wallet(pk, provider);
  const dappAddress = '0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e'
  const _fetch = Cartesify.createFetch({
    dappAddress,
    endpoints: {
      graphQL: new URL("http://localhost:8080/graphql"),
      inspect: new URL("http://localhost:8080/inspect"),
    },
    provider,
    signer,
  })

  const etherPortalAddress = '0x1733b13aAbcEcf3464157Bd7954Bd7e4Cf91Ce22'
  const etherValue = '10000000000000000'
  const portal = EtherPortal__factory.connect(etherPortalAddress, signer)
  const tx = await portal.depositEther(dappAddress, '0x', { value: etherValue })
  await tx.wait()

  for (let collectionIndex = 0; collectionIndex < 10; collectionIndex++) {
    const NonFunToken = await hre.ethers.getContractFactory("NonFunToken");
    console.log('Deploying NonFunToken...', collectionIndex);
    const token = await NonFunToken.deploy();

    await token.deployed();
    console.log("NonFunToken deployed to:", token.address);
    const nonFunToken = await ethers.getContractAt('NonFunToken', token.address);

    const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    for (let i = 0; i < 15; i++) {
      console.log(`mint ${i}`)
      let tx = await nonFunToken.mintNFT(address, `${i}`, "http://localhost:5173/carousel/");
      await tx.wait();
    }
    for (let i = 0; i < 10; i++) {
      console.log(`deposit ${i}`)
      await depositERC721(dappAddress, token.address, `${i}`, signer);
    }
    console.log(`Mint NFT to ${address}`)

    const url = await nonFunToken.tokenURI("0")
    console.log(url)

    const erc721address = token.address
    let promises = []
    for (let i = 0; i < 10; i++) {
      console.log('Listing', i)

      const res = await _fetch(`http://127.0.0.1:8383/erc-721/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: erc721address,
          tokenId: `${i}`,
          price: 200 + i,
        }),
      })
      await new Promise(resolve => setTimeout(resolve, 250))
      promises.push(res)
    }
    (await Promise.all(promises)).forEach(res => {
      console.log('...')
      if (!res.ok) {
        console.log(res.status, res.text())
      }
    })

    console.log('Buying', collectionIndex)
    const res = await _fetch(`http://127.0.0.1:8383/erc-721/${erc721address}/listed/${collectionIndex}/buy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
    if (!res.ok) {
      console.log(res.status, await res.text())
      return
    }
  }
}

// module.exports = main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


async function depositERC721(dappAddress, erc721address, erc721id, signer) {
  const portalAddress = '0x2e2f6166170A9C7f8b95cC5400A39b62C46e401f'
  const contract = IERC721__factory.connect(erc721address, signer)
  await contract.approve(portalAddress, erc721id)
  const portal = ERC721Portal__factory.connect(portalAddress, signer)
  const tx = await portal.depositERC721Token(erc721address, dappAddress, erc721id, '0x', '0x')
  await tx.wait()
}