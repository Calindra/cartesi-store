import { BrowserProvider } from 'ethers';

export class SignerService {
    static async getSigner() {
        try {
            if (!window.ethereum) {
                alert("Connecting to metamask failed.");
                throw new Error("Connecting to metamask failed. (window.ethereum is undefined)")
            }
            await window.ethereum.request({ method: "eth_requestAccounts" })
            const provider = new BrowserProvider(
                window.ethereum
            );
            return provider.getSigner();
        } catch (error) {
            console.log(error);
            alert("Connecting to metamask failed.");
            throw error
        }
    }
}