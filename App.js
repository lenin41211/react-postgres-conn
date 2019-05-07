import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Student Management Application',
      students: []
    }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentDidMount() {
    console.log('Component has mounted ') ;
    var that = this;
    fetch('http://localhost:3000/api/students')
     .then(function(response){
       
        response.json()
          .then(function(data){
            //console.log(data)
        that.setState({
          students: data
        })
      })
    }) 
    }

 /* componentDidUpdate(prevProps, prevState){
    
    var that = this;
            //console.log(data);
        that.setState({
          students: stu_data
        })     
  }*/

 forceUpdateHandler(){
    this.forceUpdate();
  };

  removeStudent(id){
    //console.log(this);
     //event.preventDefault(); 
     var that = this;
    let students = this.state.students;
    let student = students.find(function(student){
      return student.id === id
    });
    console.log(student);
     //var request = new Request('http://localhost:3000/api/remove/' + id, {
     //   method: 'DELETE'
     //});
      var request = new Request('http://localhost:3000/api/remove', {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(student)
    });

     fetch(request) 
      .then(function(response){
       
        response.json()
          .then(function(data){
             students.splice(student,1);
        that.setState({
          students: students
        })
            //console.log(data);
            //this.forceUpdate();
            //this.refresh.bind(this);
      })
     })

     
  }

 refresh(event)
 {
   var that = this;
    event.preventDefault(); 
    fetch('http://localhost:3000/api/students')
     .then(function(response){
       
        response.json()
          .then(function(data){
            //console.log(data);
        that.setState({
          students: data
        })
      })
    }) 
 }

  addStudent(event) { 
    var that = this;
    event.preventDefault(); 
    console.log('in addStudent Method');  
    let stu_data = {
      name: this.refs.name.value,
      id: this.refs.id.value,
      rollnumber: Math.random().toFixed(5)
    };
    console.log(stu_data);
    var request = new Request('http://localhost:3000/api/addstu', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(stu_data)
    });

    
            

    //xmlhttprequestfetch

    fetch(request) 
      .then(function(response){

        response.json()
          .then(function(data){
            //console.log(stu_data)
            let students = that.state.students;
            that.state.students.push(stu_data);
            that.setState({
              students: students
              //console.log(students)
            })
            //console
            console.log(students);
          })
      })
      .catch(function(err) {
        console.log(err)
      })

      //this.refresh.bind(this);

  }
  

  render() {
     let title = this.state.title;
     //<pre>{ JSON.stringify(this.state.students) }</pre>
  return (
    <div className="App">
      <h1>{ title }</h1>
      <form ref="studentForm">
      <label>Student ID : </label>
      <input type="text" ref="id" placeholder="example : 11 " />
      <label>Student Name : </label>
      <input type="text" ref="name" placeholder="example:Lenin" /> 
      <button onClick={this.addStudent.bind(this)}>AddStudent</button>
       <button onClick= {this.forceUpdateHandler} >FORCE UPDATE</button>
      <pre>{ JSON.stringify(this.state.students) }</pre>
      </form>
      <pre>
       { this.state.students.map(student => 
        <li key={student.id}> {student.id} {student.rollnumber} {student.name}
          <button onClick={this.removeStudent.bind(this,student.id)}> Remove </button>
        </li>
        )}
      </pre>
      </div>

    );
  }
}

class Content extends React.Component {
   render() {
      return (
      <div>
      
    </div>
         
      );
   }
}

export default App;
