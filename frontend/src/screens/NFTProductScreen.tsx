import { CartesiWallet } from "@/cartesi/CartesiWallet";
import Button from "@/components/Button";
import BaseLayout from "@/components/layouts/BaseLayout"
import { FormatService } from "@/services/FormatService";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"
import { useNavigate, useParams } from "react-router-dom";

function NFTProductScreen() {
  const { collection, tokenId } = useParams();
  return (
    <BaseLayout>
      <HeaderSection bgImage={`${tokenId}.png`} />
      <div className="grid grid-cols-3 gap-4 p-4">
        <div>
          <img src={`/carousel/${tokenId}.png`} className="w-full h-auto" />
        </div>
        <div>
          <CartesiWallet />
          <div>Price: {FormatService.formatEther(1)}</div>
          <Button>Buy now</Button>
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
