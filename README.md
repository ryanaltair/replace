# replace
a gcode replace tool for web and offline(with node)

## web
```
serve .
```
open localhost:5000 in browser

click file input

load gcode 

file will regenerate, remove everything but G0 and G1

also add F to every G1


## local 

node local.js ./xxx.gcode

the new gcode will be ./xxx.gcode.gcode
