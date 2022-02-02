//source: https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]




export interface DriveFetcherOptions extends BaseFetcherOptions {
    searchParams?: { [k: string]: any }
    headers?: object
}











interface _DrivePut {
    data?: string | Uint8Array, //as Buffer not implemented yet
    path?: string,
    contentType?: string
}

export interface DrivePutResponse {
    name: string,
    project_id: string,
    drive_name: string
}


export interface DriveDeleteResponse {
    deleted?: string[],
    failed?: { [k: string]: string }
}

export interface DriveListResponse{
    paging : {
        size : number,
        last : string
    },
    names : string[]
}

export interface DriveListOptions{
    limit? : number,
    prefix? : string,
    last? : string
}


export type DrivePut = RequireAtLeastOne<_DrivePut, 'data' | 'path'>


