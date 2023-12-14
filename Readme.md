### React State Management

#### UseState

- State - defining variables in react. Has some memory for each component local. Helps to keep track.

- using useState in functional component

```
function App(){
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    return(
        <>
            <p> {count} </p>
            <button onClick = {decrement}>Decrement</button>
            <button onClick = {increment}>Increment</button>
        </>
    )
}

```

3: State is non persistent when user refreshes the page the state disappears.


4: using useState in class component


```
import React, { Component } from 'react'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        }
    }


    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

  render() {
    return (
      <>
        <p> {this.state.count} </p>
        <button onClick = {this.decrement}>Decrement</button>
        <button onClick = {this.increment}>Increment</button>
      </>
    )
  }
}

```

5: when dealing with class-based component when updating state can be a Asynchronous 

```
import React, { Component } from 'react'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        }
    }


    increment = () => {
        this.setState((previousState) => ({
            count: previousState.count + 1
        }))
    }

    decrement = () => {
        this.setState((previousState) => ({
            count: previousState.count - 1
        }))
    }

  render() {
    return (
      <>
        <p> {this.state.count} </p>
        <button onClick = {this.decrement}>Decrement</button>
        <button onClick = {this.increment}>Increment</button>
      </>
    )
  }
}

```

### UseEffect

1: Its hook to perform side effects on the functional component

2: It's a result of state changes

```
import React, { useState, useEffect } from 'react'
function App(){
    const [count, setCount] = useState(0)

    useEffect(() =>{ 
        <!-- the code want to run -->
        console.log("The count is " + count)

        <!--  optional return function -->
        // clean up function
        return () => {
            console.log('I am being cleaned up!)
        }
        


    }, [count]) // the dependency array is used to tell useeffect what it should listen to and what variables it should react

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    return(
        <>
            <p> {count} </p>
            <button onClick = {decrement}>Decrement</button>
            <button onClick = {increment}>Increment</button>
        </>
    )
}

```

- For class component

```
import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        this.state = {
            windowWidth: window.innerWidth
        }
    }

    componentDidMount() {
        <!-- Life cycle func = when component mounts/loads -->
        console.log("The app component loaded)
    }

    componentDidUpdate(prevProps) {
        <!-- Life cycnc sync = when component props change -->

    }

    componentWillUnmount(prevProps) {
        <!-- Life cycnc sync = when component unmount/cleanup function -->

    }


  render() {
    return (
      <div>
        <h1>Use effect hook </h1>
        <h2>The window width is: {windowWidth} </h2>
      </div>
    )
  }
}

```

3: UseEffect hook variations

```
import React, {useEffect, useState} from 'react'

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [name, setName] = useState("")

    <!--  every render -->
    useEffect (() => {
        console.log("I re-rendered")
       
    })

    <!-- on first render / mount only! componentDidMount alternative -->
    useEffect (() => {
       console.log("component mounted')
    }, [])

    <!-- on first render + whenever dependency changes! componentDidUpdate alternative -->
    useEffect (() => {
        console.log(`The name changed: ${name}`)
    }, [name])

    <!-- follow same rules except this handles unmounting on component - component! - componentWillUnmount alternative -->

    useEffect (() =>{
         window.addEventListener("resize", updateWindowWidth)

         return () => {
            <!-- when component unmounts cleans up code -->
            window.removeEventListener("resize", updateWindowWidth)

         }
    }, [])

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth)
    }



  return (
    <div>App</div>
  )
}

export default App


```
