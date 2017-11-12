
# PrismeJS
### Presentation and transformation layer for complex/dirty API's data output


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
