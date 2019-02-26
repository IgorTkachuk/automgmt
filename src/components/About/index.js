import React, {Fragment} from 'react'
import Helmet from 'react-helmet'
import Tabs from '../Tabs'

const About = () => {
  return (
    <Fragment>
      <Helmet title="About"/>
      <div style={{ marginLeft: '10px' }}>
        <h1>About</h1>
        <p>
          There are information about this service
        </p>

        <Tabs>
          <div label="Our goals">
                  This tab about our goals
          </div>
          <div label="Solutions">
                  This tab about our solutions
          </div>
          <div label="Contacts">
                  This tab about our contacts
          </div>
        </Tabs>

      </div>
    </Fragment>
  )
}

export default About