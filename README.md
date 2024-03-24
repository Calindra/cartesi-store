# Cartesi Store

Exploring use cases to discover missing functionalities.

## How to run

### Backend

Install all dependencies

```shell
cd backend
pnpm i
```

#### Brunodo

```shell
cd backend
pnpm run dev
```

#### Classic nonodo way

Start the nonodo

```shell
nonodo
```

Start the backend

```shell
cd backend
pnpm start
```

### Database

Fill the database as needed

```shell
cd onchain
pnpm run deploy
```

### Frontend

Start the frontend

```shell
cd frontend
pnpm run dev
```

Access http://localhost:5173/

Currently, only the links on the trending section are functional on the first page. You can navigate to the collection, select an NFT, and purchase it. Additionally, you have the option to list the NFT.
