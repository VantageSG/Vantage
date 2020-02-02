import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { isEmpty } from "../util/Props"
import { Button, Header, Image, Modal, Rail, Segment, GridColumn , Grid} from 'semantic-ui-react'
import axios from 'axios';

class GuestUserModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user:{}
    };
  }

  getUser(){
    if (isEmpty(this.state.user) && !isEmpty(this.props.user)) {
      this.setState({user: this.props.user})
    } else if (!isEmpty(this.state.user) && isEmpty(this.props.user)) {
      this.setState({user:{}})
    }
  }

  componentDidMount() {
    this.getUser()
  }

  componentDidUpdate() {
    this.getUser()
  }

  continueAsGuest() {
    axios
      .post(
        process.env.BACKEND_PORT + "/api/v1/users/guest_user"
      ).then(response => {
        const guest_user_id = response.data.user.id
        console.log(process.env.BACKEND_PORT + "/api/v1/login/" + guest_user_id)
        axios.post(
          process.env.BACKEND_PORT + "/api/v1/login/" + guest_user_id
        ).then(response=>
          this.props.handleLogin(response),
          console.log(this.state)
          ).catch(error=>{
          })
      })
  }

  render(){
    return(
      <div>
         <Modal 
      size="tiny"
      closeOnEscape={false}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      closeIcon
      onClose={event =>  window.location.href='/'}
      open={isEmpty(this.state.user)}
      >
        <Modal.Content >
          <Modal.Description>
            <p>
              Sing up/login to save your data for future use.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group
          floated='left'
          >
            <Button 
            color="teal"
            content='Singup'
            onClick={event =>  window.location.href='/Signup'}
            />  
            <Button.Or/>
            <Button
              color="teal"
              content='Login'
              onClick={event =>  window.location.href='/Login'}
            />
          </Button.Group>
            
            <Button
            primary
            content='Continue as Guest'
            onClick={() =>  this.continueAsGuest()}
          />
        </Modal.Actions>
      </Modal>
      </div>
    )
  }

  
}

export default GuestUserModal