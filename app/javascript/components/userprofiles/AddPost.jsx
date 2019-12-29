import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            number: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            number: this.state.number
        };

        const headers = {
            "content-type": "application/json"
        };

        axios
            .post(
                "https://jsonplaceholder.typicode.com/posts",
                JSON.stringify(user),
                { headers: headers }
            )
            .then(response => console.log(response.data));
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
                                placeholder="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label> number</label>
                            <Form.Input
                                placeholder="number"
                                name="number"
                                value={this.state.number}
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

export default AddPost;
