FROM mysql

MAINTAINER me

ENV MYSQL_DATABASE=testbase

ADD mysql_dump.sql /docker-entrypoint-initdb.d

EXPOSE 3306