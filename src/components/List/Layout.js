import React from 'react'

export const Header = ({children}) => children
export const Body = ({children}) => children
export const Footer = ({children}) => children

const Layout = (props) => {
  let children = Array.isArray(props.children) ? props.children : [props.children]
  let header = children.find(child => child.type === Header)
  let body = children.find(child => child.type === Body)
  let footer = children.find(child => child.type === Footer)

  const footerStyle = {
    backgroundColor: "#28a745",
    fontSize: "15px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "25px",
    width: "100%"
  };

  return ( 
    <div>
        {header || <div>Default Header</div>}
        {body || <div>Default Body</div>}
        {footer || <div style = { footerStyle }>&copy; {new Date().getFullYear()} Copyright: <a href="https://www.mycompany.com"> MyCompany.com </a></div>}
    </div>
  )
}

export default Layout