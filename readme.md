## League of Legends build manager utility module
Node module that contains utility functions for all [League of Legends build manager](https://github.com/renarsvilnis/lol-build-manager) programs across the board for isomorphic JavaScript.

### Usage
```javascript
// es5
var util = require('lol-build-manager-util');

// es6
import util from 'lol-build-manager-util';

// es6 with direct property access
import {isSubtringInString} from 'lol-build-manager-util';
```

### API
`isSubtringInString`, `isSubstringsInString`, `getScrapeModule`, `isSiteSupported`, `encodeUrlData`, `decodeUrlData`

### Tests
```bash
npm run test
```

### Publishing
```bash
# Converts from es6 to es5
# Use it before commiting
npm run build
``

### TODO
- [ ] Tests
- [ ] API documentation