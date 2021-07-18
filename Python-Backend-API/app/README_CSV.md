# Documentation for app_csv.py

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
- This REST API reads data from the Movies.csv file in the database folder
- Stores and retrieve data from Movies.csv file in the database folder

--
<a name="assump" />
# Assumptions/Prerequisites
- Python or Python3 is installed
- pip or pip3 is installed
- You have clonned this project


--
<a name="rtp" />
### Run this project
- Run cd Python-Backend-API
- Run "pip/pip3 install -r requirements.txt"
- Run this project using "python/python3 app_csv.py"
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
 | /api/get_all              | [GET]         | displays all results from Movies.csv file |
 | /api/get_requested_movie  | [GET]         | accepts 2 arguments in the url "movie" and "provider" and then returns "score" for particular "movie" and "provider" from Movies.csv |
 | /api/add_ratings          | [POST]        | accepts 3 arguments in the form data "movie", "provider" and "score" and it adds ratings for that particular movie from Movies.csv and if Movie score for that particular provider already exists it returns a message for user "Ratings for provider already exists!" |