import { Cartesify } from "@calindra/cartesify";
import { ConfigService } from "./ConfigService";

// replace with the content of your dapp address (it could be found on dapp.json)
const _fetch = Cartesify.createFetch({
  dappAddress: ConfigService.getDappAddress(),
  endpoints: {
    graphQL: new URL("http://127.0.0.1:8080/graphql"),
    inspect: new URL("http://127.0.0.1:8080/inspect"),
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

    static getRawCartesifyFetch() {
        return _fetch
    }
}
