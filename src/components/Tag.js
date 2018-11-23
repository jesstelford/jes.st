import React from 'react'
import { rhythm } from '../utils/typography'

class Tag extends React.Component {
  render() {
    return (
      <small
        style={{
          paddingTop: rhythm(0.05),
          paddingBottom: rhythm(0.05),
          paddingRight: rhythm(0.2),
          paddingLeft: rhythm(0.2),
          marginRight: rhythm(0.2),
          borderRadius: '2px',
          backgroundColor: '#ffe4ad',
          fontSize: '0.7em',
          color: 'initial',
        }}
      >
        {this.props.children}
      </small>
    )
  }
}

export default Tag
