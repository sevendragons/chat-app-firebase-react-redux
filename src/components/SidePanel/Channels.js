import React, {Component} from 'react'
import { Menu, Icon, Modal, Header, Form, Button, Input, Message } 

from 'semantic-ui-react';
import './Channel.css';
import firebase from '../Auth/firebase';
import {connect} from 'react-redux';
import {setCurrentChannel} from '../redux/actions';


class Channels extends Component {
  state = {
    channels: [],
    channelName: '', 
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    modal: false,
    errors: [],
    user: this.props.currentUser,
    firstLoad: true,
    activeChannel: ''
  }

  closeModal = () => this.setState({modal: false})
  openModal = () => this.setState({modal: true})
  
  displayErrors = errors => errors.map( (error, i) =>
    <p key={i}>{error.message}</p>
  )
  
  isFormValid = ({channelDetails, channelName}) => {
    // channelDetails && channelName;
     let errors = [];
     let error;

      const isFormEmpty = ({ channelDetails, channelName }) => {
        return !channelDetails.length || !channelName.length;
      }

     if (isFormEmpty(this.state)) {
      // throw error
      error = { message: 'Fill something doom Ass 💩' }
      this.setState({ errors: errors.concat(error) })
      return  false;
    } else {
      return true      // valid
    }
  }

  addChannel = () => {
    const {channelsRef, channelDetails, channelName, user} = this.state;
    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };
    
    channelsRef.child(key)
      .update(newChannel)
      .then(() => {
        // this.setState({ channelName: '', channelDetails: ''});
        this.setState({ channelName: '', channelDetails: ''});
        this.closeModal();
        console.log('Channel Added  🚀')
      })
      .catch( err => {
        console.error(err)
      })
  }

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = e => {
    e.preventDefault();
    if(this.isFormValid(this.state)) {
      this.addChannel()
    }
  }


  componentDidMount() {
    this.addListener();
  }

  componentWillUnount() {
    this.removeListeners()
  }

  removeListeners = () => {
    this.state.channelsRef.off();
  }

  addListener = () => {
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState( {channels: loadedChannels}, 
                    () => this.setFirstChannel() )
      // console.log(loadedChannels)
    })
  }

  setFirstChannel = () => {
    const firstChannel = this.state.channels[0]
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel)
    } 
    this.setState({ firstLoad: false });
   
  }

  changeChannel = channel => {
    this.props.setCurrentChannel(channel);
    this.props.setCurrentChannel(channel)
    // console.log(channel)
  }

  setActiveChannel = channel => {
    this.setState({firstLoad: channel})
  }
  
  displayChannel = channels => (
    channels.length > 0 &&  channels.map( channel => (
      <Menu.Item
        key={channel.id}
        onClick={ () => this.changeChannel(channel)}
        name={channel.name}
        style={{opacity: 0.7}}
        className="mt-2"
        active={channel.id === this.state.activeChannel}
      >
        #{channel.name}
      </Menu.Item> 
    ))  
  )


  render() {
    const {channels, modal, errors} = this.state
    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="exchange"></Icon>
              CHANNELS
            </span>
            {" "}
            <span className="mr-3">({channels.length})</span>
            <Icon style={{cursor: 'pointer', position: 'absolute', top: '-5px', marginLeft: '32px'}} 
                  size="large" name="plus circle" 
                  onClick={this.openModal}
                  circular
                  bordered
                  color="green"
                  fitted
                  inverted
                  link
                  loading
                  /> 
          </Menu.Item>
          {/* Channels */}
          <div> 
            {this.displayChannel(channels)}  
          </div>
        </Menu.Menu> 
        
        <Modal open={modal} onClose={this.closeModal} basic size="small">
          <Header icon='plus square' content='What is name of your channels' />
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                  />
              </Form.Field>
                <Input fluid
                  label="Description of Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                  />
            </Form>
            {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted
              onClick={this.closeModal}>
              <Icon name='remove'/> No
            </Button>
            <Button color='green' inverted onClick={this.handleSubmit}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>

      </React.Fragment>
      
    )
  }
}

export default connect( null, { setCurrentChannel })(Channels)


