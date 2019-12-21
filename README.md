### Introduction

Express boilerplate for creating web apps using MVC concept and RESTFul API. This is open source, feel free to use and bought me.

### Prerequiste

-   Node.js
-   MySQL
-   Redis Server

### Installation

#### Clone

    $ git clone https://github.com/nukumalik/boilerplate_restful_api.git
    $ cd boilerplate_restful_api
    $ npm install

#### SQL

##### User Table

    create table users (
        id int(50) primary key,
        name varchar(50),
        email varchar(30),
        password varchar(50)
    );

##### Profile Table

    create table profiles (
        id int(50) primary key,
        userId int(50),
        username varchar(20),
        address text,
        phone varchar(15)
    );

#### Environtment Variable

    $ cp .env.example .env
    $ nano .env

#### Start Development

    $ npm start

#### Other Depedencies

-   bcryptjs
-   cors
-   dotenv
-   jsonwebtoken
-   morgan
-   mysql
-   passport
-   passport-jwt
-   uuid
