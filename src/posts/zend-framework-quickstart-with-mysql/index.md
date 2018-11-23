---
title: 'Zend Framework Quickstart with MySQL'
date: '2012-01-08T08:03:53.000Z'
tags: ['code', 'coding', 'mysql', 'php', 'the web', 'zend framework']
author: 'jesstelford'
---

The [Zend Framework Quickstart](http://framework.zend.com/docs/quickstart) guide is a great place to start with the Framework, however it bases the example program on SQLite. As MySQL is the choice of the rest of the world (and even Zend's own Stack installation), here is the Zend Framework Quickstart done with MySQL. This information is based on the Zend Framework Quickstart ["Create a Model and Database Table"](http://framework.zend.com/manual/en/learning.quickstart.create-model.html 'Create a Model and Database Table') step, and is designed to simply replace the SQLite information with the relevant MySQL version.

## Initializing the Db Resource

When initializing the Db Resource, we'll set it up to use MySQL connection information.

```sh
$ zf configure db-adapter "adapter=PDO\_MYSQL&dbname=\[PROD\_DBNAME\]&host=localhost&username=\[PROD\_USER\]&password=\[PROD\_PASS\]" production
$ zf configure db-adapter "dbname=\[TEST\_DBNAME\]&username=\[TEST\_USER\]&password=\[TEST_PASS\]" testing
$ zf configure db-adapter "dbname=\[DEV\_DBNAME\]&username=\[DEV\_USER\]&password=\[DEV_PASS\]" development
```

Alternatively, to use the same MySQL user for each database:

```sh
$ zf configure db-adapter "adapter=PDO\_MYSQL&dbname=\[PROD\_DBNAME\]&host=localhost&username=\[PROD\_USER\]&password=\[PROD\_PASS\]" production
$ zf configure db-adapter "dbname=\[TEST_DBNAME\]" testing
$ zf configure db-adapter "dbname=\[DEV_DBNAME\]" development
```

Replacing the \[\*\_DBNAME\], \[\*\_USER\], \[\*_PASS\] where appropriate (these should correspond to the following MySQL commands). This will update your \_application/configs/application.ini_ for you.

## Create the schema & data

Skip making the _data/db/_ directory, it isn't necessary for MySQL. Instead, create the following files: _scripts/schema.mysql.sql_

```sql
DROP TABLE IF EXISTS guestbook;

CREATE TABLE guestbook (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(32) NOT NULL DEFAULT 'noemail@example.com',
    comment TEXT NULL,
    created DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE INDEX id ON guestbook(id);
```

and _scripts/data.mysql.sql_

```sql
INSERT INTO guestbook (email, comment) VALUES
('ralph.schindler@zend.com', 'Hello! Enjoy this sample zf application!', '2012-01-01 00:00:00'),
('foo@bar.com', 'Baz baz baz, baz baz Baz baz baz - baz baz baz.', '2012-01-01 00:00:00');
```

## Initialize the databases

For each Database, execute the following commands (type 'exit' once done):

```sh
$ mysql -u root -p
mysql> DROP DATABASE IF EXISTS \[DBNAME\];
mysql> CREATE DATABASE \[DBNAME\];
mysql> USE \[DBNAME\];
mysql> SOURCE scripts/schema.mysql.sql;
mysql> SOURCE scripts/data.mysql.sql;
```

Then, create the users and give them permission:

```sh
$ mysql -u root -p
mysql> CREATE USER '\[USER\]'@'localhost' IDENTIFIED BY '\[PASS\]';
mysql> GRANT ALL ON \[DBNAME\].* TO '\[USER\]'@'localhost';
```

Note that if you are using the same user for each database, then only execute the `CREATE USER` command once, and the `GRANT USER` command for each \[\*\_DBNAME\].

## Continue the Quickstart tutorial

Keep going with the Quickstart from the creation of the `Zend_Db_Table`.
