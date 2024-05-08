import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import 'swiper/css'
import 'swiper/css/navigation'
import './index.css'
import CollectionScreen from './screens/CollectionScreen.tsx';
import NFTProductScreen from './screens/NFTProductScreen.tsx';
import WalletScreen from './screens/WalletScreen.tsx';
import { SnackbarProvider } from 'notistack';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/collection/:collection",
    element: <CollectionScreen />,
  },
  {
    path: "/collection/:collection/:tokenId",
    element: <NFTProductScreen />,
  },
  {
    path: "/wallet",
    element: <WalletScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider preventDuplicate >
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
)
