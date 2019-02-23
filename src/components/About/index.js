import React from 'react'
import Tabs from '../Tabs'

const About = () => {
  return (
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
  )
}

export default About