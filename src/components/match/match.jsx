import React, { useEffect, useState } from 'react';
import './match.scss'
function Match({matchId}){
    const [matchDetails, setMatchDetails] = useState()

    function getMatchDetails(matchId){
        console.log('https://europe.api.riotgames.com/lol/match/v5/matches/'+matchId +'?api_key='+localStorage.getItem('apiKey'))
    
        //https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5761141984?api_key=RGAPI-ca4777ce-2d13-4c5d-aca2-f89fbf0d51ff
        fetch('https://europe.api.riotgames.com/lol/match/v5/matches/'+matchId +'?api_key='+localStorage.getItem('apiKey'))
          .then(response => response.json())
          .then(remoteData  => {
            setMatchDetails(remoteData);
          })
          .catch(err => console.error('getMatch error:', err));
    }


    function playerDetails(item){
        return(
                <div className={'stats ' +'teamId' +item.teamId} key={item.puuid}>
                    <div className="player">
                        <div className='summonerName'>{item.summonerName}</div>
                        <div className='championName'>{item.championName}</div>
                    </div>
                    <div className="score">
                        <div>{item.kills}</div>
                        <div>{item.deaths}</div>
                        <div>{item.assists}</div>
                    </div>
                </div>
        ) 
    }
    useEffect(()=>{
        getMatchDetails(matchId)
      }, [matchId])

    if(matchDetails != undefined){
        return(
            <>
            {console.log(matchDetails.info)}
            
            {
                matchDetails.info.participants.map((item)=>{
                    return(
                        playerDetails(item)
                    )
                })
            }
            
            
            </>
        )
    }
    else return(
        <div>Loading</div>
    )
}
export default Match;