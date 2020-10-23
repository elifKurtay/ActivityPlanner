# ActivityPlanner

This is an internship project made in TÜBİTAK BİLGEM YTE. The project was about making a social web application where people can organize and attend activities. The website was targeted to be used in company event organization. There was a guideline for the project which can be found in the summer internship report.

## Software Technologies Used and Installition
The project consisted of three major stages: database, backend, and frontend.

The frontend is developed in Visual Studio using JavaScript. Frontend stage of this project includes user interface (UI), allocation states of the UI components, and managing data in the database by making HTTP requests. The frontend runs on local server (from localhost:3000 port) in this project. Libraries named React and Axios is used in frontend. Click [here](https://en.reactjs.org/) to learn more about React JS.

The backend is developed in IntelliJ IDE in Java. “Spring Boot” is used for the backend development of this project. This tool makes it very easy to create a stand-alone, production-grade Spring based applications. Click [here](https://spring.io/projects/spring-boot) to learn more about Spring. If you are not going to clone this repository, you need to first initialize Spring through [this link](https://start.spring.io/). Create a maven project in Java 14 with Spring Boot 2.3.4. Before generating the project, you need to add the dependences: 
* Spring Boot DevTools, 
* Lombok, 
* Spring Web, 
* PostgreSQL Driver and 
* Spring Security. 

After adding these to the project, I generated the project and opened it with IntelliJ IDE. These is only one additional thing to be added to the dependences and that is “mapstruct”. The dependency code of mapstruct can be found in the “pom.xml”.

The database is using PostgreSQL. Spring's "PostgreSQL Driver" is used to develop the database from the backend. Click [here](https://www.postgresql.org/) to learn more about PostgreSQL.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Creator
I created this project during my internship with my supervisors guides. I learnt a lot about web applications, databases, frontend and backend development in this project. I advice any programmer to do a full-stack development on their to laern every aspect of this work. 

Feel free to improve as you wish. :)
