var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var login = require('./routes/login');

var app = express();

var base_url = 'https://api.api.ai/v1'
var nexmo = require('nexmo');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/dashboard', dashboard);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
var myid;
var info;
var get_options = {
  url: 'https://api.api.ai/v1/intents',
  headers: {
    'Authorization': 'Bearer bb75324825e946c987ca99b39617e6a7'
  }
};

var put_object = {
   "userSays": [
      {
         "data": [
            {
               "text": "hey girl"
            }
         ],
         "isTemplate": false,
         "count": 0
      }
    ]
}

var put_options= {
    method: 'PUT',
    uri: 'https://api.api.ai/v1/intents/' + '7d27822d-3d57-4723-a8df-1b79809237d8',
    headers: {
        'Authorization': 'Bearer bb75324825e946c987ca99b39617e6a7',
        'Content-Type' : 'application/json; charset=utf-8'
    },
    body: JSON.stringify(put_object)
};


app.get('/intents', (req, res) => {
    request(get_options, function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        res.json(info);
      }
    });
});


app.get('send', (req, res) => {
    client = nexmo.Client(key='API_KEY', secret='API_SECRET')

    client.send_message({
      'from': 'Nexmo',
      'to': '+12138404870',
      'text': 'Arpit I am sending this from Node.js'
    })
});

app.get('/putintents', (req, res) => {
  request(put_options, function callback(error, response, body) {
    if (error) {
        console.log(error);
    }
    if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        res.send(info);
        console.log('Hey put was successful');
    }
    res.send(response);
  });
});

app.post('/update/:mystring', function (req, res) {
  var temp = { "text": req.params["mystring"] };
  var data = JSON.stringify(put_object["userSays"]);
  //put_object["userSays"][0]["data"].push(temp);
  request(put_options, function callback(error, response, body) {
    if (error) {
        console.log(error);
    }
    if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        res.send(info);
        console.log('Hey put was successful');
    }
    res.send(response);
  });
  //res.send(put_object);

});



// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var info = JSON.parse(body);
//     console.log(info.stargazers_count + " Stars");
//     console.log(info.forks_count + " Forks");
//   }
// }

request.post(
    'https://api.api.ai/v1',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(put_object)
        }
    }
);

app.post('/inbound', (req, res) => {
    handleParams(req.body, res);
});

function handleParams(params, res) {
    if (!params.to || !params.msisdn) {
        console.log('This is not a valid inbound SMS message!');
    } else {
        console.log('Success');
        let incomingData = {
            messageId: params.messageId,
            from: params.msisdn,
            text: params.text,
            type: params.type,
            timestamp: params['message-timestamp']
        };
        res.send(incomingData);
    }
    res.status(200).end();
}

module.exports = app;
