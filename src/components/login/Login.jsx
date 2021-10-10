import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css"


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    useEffect(()=>{
        if (localStorage.getItem('user-info')) {
            history.push("/")
        }
    })
async function login(){
    console.log(username, password);
    if (username === "admin" && password === "admin" ) {
        history.push("/")
        return;
    }
}

return(
    <form>
        <div className="form-inner">
            <h2>Login Page</h2>
            <div className="form-group">
                <input 
                    id="username"
                    type="text" 
                    placeholder="username"  
                    onChange={(event)=>setUsername(event.target.value)} />
                    <br/>
                <input 
                    id="password"
                    type="password" 
                    placeholder="password" 
                    onChange={(event)=>setPassword(event.target.value)} />
                    <br/>
                <button 
                    onClick={login} 
                    className="btn btn-primary">Login</button>
            </div>
        </div>
    </form>
)
}

export default Login