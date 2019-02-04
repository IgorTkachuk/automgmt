import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { autoFieldList } from '../../utils/constants';

export default class EditCar extends Component {
    
    state ={}

    componentDidMount () {
        const { carForEdit } = this.props;
        const carId = Object.keys(carForEdit)[0];

        this.setState({
            ...carForEdit[carId]
        });
    }

    onInputChange = (e) => {
        const field = e.currentTarget.id;
        const value = e.currentTarget.value;

        this.setState({
            [field]: value
        })
    }

    onUpdate = (e) => {
        const { carForEdit, onCarUpdate } = this.props;
        const carId = Object.keys(carForEdit)[0];

        e.preventDefault();
        onCarUpdate({
            [carId]: this.state
        });
    }

    render () {
        const fieldList = autoFieldList.map((field) => {
            return (
                <Form.Group controlId = { field.name }  key = { field.name }>
                    <Form.Label>{field.descr}</Form.Label>
                    <Form.Control size = "sm" type="text" placeholder= { `Enter ${ field.descr }` }  value = { this.state[field.name] || '' } onChange = { this.onInputChange } />
                </Form.Group>
            )
        });

        return (
            <div>
                <Form>
                    { fieldList }
                    <Button size = 'sm' type = 'submit' variant = 'primary' onClick = { this.onUpdate }>Update</Button>
                </Form>
            </div>
        )
    }
}