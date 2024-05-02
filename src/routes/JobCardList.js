import React from 'react';
import JobCard from './JobCard';
import "./JobCardList.css"

function JobCardList({jobs}){

return (
    <div className='job-list-container-all'>
        <h4 className='job-list-title'>Available Jobs</h4>
        <div className='job-list-container'>
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}            
        </div>

    </div>

)


}

export default JobCardList