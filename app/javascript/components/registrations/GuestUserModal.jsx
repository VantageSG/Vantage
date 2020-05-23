import UserContext from '../../contexts/UserContext';
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";


class GuestUserModal extends Component {

  render(){
    return(
      <div>
        <Modal 
        basic
        size="small"
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        closeIcon
        onClose={event =>  this.props.history.push('/')}
        open={!this.context.isLoggedIn}
        >
        <Modal.Content >
          <Modal.Description>
            <p className="modal-message">
              Sign up for an account or log in to continue.
              <br />
              If you do not want to keep your resume on the<br/>
              site, you can continue as a guest user.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <div className="btn-group">
            <Link
              to="/login"
              data-testid="Login"
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              data-testid="SignUp"
            >
              Sign up
            </Link>
            <a 
              data-testid="guestUser"
              onClick={() => this.context.continueAsGuest(() => {})}
            >
              Guest User
            </a>
          </div>
        </Modal.Actions>
      </Modal>
      </div>
    )
  }
}
GuestUserModal.contextType = UserContext;

export default withRouter(GuestUserModal);
