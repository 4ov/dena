type DefaultObject = Record<string, unknown>

interface BaseFetcherOptions {
    urlParams?: string[],
    body?: DefaultObject | null,
    method?: string
}

//source: https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]