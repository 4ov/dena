// deno-lint-ignore-file no-explicit-any
/// <reference path="./global.d.ts" />

interface PutResponse {
  processed: {
    items: any[];
  };
  failed: {
    items: any[];
  };
}

interface DeleteResponse {
  key: string;
}

interface UpdateResponse extends UpdateObject {
  key: string;
}

interface UpdateObject {
  set?: { [key: string]: any };
  increment?: { [key: string]: any };
  append?: { [key: string]: any };
  prepend?: { [key: string]: any };
  delete?: { [key: string]: any };
}

interface DefaultError {
  errors: string[];
}

// deno-lint-ignore no-empty-interface
interface Options { }

interface QueryResponse<T = DefaultObject> {
    paging: { size: number, last? : string }
    items: T[]
}


// type QueryKey = string | `${string}?ne` | `${string}?lt` | `${string}?gt` | `${string}?lte` | `${string}?gte` | `${string}?pfx` | `${string}?r`

// type QueryOptions = Record<QueryKey, any>

