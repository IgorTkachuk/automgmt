import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const gearFieldList = [
  {
    name: 'brand',
    descr: 'Brand',
  },
  {
    name: 'model',
    descr: 'Model',
  },
  {
    name: 'generation',
    descr: 'Generation',
  },
  {
    name: 'doors',
    descr: 'Doors',
  },
  {
    name: 'power',
    descr: 'Power',
  },
  {
    name: 'fuelTankVolume',
    descr: 'Fuel tank volume',
  },
];

export default class AddGear extends Component {
  state = {}

  onInputChange = (e) => {
    const { id: field, value } = e.currentTarget

    this.setState({
      [field]: value
    })
  }

  formSubmit = (e) => {
    const { history, onSubmit } = this.props
    e.preventDefault()
    onSubmit(this.state)
    history.push('/list')
  }

  render(){
    const fieldList = gearFieldList.map((field) => {
      return (
        <>
          <Helmet title="add gear"/>
          <Form.Group controlId={ field.name }  key={ field.name }>
            <Form.Label>{field.descr}</Form.Label>
            <Form.Control size="sm" type="text" placeholder={ `Enter ${ field.descr }` }  value={ this.state[field.name] || '' } onChange={ this.onInputChange } />
          </Form.Group>
        </>
      )
    })

    const style = {
      width: '500px',
      marginLeft: '15px'
    }

    return (
      <div style={ style }>
        <h1>Add new gear to list</h1>
        <Form>
          { fieldList }
          <Button size="sm" type="submit" variant="primary" onClick={ this.formSubmit }>Submit</Button>
        </Form>
      </div>
    )
  }
}

AddGear.propTypes = {
  onSubmit: PropTypes.func.isRequired
}