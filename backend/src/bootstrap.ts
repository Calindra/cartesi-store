import { container } from "./inversify";

/**
 * Starts the application database
 */
export async function bootstrap() {
    const nftProductRepository = await container.getNFTProductRepository()
    await nftProductRepository.createTable().catch(console.error)
    const transactionRepository = await container.getTransactionRepository()
    await transactionRepository.createTable().catch(console.error)
}
