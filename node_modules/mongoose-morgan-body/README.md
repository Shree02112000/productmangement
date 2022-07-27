# mongoose-morgan-body

# Install

To install this package just run:

```npm install mongoose-morgan-body```

# Basic usage example

Here is an example of using mongoose-morgan-body together with the express app:

```
// express
var express = require('express');
var app = express();

// mongoose-morgan-body
var morgan = require('mongoose-morgan-body');

// connection-data
var port = process.env.port || 8080;

// Logger
app.use(morgan({
    connectionString: 'mongodb://localhost:27017/logs-db'
}));

// run
app.listen(port);
console.log('works... ' + port);
```

The example from the above will create inside `logs-db` database collection called `logs` and will store data inside it.

# Detailed usage

[mongoose-morgan-body](https://www.npmjs.com/package/mongoose-morgan-body) is accepting three parameters:

- mongoData : object type with next properties
    - required {string} connectionString
    >- optional {string} collection
    >- optional {string} user
    >- optional {string} pass
    >- optional {bool} capped 
    >- optional {int} cappedSize 
    >- optional {int} cappedMax 
    >- optional {string} dbName 
    >- optional {bool} useNewUrlParser (default: true)
    >- optional {bool} useUnifiedTopology (default: true) 
- options : object type - [standrad morgan options](https://github.com/expressjs/morgan#options)
- format : string type - [standrad mrogan format](https://github.com/expressjs/morgan#predefined-formats)

Example without morgan options:

```
app.use(morgan({
    connectionString: 'mongodb://localhost:27017/logs-db'
   }, {}, 'short'
));
```

Full example:

```
app.use(morgan({
    collection: 'error_logger',
    connectionString: 'mongodb://localhost:27017/logs-db',
    user: 'admin',
    pass: 'test12345'
   },
   {
    skip: function (req, res) {
        return res.statusCode < 400;
    }
   },
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
));
```

If you want to store data in db in seperate fields, 

format: `':method === :url === :status === :response-time ms === :res[content-length] === :body  === :resBody  === :req[content-length]'`

Data will store in following format in DB:
```
        date: {
            type: Date,
            default: Date.now
        },
        log: String,
        endpoint: String,
        method: String,
        bodySize: String,
        responseCode: String,
        responseTime: String,
        requestBody: Object,
        responseBody: Object,
```

The code above will log only data in `dev` format and will skip all the logs if the response status code is less than 400. Data will be stored in `logs-db` database in `error_logger` collection.

# [Contribution](https://github.com/nemanjapetrovic/mongoose-morgan-body/blob/master/CONTRIBUTING.md)

Feel free to contribute by forking this repository, making some changes, and submitting pull requests. For any questions or advice place an issue on this repository.

# License

  [MIT](LICENSE)
