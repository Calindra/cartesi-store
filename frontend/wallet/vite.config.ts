import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        './App': './src/App',
        './WalletInfoR': './src/WalletInfoR',
        './CollectionsR': './src/CollectionsR',
        './TokenErc721CardR': './src/TokenErc721CardR',
        './TokenErc20CardR': './src/TokenErc20CardR'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
