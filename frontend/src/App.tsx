import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/hello`
        )
        setMessage(response.data.message)
      } catch (e) {
        console.error('Error fetching data:', e)
        setError('Failed to fetch data from backend')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div>Hello World! from Frontend</div>
      <div>
        {error ? error : message ? `${message} from Backend` : 'Loading...'}
      </div>
    </>
  )
}

export default App
