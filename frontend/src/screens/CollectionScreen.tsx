import BaseLayout from "@/components/layouts/BaseLayout"
import { FormatService } from "@/services/FormatService";
import { HttpService } from "@/services/HttpService";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function CollectionScreen() {
  const [items, setItems] = useState([])
  const fetch = HttpService.getRawCartesifyFetch();
  const { collection } = useParams();


  async function init(collection: string) {
    const res = await fetch(`http://127.0.0.1:8383/erc-721/${collection}/listed`)
    if (!res.ok) {
      console.log(res.status, res.text())
      return
    }
    const json = await res.json()
    console.log('Success!', JSON.stringify(json, null, 4))
    setItems(json.rows)
  }

  useEffect(() => {
    if (collection) {
      init(collection)
    }
  }, [collection])

  return (
    <BaseLayout>
      <HeaderSection bgImage={"1.png"} />
      <div className="grid grid-cols-3 gap-4 p-4">
        {items.map((item: any) => {
          return <NFTProductView key={`${item.collection}-${item.tokenId}`} item={item} />
        })}
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
      <div className="relative z-10 -mt-[4.25rem] pt-[4.25rem]">
        <div style={{ height: '100px' }}></div>
        <div className="p-4">
          <p className="font-semibold text-slate-900">Some banner</p>
        </div>
      </div>
    </div>
  )
}

function NFTProductView({ item }: any) {
  const navigate = useNavigate();
  return <>
    <div
      className="cursor-pointer overflow-hidden rounded-2xl shadow duration-200 will-change-transform hover:-translate-y-1 hover:shadow-md sm:w-full"
      onClick={() => {
        navigate(`/collection/${item.collection}/${item.tokenId}`)
      }}
    >
      <div className="relative aspect-square">
        <img src={`/carousel/${item.tokenId}.png`} className="absolute inset-0 h-full w-full object-cover object-top" />
      </div>
      <div className="p-4">
        <div className="mt-1 flex gap-x-8 relative">
          <div>
            <p className="font-semibold text-slate-900">{item.collection.substring(0, 10)}</p>
          </div>
          <div>
            <p className="text-sm absolute top-0 right-0">#{item.tokenId}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-x-8">
          <div>
            <p className="font-semibold text-slate-900">{FormatService.formatEther(item.currentPrice)}</p>
            <p className="text-sm">Last sale: {FormatService.formatEther(item.lastSale)}</p>
          </div>
        </div>
      </div>
    </div>
  </>
}


export default CollectionScreen