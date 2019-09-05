import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
// import md5 from 'md5';

import firebase from './firebase';

export default class Login extends Component {
  state = {
    password:'',
    email: '',
    errors: [],
    loading: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayErrors = errors => errors.map( (error, i) =>
    <p key={i}>{error.message}</p>
  )

  isFormEmpty = ({ email, password }) => {
    return !email.length || !password.length;
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.isFormValid(this.state)) {
      this.setState({errors: [], loading: true});
      firebase.auth()
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then(signedInuser => {
                console.log(signedInuser)
              })
              .catch(err => {
                console.error(err);
                this.setState({errors: this.state.errors.concat(err), loading: false})
              })       
    }
  }

  isFormValid = ({email, password}) => 
  {
    let errors = [];
    let error;


    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: 'Fill something doom Ass 💩' }
      this.setState({ errors: errors.concat(error) })
      return  false;
    } else {
      return true      // valid
    }
  };  
  

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : ""
  }
  
  
  render() {
    const { email, password, errors, loading } = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app mt-3">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="puzzle piece" color="violet" />
            Login for DevChat
          </Header>
            <h3>test123...</h3>
            <h3>gmail test1</h3>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
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
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
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
            <Link to="/register">Don't have an account?</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
