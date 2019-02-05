import React from 'react'
import { Button } from 'react-bootstrap';
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
    descr: 'Fuel tnak volume',
  },
];

const DetailGear = (props) => {
  const { gear, onReturn } = props
  const gearId = Object.keys(gear)[0]

  const fieldList = gearFieldList.map((field) => {
    return (
      <li key = { field.name }>
        {field.descr}:
        { gear[gearId][field.name] }
      </li>
    )
  })

  return (
    <div style = {{ marginLeft: '15px' }}>
      <Button style = {{ margin: '2px' }} size = "sm" variant = "primary" onClick = { onReturn }>Back to list</Button>
      <ul>
        { fieldList }
      </ul>
    </div>
  )
}

DetailGear.propTypes = {
  gear: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
}

export default DetailGear