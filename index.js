var express = require('express');    //setting up the reference for express    // calls express
var app = express(); // creating object of express   // defines our app using express
var bodyParser = require('body-parser'); //bodyParser handles the data of response and request 
var jsondata= require('./movies.json'); //giving reference to the movies.json file 
var _und = require('underscore'); // creating object of underscore
 
app.use(bodyParser.urlencoded({ extended: true }));  //This line is use to post the data or insert the data
app.use(bodyParser.json()); //this will handle the data in json format
 
var port = process.env.PORT || 9080;     //enabling the port at 3030 
 
var router = express.Router();  //creating object of router

// creating a method to read
router.get('/', function(req, res){ //defining resquest and response
res.json(jsondata); //this will return the 'jsondata' created above in json format

})

//creating a method to post
router.post('/postdata', function(req,res){
    if(req.body.Id && req.body.Title)
    {
    jsondata.push(req.body);
    res.json(jsondata);
    }
    else
    {
        console.log('please put some values to insert');
    }

})

//creating a method to update data

router.put('/updatedata/:id', function(req,res){
    if(req.params.id)
    {
    _und.each(jsondata , function(elem, index){
    if(req.params.id === elem.Id){
        elem.Title = "Random Title";
     
        elem.Director = "Random Director";
    }
     
    })
    res.json(jsondata);
    }
    else
    {
        console.log('Invalid Request');
    }
     
    })


//creating a method to delete data

router.delete('/deletedata/:id', function(req, res) {
    getindextodelete = -1;
    if(req.params.id){
 
        _und.each(jsondata, function(elem,index){
if(elem.Id === req.params.id){
    getindextodelete  = index;
  
 
}
 
        })
        if(getindextodelete > -1)
        {
            jsondata.splice(getindextodelete ,1);
        }
 
    res.json(jsondata);   
    }
    else{
        console.log('Please pass body elements with id');
    }
});    

app.use('/api',router); // using router to make app use '/' in every url instead of other symbols
app.listen(port) //defining the port in which we want to listen