# Goodcity
## Installtion Steps for Ember-cli
1. Install node.js, if you don’t already have Node installed, you can get it from <a href="http://nodejs.org/">nodejs.org </a>
2. Once node is installed you will have npm installed as well
3. Now run `npm install -g ember-cli`
4. You might get error for access issue and it might ask you to use SUDO access
So do not try it will SUDO instead set persmissions for you path
e.g.
```
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules
```
5. Install `npm install -g bower`
Once you have done that then use command to create a new app
```
ember new myapp
```
This will install all the dependencies and it will also install phantomjs for testing.

This README outlines the details of collaborating on this Ember application.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://iamstef.net/ember-cli/](http://iamstef.net/ember-cli/).
