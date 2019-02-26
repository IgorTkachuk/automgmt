import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import About from '../About'
import List from '../List'
import AddGear from '../AddGear'
import EditGear from '../EditGear'
import DetailGear from '../DetailGear'
import { genRandomId } from '../../helpers/utils'
import GearService from '../../services/gear-service'

class App extends Component {
  state = {
    gears: {}
  }

  componentDidMount () {
    const gearService = new GearService()

    gearService.getAllGears()
      .then(res => {
        this.setState({
          gears: res
        })
      })

    console.log('did mount')
  }

  newGear = (car) => {
    const { gears } = this.state
    const gearId = genRandomId()

    this.setState({
      gears: {
        ...gears,
        [gearId]: car
      },
    })
  }

  updateGear = (updatedGear) => {
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
      <Fragment>
        <Helmet 
          defaultTitle="GMS"
          titleTemplate="AMS - %s"
        />
        <Router>
          <div>
            <TopMenu />
            <Route path="/" exact component={ About } />
            <Route path="/list" render={
              (props) => <List { ...props } gears={ gears } onGearEdit={ this.gearEdit } />
            }/>
            <Route path = "/newgear" render={
              (props) => <AddGear { ...props } onSubmit={ this.newGear }/>
            } />
            <Route path = "/geardetail/:gearId" render={
              (props) => {
                const { gearId } = props.match.params
                console.log(this.state)
                console.log(gearId)
                return <DetailGear { ...props } gear={ gears[gearId] } />
              }
            } />
            <Route path='/gearedit/:gearId' render={
              (props) => {
                const { gearId } = props.match.params
                const carObj = {
                  [gearId]: gears[gearId]
                }
                return (<EditGear { ...props } onSubmit={ this.updateGear } gear={ carObj }/>)
              }
            } />
          </div>
        </Router>
      </Fragment>
    )
  }
}

const TopMenu = () => 
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>GMS</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as="div">
            <Link to="/">About</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as="div">
            <Link to="/list">Gear list</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default App
