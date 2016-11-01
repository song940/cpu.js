# cpu.js

> cpu profiling library

```js
var cpu = new CPU({ delay: 100 });

cpu.on('data', function(value){
  console.log('cpu rate', value);
});

cpu.start();
```