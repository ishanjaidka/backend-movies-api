# Documentation
- This API provides movie ratings by users/providers
- This API initially adds data to the database from movies.json file in the reqpository
- Stores and retrieve data into MongoDB with database name "movie_ratings"
- Stores and retrieve data from collection name "movies" 

# Prerequisite
- MongoDB is installed
- MongoDB installed and running on port 27017 without Authentication

# Properties
 - movie
 - provider
 - score

 # Methods
 * /api/get_all - [GET] Displays all results in the collection name "movies"
 * /api/get_requested_movie - [GET] accepts 2 arguments in the url "movie" and "provider" and then returns "score" for particular "movie" and "provider"
 * /api/add_ratings - [POST] accepts 3 arguments in the form data "movie", "provider" and "score" and it adds ratings for that particular movie