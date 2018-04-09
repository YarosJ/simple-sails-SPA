# Example of Sails.js application

An example of a single page on Sails.js with a Mongo DB on ajax, written in ES6, using less for css, Pug template engine and Webpack as a module bundler with Babel transpiler for supporting older browsers .

Dependencies
------------

The application requires `npm` version `5.8.0` or higher,  `node.js` version `9.8` or higher, [Sails v1](https://sailsjs.com), Webpack version `4.5.0`, and MongoDB version `3.6.x`.

Installation
----------------

The first step is to install dependencies:

```sh
$ npm i
```

Then perform the build:

```sh
$ webpack
```

In next step you need to install [MongoDB](https://www.mongodb.com/download-center#community), go to the folder with utilities DB (usually this is `C:\Program Files\MongoDB`) and run the database server and terminal:

```sh
$ run mongod
```

```sh
$ run mongo
```

In the database terminal for creating, enter: 

```sh
$ use solv1
```

In `config/datastores.js` in default for adapter `sails-mongo` set the DB port, for example:
`url: 'mongodb://127.0.0.1:<port>/solv1'`.

Finally, launch the application:

```sh
$ sails lift
```

Now you can go to the address: `localhost:1337`

Work application instance: https://solv-sails.herokuapp.com

### Version info

This app was originally created on Fri Apr 06 2018 15:41:39 GMT+0300 using Sails v1.0.0.



Internally, Sails used [`sails-generate@1.15.18`](https://github.com/balderdashy/sails-generate/tree/v1.15.18/lib/core-generators/new).

Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)


