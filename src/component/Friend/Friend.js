import React from 'react';

const Friend = (props) => {
    const {name, email} = props.friend;
    const friendStyle = {
        border: '1px solid green',
        margin: '20px',
        padding: '20px',
        borderRadius: '20px'
    }
    return (
        <div style={friendStyle}>
            <h2>Name: {name}</h2>
            <p>email: {email} </p>
        </div>
    );
};

export default Friend;