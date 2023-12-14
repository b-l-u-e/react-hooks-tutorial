import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  let [list, setList] = useState(['Jack', 'Jill', 'John'])
  const [name, setName] = useState("")

  function addOne() {
    setCount(count + 1)
  }
  function minusOne() {
    setCount(count - 1)
  }

  return (
    <div>
      <button onClick={addOne}>+</button>
      <p>{count}</p>
      <button onClick={minusOne}>-</button>
      <ul>
        {list.map(name => (
          <li>{name}</li>
        ))}
      </ul>
      <input type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
    </div>
  )
}

export default App
 




