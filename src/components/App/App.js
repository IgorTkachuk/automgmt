import React, { Component } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { pages } from '../../utils/constants';
import About from '../About';
import List from '../List';
import AddCar from '../AddCar';
import EditCar from '../EditCar';
import DetailCar from '../DetailCar';

class App extends Component {

  state = {
    currentComponent: pages.PAGE_ABOUT,
    gears: {}
  }

  getId = () => {
    return Math.floor(Math.random()*100000);
  }

  menuHandler = (evt, page) => {
    evt.preventDefault();

    this.setState ({
      currentComponent: page
    });
  }

  newAuto = (car) => {
    const { gears } = this.state;
    const gearId = this.getId();

    this.setState({
      gears: {
        ...gears,
        [gearId]: car
      },
      currentComponent: pages.PAGE_LIST
    })
  }

  carEdit = (gearsId) => {
    this.setState({
      currentComponent: pages.PAGE_EDIT,
      carIdForEdit : gearsId
    })
  }

  carDetail = (gearId) => {
    this.setState({
      currentComponent: pages.PAGE_DETAIL,
      carIdForDetail: gearId
    })
  }

  carUpdate = (updatedCar) => {
    const { gears } = this.state;

    this.setState({
      gears: {
        ...gears,
        ...updatedCar
      },
      currentComponent: pages.PAGE_LIST
    });
  }

  render() {
    const { currentComponent, carIdForEdit, carIdForDetail, gears } = this.state;
    let pageToShow;

    if (currentComponent === pages.PAGE_ABOUT) {
      pageToShow = <About />;
    } else if (currentComponent === pages.PAGE_LIST) {
      pageToShow = <List gears = { this.state.gears } onCarEdit = { this.carEdit } onCarDetail = { this.carDetail } />;
    } else if (currentComponent === pages.PAGE_NEW) {
      pageToShow = <AddCar newAuto = { this.newAuto } />;
    } else if (currentComponent === pages.PAGE_EDIT) {
      const carObj = {
        [carIdForEdit]: gears[carIdForEdit]
      }
      pageToShow = <EditCar onCarUpdate = { this.carUpdate } carForEdit = { carObj }/>;
    } else if (currentComponent === pages.PAGE_DETAIL) {
      const carObj = {
        [carIdForDetail]: gears[carIdForDetail]
      }
      pageToShow = <DetailCar carForDetail = { carObj }/>
    }

    return (
      <div>
        <Navbar bg = 'light' expand = 'lg'>
          <Navbar.Brand>Auto management system</Navbar.Brand>
          <Navbar.Toggle aria-controls = "basic-navbar-nav" />
          <Navbar.Collapse id = "basic-navbar-nav">
            <Nav className = "mr-auto">
              <Nav.Link onClick = { (e) => this.menuHandler(e, pages.PAGE_ABOUT) }>About</Nav.Link>
              <Nav.Link onClick = { (e) => this.menuHandler(e, pages.PAGE_LIST) }>Cars list</Nav.Link>
            </Nav>
            <Button variant="outline-success" onClick = { (e) => this.menuHandler(e, pages.PAGE_NEW) }>Add a car</Button>
          </Navbar.Collapse>
        </Navbar>

        { pageToShow }
      </div>
    );
  }
}

export default App;
