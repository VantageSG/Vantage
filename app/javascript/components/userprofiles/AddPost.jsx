import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import PropTypes from 'prop-types';
import { createPost } from "../../redux/actions/postActions";
import { connect } from "react-redux";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            userId: 0,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.title,
            userId: 0
        };

        const headers = {
            "content-type": "application/json"
        };

        this.props.createPost(post)
        /*
        axios
            .post(
                "https://jsonplaceholder.typicode.com/posts",
                JSON.stringify(user),
                { headers: headers }
            )
            .then(response => console.log(response.data));*/
    }

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Field>
                            <label> Name</label>
                            <Form.Input
                                type='text'
                                placeholder="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> number</label>
                            <Form.Input
                                placeholder="body"
                                name="body"
                                value={this.state.body}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Form.Button content="Submit" />
                    </Form.Group>
                </Form>
                <br></br>
            </div>
        );
    }
}

AddPost.propTypes = {
    createPost: PropTypes.func.isRequired,

};

export default connect(null, { createPost })(AddPost);
