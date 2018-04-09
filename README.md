# Example of Sails.js application

Пример одностраничника на Sails.js с БД Mongo на ajax, написанное на ES6, использующее в качестве шаблонизатора Pug, в качестве сборщика Webpack а для поддержки более старыми браузерами транспайлер Babel.

Зависимости
------------

Для работы приложения требуется `node.js` версии `9.8` или выше, [Sails v1](https://sailsjs.com), Webpack версии `4.5.0`, а так же MongoDB версии `3.6.x`.


Установка
----------------

В первую очередь необходимо установить зависимости:

```sh
$ npm i
```
Далее необходимо выполнить сборку:

```sh
$ webpack
```

После чего необходимо зайти в папку с сервером и запустить сервер базы данных и при необходимости создать новую БД:

```sh
$ run mongod
```

```sh
$ run mongo

```
И наконец запустить приложение:

```sh
$ sails lift
```
И перейти по адресу localhost:1337


### Version info

This app was originally created on Fri Apr 06 2018 15:41:39 GMT+0300 using Sails v1.0.0.



Internally, Sails used [`sails-generate@1.15.18`](https://github.com/balderdashy/sails-generate/tree/v1.15.18/lib/core-generators/new).

Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)


