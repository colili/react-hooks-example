import React, { Component } from 'react'

export default class ClassExample extends Component {
    state = {count: 0}
    addCount = () => {
        const {count} = this.state
        this.setState({count: count + 1})
    }
    componentDidMount() {
        console.log(`componentDidMount => you clicked ${this.state.count} times`);
    }
    componentDidUpdate() {
        console.log(`componentDidUpdate => you clicked ${this.state.count} times`);
    }
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.addCount}>Click me</button>
            </div>
        )
    }
}
