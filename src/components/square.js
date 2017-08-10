import React from 'react';

export default function Square(props) {

    return (
        <button className="square" onClick={props.parentOnClickHandler}>
            { props.value }
        </button>
    );
}