import React from 'react';
import './statusBar.css';
import * as Relative from './RelativePosition';

export const StatusBar = (props) => {
    // Relative positions
    const domokunX = Relative.RelativePositionDomuX(props);
    const domokunY = Relative.RelativePositionDomuY(props);
    const exitX = Relative.RelativePositionExitX(props);
    const exitY = Relative.RelativePositionExitY(props);

    return (
        <div className="status-bar-wrapper">
            <h2 className="status-bar"> <span className="status-bar-pony"> Pony:  </span> ( {props.pony} )</h2>
            <h2 className="status-bar"> <span className="status-bar-exit"> Exit: </span> {exitY} {exitX} ( {props.exit} )</h2>
            <h2 className="status-bar"> <span className="status-bar-domokun"> Domokun: </span> {domokunY} {domokunX} ( {props.domokun} )</h2>
        </div>

    )
}