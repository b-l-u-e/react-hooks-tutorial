### React State Management

#### UseState

- State - defining variables in react. Has some memory for each component local. Helps to keep track. Data changes with time.
- State takes initial value if not defined the value is known as undefined.

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

3: Manipulates state of the component

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
            <!-- time out, add eventlistener -->
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

###  useMemo

1: 

```
import React, { useState, useEffect } from 'react'

function App(){
    const [count, setCount] = useState(0)
    const [input, setInput] = useState("")


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

            <h2>{input}</h2>
            <input onChange={(e) => setInput(e.target.value)} type="text" />

            
        </input>
    )
}

```

***callback function***

A higher-order function is a function that either accepts functions as parameters, return a function or both.

Functions get passed in as parameters are callback functions. 

Callback functions get invoked during the execution of the higher-order function.

How higher-order function and callback function works?

1: When invoke higher-order function and pass another function in as an argument. We dont invoke the argument function, invoking will evalute to passing in the return value of that function call. 

2: With callback functions we pass in function itself by typing the function name without the parentheses.

```

<!-- callback function -->

const addTwo = num => {
  return num + 2;
}

<!-- higher order function -->

const checkConsistentOutput = (func, val) => {
  let checkA = val + 2
  let checkB = func(val)
  if(checkA === checkB) {
    return func(val)
  }
  return "inconsistent results"

}

console.log(checkConsistentOutput(addTwo, 2));



```
***iterators***

iterators are methods called on arrays to manipulate elements and return values.

***.forEach() method, .map() method, .filter() method, .findIndex(), .reduce() method***

```
const artists = ['Picasso', 'Kahlo', 'Matisse', 'Utamaro']

artists.forEach(artist => {
    console.log(artist + ' is one of my favorite artists.')
})

const numbers = [1, 3, 5, 7, 9]

const squareNumbers = numbers.map(number => {
    return number * number
})

console.log(squareNumbers)

const things = ['desk', 'chair', 5, 'backpack', 3.14, 100];

const onlyNumbers = things.filter(thing => {
  return typeof thing === 'number';
});

console.log(onlyNumbers);

```
***forEach method***

- Different ways to pass in callback functions as arguments in iterators

- The return value for .forEach() will always be undefined.

1: use a pre-defined function

    ```
      const groceries = ['brown sugar', 'salt', 'cranberries', 'walnuts']

      groceries.forEach(function(groceryItem) {
        console.log(' - ' + groceryItem)
      })
    ```

2: use Arrow function syntax
    ```
    const groceries = ['brown sugar', 'salt', 'cranberries', 'walnuts']

    groceries.forEach(groceryItem => console.log(groceryItem));

    ```

3: Define function beforehand to be used as callback function

```
const groceries = ['brown sugar', 'salt', 'cranberries', 'walnuts']

function printGrocery(element){
    console.log(element)
}

groceries.forEach(printGrocery)

```

***map method***

- returns new array

```
const numbers = [1, 2, 3, 4, 5, 6 ]

const bigNumbers = numbers.map(number => {
    return number * 10
})

console.log(bigNumbers)

```

***filter method***

- returns new array of elements after filtering certain elements from original array. The callback function for the filter method should return true or false depending on the element that is passed to it.

```
const nums = [123, 25, 78, 5, 9]

const lessThanTen = nums.findIndex(num => {
    return num < 10 
})

```

- The elements that cause the callback function to return true are added to the new array.


***findIndex method***

- returns the index of the first element that evaluates to true in the callback function

```
const nums = [123, 25, 78, 5, 9]

const lessThanTen = nums.findIndex(num => {
    return num < 10 
})

```

***reduce method***

- returns a single value after iterating through the elements of the array, thereby reducing the array

```
const numbers = [1, 2, 4, 10]

const sum = numbers.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue
})

console.log(sum)

``` 

- The value of accumulator starts off as the value of the first element in the array.

- currentValue starts as the second element, takes on the value of the current element in the looping process

- .reduce() method can also take an optional second parameter to set an initial value for accumlator

```
const sum = numbers.reduce((accumulator, currentValue) =>{
    return accumulator + currentValue
}, 100)

```

***some() method & every()method***

- returns a boolean value that indicates whether the current value is true or false.