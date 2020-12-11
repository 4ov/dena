export function  cat(fallbackValue : any, f : Function){
    try{
        return f()
    }
    catch(err){
        return fallbackValue
    }
}