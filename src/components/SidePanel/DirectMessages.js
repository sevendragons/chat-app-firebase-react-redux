import React, { Component } from 'react'
import {Menu, Icon} from 'semantic-ui-react';

import firebase from '../Auth/firebase';

export default class DirectMessages extends Component {
  state = {
    users: [],
    user: this.props.currentUser
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid)
    }
  }

  addListeners = currentUser => {

  }

  render() {
    const { users } = this.state
    return (
      <>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="mail"/> DIRECT MESSAGES
            </span> {' '}
            {{ users.length }}
          </Menu.Item>

          {/* Users to Send Direct Messages */}
        </Menu.Menu>
      </>
    )
  }
}
