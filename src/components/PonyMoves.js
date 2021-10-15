import React from 'react';
import { useState } from 'react'
import './ponyMoves.css';

const api = {
    main: 'https://ponychallenge.trustpilot.com',
    create: 'https://ponychallenge.trustpilot.com/pony-challenge/maze',
    maze: 'https://ponychallenge.trustpilot.com/pony-challenge/maze/'
}


export const PonyMoves = (props) => {
    const [showMove, setShowMove] = useState('')

    // call = alertDirection(e);
    // Small infor pop-ups
    const alertDirection = (move) => {
        const ponyMove = move.target.getAttribute('data-tag');
        setShowMove(ponyMove)
    }

    const makeMove = async (move) => {
        const ponyMove = move.target.getAttribute('data-tag');
        const mazeId = move.target.getAttribute('data-url');
        const settingsMove = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "direction": ponyMove })
        }

        const postMove = await fetch(`${api.maze}${mazeId}`, settingsMove);
        const moveResponse = await postMove.json();
        console.log(moveResponse);
        // send to state and update maybe?? might help?
        props.update();
    }
    return (
        <>
            <h2 className={`display-move display-${showMove}`} style={{position: "absolute"}}> { showMove.toUpperCase() } </h2>
            {
                props.moves.map((move) => {
                    return (
                        <div onClick={(e) => { makeMove(e); alertDirection(e); }} className={`arrow ${move}`} key={move} data-tag={move} data-url={props.mazeId}> </div>
                    )
                })
            }
        </>
    );
}

