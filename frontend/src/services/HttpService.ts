import { Cartesify } from "@calindra/cartesify";

// you could check this address by executing `sunodo address-book`
const DAPP_ADDRESS = '0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C'

// replace with the content of your dapp address (it could be found on dapp.json)
const _fetch = Cartesify.createFetch({
  dappAddress: DAPP_ADDRESS,
  endpoints: {
    graphQL: new URL("http://localhost:8080/graphql"),
    inspect: new URL("http://localhost:8080/inspect"),
  },
})

export class HttpService {
    static async get(url: string, options?: any) {
        if (!/^http/.test(url)) {
            url = `http://127.0.0.1:8383${url}`
        }
        const res = await _fetch(url, options)
        if (!res.ok) {
            throw new Error(`Fetch failed ${url} status ${res.status}:\n${res.text()}`)
        }
        const json = await res.json()
        return {
            data: json
        }
    }
}
