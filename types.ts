




export interface DriveFetcherOptions extends BaseFetcherOptions {
    searchParams?: { [k: string]: any }
    headers?: object

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






