import React from 'react'
import $ from 'jquery';
import './stats.scss'


function Stats({player}){
    return(
        <>
        <div className={'stats ' +'teamId' +player.teamId +((player.summonerName === localStorage.getItem('username')) ? ' itsYou': '')} key={player.puuid}>
                <div className="player">
                    <div className='summonerName'>{player.summonerName}</div>
                    <div className='championName'>{player.championName}</div>
                </div>
                <div className="score">
                    <div>{player.kills}</div>
                    <div>{player.deaths}</div>
                    <div>{player.assists}</div>
                </div>
            </div>
        </>           
    ) 
}
export default Stats;