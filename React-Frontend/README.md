# Documentation

##### Table of contents
<!-- toc -->
- [Read it first](#rif)
- [Run this project](#rtp)
- [Functionalities in the project](#fitp)
- [Assumptions](#assump)

<!-- tocstop -->


--
<a name="rif" />
## Read it first
- This is a React project
- This project is a Front End for giving ratings for movies which is stored in the database

--
<a name="rtp" />
### Run this project
- Clone Python API from another project 
- Clone this project
- Make sure Python API is running on localhost or any ip as wanted
- Copy the Python API URL and paste in the environment file in the APIEndpoint in this project
- Run npm install for installing all the required packages
- Run this project using npm start

--
<a name="fitp" />
### Functionalities in the project
- Landing page will have all the movies listed with Overall Ratings for each movie
- User can click on Show Details of a particula moive to check which provider/user has rated that movie
- Search functionality works with movie and provider field not empty and a snackbar with provider's/user's score for that movie will be visible for 5 seconds
- User will be able to see the only movie listed when searched and if found in the database with only provider's/user's rating as overall rating
- Reset button next to search button will take user to the landing page when there is one movie listed on the page because of search
- Submit score will open up a form for provider/user to submit a rating for movie
- If provider/user already has a rating submitted for a particular movie, the snackbar will show a message that 'Ratings for provider already exists!'
- If a movie's rating is added and successfully saved in the database user will be shown a snackbad with a message that 'Movie with ratings added!' and movies list will be automatically refreshed.

--
<a name="assump" />
### Assumptions
- Node and npm is installed
- API is running on backend in (Python)
