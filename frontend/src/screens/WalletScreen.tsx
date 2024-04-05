import { WalletRest } from "@/cartesi/WalletRest";
import { ConfigService } from "@/services/ConfigService";
import { HttpService } from "@/services/HttpService";
import { SignerService } from "@/services/SignerService";
import VoucherView from "@/cartesi/VoucherView";

export default function WalletScreen() {
    const dappAddress = ConfigService.getDappAddress();
    const fetch = HttpService.getRawCartesifyFetch();
    return (
        <div style={{color: '#000000'}} className="p-4">
            <WalletRest dappAddress={dappAddress} fetch={fetch} getSigner={SignerService.getSigner} />
            <VoucherView dappAddress={dappAddress} fetch={fetch} getSigner={SignerService.getSigner}/>
        </div>
    )
}
