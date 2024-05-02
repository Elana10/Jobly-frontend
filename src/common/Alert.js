import React from 'react';

function Alert({messages}){

    return (
        <ul>
            {messages.map(m =>{
                return <li>{m}</li>
            })}
        </ul>
    )
}

export default Alert 