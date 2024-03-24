import { WalletApp } from "@deroll/wallet";
import { container } from "./inversify";

/**
 * Starts the application database
 */
export async function bootstrap(wallet: WalletApp) {
    const nftProductRepository = await container.getNFTProductRepository()
    await nftProductRepository.createTable().catch(console.error)
    const transactionRepository = await container.getTransactionRepository()
    await transactionRepository.createTable().catch(console.error)
    const walletRepository = await container.getWalletRepository()
    await walletRepository.load(wallet)
}
