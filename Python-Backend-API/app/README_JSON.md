# Documentation for app_json.py

##### Table of contents
<!-- toc -->
- [Read it first](#rif)
- [Assumptions/Prerequisites](#assump)
- [Run this project](#rtp)
- [Properties](#props)
- [Methods](#methods)

<!-- tocstop -->

--
<a name="rif" />
# Read it first
- This REST API provides movie ratings by users/providers
- This REST API initially adds data to the database from movies.json file in the reqpository
- Stores and retrieve data into MongoDB with database name "movie_ratings"
- Stores and retrieve data from collection name "movies" 


--
<a name="assump" />
# Assumptions/Prerequisites
- Python is installed
- MongoDB is installed
- MongoDB is running on port 27017 without Authentication


--
<a name="rtp" />
### Run this project
- Clone this project
- Make sure this API is running on localhost or any ip as wanted
- Run this project using "python app_json.py"
- Project will run on http://localhost:5000 and use this url befor the api methods as mentioned below


--
<a name="props" />
# Properties
 - movie
 - provider
 - score


--
<a name="methods" />
 # Methods
 | API Call                  | REQUEST       |        |
 | ------------------------- | ------------- |------- |
 | /api/get_all              | [GET]         | displays all results in the collection name "movies" |
 | /api/get_requested_movie  | [GET]         | accepts 2 arguments in the url "movie" and "provider" and then returns "score" for particular "movie" and "provider" |
 | /api/add_ratings          | [POST]        | accepts 3 arguments in the form data "movie", "provider" and "score" and it adds ratings for that particular movie and if Movie score for that particular provider already exists it overwrites the existing score in the database" |
