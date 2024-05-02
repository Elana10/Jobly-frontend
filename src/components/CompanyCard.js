import React from 'react';
import './CompanyCard.css';
import {Link} from 'react-router-dom';

function CompanyCard({handle, description, logoUrl, name}){

    return (
            <div className='cardBox'>
                <h3>
                    <Link to ={`/companies/${handle}`}> {name}</Link>
                    {logoUrl && <img src = {logoUrl}
                                    alt = {name}/>}
                </h3>
                <p>{description}</p>
            </div>

    )
}

export default CompanyCard