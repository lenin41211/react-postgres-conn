let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cors = require('cors');
const  port = 3000;
 
 const pool = new pg.Pool({
  host: 'localhost',
  database: 'testdb',
  user: 'postgres',
  password: 'root',
  port: 5432,
  //max: 20, 
 });

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(morgan('dev'));
app.use(cors());

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/*app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.get('/api/students', function (request, response){
  pool.connect((err, db, done) => { 
  
  if(err) {
    return console.log(err);
    //return response.status(400).send(err);
  }
  else {
    db.query('select * from student', (err,result) => {
      done();
      if(err) {
        //return console.log(err);
        return response.status(400).send(err);
      }
      else {
        //console.log(res.rows[0].name);
        response.status(200).send(result.rows);
      }
    })
  }
 })
})

app.delete('/api/remove', function (request, response) {
  var id =request.body.id;
  console.log(id);
  pool.connect((err, db, done) => { 
  
  if(err) {
    return console.log(err);
    //return response.status(400).send(err);
  }
  else {
    db.query('delete from student where id = $1', [id], (err,result) => {
      done();
      if(err) {
        return console.log(err);
        //return response.status(400).send(err);
      }
      else {
        //console.log(res.rows[0].name);
        console.log('Student Deleted');
        //db.end();
        response.status(201).send({message: 'Student Deleted'});
      }
    })
  }
 })


});

app.post('/api/addstu', function (request, response) {
   //console.log("Got a POST request for the homepage");
   //res.send('Hello POST');
   console.log(request.body);
  
  var student_name = request.body.name;
  var student_id = request.body.id;
  var student_rno = request.body.rollnumber;
  let values = [student_id,student_name,student_rno];
  
  console.log(values);

  pool.connect((err, db, done) => { 
  
  if(err) {
    return console.log(err);
    //return response.status(400).send(err);
  }
  else {
    db.query('insert into student (id, name, rollnumber) values($1, $2, $3)', [...values], (err,result) => {
      done();
      if(err) {
        return console.log(err);
        //return response.status(400).send(err);
      }
      else {
        //console.log(res.rows[0].name);
        //console.log('Student Inserted');
        //db.end();
        response.status(201).send({message: 'Student Inserted'});
      }
    })
  }
 })
});

app.listen(port,() => console.log('Listening to port ' + port));
