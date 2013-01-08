HybridMap
=========
the half map, half weak, fully cross platform solution

### Summary
The status of ES6 Collections is messy right now. The proposal is still under discussion, few browsers already expose them with **partial implementation** and few methods are **not possible to polyfill** on older browsers and even on top of native, partially implemented, prototypes.

I am the author of the [es6-collection](https://github.com/WebReflection/es6-collections) polyfill and I will try to maintain them as frequently as possible.
However, when there are [these kind of inconsistencies](https://github.com/WebReflection/es6-collections/pull/4#issuecomment-10301363) I realize that doesn't make much sense to force a shim over unshimmable implementations so here I am with an alternative to my own polyfill.

### The HybridMap Concept
This _no strings attached_ utility is based over these, if you want personal, considerations:

  * you don't want to constantly switch between Map and WeakMap. What can be weak should be weak so you focus on something else
  * you don't want to write `m["delete"](key)` every bloody time you want to delete a key in non ES5 yet browsers. `m.del(key)` is semantically equivalent and does not break old browsers/engines syntax parsers
  * you don't want a whole library or framework
  * you don't want to change code all the time until all collections will be definitive and widely/consistently adopted
  * you do want something that just works and you need it now
  * you also want a consistent behavior across browsers, client, and server, platforms
  * finally, you definitively want good performance!

Accordingly, methods are similar to those defined by ES6 Collections specifications but might be different. Same difference you might have as example between `jQuery.each()` and `array.forEach()` when it comes to callback parameters but as it is for `each()` you can always trust your code, rather than current browser version ... deal?

### HybridMap API
In alphabetic order:

  * `clear(void):HybridMap` to remove all associated keys. Returns the instance itself
  * `del(key:any):boolean` to remove a key, if present. Returns true if it has been removed, false otherwise.
  * `get(key:any):any` to retrieve a previously stored key. Returns the associated value, if any, `undefined` otherwise
  * `has(key:any):boolean` to check if a generic key has been set before. Returns true in latter case, false otherwise
  * `set(key:any, value:any):any` to associate a generic value with a generic key. Overwrites the previously set value, if any. Returns the value that has been set

Being quite new, feel free to propose something more if you believe is that needed or some change if you think is a real code/world improvement, thanks.

### Details

  * **compatibility** node.js, rhino, IE < 9, everything else .. it's probably easier if you tell me which browser is not supported
  * **size** around 0.6 Kb gzipped
  * **license** Mit Style

### How To Include

  * in **node** after `npm install hybrid-map` simply via `var HybridMap = require("hybrid-map").HybridMap;` then `var hm = new HybridMap;`
  * in any browser simply including `build/HybridMap.js` script

### How To Tests

  * **node** `npm install wru` then `wru test/HybridMap.js`
  * **browsers** simply open `test.html` but if your browser does not support `XMLHttpRequest` via file protocol then `npm install polpetta` and then `polpetta` you can go to [http://localhost:1337/test.html](http://localhost:1337/test.html) now