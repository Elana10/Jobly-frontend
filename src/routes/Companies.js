import {useState, useEffect, useContext} from 'react';
import CompanyCard from '../components/CompanyCard';
import './Companies.css';
import JoblyApi from '../services/api';
import LoadingSpinner from '../common/LoadingSpinner'
import SearchForm from '../common/SearchForm';
import React from "react";
import UserContext from "../auth/UserContext";
import { Navigate } from 'react-router-dom';

function Companies(){
    const {currentUser} = useContext(UserContext)
    const [companies, setCompanies] = useState(null)

    useEffect(function getCompaniesOnMount() {
    search();
    }, [])

    async function search(name){
        let compList = await JoblyApi.getCompanies(name)
        setCompanies(compList);
    }

    // async function companySearch(name){
    //     const companyRes = await JoblyApi.getCompany(name);
    //     setCompanies([companyRes])
    // }

    if(!currentUser) return <Navigate to="/" />

    if(!companies) return <LoadingSpinner/>

    return (
        <div className='company-container'>
            <SearchForm itemSearch = {search} />

            {companies.length ? (
                <div className='cards-container'>
                    {
                        companies.map((c) => {
                            return <CompanyCard 
                                key = {c.handle} 
                                handle = {c.handle} 
                                name = {c.name}
                                description = {c.description}
                                logoUrl = {c.logoUrl}
                            />  
                        })
                    }        
                </div>              
            ) : (
                <p>Sorry, no results were found!</p>
            )}

        
        </div>

)

}

export default Companies;