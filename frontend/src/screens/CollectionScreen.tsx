import BaseLayout from "@/components/layouts/BaseLayout"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"

function CollectionScreen() {
  return (
    <BaseLayout>
      <HeaderSection bgImage={"1.png"} />
      <div className="grid grid-cols-3 gap-4 p-4">
        <NFTProductView image={'1.png'} floor={1} name="Collection 1" volume={3} />
        <NFTProductView image={'2.png'} floor={1} name="Collection 2" volume={3} />
        <NFTProductView image={'3.png'} floor={1} name="Collection 3" volume={3} />
        <NFTProductView image={'4.png'} floor={1} name="Collection 4" volume={3} />
        <NFTProductView image={'5.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'6.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'7.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'8.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'9.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'10.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'11.png'} floor={1} name="Collection 5" volume={3} />
        <NFTProductView image={'12.png'} floor={1} name="Collection 5" volume={3} />
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

function NFTProductView(item: { image: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; floor: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; volume: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) {
  return <>
    <div
      className="cursor-pointer overflow-hidden rounded-2xl shadow duration-200 will-change-transform hover:-translate-y-1 hover:shadow-md sm:w-full"
    >
      <div className="relative aspect-square">
        <img src={`/carousel/${item.image}`} className="absolute inset-0 h-full w-full object-cover object-top" />
      </div>
      <div className="p-4">
        <div className="mt-1 flex gap-x-8 relative">
          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>
          </div>
          <div>
            <p className="text-sm absolute top-0 right-0">#12312</p>
          </div>
        </div>
        <div className="mt-4 flex gap-x-8">
          <div>
            <p className="font-semibold text-slate-900">{item.floor} ETH</p>
            <p className="text-sm">Last sale: 0.53 ETH</p>
          </div>
        </div>
      </div>
    </div>
  </>
}


export default CollectionScreen