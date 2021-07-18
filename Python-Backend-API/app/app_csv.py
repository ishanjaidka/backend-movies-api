import flask
from flask import jsonify, request
from flask_cors import CORS
import csv
from werkzeug.middleware.proxy_fix import ProxyFix

# csv file to be read for inital data
initialMoviesDataFile = './database/Movies.csv'


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
    movieslist = []
    # open file containing initial data
    with open(initialMoviesDataFile, newline='') as csvfile:
        # DictReader takes 1st row as headers
        csvreader = csv.DictReader(csvfile, delimiter=',')
        # iterate through each row in the Movies.csv
        for row in csvreader:
            movieslist.append(row)
    return jsonify({'movies':movieslist}), 200


""" Get request to find score for a movie from a provider and this accepts data as form data """
@app.route('/api/get_requested_movie', methods=['GET'])
def get_requested_movie():
    if (request.args.get('movie') and request.args.get('provider')):
        movieName = request.args.get('movie').upper()
        providerName = request.args.get('provider')
        providerScore = 'Movie or Provider doesn\'t exists!'
        # open file containing initial data
        with open(initialMoviesDataFile, newline='') as csvfile:
            csvreader = csv.DictReader(csvfile, delimiter=',')
            # iterate through each row in the Movies.csv
            for row in csvreader:
                if (row["movie"] == movieName and row["provider"] == providerName):
                    providerScore = row["rating"]
        return jsonify({'score': providerScore}), 200
    else:
        return jsonify({'message': 'parameters is/are missing'})

""" Get request to find score for a movie from a provider and this accepts data as form data """
@app.route('/api/add_ratings', methods=['POST', 'GET'])
def add_ratings():
    if (request.form['movie'] and request.form['provider'] and request.form['score']):
        movieName = request.form['movie'].upper()
        providerName = request.form['provider']
        providerScore = request.form['score']
        status = 'Ratings for provider already exists!'
        # open file containing initial data
        with open(initialMoviesDataFile, 'r') as csvfile:
            csvreader = csv.DictReader(csvfile, delimiter=',')
            counter = 0
            for row in csvreader:
                numberofcolumns = len(row)
                if (numberofcolumns != 0):
                    if (row["movie"] == movieName and row["provider"] == providerName):
                        counter += 1
                        break
        if (counter == 0): 
            with open(initialMoviesDataFile, 'a', newline='') as file:
                fieldnames = ['movie', 'provider', 'rating']
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                writer.writerow({ "movie": movieName, "provider": providerName, "rating": providerScore })
                status = 'Movie with ratings added!'
        return jsonify({"message": status})



if __name__ == '__main__':
    #define the localhost ip and the port that is going to be used
    # in some future article, we are going to use an env variable instead a hardcoded port 
    app.run(host='0.0.0.0', port=5000, debug='True' )