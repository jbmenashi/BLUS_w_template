import React, {Component} from 'react'
import {connect} from 'react-redux'
import getExampleData from '../store/example'

export class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      someState: 'some-state'
    }
  }

  componentDidMount() {
    this.props.getExampleData()
  }

  render() {
    return this.props.exampleData && this.props.exampleData.length ? (
      <div>
        <h1>Data has been received and is below</h1>
        {this.props.exampleData.map(element => {
          return <h1 key={element.id}>{element.title}</h1>
        })}
      </div>
    ) : (
      <div>
        <h1>Data is loading and will render if everything is successful</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.example.data //this is from the example reducer
})

const mapDispatchToProps = dispatch => {
  return {
    getExampleData: someArg => {
      dispatch(getExampleData(someArg))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example)
