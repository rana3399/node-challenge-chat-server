import {React , useState} from 'react'
import { onSignUp } from '../Request/Users'

const SingUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");

    const body = {
        name: name,
        email: email,
        password: password
    }

    async function onSignUpClicked () {
        const data = await onSignUp(body)

        console.log(JSON.stringify(data));
        setData( JSON.stringify(data))
    }

    return (
    <div>
        <h1>Create a new account - Sign Up </h1>

            <div>
                <input
                    placeholder="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                
                />
            </div>
            <div>
                <input
                    placeholder="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

            <div>
                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button onClick={onSignUpClicked } >Sign Up</button>

            <div> {data} </div>
    </div>
  
    )
}

export default SingUp
