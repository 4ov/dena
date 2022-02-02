import { Options, BaseFetcherOptions, UpdateObject, QueryResponse, UpdateResponse, DeleteResponse } from './types.ts'
import urlJoin from 'https://esm.sh/url-join'
import { toArray } from './utils/autil.ts'



export default class Base {
    private key: string;
    private id: string;
    private options: Options;
    private name: string;
    private get baseUrl() { return `https://database.deta.sh/v1/${this.id}/${this.name}` }
    constructor(key: string, id: string, name: string, options: Options) {
        this.key = key;
        this.id = id;
        this.options = options;
        this.name = name;
    }


    private async fetcher(options: BaseFetcherOptions) {
        const { body, urlParams, method } = options
        let url = urlParams ? urlParams.reduce((p, c) => urlJoin(p, c), this.baseUrl) : this.baseUrl

        const response = await fetch(url, {
            method: method ? method : 'GET',
            headers: {
                'X-API-Key': this.key,
                'Content-Type': 'application/json'
            },
            [body ? 'body' : '']: JSON.stringify(body)
        })

        let data = await response.json()

        return data.errors ? Promise.reject(data) : data


    }

    /**
     * Stores multiple items in a single request. This request overwrites an item if the key already exists.
     * @param `items` An array of items object to be stored.
     */
    async put<T>(items: T) {
        const body = { items }
        return await this.fetcher({
            body,
            method: "PUT",
            urlParams: ["items"]
        })
    }

    /**
     * Get a stored item.
     * @param key The key (aka. ID) of the item you want to retrieve
     */
    async get<T = object>(key: string) : Promise<T> {
        return await this.fetcher({
            urlParams: ["items", key]
        })
    }

    /**
     * Delete a stored item.
     * @param key The key (aka. ID) of the item you want to delete.
     */
    async delete(key: string): Promise<DeleteResponse> {
        return await this.fetcher({
            urlParams: ["items", key]
        })
    }

    /**
     * Creates a new item only if no item with the same `key` exists.
     * @param item The item to be stored.
     */
    async insert<T>(item: T) : Promise<object> {
        const body = { item }
        return await this.fetcher({
            urlParams: ["items"],
            method: "POST",
            body
        })
    }

    /**
     * Updates an item only if an item with key exists.
     * @param key The key of the item
     * @param body the update object
     */
    async update(key: string, body: UpdateObject) : Promise<UpdateResponse> {
        return await this.fetcher({
            method: "PATCH",
            urlParams: ["items", key],
            body
        })
    }


    async query<T>(query: object[] | object = [], limit?: number, last?: string) : Promise<QueryResponse<T>> {
        query = toArray(query)
        const body = { query, limit, last }
        return await this.fetcher({
            method: "POST",
            urlParams: ["query"],
            body
        })
    }



}