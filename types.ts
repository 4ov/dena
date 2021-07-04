//source: https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export interface Options { }

export interface BaseFetcherOptions {
    urlParams?: string[],
    body?: object | null,
    method?: string
}

export interface DriveFetcherOptions extends BaseFetcherOptions {
    searchParams?: { [k: string]: any }
    headers?: object
}


export interface UpdateObject {
    set?: { [key: string]: any },
    increment?: { [key: string]: any },
    append?: { [key: string]: any },
    prepend?: { [key: string]: any },
    delete?: { [key: string]: any }
}



export interface QueryResponse {
    paging: { size: number }
    items: object[]
}

export interface UpdateResponse extends UpdateObject {
    key: string
}

export interface DeleteResponse {
    key: string
}


interface _DrivePut {
    data?: string | Uint8Array, //as Buffer not implemented yet
    path?: string,
    contentType?: string
}

export interface DrivePutResponse{
    name: string, 
    project_id: string, 
    drive_name: string
}


export type DrivePut = RequireAtLeastOne<_DrivePut, 'data' | 'path'> 