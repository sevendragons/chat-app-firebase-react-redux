import React, {Component} from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import {connect} from 'react-redux';

import firebase from '../Auth/firebase';

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  }

  dropdownOptions = () => [
      {
        key: "user",
        text: (<span>Hello, Xin Chao
                  <strong style={{fontSize: '12pt'}}> { this.state.user && this.state.user.displayName}</strong>
                 </span>),
        disabled: true
      },
      {
        key: "avatar",
        text: <span>Change Avatar</span>
      },
      {
        key: "signout",
        text: <span onClick={this.handleSignout}>Sign Out</span>
      }
  ]

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then( () => {
        console.log('signed out!')
        window.location.reload()
      
      })
  }

  render() {
    const { user } = this.state

    console.log(this.props.currentUser)
    return (
      <Grid style={{ background: '#4c3c4c' }} style={{width: '332px'}}>
        <Grid.Column >
          <Grid.Row style={{ padding:'1.2em', margin:'0 auto'}}>
          {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name='code branch'></Icon>
              <Header.Content>
                DevChat
              </Header.Content>
            </Header>    

          {/* Dropdown      */}
            <Header inverted floated="left" as="h4" style={{ padding:'.25em'}}>
              <Dropdown trigger= {
                <span>
                  <Image src={user.photoURL} spaced="right" avatar></Image> 
                  {user.displayName} 🤠
                </span> }
                options={ this.dropdownOptions() }
  
              />
            </Header>    
          </Grid.Row>
        </Grid.Column>

      </Grid>  
    )
  }
}  

export default UserPanel;

