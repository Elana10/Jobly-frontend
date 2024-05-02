import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import JoblyApi from "../services/api";
import LoadingSpinner from "../common/LoadingSpinner"
import JobCardList from "./JobCardList";
import "./CompanyDetails.css"

/**Company Detail 

Renders information about the company, along with jobs posted by the company. 

Routed at /companies/:handle 

Routes -> CompanyDetail -> JobCardList
*/
function CompanyDetail() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;

    return (
        <div className="company-details-block">
            <h4 className="company-title">{company.name}</h4>
            <p className="company-info">{company.description}</p>
            <JobCardList jobs={company.jobs}/>
        </div>
    )

}

export default CompanyDetail;