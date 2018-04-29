import React from 'react';
import validator from 'validator';

import {checkUserByUsername} from '../actions/user';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.userData ? this.props.userData.id : '',
      username: this.props.userData.username ? this.props.userData.username: '',
      first_name: this.props.userData.first_name ? this.props.userData.first_name: '',
      last_name: this.props.userData.last_name ? this.props.userData.last_name: '',
      email: this.props.userData.email ? this.props.userData.email: '',
      type: this.props.userData.type ? this.props.userData.type: 'student',
      enabled: this.props.userData.enabled === "1" ? true : false,
      error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({[name]: value});
  };

  handleSubmit(event) {

    event.preventDefault();

    const { username,first_name,last_name,email,type,enabled } = this.state;
    const id = this.props.userData ? this.props.userData.id : null;
    //Perform validators
    const user = {
      id,
      username,
      first_name,
      last_name,
      email,
      type,
      enabled: enabled ? "1" : "0"
    }
    //Validate the form and submit the data, Look into tidying this up
    if(validator.isLength(first_name, {min:1, max :25}) &&
      validator.isLength(last_name, {min:1, max :25}) &&
      validator.isAlpha(first_name) &&
      validator.isAlpha(last_name)){
        if(validator.isLength(username, {min:3, max :10}) &&
          validator.isAlphanumeric(username)){
            if(validator.isEmail(email)){
                  this.props.onSubmit(user);
            } else {
              this.setState({error: 'Please use a valid email'});
            }
        } else {
          this.setState({error: 'Please pick a valid username between 3 and 10 characters'});
        }
      } else {
        this.setState({error: 'Please enter a valid name'});
      }
  }

  render() {
    return (        
        <div className="profile">
          {this.state.error}
          <form onSubmit={this.handleSubmit}>
          <table className="table">
            <tbody>
              <tr>
                <td>Username</td>
                <td>
                  <input type="text"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange}/>
                </td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>
                  <input type="text"
                    id="first_name"
                    value={this.state.first_name}
                    onChange={this.handleChange}/>
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  <input type="text"
                    id="last_name"
                    value={this.state.last_name}
                    onChange={this.handleChange}/>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input type="text"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                </td>
              </tr>
              <tr>
                <td>Account Type</td>
                <td>
                  <select id="type"
                    value={this.state.type}
                    onChange={this.handleChange}>
                      <option value="Student">Student</option>
                      <option value="Parent">Parent</option>
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Enabled</td>
                <td>
                  <input
                    id="enabled"
                    type="checkbox"
                    checked={this.state.enabled}
                    onChange={this.handleChange}
                    />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-info">{this.props.userData.id ? "Save" : "Add"}</button>
        </form>
      </div>
    )
  }
}


export default Form;
