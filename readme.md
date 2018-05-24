# Todo List RestAPI #

### Project Requirements : ###
* Nodejs

* MySQL

* Babel-node

### Description : ###

Simple Todo List Rest API ( CRUD ) with nodejs and mysql for learning purpose, very simple CRUD

### Database Migration : ###

Required : mysql-migrations package.

[Read : mysql-migrations docs here](https://www.npmjs.com/package/mysql-migrations)

There are few ways to run migrations.
  
* Run ```node migration.js up```. Runs all the pending up migrations.
  
* Run ```node migration.js up 2```. Runs 2 pending up migrations from the last position.
  
* Run ```node migration.js down```. Runs only 1 down migrations.
  
* Run ```node migration.js refresh```. Runs all down migrations followed by all up.
