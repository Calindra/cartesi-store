# Class Diagram

```mermaid
classDiagram
    class Coin {
        address: address
    }
    class NFT {
        tokenId: BigInt
        amount: BitInt
    }
    class Collection {
        address: address
    }
    class Transaction {
        from: address
        to: address

        collection: address
        tokenId: BigInt

        coin: address
        amount: BigInt

        date: string
        
        categoryId: int
        categoryName: string
        collectionName: string
    }
    class Wallet {
        address: address
    }
    class Category {
        name: string
    }

    class Auction {
        status: CREATED | STARTED | FINISHED | MIN_BID_AMOUNT
        erc20: address
        startDate: Date
        endDate: Date
        minBidAmount: BigInt
    }
    class Bid {
        author: address
        amount: BigInt
        timestamp: BigInt
    }
    Auction <--> NFT
    NFT --> Collection
    Transaction --> NFT
    Transaction --> Coin
    Transaction --> Wallet
    Collection --> Category
```

1. DataBase
2. Repository
3. Service
4. Controller
5. Frontend - API Client
6. Frontend - Route
7. Frontend - Screen

In the transaction, we include some attributes to prevent the need for joins.

1. Floor price
2. Volume
3. Category
4. Collection

```ts
class Transaction {
    nft: NFT

    getCollectionName() {
        // 1 select na NFT
        // 1 select na collection
        // para retornar o name
        this.nft.collection.name
    }
}

class NFT {
    tokenId: bigint
    collection: Collection
}

class Collection {
    name: string
    address: string
}
```

```jsx
<span>{tx.getCollectionName()}</span>
```
