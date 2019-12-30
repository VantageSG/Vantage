import React, { Component } from "react";
import PropTypes from 'prop-types';
import AddPost from "./AddPost";
import {
    Header,
    Grid,
    Icon,
    Segment,
    Container,
    Button,
    Divider,
    List
} from "semantic-ui-react";
import { connect } from 'react-redux'; //connect component to redux store
import { fetchPosts } from '../../redux/actions/postActions';


class UserPage extends Component {


    componentDidMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.posts.push(nextProps.newPost);
            //console.log(this.props.posts);
        }
    }

    render() {
        const postList = this.props.posts.map(user => (
            <List.Item key={user.id}>
                <List.Content key={user.id}>
                    <List.Header>{user.title}</List.Header>
                    <List.Description>{user.body}</List.Description>

                </List.Content>
            </List.Item>

        ));
        return (
            <div>
                <Segment textAlign="center" vertical>
                    <AddPost></AddPost>
                    <p>This is the list of users page</p>
                    <hr></hr>
                    <List selection divided verticalAlign='middle' style={{ margin: '2em' }}>
                        {postList}
                    </List>
                </Segment>
            </div>);
    }
}

UserPage.propsTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object//add new post to list 
};

const mapStateToProps = state => ({
    posts: state.posts.items, // posts here cause defined in root reducer in reducers folder
    newPost: state.posts.item
}); // get state from redux then map it to the state of the components 

export default connect(mapStateToProps, { fetchPosts })(UserPage); // second one is component first one is where we map state to property