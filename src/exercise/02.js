// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  console.log('Rendering')

  // 🐨 initialize the state to the value from localStorage
  // function getInitialValue() {
  //   console.log('Initialising')
  //   return window.localStorage.getItem('name') || initialName
  // }

  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') || initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
    console.log(window.localStorage.getItem('name'))
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  
  return (
    <>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        {count}
      </button>
      <Greeting />
    </>
  )
}

export default App
