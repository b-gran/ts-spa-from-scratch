import * as React from 'react'
import * as ReactDOM from 'react-dom'

const SomeComponent: React.SFC<{}> = () => 
  <p>hello, world!</p>

ReactDOM.render(
  <SomeComponent />,
  document.body
)
