import CollectionsSection from './components/CollectionsSection'
import HeroSection from './components/HeroSection'
import StatsTable from './components/StatsTable'
import BaseLayout from './components/layouts/BaseLayout'

type EthereumFromWindow = import("ethers").Eip1193Provider & import("ethers").AbstractProvider;
declare global {
  interface Window {
    /** @link {https://docs.metamask.io/wallet/reference/provider-api/} */
    ethereum?: // import("@ethersproject/providers").ExternalProvider &
    EthereumFromWindow;
  }
}

function App() {
  return (
    <>
      <BaseLayout>
        <HeroSection />
        <StatsTable />
        <CollectionsSection title="Notable Collections" />
        <CollectionsSection title="Top Collector Buys Today" />
        <CollectionsSection title="LGBTQIA+ Pride Month Creator Spotlight" />
        <CollectionsSection title="Trending in Art" />
        <CollectionsSection title="Trending in Gaming" />
        <CollectionsSection title="Trending in Memberships" />
      </BaseLayout>
    </>
  )
}

export default App
