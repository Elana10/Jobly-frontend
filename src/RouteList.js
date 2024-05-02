import {Routes, Route, Navigate} from 'react-router-dom';
import Companies from './routes/Companies';
import CompanyDetail from './routes/CompanyDetail';
import JobsAll from './routes/JobsAll';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Home from './routes/Home';
import SignUpForm from './auth/SignUpForm';

function RouteList({signup, login}){
    
    return (
        <Routes>
            <Route path = "/companies"
                element = {<Companies/>}
            />
            <Route path="/companies/:handle"
                element = {<CompanyDetail/>}
            />

            <Route path = "/jobs"
                element = {<JobsAll/>}
            />

            <Route path = "/login"
                element = {<Login login={login}/>}
            />

            <Route path = "/signup"
                element = {<SignUpForm signup ={signup}/>}
            />

            <Route path = "/profile"
                element = {<Profile/>}
            />

            <Route path = "/"
                element = {<Home/>}
            />

            <Route path = "/*"
            element = {<Navigate to= "/"/>}
            
            />
        </Routes>
    )
}

export default RouteList;