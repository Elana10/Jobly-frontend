import React, {useState} from "react";
import JoblyApi from '../services/api';
import "./SearchForm.css"

function SearchForm({itemSearch, setItem}){
    const INITIAL_STATE = ''
    const [searchData, setSearchData] = useState(INITIAL_STATE)
    
    const handleChange = evt => {
        const {value} =evt.target;
        setSearchData(value)
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        itemSearch(searchData || undefined)
        setSearchData(INITIAL_STATE)
    }


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor = "search">Search: </label>
                <input
                    id ="search"
                    name = "search"
                    value={searchData}
                    onChange = {handleChange}
                />
                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SearchForm;