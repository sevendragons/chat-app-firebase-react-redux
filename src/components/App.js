import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import { connect } from "react-redux";

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

import './App.css';

const App = ({currentUser, currentChannel}) => (
    <Grid className="mt-3 app" columns="equal">
      <Grid.Column className="col1 mr-3" width={4}>
        <ColorPanel/>
        <SidePanel currentUser={currentUser}
          key={currentUser && currentUser.id}
        />
      </Grid.Column>

      <Grid.Column className="col2 mr-2" widht={8}>
        <Messages currentChannel={currentChannel}
          key={currentChannel && currentChannel.id}
          currentUser={currentUser}
        />    
      </Grid.Column>
      
      <Grid.Column className="col3" width={4}>
        <MetaPanel/>
      </Grid.Column>
    </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
})

export default connect(mapStateToProps)(App);
