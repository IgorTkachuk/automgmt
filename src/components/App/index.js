import React, { Component } from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from '../About'
import List from '../List'
import AddGear from '../AddGear'
import EditGear from '../EditGear'
import DetailGear from '../DetailGear'

const pages = {
  PAGE_ABOUT: 'about',
  PAGE_LIST: 'list',
  PAGE_DETAIL: 'detail',
  PAGE_EDIT: 'edit',
  PAGE_NEW: 'new'
}

class App extends Component {
  state = {
    currentComponent: pages.PAGE_ABOUT,
    gears: {}
  }

  getId = () => {
    return Math.floor(Math.random()*100000)
  }

  menuHandler = (evt, page) => {
    evt.preventDefault()
    this.setState ({
      currentComponent: page
    })
  }

  newGear = (car) => {
    const { gears } = this.state
    const gearId = this.getId()

    this.setState({
      gears: {
        ...gears,
        [gearId]: car
      },
      currentComponent: pages.PAGE_LIST
    })
  }

  gearEdit = (gearId) => {
    this.setState({
      currentComponent: pages.PAGE_EDIT,
      gearId
    })
  }

  gearDetail = (gearId) => {
    this.setState({
      currentComponent: pages.PAGE_DETAIL,
      gearId
    })
  }

  gearUpdate = (updatedGear) => {
    const { gears } = this.state

    this.setState({
      gears: {
        ...gears,
        ...updatedGear
      },
      currentComponent: pages.PAGE_LIST
    })
  }

  gearDetailReturn = () => {
    this.setState({
      currentComponent: pages.PAGE_LIST
    })
  }

  render() {
    const { currentComponent, gearId, gears } = this.state
    let pageToShow

    if (currentComponent === pages.PAGE_ABOUT) {
      pageToShow = <About />
    } else if (currentComponent === pages.PAGE_LIST) {
      pageToShow = <List gears = { this.state.gears } onGearEdit = { this.gearEdit } onGearDetail = { this.gearDetail } />
    } else if (currentComponent === pages.PAGE_NEW) {
      pageToShow = <AddGear onSubmit = { this.newGear } />
    } else if (currentComponent === pages.PAGE_EDIT) {
      const carObj = {
        [gearId]: gears[gearId]
      }
      pageToShow = <EditGear onSubmit = { this.gearUpdate } gear = { carObj }/>
    } else if (currentComponent === pages.PAGE_DETAIL) {
      const carObj = {
        [gearId]: gears[gearId]
      }
      pageToShow = <DetailGear gear = { carObj } onReturn = { this.gearDetailReturn } />
    }

    return (
      <div>
        <Navbar bg = "light" expand = "lg">
          <Navbar.Brand>Gear management system</Navbar.Brand>
          <Navbar.Toggle aria-controls = "basic-navbar-nav" />
          <Navbar.Collapse id = "basic-navbar-nav">
            <Nav className = "mr-auto">
              <Nav.Link onClick = { (e) => this.menuHandler(e, pages.PAGE_ABOUT) }>About</Nav.Link>
              <Nav.Link onClick = { (e) => this.menuHandler(e, pages.PAGE_LIST) }>Gears list</Nav.Link>
            </Nav>
            <Button variant="outline-success" onClick = { (e) => this.menuHandler(e, pages.PAGE_NEW) }>Add a gear</Button>
          </Navbar.Collapse>
        </Navbar>
        { pageToShow }
      </div>
    )
  }
}

export default App
