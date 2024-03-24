import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { TransactionRepository } from './repository/TransactionRepository';
import { NFTProductRepository } from './repository/NFTProductRepository';
import { NFTProductService } from './services/NFTProductService';
import { WalletRepository } from './repository/WalletRepository';

/**
 * manual inversify
 */
class Container {

    private db?: Database<sqlite3.Database, sqlite3.Statement>

    private transactionRepository?: TransactionRepository

    private nftProductRepository?: NFTProductRepository

    async getDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
        if (!this.db) {
            this.db = await open({
                filename: './data/sqlite3-prod.db',
                driver: sqlite3.Database // Import from the sqlite3 package
            });
        }
        return this.db
    }

    async getWalletRepository() {
        return new WalletRepository()
    }

    async getTransactionRepository() {
        if (!this.transactionRepository) {
            this.transactionRepository = new TransactionRepository(await this.getDb())
        }
        return this.transactionRepository
    }

    async getNFTProductRepository() {
        if (!this.nftProductRepository) {
            this.nftProductRepository = new NFTProductRepository(await this.getDb())
        }
        return this.nftProductRepository
    }

    async getNFTProductService() {
        const walletRepository = await this.getWalletRepository()
        const nftProductRepository = await this.getNFTProductRepository()
        const transactionRepository = await this.getTransactionRepository()
        return new NFTProductService(nftProductRepository, walletRepository, transactionRepository)
    }
}

const container = new Container()

export { container }