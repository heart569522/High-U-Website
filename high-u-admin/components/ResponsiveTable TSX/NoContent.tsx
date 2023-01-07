import React, { Component } from 'react'

interface Props {
  text?: string
}

class NoContent extends Component<Props> {
  render() {
    const { text } = this.props
    return (
      <div className="flex justify-center p-5">
        <span>{text || 'No Content'}</span>
      </div>
    )
  }
}

export default NoContent