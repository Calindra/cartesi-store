// scripts/GLDToken_deploy.js
const { ERC721Portal__factory, IERC721__factory, EtherPortal__factory } = require("@cartesi/rollups");
const hre = require("hardhat");

async function main() {
  const { Cartesify } = await import("@calindra/cartesify")
  const provider = ethers.getDefaultProvider("http://localhost:8545");
  const pk = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const signer = new ethers.Wallet(pk, provider);

  const _fetch = Cartesify.createFetch({
    dappAddress: '0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C',
    endpoints: {
      graphQL: new URL("http://localhost:8080/graphql"),
      inspect: new URL("http://localhost:8080/inspect"),
    },
    provider,
    signer,
  })

  const dappAddress = '0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C'

  const portalAddress = '0xFfdbe43d4c855BF7e0f105c400A50857f53AB044'
  const etherValue = '10000000000000000'
  const portal = EtherPortal__factory.connect(portalAddress, signer)
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
    for (let i = 0; i < 10; i++) {
      let tx = await nonFunToken.mintNFT(address, `${i}`, "http://localhost:5173/carousel/");
      await tx.wait();
      // deposit ERC721
      await depositERC721(dappAddress, token.address, `${i}`, signer);
    }
    console.log(`Mint NFT to ${address}`)

    const url = await nonFunToken.tokenURI("0")
    console.log(url)

    const erc721address = token.address
    let promises = []
    for (let i = 0; i < 10; i++) {
      console.log('Listando', i)

      const res = _fetch(`http://127.0.0.1:8383/erc-721/list`, {
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
      await new Promise(resolve => setTimeout(resolve, 200))
      promises.push(res)
    }
    (await Promise.all(promises)).forEach(res => {
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
  const portalAddress = '0x237F8DD094C0e47f4236f12b4Fa01d6Dae89fb87'
  const contract = IERC721__factory.connect(erc721address, signer)
  await contract.approve(portalAddress, erc721id)
  const portal = ERC721Portal__factory.connect(portalAddress, signer)
  const tx = await portal.depositERC721Token(erc721address, dappAddress, erc721id, '0x', '0x')
  await tx.wait()
}