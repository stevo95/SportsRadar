Do you like doing sports, but you are missing a sports buddy? 
Are you looking for a personal trainer to guide you through your fitness journey?
Are you a personal trainer and you want to reach more customers?
<br>
SportRadar is trying to allow all of this using a simple interface and google maps API familiar to everybody.
Simply choose the location of your workout on the map, choose the sport you want to do and wait for people to join, or just 
browse the map and join any of the public events created by other users.
<br>

## Folder Structure
```
── client ** React Native Frontend built using React Native CLI
│   ├── GraphQL ** Declarations of client-side GraphQL mutations and queries
│   │
│   ├── Navigators ** Folder holding Navigator files
│   │
│   ├── assets ** Folder holding images and other project assets
│   │
│   ├── components ** Folder holding all components
│   │
│   ├── screens ** Folder holding screens divided by the navigator they belong to7
│   │   │
│   │   ├──LoginStack ** Login Stakc screens
│   │   │
│   │   ├──MainStack ** Main stack screens
│   │   │
│   │   └──ProfileStack ** Profile stack screens
│   │
│   └── App.js ** Main React Native file
│
├── server ** Apollo server backend
    ├── index.js ** Apollo server main file
    └── GraphQl ** General folder holding all Server logic
        ├──database ** General folder holding any database logic
        │  ├──database-models ** Folder holding all controllers used to access the database
        │  └──database-schemas ** Database schemas used to define the data shape of database tables
        │
        ├──resolvers ** Folder holding GraphQl resolvers
        └──schemas ** Folder holding GraphQl type definitions, mutation and query schemas


```
<br>

## Tech Stack
### Frontend
<img src="./ReadmeLogos/frontEnd/javascript.svg" height="45px"> <img src="./ReadmeLogos/frontEnd/react.svg" height="45px"> <img src="./ReadmeLogos/frontEnd/apollo.svg" height="45px"> <img src="./ReadmeLogos/frontEnd/google-maps.svg" height="45px">
<br>
### Backend
<img src="./ReadmeLogos/backEnd/javascript.svg" height="45px"> <img src="./ReadmeLogos/backEnd/apollo.svg" height="45px"> <img src="./ReadmeLogos/backEnd/graphql.svg" height="45px"> <img src="./ReadmeLogos/backEnd/postgresql.svg" height="45px"> <img src="./ReadmeLogos/backEnd/sequelize.svg" height="45px">
 
