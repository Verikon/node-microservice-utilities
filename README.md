Provided are:

### awaitURL ( url, options )
This returns a promise when the url goes live.

options is an object with the following properties:
    retries?:number - acceptable amount of attempts before erroring out - default, infinity.
    retryInterval?:number - amount of milliseconds between each attempt - default 3000 (3 seconds)
    silent?:boolean - do not console status out on each attempt, default true.

```
let ready;
awaitURL('http://google.com', {silent:false)).then(_=> ready = true);
```
