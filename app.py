import flask
from flask import jsonify, request
from flask_cors import CORS
import json
import pymongo
from werkzeug.middleware.proxy_fix import ProxyFix

connection = "mongodb://localhost:27017/"
client = pymongo.MongoClient(connection)

# create a movie_ratings database in mongodb
db = client["movie_ratings"]

# create a collection with movies
movieCollection = db["movies"]

initialMoviesDataFile = './movies.json'
# open file containing initial data
f = open(initialMoviesDataFile)
initialMoviesData = json.load(f)

# iterate through each object and insert it in database at the start from movie.json file
for movie in initialMoviesData:
    count = db.movieCollection.count_documents({ 'name': movie["name"].upper() })
    if (count < 1):
        overallRatings = 0
        numberOfProviders = len(movie["providers"])
        if (numberOfProviders > 0):
            for provider in movie["providers"]:
                overallRatings += provider["ratings"]
            movie["overallRatings"] = overallRatings / numberOfProviders
        insertMovie = db.movieCollection.insert_one(movie)
    else:
        print('movie already exists in the database')




app = flask.Flask(__name__)
app.config["DEBUG"] = True

app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1,
                        x_port=1, x_for=1, x_host=1, x_prefix=1)

CORS(app)

""" Default route """
@app.route('/api', methods=['GET'])
def home():
    return "<h1>Movies with ratings</h1><p>This site is a prototype API for movie ratings by users/providers.</p>"


""" Get all movies from the database """
@app.route('/api/get_all', methods=['GET'])
def get_all_movies():
    allMoviesCursor = db.movieCollection.find({})
    movies = {}
    for movie in allMoviesCursor:
        movies[movie["name"]] = {"name" :movie["name"], "providers": movie["providers"], "overallRatings": movie["overallRatings"]}
    return jsonify(movies), 200


""" Get request to find score for a movie from a provider and this accepts data as form data """
@app.route('/api/get_requested_movie', methods=['GET'])
def get_requested_movie():
    if (request.args.get('movie') and request.args.get('provider')):
        movieName = request.args.get('movie').upper()
        providerName = request.args.get('provider')
        movie = db.movieCollection.find_one({ "name": movieName })
        providerScore = {}
        # check if there is any provider for that movie
        if (len(movie["providers"]) > 0):
            for provider in movie["providers"]:
                if provider["user_name"] == providerName:
                    providerScore["score"] = provider["ratings"]
        return jsonify(providerScore), 200
    else:
        return jsonify({'message': 'parameters is/are missing'})

""" Get request to find score for a movie from a provider and this accepts data as form data """
@app.route('/api/add_ratings', methods=['POST'])
def add_ratings():
    if (request.form.get('movie') and request.form.get('provider') and request.form.get('score')):
        movieName = request.form.get('movie').upper()
        providerName = request.form.get('provider')
        providerScore = float(request.form.get('score'))
        movie = db.movieCollection.find_one({ "name": movieName })
        newProvider = { "user_name": providerName, "ratings": providerScore, "status": "submitted" }
        if movie:
            if (len(movie['providers']) >= 1):
                for provider in movie['providers']:
                    if (provider["user_name"] == providerName):
                        updateProvider = { "$set": { provider["ratings"]: providerScore } }
                        db.movieCollection.update_one({"_id": movie["_id"], "providers.user_name": providerName}, { "$set": { "providers.$.ratings": providerScore } })
                        updateMovie = updateMovieRatings(movieName)
                        break
                    else:
                        addProvider = { "$push": {'providers': newProvider}}
                        db.movieCollection.update_one({"_id": movie["_id"]}, addProvider)
                        # update overall ratings of a movie if a new provider is added
                        updateMovie = updateMovieRatings(movieName)
                        break
            else:
                addProvider = { "$push": {'providers': newProvider}}
                db.movieCollection.update_one({"_id": movie["_id"]}, addProvider)
                # update overall ratings of a movie if a new provider is added
                updateMovie = updateMovieRatings(movieName)
        else:
            # insert movie if not in database with a new provider
            newMovie = {
                "name": movieName,
                "overallRatings": providerScore,
                "providers": [
                    newProvider
                ]
            }
            db.movieCollection.insert_one(newMovie)
        
        return jsonify({ 'message': 'Movie has been added!' }), 200
    else:
        return jsonify({'message': 'parameters is/are missing'})



""" Update movies with the overall rating whenever a provider is added """
def updateMovieRatings(movieName):
    movie = db.movieCollection.find_one({ "name": movieName })
    overallRatings = 0
    numberOfProviders = len(movie["providers"])
    if (numberOfProviders > 0):
        for provider in movie["providers"]:
            overallRatings += float(provider["ratings"])
        overallRatings = overallRatings / numberOfProviders
    updateRatings = { "$set": {'overallRatings': overallRatings}}
    db.movieCollection.update_one({"_id": movie["_id"]}, updateRatings)
    return "movie_updated"


app.run()

if __name__ == '__main__':
    #define the localhost ip and the port that is going to be used
    # in some future article, we are going to use an env variable instead a hardcoded port 
    app.run(host='0.0.0.0', port=5000, debug=True,threaded=True)