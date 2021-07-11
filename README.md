
# Dena

>A library for intracting with [deta](https://deta.sh) API from deno

  
  

## Getting started

```js

import Dena from  'https://deno.land/x/dena@2.0.0/mod.ts'

  

const  dena  =  new  Dena("API_KEY", "PROJECT_ID")

  

const  users  = dena.Base("users")

const  photos  = dena.Drive("photos")

  

await users.insert({

key : "KEY", // optional

username : "mustafa"

})

  

photos.put("me.png", {

data : new  Uint8Array([0]), //Uint8Array

//OR

path : "./path-to-me.png"

})

```

  

## Supported methods

### Base

 - [x] put `Base.put`
 - [x] get `Base.get`
 - [x] delete `Base.delete`
 - [x] insert `Base.insert`
 - [x] update `Base.update`
 - [x] query `Base.query`
### Drive
- [x]  put `Drive.put`
- [ ] Initialize Chunked Upload 
- [ ] Upload Chunked Part
- [ ] End Chunked Upload
- [ ] Abort Chunked Upload
- [x] Download File `Drive.get`
- [ ] List Files
- [ ] Delete Files
