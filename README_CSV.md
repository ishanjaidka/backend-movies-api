# Documentation
- This API provides movie ratings by users/providers
- This API initially adds data to the database from movies.json file in the reqpository
- Stores and retrieve data into MongoDB with database name "movie_ratings"
- Stores and retrieve data from collection name "movies" 

# Assumptions
- Movies.csv is present in the database folder
- Movies.csv has Headers as "movie", "provider", "rating"
- Movies.csv has atleast one row with the data

# Properties
 - movie
 - provider
 - score

 # Methods
 | API Call                  | REQUEST       |        |
 | ------------------------- | ------------- |------- |
 | /api/get_all              | [GET]         | displays all results from Movies.csv file |
 | /api/get_requested_movie  | [GET]         | accepts 2 arguments in the url "movie" and "provider" and then returns "score" for particular "movie" and "provider" from Movies.csv |
 | /api/add_ratings          | [POST]        | accepts 3 arguments in the form data "movie", "provider" and "score" and it adds ratings for that particular movie from Movies.csv and if Movie score for that particular provider already exists it returns a message for user "Ratings for provider already exists!" |