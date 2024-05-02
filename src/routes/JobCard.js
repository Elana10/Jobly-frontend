import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./JobCard.css"
import UserContext from '../auth/UserContext';

function JobCard({id, title, salary, equity, companyName}) {
    const {hasAppliedToJob, applyToJob} = useContext(UserContext)
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus(){
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    async function handleApply(evt){
        if(hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true)
    }

    return (
        <div className='container-job-card'>
            <h5>
                <Link>{title}</Link>
            </h5>
            <span>
                <ul>
                    <li>Company: {companyName}</li>
                    <li>Salary: {salary ? salary : 'N/A'}</li>
                    <li>Equity: {equity ? equity : 'N/A'}</li>
                </ul>
            </span>
            <button
                className='apply-button'
                onClick={handleApply}
                disabled = {applied}
            >
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    )
}

export default JobCard;