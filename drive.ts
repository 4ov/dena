/// <reference path="./drive.d.ts" />

// import { Options, DriveFetcherOptions, DrivePut, DrivePutResponse, DriveDeleteResponse, DriveListResponse, DriveListOptions } from './types.ts'
import urlJoin from "https://esm.sh/url-join";
import {
  firstOf,
  toUint8Array,
  fallback as _fallback,
  toArray,
  defaultize,
} from "./utils/autil.ts";
import { defaultDriveFetcher } from "./defaults.ts";
export default class Drive {
  private key: string;
  private id: string;
  private options: any;
  private name: string;
  private get baseUrl() {
    return `https://drive.deta.sh/v1/${this.id}/${this.name}`;
  }
  constructor(key: string, id: string, name: string, options: any) {
    this.key = key;
    this.id = id;
    this.options = options;
    this.name = name;
  }

  private async fetcher(options: IDriveFetcher) {
    const { headers, body, method, urlParams, searchParams } = defaultize(
      defaultDriveFetcher,
      options
    );
    const urlString = urlJoin(this.baseUrl, ...urlParams!); //urlParams filled by defaultize
    const search = new URLSearchParams(searchParams);
    const url = new URL(urlString);
    url.search = search.toString();
    const response = await fetch(url.toString(), {
      method,
      headers: {
        "X-API-Key": this.key,
        ...headers,
      },
      [body ? "body" : ""]: body,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return Promise.reject(response.json());
    }
  }

  /**
   * Stores a smaller file in a single request. Use this endpoint if the file size is small enough to be sent in a single request. The file is overwritten if the file with given name already exists.
   * @param name The name of the file
   * @param options uploaded file optipns
   */
  async put(name: string, options: IPutOptions): Promise<IPutOptions> {
    let body;
    const source = firstOf(["data", "path"], options);
    if (source == "data") {
      body = toUint8Array(options["data"] as string | Uint8Array);
    } else if (source == "path") {
      body = await Deno.readFile(options["path"] as string);
    } else {
      return Promise.reject({
        errors: ["`data` or `path` should be included in options"],
      });
    }

    //@ts-ignore: blabla
    return (await this.fetcher({
      urlParams: ["files"],
      method: "POST",
      body,
      searchParams: { name },
    }));
  }

  /**
   * retreives a file from a drive by its name.
   * @param name The name of the file to get.
   */
  async get(name: string): Promise<Uint8Array> {
    return new Uint8Array(
      (await this.fetcher({
        searchParams: { name },
        urlParams: ["files", "download"],
      }).then((d) => d.arrayBuffer())) as number[]
    );
  }

  async delete(name: string | string[]): Promise<IDeleteResponse> {
    name = toArray(name);
    return (await this.fetcher({
      urlParams: ["files"],
      method: "DELETE",
      body: {
        names: name,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;
  }

  async list(options?: IListOptions): Promise<IListResponse> {
    return (await this.fetcher({
      searchParams: options,
      urlParams: ["files"],
    })) as any;
  }
}
