/*************************************************************************************************************************************************
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
  
*************************************************************************************************************************************************/

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
Building our microservice:

Microservices architecture/framework involves breaking an application down into it's main aspects/functionalties, ie services, and building a
a small, independently deployed service/module for each of them. 
Thus each microservice is lightweight and loosely coupled. They handle the functionalities/actionas of a single service/aspect of the application
and often talk to each other using lightweight mechanisms.

The key aspect of microservices are that they handle only a single aspect/business capability, allowing them to be small and developed and deployed 
independently by a small team. It has it's codebase and usually it's own database.

An importatnt step of utilizing a microservice architecture is divide our applications into multiple business capabilities / core functionalities,
which then are captured by the microservices. These microservices should provide functionalities only relevant to it's sub-domain. If a microservice 
is having a high number of functionalities, It basically means that the sub-domain represented by it must be further broken down. Thus dividing our 
application into proper sub-domains is very important such that the microservices formed are large enough to be cohesive ( and loosely coupled) and 
small enough to be lightweight and developed by a small team.

Refer this for more: https://medium.com/platform-engineer/microservices-design-guide-eca0b799a7e8

Ex: Suppose you're building an application for a Mulitplex chain. The sub-domains can be broadly defined as:
Theatres: (Individual theatres and screens, shows scheduling and seat management)
Movies: (All actions pertaining to movies, their versions and their data management/retrieval)
Management: (Employee data, shifts ans schedules, leaves)
Tickets: (Ticket booking all all kinds of tickets, receipts)
Payment: (all forms of payment)
Review System: (ratings and reviews for the multiplex)

Shown below is a sample structure for the movie microservice:
*/

app.get('/movies',(req,res)=>{
    /* Route to retrieve all movies */
    res.send({movies:['dabang','Avengers','Jumanji','Star wars']})
})

app.get('/movie/:id',(req,res)=>{
    /* Route to get an individual movie*/
})

app.post('/movie/add',(req,res)=>{
    /* Route to add a movie */
})

app.post('/movie/:id/update',(req,res)=>{
    /* Route to update a movie */
})

app.get('movie/:id/delete',(req,res)=>{
    /* Route to delete a movie*/
})

app.get('/movie/:id/versions',(req,res)=>{
    /* Route to retrieve all versions of a movie */
})

app.post('/movie/:id/addversion',(req,res)=>{
    /* Route to add a version */
})

app.get('/movies/toprated',(req,res)=>{
    /* Route to get top rated movies */
})

app.get('/movie/:id/reviews',(req,res)=>{
    /* Route to get reviews of a movie */
})

app.post('movie/:id/rate',(req,res)=>{
    /* Route to post a rating of a movie */
});



/* 
Other functionalities can be added based on the scope and relevance for your application. The ones shown above are samples to give a brief 
idea of how to design the functionalities/routes for a microservice.
*/


/*
Staring up our server/microservice:
The following peice of code starts up our server, tells which port to listen to and a callback on successful deployment
*/
app.listen(5050,function(){
    console.log("Listening on port 5050");
})

