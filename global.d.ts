type DefaultObject = Record<string, unknown>

interface BaseFetcherOptions {
    urlParams?: string[],
    body?: DefaultObject | null,
    method?: string
}
