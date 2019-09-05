import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import md5 from 'md5';

import firebase from './firebase';

export default class Register extends Component {
  state = {
    password:'',
    password2:'',
    email: '',
    username: '',
    errors: [],
    loading: false, 
    userRef: firebase.database().ref('users')
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormValid = () => {
    let errors = [];
    let error;


    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: 'Fill something doom Ass 💩' }
      this.setState({ errors: errors.concat(error) })
      return  false;
    } else if (!this.isPasswordValid(this.state)){
      //throw error
      error = { message: 'Password is invalid'};
      this.setState ({errors: error.concat(error)});
      return false;
    } else {
      return true      // valid
    }
  }

  displayErrors = errors => errors.map( (error, i) =>
    <p key={i}>{error.message}</p>
  )

  isFormEmpty = ({username, email, password, password2}) => {
    return !username.length || !email.length || !password.length || !password2.length;
  }

  isPasswordValid = ({ password, password2 }) => {
    if (password.length < 6 || password2.length < 6) {
      return false;
    } else if (password !== password2) {
      return false
    } else {
      return true;
          
    } 
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.isFormValid()) {
      this.setState({errors: [], loading: true});
      firebase.auth()
              .createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then(createdUser => {
                console.log(createdUser)
                createdUser.user.updateProfile({
                  displayName: this.state.username,
                  photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                  // this.setState({loading: false});
                  this.saveUser(createdUser).then( () => {
                    console.log('user saved');
                  });
                  
                })
                .catch(err => {
                  console.error(err)
                  this.setState({errors: this.state.errors.concat(err), loading: false})
                })
              })
              .catch(err => {
                console.error(err);
                this.setState({errors: this.state.errors.concat(err), loading: false})
              })
    }
  }

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : ""
  }
  
  
  render() {
    const { username, email, password, password2, errors, loading } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app mt-3">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}
                className={this.handleInputError(errors, "username")}
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                type="text"
                value={email}
                className={this.handleInputError(errors, "email")}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputError(errors, "password")}
              />
              <Form.Input
                fluid
                name="password2"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                type="password"
                value={password2}
                className={this.handleInputError(errors, "password")}
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}

          <Message>
            <Link to="/login">Already an account?</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
