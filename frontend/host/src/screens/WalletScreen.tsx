import { WalletRest } from "@/cartesi/WalletRest";
import BaseLayout from "@/components/layouts/BaseLayout";
import { ConfigService } from "@/services/ConfigService";
import { HttpService } from "@/services/HttpService";
import { SignerService } from "@/services/SignerService";
// import VoucherView from "@/cartesi/VoucherView";

export default function WalletScreen() {
    const dappAddress = ConfigService.getDappAddress();
    const fetch = HttpService.getRawCartesifyFetch();
    return (
        <BaseLayout>
            <HeaderSection bgImage={"1.png"} />
            {/* <div style={{ color: '#000000' }} className="p-4"> */}
            <WalletRest dappAddress={dappAddress} fetch={fetch} getSigner={SignerService.getSigner} />
            {/* <VoucherView dappAddress={dappAddress} fetch={fetch} getSigner={SignerService.getSigner}/> */}
            {/* </div> */}
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
                <div style={{ height: '100px' }}/>
            </div>
        </div>
    )
}
