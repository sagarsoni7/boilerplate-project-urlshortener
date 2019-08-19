# API Project: URL Shortener Microservice for freeCodeCamp

My project for the [URL Shortener Microservice Challenge](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice) as part of the curriculum for the APIs and Microservices Certification on [Free Code Camp](https://www.freecodecamp.org).

---

## Built With
* [Express.js](https://expressjs.com)
* [Mongoose.js](https://mongoosejs.com)
* CSS3
* HTML5


## Installation

```
$ git clone sagarsoni7/fcc-project-urlshortener.git
$ npm install
$ npm start
```

Go to `http://localhost:3000`.

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. 
3. When I visit the shortened URL, it will redirect me to my original link.


#### Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) :  url=https://www.google.com

#### Usage:

[this_project_url]/api/shorturl/3

#### Will redirect to:

https://www.MyCreatedURL.com/
