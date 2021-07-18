# Code Challenge

This stage of the interview requires you to solve the following challenge. It is designed to enable us to assess a sample of your software development skills (e.g. documentation, software design, coding proficiency, testing, version control usage).

Please read the instructions carefully.

## Considerations

- You are free to make reasonable assumptions or design decisions to complete the challenge. Please document all assumptions, decisions and rationale. 
- We request that you use Python & ReactJs w/ TypeScript. These are the primary programming languages/frameworks we use.
- We expect to see professional-quality code (e.g. testable, maintainable, extensible). 
- We encourage you to ONLY implement the requested features. 
- We encourage you to include evidence that your solution is correct (e.g. correctly handles the sample inputs). 
- We commit to a fair interview process for everyone. Please help us by not sharing or publishing these challenges. 

## Submission requirements:

1. We must be able to build and run your source code. Please include detailed build and run instructions.
2. Please commit all required source code and supporting documentation (including a brief explanation of your design and assumptions).
3. The algorithms that deliver the required functionality must be your code; not an external library.  
   *Note*: You may use external libraries to test your solution or to implement the supporting infrastructure (e.g. flask, graphql, pytest).

 
# THE CHALLENGE:

# Part One:
We receive movie scores from a variety of critics. In return our suppliers can request from us a movie scores from any critic (including their own). Currently this is a manual process. We would like to automate this by accepting & serving the data via an API. 

The trouble is we don’t know how to build a good API. For example: What the interface ought to be. What protocol to use (SOAP? REST? GraphQL?). How to store the data so the API can serve it. 

**YOUR TASK:** Your task is to create a suitable system that our suppliers can easily query over the internet to create & get movie scores.

**Sample Expected Input for Retreiving a Score:**

- `movie`
- `provider`

**Sample Expected Retreiving Output:**

- `score`

**Sample Expected Input for Storing a Score:**

- `movie`
- `provider`
- `score`

**Sample Expected Storing Output:**

- `movie`
- `provider`
- `score`

**Sample Data:** 

movie|provider|score
-----|--------|------ 
RAMBO|ROTTEN TOMATOES|8.80 
RAMBO|IMDB|7.70 
RAMBO|METACRITIC|6.10 
RAMBO II|IMDB|6.50 
RAMBO II|ROTTEN TOMATOES|3.80 
RAMBO II|METACRITIC|4.70 
RAMBO III|IMDB|5.80 
RAMBO III|ROTTEN TOMATOES|3.90 
LOVE ACTUALLY|IMDB|7.60 
LOVE ACTUALLY|ROTTEN TOMATOES|6.30 
LOVE ACTUALLY|METACRITIC|5.50 
LOVE IS ALL YOU NEED|IMDB|6.50 
LOVE IS ALL YOU NEED|ROTTEN TOMATOES|7.50 
JAWS|IMDB|8.00 
JAWS|ROTTEN TOMATOES|9.80 
WHAT DREAMS MAY COME|IMDB|7.00 
WHAT DREAMS MAY COME|ROTTEN TOMATOES|5.40 
KILLING ME SOFTLY|IMDB|5.50 
THE WHOLE NINE YARDS|ROTTEN TOMATOES|4.50 
THE SHINING|IMDB|8.40 
THE SHINING|ROTTEN TOMATOES|8.70 
THE SIMPSONS|METACRITIC|8.00 
AMELIE|ROTTEN TOMATOES|8.90 
AMELIE|METACRITIC|6.90 
CHOCOLAT|IMDB|7.30 
CHOCOLAT|METACRITIC|6.40 
 
**Sample Retreiving Request:**  
`GET` movie=Rambo&provider=IMDB 

**Sample Expected Retreiving Output:**  
`7.7`

**Sample Storing Request:**  
`POST`
```
{
   "movie": "BEE MOVIE",
   "provider": "IMDB",
   "score": 9.7
}
```

**Sample Expected Storing Output:**  
```
{
   "movie": "BEE MOVIE",
   "provider": "IMDB",
   "score": 9.7
}
```
(along with the side effect that this is now retrievable)

The above are just samples of what an output might look like, yours may vary depending on your exact implementation/technologies used.

# Part Two:
Some of our customers are not as tech savvy enough to use API’s sadly, so for them we’d like to provide them with a graphical user interface over our API service. 

**YOUR TASK:** Your task is to create a React App which will interact with the API you’ve just built. It must allow a user to retrieve a `score` for a given `movie` and `provider`, it also must allow for users to add an entry by providing a `movie`, `provider` & a `score`; which in turn will allow for a user to retrive it once stored.