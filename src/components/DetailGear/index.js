import React, {Fragment} from 'react'
import Helmet from 'react-helmet'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import {Table} from 'react-bootstrap'

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

const DetailGear = (props) => {
  const { gear, history } = props

  const fieldList = gearFieldList.map((field) => {
    return (
      <tr key = { field.name }>
        <td style={{ fontWeight: "bold" }}>{field.descr}</td><td>{ gear[field.name] }</td>
      </tr>  
    )
  })

  return (
    <Fragment>
      <Helmet title="detail gear"/>
      <div style={{ marginLeft: '15px' }}>
        <Button style={{ margin: '5px'}} size="sm" variant="primary" onClick={ () => history.push('/list') }>Back to list</Button>
        <Table bordered hover striped size="sm" style = {{ maxWidth: '400px' }}>
          <tbody>
            { fieldList }
          </tbody>
        </Table>
      </div>
    </Fragment>
  )
}

DetailGear.propTypes = {
  gear: PropTypes.object.isRequired
}

export default DetailGear