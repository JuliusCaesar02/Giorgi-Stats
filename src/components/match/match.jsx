import React, { useEffect, useState } from 'react';
import Stats from '../stats/stats';
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

    useEffect(()=>{
        getMatchDetails(matchId)
      }, [matchId])  
    
      console.log(matchDetails)

    if(matchDetails === undefined) return(
        <div>Loading...</div>
    )
         
    else return(
        <>
            <div className={"team100 win" +matchDetails.info.participants[0].win}>
                {
                matchDetails.info.participants.map((item)=>{
                    if (item.teamId === 100) return(
                        <Stats player={item}/>
                    )
                }) 
                } 
            </div>
            <div className={"team200 win" +!matchDetails.info.participants[0].win}>
                {
                matchDetails.info.participants.map((item)=>{
                    if (item.teamId === 200) return(
                        <Stats player={item}/>
                    )
                }) 
                } 
            </div>
        </>
    )
}
export default Match;