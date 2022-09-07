import { SignOutButton, signInAdmin } from "../../lib/firebase";
import { useState } from 'react'
export default function AdminPage({ }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const user = null;
  const u = ({ target }) => {
    console.log(target.value)
    setUsername(target.value);
  }
  const p = ({ target }) => {
    setPassword(target.value);
  }
  const onSubmit = () => {
    signInAdmin(username, password);
  }
  return (
    user ? <SignOutButton /> :
      <div>
        <h1>Admin Page</h1>
        <div id="#firebaseui-auth-container"></div>
        {/* form for password */}
        <input type="email" placeholder="email" value={username} onChange={u} />
        <br />
        <input type="password" placeholder="password"
          value={password} onChange={p} />
        <button onClick={onSubmit}>Log in</button>
      </div>
  )
}
