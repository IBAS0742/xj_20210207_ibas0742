const fs = require('fs');

fs.writeFileSync("dist/index.html",fs.readFileSync("dist/index.html",'utf-8').replace('./lib/config/devUrls.js','./lib/config/urls.js'),'utf-8');
fs.writeFileSync("dist/map.html",fs.readFileSync("dist/map.html",'utf-8').replace('./lib/config/devUrls.js','./lib/config/urls.js'),'utf-8');