import React, { useState } from "react"
import PropTypes from "prop-types"
const LogInForm = ({ logIn }) => {
  //Login form states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  ///Event handlers
  const onChange = ({ target }) => {
    switch (target.name) {
    case "username":
      setUsername(target.value)
      break
    case "password":
      setPassword(target.value)
      break
    default:
      return
    }
  }

  const handleLogIn = e => {
    e.preventDefault()
    const user = { username, password }
    logIn(user)
    resetInputs()
  }

  ////Helper funcs
  function resetInputs() {
    setUsername("")
    setPassword("")
  }

  return (
    <form className="login-form" onSubmit={handleLogIn}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={onChange}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LogInForm.propTypes = {
  logIn: PropTypes.func.isRequired,
}

export default LogInForm
