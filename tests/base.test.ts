//NOTE: My first test file, I'm not sure if it's the best way to do it.


import Base from "../base.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.123.0/testing/asserts.ts";

const DETA_KEY = Deno.env.get("DETA_KEY");
const DETA_ID = Deno.env.get("DETA_ID");

assert(DETA_KEY, "DETA_KEY is not set");
assert(DETA_ID, "DETA_ID is not set");

const testBase = new Base(DETA_KEY, DETA_ID, "test_db");

Deno.test(async function base_put() {
  const result = await testBase.put({
    key: "new_key",
    name: "Dena",
    age: 2,
  });
  assert(result.processed.items.length === 1);
});

Deno.test(async function base_get() {
  const result = await testBase.get("new_key");
  assert(result.name === "Dena");
});

Deno.test(async function base_insert() {
    const result = await testBase.insert({
        name: "Dena",
        age: 2,
      });
      assertEquals(result.name, "Dena");
    
});

Deno.test(async function base_insert_exists() {
    await testBase.insert({
        key: "new_key",
        name: "Dena",
        age: 2,
      }).catch(err=>{
          assert(err.errors[0] === "Key already exists")
          
      })
    
});
  

Deno.test(async function base_delete() {
  const result = await testBase.delete("new_key");
  assertEquals(result.key, "new_key");
});


Deno.test(async function base_update() {
  const result = await testBase.update("new_key", {
    set: {
      name: "Other",
    },
  });
  assertEquals(result.key, "new_key");
});


// Deno.test(async function base_query() {
//     await testBase.query<{ key : string }>({}).then(entries=>{
//         assertEquals(entries.items.length, 2)
//         entries.items.forEach(async (entry)=>{
//             await testBase.delete(entry.key)
//         })

//     })
    
// })