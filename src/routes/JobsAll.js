import React from "react";
import {useState, useEffect, useContext} from 'react';
import JoblyApi from '../services/api';
import JobCard from './JobCard';
import LoadingSpinner from '../common/LoadingSpinner'
import "./JobCardList.css"
import JobCardList from './JobCardList';
import "./JobsAll.css"
import { Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";


function JobsAll(){
    const {currentUser} = useContext(UserContext)
    const [jobs, setJobs] = useState(null)

    useEffect(function fetchAllJobs(){
        search();
    }, [])

    async function search (title){
        let jobList = await JoblyApi.getJobs()
        setJobs(jobList);
    }
    if(!currentUser) return <Navigate to="/"/>

    if(!jobs) return <LoadingSpinner/>

    return (
        <div className="job-card-container">
            <JobCardList jobs = {jobs}/>
        </div>

    )

}

export default JobsAll;