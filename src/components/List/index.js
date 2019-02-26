import React, { Component } from 'react'
import Helment from 'react-helmet'
import { Dropdown, Container, Col, Row, Pagination, Card, CardDeck, Form, Button } from 'react-bootstrap'
import Layout, {Header, Body} from './Layout'
import PropTypes from 'prop-types'
import { range } from 'ramda'

const sortDirection = {
  SORT_ASC: 'asc',
  SORT_DESC: 'desc'
}

const gearFieldList = [
  {
    name: 'brand',
    descr: 'Brand',
    extended: false
  },
  {
    name: 'model',
    descr: 'Model',
    extended: false
  },
  {
    name: 'generation',
    descr: 'Generation',
    extended: true
  },
  {
    name: 'doors',
    descr: 'Doors',
    extended: true
  },
  {
    name: 'power',
    descr: 'Power',
    extended: true
  },
  {
    name: 'fuelTankVolume',
    descr: 'Fuel tank volume',
    extended: true
  },
];

function compareBy (objs, fieldName) {
  return (direction) => {
    const cmp = (obj1, obj2) => objs[obj1][fieldName] < objs[obj2][fieldName] ? -1 : 1

    if ( direction === sortDirection.SORT_ASC ) {
      return (obj1, obj2) => cmp (obj1, obj2)
    }
    return (obj1, obj2) => cmp (obj2, obj1)
  }
}

export default class List extends Component {
  state = {
    itemsPerPage: '5',
    currentPage: 0
  }

   onSortMode = (eKey) => {
    this.setState({
      sortOrder: eKey
    })
  }

  onSearchChangeHandler = (e) => {
    this.setState({
      searchStr: e.currentTarget.value
    })
  }

  onItemsPerPage = (eKey) => {
    this.setState({
      itemsPerPage: eKey,
      currentPage: 0
    })
  }

  onPagesBtnClick = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const { gears, history } = this.props
    const { sortOrder, searchStr, itemsPerPage, currentPage } = this.state

    let gearsIds = Object.keys(gears);
    const cmpGearsByBrand = compareBy(gears, 'brand')

    gearsIds = sortOrder ? gearsIds.sort(cmpGearsByBrand(sortOrder)) : gearsIds

    gearsIds = searchStr ? gearsIds.filter((gearId) => {
      if (gears[gearId].brand.toUpperCase().indexOf(searchStr.toUpperCase()) > -1) {
        return true
      } 
      return false
    }) : gearsIds

    const itemsCount = gearsIds.length
    const pagesCount = Math.ceil(itemsCount / itemsPerPage)

    const startItem = currentPage * itemsPerPage
    const endItem = startItem + itemsPerPage

    gearsIds = gearsIds.slice(startItem, endItem)

    const list = gearsIds.map((gearId) => {
      const fieldsForList = Object.keys(gears[gearId]).filter((fieldName) => {
        return !gearFieldList.find((fieldDef) => {
          return fieldDef.name === fieldName ? true : false
        }).extended
      })

      return (
          <Card  key = { `gear_${gearId}` } style = {{ maxWidth: '250px', minWidth: '250px', marginBottom: '5px' }}>
            <Card.Body>
                <ul>
                  {   
                    fieldsForList.map((field) => {
                      const fieldDescr = gearFieldList.find((fieldDef) => {
                          return fieldDef.name === field
                      }).descr

                      return (
                        <li key = { `${gearId}_${field}` }>{ fieldDescr }: { gears[gearId][field] }</li>
                      )
                    })
                  }
                </ul>
              <Card.Footer>
                <Button style = {{ margin: '2px' }} size = "sm" variant = "primary" onClick = { () => {
                    history.push(`/geardetail/${gearId}`)
                  }
                }>Detail</Button>
                
                <Button style = {{ margin: '2px' }} size = "sm" variant = "primary" onClick = { () => { 
                    history.push(`/gearedit/${gearId}`)
                  } 
                }>Edit</Button>
              </Card.Footer>                         
            </Card.Body>
          </Card>
      )
    })

    const pagesBtn = range(0, pagesCount).map((i) => 
      <Pagination.Item key={ i } active={ currentPage === i } onClick={ () => this.onPagesBtnClick(i) }>
        { i + 1 }
      </Pagination.Item>
    )
    
    const paginationStyle = {
      marginLeft: '15px'
    }

    const pagesMenu = <div style = { paginationStyle }>
      <Pagination size = "sm">
        { pagesBtn }
      </Pagination>
    </div>

    return (
      <div>
        <Helment title="gear list" />
        <Layout>
          <Header>
            <h1>List of gears</h1>
          </Header>
          <Body>
            <Container>
              <Row>
                <Col md = "auto">
                  <Dropdown onSelect = { this.onSortMode }>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {
                        sortOrder === sortDirection.SORT_ASC ? 'name+' :
                        sortOrder === sortDirection.SORT_DESC ? 'name-' : 'sort direction'
                      }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey = { sortDirection.SORT_ASC }>name+</Dropdown.Item>
                      <Dropdown.Item eventKey = { sortDirection.SORT_DESC }>name-</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col md = "auto">
                  <Form.Control type="text" size = "sm" placeholder="Search gear by brand"  onChange = { this.onSearchChangeHandler } value = { this.state.searchStr || '' } />
                </Col>

                <Col md = "auto">
                  <Dropdown onSelect = { this.onItemsPerPage }>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      { `Items per page: ${itemsPerPage}` }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey = "5" >5</Dropdown.Item>
                      <Dropdown.Item eventKey = "10">10</Dropdown.Item>
                      <Dropdown.Item eventKey = "15">15</Dropdown.Item>
                      <Dropdown.Item eventKey = "20">20</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Button variant="outline-success" onClick = { () => history.push('/newgear') }>Add a gear</Button>
                </Col>
              </Row>
            </Container>

            { pagesMenu }
            <CardDeck style = {{ margin: '5px' }}> { list } </CardDeck>
            
          </Body>
        </Layout>
      </div>
    )
  }
}

List.propTypes = {
  gears: PropTypes.object.isRequired,
}
