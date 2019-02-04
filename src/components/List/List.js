import React, { Component } from 'react';
import { Dropdown, Container, Col, Row, Pagination, Card, CardDeck, Form, Button } from 'react-bootstrap';
import { autoFieldList, sortDirection } from '../../utils/constants';

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

    sortByBrandAcs = (gearId1, gearId2) => {
        const { gears } = this.props;

        if (gears[gearId1].brand < gears[gearId2].brand) {
            return -1;
        } else {
            return 1;
        }
    }

    sortByBrandDesc = (gearId1, gearId2) => {
        const { gears } = this.props;

        if (gears[gearId1].brand > gears[gearId2].brand) {
            return -1;
        } else {
            return 1;
        }
    }

    onSearchChangeHandler = (e) => {
        this.setState({
            searchStr: e.currentTarget.value
        });
    }

    onItemsPerPage = (eKey) => {
        this.setState({
            itemsPerPage: eKey
        })
    }

    onPagesBtnClick = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    render() {
        const { gears, onCarEdit, onCarDetail } = this.props;
        const { sortOrder, searchStr, itemsPerPage, currentPage } = this.state;

        const gearsIdSortedArr = sortOrder === sortDirection.SORT_ASC ? Object.keys(gears).sort(this.sortByBrandAcs) :
                           sortOrder === sortDirection.SORT_DESC ? Object.keys(gears).sort(this.sortByBrandDesc) :
                           Object.keys(gears);

        
        const gearsIdSortedAndFilteredArr = searchStr ? gearsIdSortedArr.filter((gearId) => {
            if (gears[gearId].brand.toUpperCase().indexOf(searchStr.toUpperCase()) > -1) {
                return true;
            } 
            return false;
        }) : gearsIdSortedArr;

        const itemsCount = gearsIdSortedAndFilteredArr.length;
        const pagesCount = itemsCount / itemsPerPage;

        const startItem = currentPage * itemsPerPage;
        const endItem = startItem + itemsPerPage;

        const gearsIdSortedAndFilteredAndPagedArr = gearsIdSortedAndFilteredArr.slice(startItem, endItem);

        const list = gearsIdSortedAndFilteredAndPagedArr.map((gearId) => {
            const fieldsForList = Object.keys(gears[gearId]).filter((fieldName) => {
                
                return !autoFieldList.find((fieldDef) => {
                    return fieldDef.name === fieldName ? true : false;
                }).extended;

            });

            return (
                <Card  key = { `gear_${gearId}` } style = {{ maxWidth: '250px' }}>
                    <Card.Body>
                            <ul>
                                {   
                                        fieldsForList.map((field) => {

                                        const fieldDescr = autoFieldList.find((fieldDef) => {
                                            return fieldDef.name === field ? true : false;
                                        }).descr;

                                        return (
                                            <li key = { `gear_${gearId}_${field}` }>{ fieldDescr }: { gears[gearId][field] }</li>
                                        );
                                    })
                                }
                            </ul>
                        <Card.Footer>
                            <Button style = {{ margin: '2px' }} size = 'sm' variant = 'primary' onClick = { () => {
                                    onCarDetail(gearId);
                                }
                            }>
                            Detail</Button>
                            
                            <Button style = {{ margin: '2px' }} size = 'sm' variant = 'primary' onClick = { () => { 
                                    onCarEdit(gearId) 
                                } 
                            }>Edit</Button>
                        </Card.Footer>                         
                    </Card.Body>
                </Card>
            );
        });

        let pagesBtn = [];
        for (let i = 0; i < pagesCount; i++) {
            pagesBtn.push(
                <Pagination.Item key = { `page_btn_${i}` } onClick = { () => this.onPagesBtnClick(i) }>
                    { i + 1 }
                </Pagination.Item>
            );
        };

        const paginationStyle = {
            marginLeft: '15px'
        }

        const pagesMenu = <div style = { paginationStyle }>
            <Pagination size = 'sm'>
                { pagesBtn }
            </Pagination>
        </div>

        return (
            <div>
                <h1>List of cars</h1>

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
                            <Form.Control type="text" size = "sm" placeholder="Search car by brand"  onChange = { this.onSearchChangeHandler } value = { this.state.searchStr || '' } />
                        </Col>

                        <Col md = "auto">
                            <Dropdown onSelect = { this.onItemsPerPage }>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    { `Items per page: ${itemsPerPage}` }
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey = '5' >5</Dropdown.Item>
                                    <Dropdown.Item eventKey = '10'>10</Dropdown.Item>
                                    <Dropdown.Item eventKey = '15'>15</Dropdown.Item>
                                    <Dropdown.Item eventKey = '20'>20</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Container>

                { pagesMenu }

                <CardDeck style = {{ margin: '5px' }}> { list } </CardDeck>
            </div>
        )
    }
}
