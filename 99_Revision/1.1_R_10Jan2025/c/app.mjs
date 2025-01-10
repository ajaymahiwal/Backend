import name, {value1} from "./math.mjs";

console.log(value1);
console.log(name);

/*

import {value1} from "./math.js";
        ^^^^^^
SyntaxError: Named export 'value1' not found. The requested module './math.js' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from './math.js';
const {value1} = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:123:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:191:5)
    at async ModuleLoader.import (node:internal/modules/esm/loader:337:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:106:12)

Node.js v18.20.2

*/



import * as my_math_pkg from "./math.mjs";

console.log(my_math_pkg);
console.log({...my_math_pkg});

/**
 
The phrase `[Module: null prototype]` refers to a specific type of object in JavaScript when you're working with ES Modules (using `import`/`export` syntax).

When you import an ES Module (e.g., `import * as my_math_pkg from "./math.mjs";`), Node.js or other environments may show the imported module as an object with a `null prototype`. This is because the module's internal structure is designed to not inherit from the default JavaScript `Object` prototype, meaning that the imported object doesn't have methods like `toString()` or `hasOwnProperty()`, which are typically available on regular JavaScript objects.

In your example:

```js
import * as my_math_pkg from "./math.mjs";
```

The `my_math_pkg` object is the result of the import, and its prototype is explicitly set to `null`. This is done for performance and security reasons, ensuring that the module's properties are only those explicitly exported from the module (in this case, the functions or values in `math.mjs`), without inheriting any potentially harmful or unnecessary methods from the `Object` prototype.

In simpler terms:

- **`[Module: null prototype]`** just tells you that the imported module's object has no prototype, which is different from a regular object that inherits properties from `Object.prototype`.
- It doesn't affect the module's functionality, but it's a detail of how modules are handled internally.

For instance, if you log the imported object, you might see something like this:

```js
console.log(my_math_pkg);
```

Output might look like this:

```js
[Module: null prototype] { default: 'ajay', value1: 23 }
```

This simply shows that `my_math_pkg` has a `default` export of `'ajay'` and a `value1` export with a value of `23`.

 */