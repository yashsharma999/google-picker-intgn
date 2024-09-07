import { useEffect, useState } from 'react'
import './App.css'
import { creatPicker, loadPicker } from './picker'


function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    loadPicker();
  }, [])

  return (
    <>
      <div>
        <button
          onClick={() => creatPicker()}
        >Import from Drive</button>
      </div>

    </>
  )
}

export default App
