// http://172.20.2.203:3000

import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch('http://192.168.2.86:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw response.json()
        }
        return response.json()
      })
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result))
        navigate('/notes')
      })
      .catch(async (error) => {
        const e = await error
        alert(e.message)
      })
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form
        onSubmit={submitHandler}
        className='w-[320px] border shadow-lg rounded-lg p-4 bg-gray-50/50'
      >
        <h2 className='text-2xl my-4'>Login</h2>
        <input
          className='w-full border outline-none p-2 rounded my-2'
          type='text'
          onChange={(event) => setUsername(event.target.value)}
          placeholder='@Username'
        />
        <input
          className='w-full border outline-none p-2 rounded my-2'
          type='password'
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Password'
        />
        <button className='w-full bg-teal-400 text-white p-2 rounded mt-2'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
