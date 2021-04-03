# Food App API Service

Food API service created using Node.js with ExpressJS framework and Sqlite database.

the service consist of CRUD of two Models:
- Menu
- SubMenu

Menu and SubMenu has One-To-Many Relationships
#
## API Documentation Listed Here: 
https://documenter.getpostman.com/view/7432693/TzCP8o65

#

## Setup
for first time when running application please do following things
```
$ npm install
```
go to `/models/index.js` on `line 
54` uncomment this for first time synchronize the database. Then comment again after first run.
```
sequelize.sync({alter: true});
```


## Run
```
$ npm start
```