/// <reference path="./global.d.ts" />



interface IDriveFetcher{
    urlParams?: string[],
    searchParams?: { [k: string]: any },
    body?: any,
    headers?: { [k: string]: any },
    method?: string
}


interface IListOptions{
    limit?: number,
    prefix?: string,
    last?: string
}

interface IListResponse{
    paging : {
        size : number,
        last : string
    },
    names : string[]
}

interface IDeleteResponse{
    deleted? : string[]
    failed?: { [k: string]: string }
}


//NEED SOME PLAYING WITH THIS
// type IPutOptions = RequireAtLeastOne<{
//     data?: string | Uint8Array, //as Buffer not implemented yet
//     path?: string,
//     contentType?: string
// } | 'data' | 'path' >

interface IPutOptions{
    data?: string | Uint8Array, //as Buffer not implemented yet
    path?: string,
    contentType?: string
}

interface IPutResponse  {
    name: string,
    project_id: string,
    drive_name: string
}