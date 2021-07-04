import { Options } from './types.ts'
import * as defaults from './defaults.ts'
import { defaultize } from './utils/autil.ts'

import Base from './base.ts'
import Drive from './drive.ts'

class Dena {
    private key: string;
    private id: string;
    private options: Options;
    constructor(key: string, id: string, options: Options = {}) {
        this.key = key
        this.id = id
        this.options = defaultize(defaults.options, options)
    }

    /**
     * @returns Base instance 
     */
    Base(name: string) {
        return new Base(this.key, this.id, name, this.options)
    }

    Drive(name: string) {
        return new Drive(this.key, this.id, name, this.options)
    }


}




export {
    Dena as default
}



