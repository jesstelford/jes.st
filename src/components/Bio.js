import React, { Fragment } from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
          ...this.props.style,
        }}
      >
        <img
          src={profilePic}
          alt={`Jess Telford`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p>
          {this.props.title ? (
            <Fragment>
              <strong>{this.props.title}</strong>
              <br />
            </Fragment>
          ) : null}
          🛠 <a href="https://mobile.twitter.com/ceteio">@ceteio</a>: Tools for
          organizing local structured meetups
          <br />
          🎤 Host{' '}
          <a href="https://mobile.twitter.com/codeheartdesign">
            @CodeHeartDesign
          </a>{' '}
          &amp;{' '}
          <a href="https://mobile.twitter.com/reactsydney">@ReactSydney</a>
          <br />
          🗓 Ex: FE Arch Domain/Groupon/Yahoo7
        </p>
      </div>
    )
  }
}

export default Bio
