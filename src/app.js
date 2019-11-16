'use strict'

import React, { PureComponent } from 'react'

// import Title from 'components/title'

import './css/style.css'

class App extends PureComponent {
  constructor () {
    console.log('teste')
    super()
    this.state = {
      title: '...',
      Component: 'div'
    }
  }

  getTitle () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('My app witth async / await!')
      }, 3000)
    })
  }

  async componentDidMount () {
    const title = await import('components/title')

    this.setState({
      title: await this.getTitle(),
      Component: title.default
    })
  }

  render () {
    return (
      <div>
        <this.state.Component>{this.state.title}</this.state.Component>
      </div>
    )
  }
}

export default App
