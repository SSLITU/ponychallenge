import React from 'react';
import './App.css';
import ponyImage from '../assets/pony.png';
import { useState, useEffect, useRef } from 'react';
import { StatusBar } from './StatusBar';
import { PonyMoves } from './PonyMoves';
import { newMaze } from './Api';

const api = {
    main: 'https://ponychallenge.trustpilot.com',
    create: 'https://ponychallenge.trustpilot.com/pony-challenge/maze',
    maze: 'https://ponychallenge.trustpilot.com/pony-challenge/maze/'
}

export const App = () => {
    const [mazeId, setMazeId] = useState('');
    const [pony, setPony] = useState('');
    const [domu, setDomu] = useState('');
    const [mazeExit, setMazeExit] = useState('');
    const [walls, setWalls] = useState('');
    const [mazeWidth, setMazeWidth] = useState('');
    const [ponyMoves, setPonyMoves] = useState([]);

    const firstUpdate = useRef(true);
    
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        getMazeStatus();
    }, [mazeId]);


    useEffect(() =>{
        moveOptions();
    }, [pony])

    const createMaze = async () => {
        const id = await newMaze();
        setMazeId(id);
    }

    const getMazeStatus = async () => {
        if (!mazeId) {
            return;
        }
        const response = await fetch(`${api.maze}${mazeId}`);
        const mazeData = await response.json();
        setWalls(mazeData.data);
        setMazeWidth(mazeData.size[0]);
        setMazeExit(mazeData["end-point"][0]);
        setPony(mazeData.pony[0]);
        setDomu(mazeData.domokun[0]);
    }

    const moveOptions = () => {
        const moves = [];
        const check = walls[pony];
        const eastCheck = walls[(pony + 1)];
        const southCheck = walls[(pony + mazeWidth)];

        if (check === undefined || !check.includes("north")) {
            moves.push('north');
        }
        if (check === undefined || !check.includes("west")) {
            moves.push('west');
        }
        if (southCheck === undefined || !southCheck.includes("north")) {
            moves.push('south');
        }
        if (eastCheck === undefined || !eastCheck.includes("west")) {
            moves.push('east');
        }

        if (moves) {
            setPonyMoves(moves);
        }
    }

    return (
        <div className="app-container" style={{ backgroundColor: "black", height: "100vh", }}>

            {pony && <StatusBar pony={pony} domokun={domu} exit={mazeExit} width={mazeWidth} />}

            {!ponyMoves && <div>
                <div className="info-bar">
                    <p className="info-description"> Will you help our trapped pony find her way through the maze and rescue her from the Domokun? </p>
                    <button className="info-button" onClick={getMazeStatus}> Ready! </button>
                </div>
            </div>
            }

            {pony && pony === domu &&
                <div className="lost-pop-up">
                    <h2>Buuh!! You Got Eaten By The Domokun</h2>
                    <button className="info-button" onClick={createMaze}> Try Again </button>
                </div>}

            {pony && pony === mazeExit &&
                <div className="lost-pop-up">
                    <h2>Congratulations!!! You found the exit</h2>
                    <button className="info-button" onClick={createMaze}> Try Again </button>
                </div>}

            {pony && <div className="content-container">
                {ponyMoves && <PonyMoves moves={ponyMoves} mazeId={mazeId} update={() => getMazeStatus()} />}
                {pony && <img alt="pony" className="pony-image" src={ponyImage}></img>}

            </div>
            }

            {!walls &&
                <button onClick={createMaze} className="start-button">New Game</button>
            }
        </div>
    );
};