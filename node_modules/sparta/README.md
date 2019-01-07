# sparta

sparta is a minimalistic spatial calculation library for node.js. Currently it supports the calculation of bounding boxes based on the python code from Federico Ramponi (http://stackoverflow.com/a/238558). More features coming soon.

# usage
``` js
  sparta = require('sparta')
  // return a bounding box of Placa Catalunya, Barcelona with a radius of 1km.
  sparta.boundingBox(41.386549,2.170004,1);
  
```

# test
``` js
  npm install mocha should
  mocha
```