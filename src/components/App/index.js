import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from '../About'
import List from '../List'
import AddGear from '../AddGear'
import EditGear from '../EditGear'
import DetailGear from '../DetailGear'

class App extends Component {
  state = {
    gears: {}
  }

  getId = () => {
    return Math.floor(Math.random()*100000)
  }

  newGear = (car) => {
    const { gears } = this.state
    const gearId = this.getId()

    this.setState({
      gears: {
        ...gears,
        [gearId]: car
      },
    })
  }

  gearUpdate = (updatedGear) => {
    const { gears } = this.state

    this.setState({
      gears: {
        ...gears,
        ...updatedGear
      }
    })
  }

  render() {
    const { gears } = this.state

    return (
      <Router>
        <div>
          <Navbar bg = "light" expand = "lg">
            <Navbar.Brand>Gear management system</Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav" />
            <Navbar.Collapse id = "basic-navbar-nav">
              <Nav className = "mr-auto">
                <Nav.Item>
                  <Nav.Link as = "div">
                    <Link to = "/about">About</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as = "div">
                    <Link to = "/list">Gear list</Link>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
            <Route path = "/" exact component = { About } />
            <Route path = "/about" component = { About } />
            <Route path = "/list" render = {
              (props) => <List gears = { this.state.gears } onGearEdit = { this.gearEdit } { ...props }/>
            }/>
            <Route path = "/newgear" render = {
              (props) => <AddGear onSubmit = { this.newGear } { ...props }/>
            } />
            <Route path = "/geardetail/:gearId" render = {
              (props) => {
                const { gearId } = props.match.params
                const carObj = {
                  [gearId]: gears[gearId]
                }
                return (<DetailGear gear = { carObj } { ...props } />)
              }
            } />

            <Route path = '/gearedit/:gearId' render = {
              (props) => {
                const { gearId } = props.match.params
                const carObj = {
                  [gearId]: gears[gearId]
                }
                return (<EditGear onSubmit = { this.gearUpdate } gear = { carObj } { ...props } />)
              }
            } />

        </div>
      </Router>
    )
  }
}

export default App
