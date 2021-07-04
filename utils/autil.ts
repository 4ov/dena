

export function defaultize<T>(defaultOpts: T, customOpts: T) {
    return {
        ...defaultOpts,
        ...customOpts
    }
}


export async function fallback(fn: Function, fb?: any) {
    try {
        return await fn()
    } catch (e) {
        return fb
    }
}


export function toArray(obj: any) {
    if (Array.isArray(obj)) {
        return obj
    } else {
        return [obj]
    }
}


export function toUint8Array(obj: string | Uint8Array) {
    if (obj instanceof Uint8Array) {
        return obj
    } else {
        return new TextEncoder().encode(obj)
    }
}


export function firstOf(arr: string[], obj: { [k: string]: any }) {
    return arr.filter(a => obj[a])[0]
}