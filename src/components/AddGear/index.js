import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { autoFieldList } from '../../utils/constants'
import PropTypes from 'prop-types'

export default class AddGear extends Component {
  state = {}

  onInputChange = (e) => {
    const { id: field, value } = e.currentTarget

    this.setState({
      [field]: value
    })
  }

  formSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render(){
    const fieldList = autoFieldList.map((field) => {
      return (
        <Form.Group controlId = { field.name }  key = { field.name }>
          <Form.Label>{field.descr}</Form.Label>
          <Form.Control size = "sm" type="text" placeholder= { `Enter ${ field.descr }` }  value = { this.state[field.name] || '' } onChange = { this.onInputChange } />
        </Form.Group>
      )
    })

    const style = {
      width: '500px',
      marginLeft: '15px'
    }

    return (
      <div style = { style }>
        <h1>Add new gear to list</h1>
        <Form>
          { fieldList }
          <Button size = "sm" type = "submit" variant = "primary" onClick = { this.formSubmit }>Submit</Button>
        </Form>
      </div>
    )
  }
}

AddGear.propTypes = {
  onSubmit: PropTypes.func.isRequired
}