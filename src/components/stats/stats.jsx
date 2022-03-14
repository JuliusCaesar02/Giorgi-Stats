import React from 'react'
import $ from 'jquery';
import './stats.scss'


function Stats({player, matchTime}){
    return(
        <>
        <div className={'stats ' +((player.summonerName.toLowerCase() === localStorage.getItem('username').toLowerCase()) ? 'itsYou': '')} key={player.puuid} >
                <div className="player">
                    <div className='summonerName'>{player.summonerName}</div>
                    <div className='championName'>{player.championName}</div>
                </div>
                <img className='championIcon' src={'../../../data/champions/icon/' +player.championName +'.png'} alt="" />
                <div className="score">
                    <div>{player.kills}</div>
                    <p>/</p>
                    <div>{player.deaths}</div>
                    <p>/</p>
                    <div>{player.assists}</div>
                </div>
                <div className='creepScore'>
                        <div>{player.totalMinionsKilled + player.neutralMinionsKilled}</div>
                        <div>{((player.totalMinionsKilled + player.neutralMinionsKilled) / matchTime).toFixed(2)}</div>
                </div>
            </div>
        </>           
    ) 
}
export default Stats;