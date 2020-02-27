import UserContext from '../../contexts/UserContext';
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { isEmpty } from "../util/Props"
import { Button, Modal } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";


class GuestUserModal extends Component{

  continueAsGuest() {
    this.context.continueAsGuest(()=>{});
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
        onClose={event =>  this.props.history.push('/')}
        open={!this.context.isLoggedIn}
        >
        <Modal.Content >
          <Modal.Description>
            <p>
              Sign up/login to save your data for future use.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group
          floated='left'
          >
            <Button 
            data-testid="SignUp"
            color="teal"
            content='Sign Up'
            as={Link}
            to="/sign-up"
            />  
            <Button.Or/>
            <Button
              data-testid="Login"
              color="teal"
              content='Login'
              as={Link}
              to="/login"
            />
          </Button.Group>
            
            <Button
            content='Continue as Guest'
            onClick={() => this.continueAsGuest()}
          />
        </Modal.Actions>
      </Modal>
      </div>
    )
  }
}
GuestUserModal.contextType = UserContext;

export default withRouter(GuestUserModal);
