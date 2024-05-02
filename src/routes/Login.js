import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../common/Alert";
import "./Login.css"

function Login ({login}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState([])

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await login(formData);
        if (result.success){
            navigate('/companies')
        } else {
            setFormErrors(result.err)
        }
    }

    async function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name] : value}))
    }

    return (
        <div className="login-form">
            <div className="login-title">
                <h3>Login</h3>
            </div>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            name = "username"
                            value = {formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name = "password"
                            value = {formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {formErrors.length
                        ? <Alert messages ={formErrors}/>
                        : null
                    }
                    <button>Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login;