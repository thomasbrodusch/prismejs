![prismejs_logo](https://user-images.githubusercontent.com/3238312/32701237-2ba0912e-c7d2-11e7-9236-8c397528ad44.png)

### PrismeJS — A presentation and transformation layer for complex/dirty API's data output.


 * Author — Thomas Brodusch
 * License — MIT


### How to use PrismeJS
##

**1. Grab the lib using your favorite package manager**
```javascript
yarn add prismejs
```

or

```javascript
npm install prismejs
```

***Have a look on `examples/` or `test/`for more explanations !***
You can also `npm run examples` to watch PrismeJS in action.

**2. Use it in your code like a charm**
```javascript
import prismejs from 'prismejs';
import userModel from 'myPrismeModels/user';

// New instance of PrismeJ
const Prisme = new prismejs();

// Example from an api fetched data.
fetch('http://api.myapp.com/users').then(function(response) {
  // Insert your dirty data, PrismeJS will format it using your pretty userModel !
  return Prisme.format(response.data, userModel); 
})

```

### How to contribute on PrismeJS ?
##

**Steps:**
* Fork this repo
* Code some new stuff 
* `npm run dev` to develop 
* `npm run test:watch` to run tests
* `npm run build` to generate a builded version
* Make a **Pull Request** on `branch develop` (we using the git-flow branching structure)
* Don't forget to **implement some tests** on `test/` folder 
