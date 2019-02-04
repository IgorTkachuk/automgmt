import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { autoFieldList } from '../../utils/constants';

export default class EditCar extends Component {

    state = {}

    onInputChange = (e) => {
        const field = e.currentTarget.id;
        const value = e.currentTarget.value;

        this.setState({
            [field]: value
        })

    }

    formSubmit = (e) => {
        e.preventDefault();

        this.props.newAuto(this.state);
    }

    render(){

        const fieldList = autoFieldList.map((field) => {
            return (
                <Form.Group controlId = { field.name }  key = { field.name }>
                    <Form.Label>{field.descr}</Form.Label>
                    <Form.Control size = "sm" type="text" placeholder= { `Enter ${ field.descr }` }  value = { this.state[field.name] || '' } onChange = { this.onInputChange } />
                </Form.Group>
            )
        });

        const style = {
            width: '500px',
            marginLeft: '15px'
        }

        return (
            <div style = { style }>
                <h1>Add new car to list</h1>

                <Form>
                    { fieldList }
                    <Button size = 'sm' type = 'submit' variant = 'primary' onClick = { this.formSubmit }>Submit</Button>
                </Form>
            </div>
        );
    }
}