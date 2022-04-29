// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLoclaStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return ( typeof defaultValue === 'function') ? defaultValue() : defaultValue;
  })

  const prevKeyRef = React.useRef('key');


  React.useEffect(() => {

    const prevKey = prevKeyRef.current;

    if ( key !== prevKey){
      localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key
    
    window.localStorage.setItem(key, serialize(state))
    console.log(window.localStorage.getItem('name'))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  console.log('Rendering Greeting Component')

  const [name, setName] = useLoclaStorageState('name', initialName)

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
