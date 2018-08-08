Install zeromq

Pre-requisite
Install Windows build tools globally
* Admin access is required
> npm install -g windows-build-tools
then
> npm install --save zeromq
to test is install is successful
> ​node​​ ​​-p​​ ​​-e​​ ​​"require('zeromq').version"​
If you get a version number, you're good to go


[Publish-Subscribe]
zmq-watcher-pub.js
zmq-watcher-sub.js

