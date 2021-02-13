@echo off
set VER=1.0.5

sed -i -E "s/\"version\": \".+?\"/\"version\": \"%VER%\"/; s/\"name\": \".+?\"/\"name\": \"dismiss-the-overlay-%VER%\"/" package.json
sed -i -E "s/version>.+?</version>%VER%</; s/download\/.+?\/dismiss-the-overlay-.+?\.xpi/download\/%VER%\/dismiss-the-overlay-%VER%\.xpi/" update.xml

set XPI=dismiss-the-overlay-%VER%.xpi
if exist %XPI% del %XPI%
if exist bootstrap.js del bootstrap.js
if exist install.rdf del install.rdf
call jpm xpi
unzip %XPI% bootstrap.js install.rdf
