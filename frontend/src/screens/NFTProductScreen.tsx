import { CartesiWallet } from "@/cartesi/CartesiWallet";
import Button from "@/components/Button";
import BaseLayout from "@/components/layouts/BaseLayout"
import { FormatService } from "@/services/FormatService";
import { HttpService } from "@/services/HttpService";
import { SignerService } from "@/services/SignerService";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function NFTProductScreen() {
  const { collection, tokenId } = useParams();
  const [price, setPrice] = useState(0);
  const [nftProduct, setNFTProduct] = useState({} as any);
  const fetch = HttpService.getRawCartesifyFetch();

  async function init(collection: string, tokenId: string) {
    const res = await fetch(`http://127.0.0.1:8383/erc-721/${collection}/listed/${tokenId}`)
    if (!res.ok) {
      console.log(res.status, res.text())
      return
    }
    const json = await res.json()
    setNFTProduct(json)
    setPrice(json.currentPrice)
    console.log('Success!', JSON.stringify(json, null, 4))
  }

  async function buyNFT() {
    const res = await fetch(`http://127.0.0.1:8383/erc-721/${collection}/listed/${tokenId}/buy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        signer: await SignerService.getSigner(),
      })
    if (!res.ok) {
      console.log(res.status, res.text())
      return
    }
    const json = await res.json()
    console.log('Success!', JSON.stringify(json, null, 4))
  }

  useEffect(() => {
    if (collection && tokenId) {
      init(collection, tokenId)
    }
  }, [collection, tokenId])

  return (
    <BaseLayout>
      <HeaderSection bgImage={`${tokenId}.png`} />
      <div className="grid grid-cols-3 gap-4 p-4">
        <div>
          <img src={`/carousel/${tokenId}.png`} className="w-full h-auto" />
        </div>
        <div>
          <CartesiWallet />
          <div>Price: {FormatService.formatEther(nftProduct?.currentPrice ?? '0')}</div>
          {nftProduct?.status === 'LISTED' ? (
            <div>
              <Button onClick={buyNFT}>Buy now</Button>
            </div>
          ) : (
            <div>
              <Button disabled={true}>Sold</Button>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  )
}

function HeaderSection({ bgImage }: { bgImage: string }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat transition-[background] duration-500 after:absolute after:inset-0 after:z-10 after:backdrop-blur-xl after:[background:linear-gradient(0deg,rgb(255,255,255)_5%,rgba(0,0,0,0)_60%)_rgba(0,0,0,0.5)]"
        style={{ backgroundImage: `url(/carousel/${bgImage})` }}
      />
      <div className="relative z-10 -mt-[4.25rem] pt-[4.25rem] p-4">
        <div style={{ height: '50px' }}></div>
        <p className="font-semibold text-slate-900">Some banner</p>
      </div>
    </div>
  )
}


export default NFTProductScreen
