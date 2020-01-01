/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import AddPost from "../templates/AddPost";
import { Image, Segment, List, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/actions/userActions";

const UserButton = props => (
    <Button onClick={props.onClick} className={props.className}>
        {props.text}
    </Button>
);

const UserItem = props => (
    <Link
        onClick={props.onClick}
        to={`/user:${props.user.login.username}`}
    >
        <List.Item>
            <Image avatar src={props.user.picture.thumbnail}>
            </Image>
            <List.Header>{props.user.login.username}</List.Header>
            <List.Header>{props.user.login.email}</List.Header>
        </List.Item>
    </Link>
)

class Users extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { data, fetchUsers, setUser } = this.props;
        return (
            <div>
                <Segment textAlign="center" vertical>
                    <UserButton onClick={fetchUsers} text={"Fetch-Users"}></UserButton>
                    <p>This is the list of users page</p>
                    <hr></hr>
                    <List
                        link
                        animated
                        selection
                        divided
                        verticalAlign="middle"
                        style={{ margin: "2em" }}
                    >
                        {data.users.map((user, i) => {
                            return <UserItem
                                key={i}
                                user={user}
                                onClick={() => setUser(user)}
                            />
                        })}
                    </List>
                </Segment>
            </div>
        );
    }
}

/*
const mapStateToProps = state => ({
    posts: state.posts.items, // posts here cause defined in root reducer in reducers folder
    newPost: state.posts.item
}); // get state from redux then map it to the state of the components 
*/
export default Users; // second one is component first one is where we map state to property
