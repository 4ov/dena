// import * as defaults from './defaults.ts'
// import { defaultize } from './utils/autil.ts'

import Base from './base.ts'
import Drive from './drive.ts'

class Dena {
    private key: string;
    private id: string;
    // private options: Options;
    constructor(key: string, id?: string) {
        //TODO: make sure that the way to create keys will not changed
        if(key.length === 0)throw new Error('project key is empty')
        if(!id)id = key.split('_')[0]
        this.key = key
        this.id = id
        // this.options = defaultize(defaults.options, options)
    }

    /**
     * @returns Base instance 
     */
    Base<T>(name: string) {
        return new Base<T>(this.key, this.id, name)
    }

    Drive(name: string) {
        return new Drive(this.key, this.id, name)
    }


}




export {
    Dena as default
}



