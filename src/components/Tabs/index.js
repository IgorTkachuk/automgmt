import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class Tabs extends Component {
  constructor (props) {
    super(props)
  
    this.state = {
      activeTab: props.children[0].props.label
    }
  }

  onTabChange = (tab) => {
    this.setState ({
      activeTab: tab
    })
  }

  render() {
    const { children } = this.props
    
    const tabs = children.map((child) => {
      const {label} = child.props

      return (
        <Tab label={ label } key={ label } onClick={ this.onTabChange } activeTab={ this.state.activeTab }/>
      )
    })

    return (
      <div className="tabs">
          <ol className="tab-list">
            {tabs}
          </ol>
          <div className="tab-content">
            {
              children.map((child) => {
                if (child.props.label !== this.state.activeTab) return undefined
                return child.props.children
              })              
            }
          </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired
}

const Tab = (props) => {
  const tabOnClick = () => {
    const { label, onClick } = props
    onClick (label)
  }

  const {label, activeTab} = props

  let className = 'tab-list-item'

  if (activeTab === label) {
    className += ' tab-list-active'
  }
    
  return (
    <li className={className} onClick={ tabOnClick } > {label} </li>
  )
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}