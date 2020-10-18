# Deta ❤️ Deno = Dena
## A promise based Deta http api wrapper for deno.

[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/dena)


### Simple Usage

```javascript
import Deta from 'https://deno.land/x/dena@1.0.2/mod.ts';
// or 
import Deta from 'https://x.nest.land/dena@1.0.2/mod.ts';
//or
import Deta from 'https://raw.githubusercontent.com/lowray/dena/main/mod.ts';


const db = new Deta('PROJECT_KEY', 'PROJECT_ID', 'DB_NAME' );
console.log(await db.get('helloDeta'))
```


### methods
* get
```javascript
db.get('KEY')
.then(val=>{
    console.log(val)
})
.catch(err=>{
    console.log(err)
})
```

* insert
```javascript
db.insert({
    fname : 'john',
    lname : 'doe'
}).then(success=>{
    console.log(success)
})
.catch(fail=>{
    console.log(fail)
})
```
* put
```javascript
db.put([
    {someKey : 'someVal'},
    /* ... */
]).then(success=>{
    console.log(success)
})
.catch(fail=>{
    console.log(fail)
})
```

* query
```javascript
db.query([
    {"fname" : "john"}
],
//options not required (just like the http api)
{
    limit : 5
}
).then(val=>{
    console.log(val)
})
.catch(err=>{
    console.log(err)
})
```
* update
```javascript
db.update('KEY', {set : {name : "John"}}).then(val=>{
    console.log(val)
})
.catch(err=>{
    console.log(err)
})
```
### Known bugs:
> You'll recive an error if you tried to update a key that dosen't exist.

### Final words
Dena is not an official driver,  
I'ts a simple lib to help you explore this awesome platform.  
You can get detailed documentation about these methods from official [Deta docs](https://docs.deta.sh/docs/base/http/)