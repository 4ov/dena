// deno-lint-ignore-file no-explicit-any
/// <reference path="./global.d.ts" />

export interface PutResponse {
  processed: {
    items: any[];
  };
  failed: {
    items: any[];
  };
}

export interface DeleteResponse {
  key: string;
}

export interface UpdateResponse<T> extends UpdateObject<T> {
  key: string;
}

export interface UpdateObject<T> {
  set?: Partial<T>;
  //NOTE: imagine if we can check if the [keyof T]'s type in number
  increment?: Partial<Record<keyof T, number>>;
  append?: Partial<T>;
  prepend?: Partial<T>;
  //TODO: find a way to check if there is duplicates
  delete?: (keyof T)[];
}

export interface DefaultError {
  errors: string[];
}

// deno-lint-ignore no-empty-interface
export interface Options { }

export interface QueryResponse<T = DefaultObject> {
    paging: { size: number, last? : string }
    items: T[]
}


// type QueryKey = string | `${string}?ne` | `${string}?lt` | `${string}?gt` | `${string}?lte` | `${string}?gte` | `${string}?pfx` | `${string}?r`

// type QueryOptions = Record<QueryKey, any>

