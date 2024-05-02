import React, {useState, useContext} from "react";
import Alert from "../common/Alert";
import JoblyApi from "../services/api";
import UserContext from "../auth/UserContext";
import { Navigate } from 'react-router-dom';
import "./Profile.css"

function Profile(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName : currentUser?.firstName || "", 
        lastName : currentUser?.lastName || "",
        email : currentUser?.email || "",
        username : currentUser?.username || "",
        password : ""
    })
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSavedConfirmed] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName : formData.firstName, 
            lastName : formData.lastName,
            email : formData.email,
            password : formData.password
        }

        let username = formData.username;
        let updatedUser;

        try{
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors){
            console.log(errors)
            setFormErrors(errors);
            return;
        }

        setFormData(f => ({...f, password: ''}))
        setFormErrors([]);
        setSavedConfirmed(true)

        setCurrentUser(updatedUser)
    }

    function handleChange(evt){
        const {name, value} =evt.target;
        setFormData(f => ({...f, [name] : value}))
        setFormErrors([])
    }

    if(!currentUser) return <Navigate to="/" />

    return (
        <div className="profile-container">
            <div className="profile-title-container">
                <h3 className="profile-title">Profile</h3>
            </div>
            <form onSubmit = {handleSubmit} className="profile-form">
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <p>{formData.username}</p>
                </div>
                <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                        name = "firstName"
                        value = {formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                        name = "lastName"
                        value = {formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        name = "email"
                        value = {formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Enter Password to Save Changes</label>
                    <input
                        name = "password"
                        value = {formData.password}
                        onChange={handleChange}
                    />
                </div>
                {formErrors.length
                    ? <Alert messages = {formErrors}/>
                    : null
                }
                {saveConfirmed 
                    ? <Alert messages={[`Updated profile for Username ${formData.username} successfully!`]}/>
                    : null
                }
                <button>Update Profile</button>
            </form>
        </div>
    )
}

export default Profile