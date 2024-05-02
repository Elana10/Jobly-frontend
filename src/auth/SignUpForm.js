import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../common/Alert";
import "./SignUpForm.css"


function SignUpForm({signup}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username : "",
        password : "",
        firstName: "",
        lastName : "",
        email: "",
    })

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await signup(formData);
        if(result.success){
            navigate('/companies')
        } else {
            setFormErrors(result.err);
        }
    }
    
    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}))
    }

    return (
        <div className="SignupForm">
            <div className="title-container">
                <h3 className="form-title">Sign Up</h3>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group-question">
                        <label>Username</label>
                        <input
                            name = "username"
                            className = "form-input"
                            value = {formData.username}
                            onChange ={handleChange}
                        />
                    </div>
                    <div className="form-group-question">
                        <label>Password</label>
                        <input
                            name = "password"
                            className = "form-input"
                            value = {formData.password}
                            onChange ={handleChange}
                        />
                    </div>
                    <div className="form-group-question">
                        <label>First Name</label>
                        <input
                            name = "firstName"
                            className = "form-input"
                            value = {formData.firstName}
                            onChange ={handleChange}
                        />
                    </div>
                    <div className="form-group-question">
                        <label>Last Name</label>
                        <input
                            name = "lastName"
                            className = "form-input"
                            value = {formData.lastName}
                            onChange ={handleChange}
                        />
                    </div>
                    <div className="form-group-question">
                        <label>Email</label>
                        <input
                            name = "email"
                            className = "form-input"
                            value = {formData.email}
                            onChange ={handleChange}
                        />
                    </div>
                    {formErrors.length 
                        ? <Alert messages = {formErrors}/>
                        : null
                    }
                    
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )

}

export default SignUpForm;