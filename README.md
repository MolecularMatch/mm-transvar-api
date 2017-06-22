# mm-transvar-api

Nodejs wrapper to the transvar application

### Manual configuration
This server spawns the transvar process that is installed on a local machine.  Therefore docker is actually kind of difficult to use in this situation since you have to execute the command either in another container (which is a pain to configure for transvar because there is so much to download and you'd never want to carry all that in a container).

Here, we just run the transvar api on the native machine that has transvar installed and setup a nginx proxy to the server to handle ssl and authentication.

See the mm-transvar-api.conf for the script that goes in /etc/init to auto-start if the machine is ever restarted.

See the docker-mm-nginx-transvar project to configure the nginx proxy to the api.