import { Options, DriveFetcherOptions, DrivePut, DrivePutResponse } from './types.ts'
import urlJoin from 'https://esm.sh/url-join'
import { firstOf, toUint8Array, fallback } from './utils/autil.ts'

export default class Drive {
    private key: string;
    private id: string;
    private options: Options;
    private name: string;
    private get baseUrl() { return `https://drive.deta.sh/v1/${this.id}/${this.name}` }
    constructor(key: string, id: string, name: string, options: Options) {
        this.key = key;
        this.id = id;
        this.options = options;
        this.name = name;
    }

    private async fetcher(options: DriveFetcherOptions) {
        const { body, urlParams, method } = options
        let url = new URL(urlParams ? urlParams.reduce((p, c) => urlJoin(p, c), this.baseUrl) : this.baseUrl)

        if (options.searchParams) {
            Object.entries(options.searchParams).forEach(([k, v]) => {
                url.searchParams.append(`${k}`, `${v}`)
            })
        }


        const response = await fetch(url, {
            method: method ? method : 'GET',
            headers: {
                'X-API-Key': this.key,
                ...options.headers
            },
            [body ? 'body' : '']: body
        })

        let data = await fallback(async () => await response.clone().json(), {})
        return data.errors ? Promise.reject(data) : response
    }


    /**
     * Stores a smaller file in a single request. Use this endpoint if the file size is small enough to be sent in a single request. The file is overwritten if the file with given name already exists.
     * @param name The name of the file
     * @param options uploaded file optipns
     */
    async put(name: string, options: DrivePut) : Promise<DrivePutResponse> {
        let body;
        const source = firstOf(["data", "path"], options)
        if (source == 'data') {
            body = toUint8Array((options["data"] as string | Uint8Array))
        } else if (source == 'path') {
            body = await Deno.readFile((options["path"] as string))
        } else {
            return Promise.reject({ errors: ["`data` or `path` should be included in options"] })
        }

        return await this.fetcher({
            searchParams: { name },
            [body ? 'body' : '']: body,
            [options.contentType ? 'headers' : '']: { 'Content-Type': options.contentType },
            urlParams: ["files"],
            method: "POST"
        }).then(d => d.json())

    }

    /**
     * retreives a file from a drive by its name.
     * @param name The name of the file to get.
     */
    async get(name: string) : Promise<Uint8Array> {
        return new Uint8Array(
            (await this.fetcher({
                searchParams: { name },
                urlParams: ["files", "download"]
            }).then(d => d.arrayBuffer()) as number[])
        )
    }


    


}



