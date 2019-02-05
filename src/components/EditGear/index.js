import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { autoFieldList } from '../../utils/constants'
import PropTypes from 'prop-types'

export default class EditGear extends Component {
  state ={}

  componentDidMount () {
    const { gear } = this.props
    const gearId = Object.keys(gear)[0]

    this.setState({
      ...gear[gearId]
    })
  }

  onInputChange = (e) => {
    const { id: field, value } = e.currentTarget

    this.setState({
      [field]: value
    })
  }

  onUpdate = (e) => {
    const { gear, onSubmit } = this.props
    const gearId = Object.keys(gear)[0]

    e.preventDefault()
    onSubmit({
      [gearId]: this.state
    })
  }

  render () {
    const fieldList = autoFieldList.map((field) => {
      return (
        <Form.Group controlId = { field.name }  key = { field.name }>
          <Form.Label>{field.descr}</Form.Label>
          <Form.Control size = "sm" type="text" placeholder= { `Enter ${ field.descr }` }  value = { this.state[field.name] || '' } onChange = { this.onInputChange } />
        </Form.Group>
      )
    })

    return (
      <div style = {{ marginLeft: '15px' }}>
        <Form>
          { fieldList }
          <Button size = "sm" type = "submit" variant = "primary" onClick = { this.onUpdate }>Update</Button>
        </Form>
      </div>
    )
  }
}

EditGear.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  gear: PropTypes.object.isRequired
}