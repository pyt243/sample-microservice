/********************************************************************************************
 A GUIDE TO CREATE A MICROSERVICE

 This microservice is based on nodejs and express(as it's framework)
 

 Create a directory for your service and access/enter it via your terminal
 
 Initialize your repository by executing the command 'npm init'
 
 This creates a package.json file while acts a brief documentation and requirements file. This contains information such as start and test
 scripts, dependencies and dev-dependencies (node packages with versions) and other brief description.
 This acts as your requirements file and helps you to set up environment easily,hence it makes our code portable (the environment ie. node_modules
 need not be moved as a new environment xcan be set up by running the command 'npm install .' which downlads and sets up all the packages required
 using the package.json)

 the main packages that we are going to be using are express, body-parser and cors. You can find their uses and documentation online
 the packages are installed using the command 'npm install express body-parser cors'
  
 ***********************************************************************************************/

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express(); //This is our server object

/*
Middleware section:
Here we specify our middleware, middlewares are basically functions that modify request and response objects and some processing before
they are handled by our routes

body-parser provides middleware to modify the data sent as part of the requests to that is appears/oraganized and easily accessed 
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());



/*
ROUTES:
Routes are basically the endpoints of our server, when any client having access to our server can use tto access the services and functionalties
of our server.
There are mainly four types of routes:get,post,put and delete. But mainly get and post are used.

Note: The 3 routes present below are samples and not part our microservice functionality
*/

//Get routes are used to request some data/service from the server. The client usually does not provide and data along with this request

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/welcome",(req,res)=>{
    /*
    Route logic
    */
    res.send({message:"Hello, and welcome to sample microservice"});
});

//Post routes are maily used to transfer from data from client to server, part of the request.
//using which, the server serves the client. Usually used to add some data to DB or retrieve wrt some data provided by the client
//The data sent by the client is present in req.body (Thanks to body-parser)

app.post("/adduser",(req,res)=>{
    var obj = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    console.log(req.body);
    /*
        Database logic to add our new user to our database
    */

    res.send({status:true,newUser:obj});
})


/*
Staring up our server:
The following peice of code starts up our server, tells the port to listen to and a callback on successful deployment
*/
app.listen(5050,function(){
    console.log("Listening on port 5050");
})

