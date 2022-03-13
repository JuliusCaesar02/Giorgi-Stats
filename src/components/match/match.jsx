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
            console.log(remoteData)
          })
          .catch(err => console.error('getMatch error:', err));
    }      
    
    useEffect(()=>{
        getMatchDetails(matchId)
      }, [matchId])  

    function getGameMode(queueId){
        switch(queueId){
            //https://static.developer.riotgames.com/docs/lol/queues.json
            case 400: return(<h1>Draft Pick</h1>) 
            case 420: return(<h1>Ranked Solo</h1>)
            case 430: return(<h1>Blind Pick</h1>)
            case 440: return(<h1>Ranked Flex</h1>)
            case 450: return(<h1>ARAM</h1>)
            case 700: return(<h1>Clash Game</h1>)
            case 900: return(<h1>ARURF</h1>)
            case 1020: return(<h1>One For All</h1>)
            case 1400: return(<h1>Ultimate Spellbook</h1>)
            default: return(<h1>Custom Game</h1>)
        }
    }
    if(matchDetails === undefined) return(
        <div>Loading...</div>
    )
    else {
        var startTime = new Date(matchDetails.info.gameCreation);
        return(
        <>
            <div className="matchInfo">
                {getGameMode(matchDetails.info.queueId)}
                <h1>{startTime.toISOString().substring(0, 19).replace('T',' ')}</h1>
                <h1>{((matchDetails.info.gameDuration)/60).toFixed(2).replace('.',':')}</h1>
            </div>

            <div className="teamsFlex">
                <div className={"team100 win" +matchDetails.info.participants[0].win}>
                    {
                    matchDetails.info.participants.map((item)=>{
                        if (item.teamId === 100) return(
                            <Stats player={item} matchTime={((matchDetails.info.gameDuration)/60).toFixed(2)} key={item.summonerName}/>
                        )
                    }) 
                    } 
                </div>
                <div className={"team200 win" +!matchDetails.info.participants[0].win}>
                    {
                    matchDetails.info.participants.map((item)=>{
                        if (item.teamId === 200) return(
                            <Stats player={item} matchTime={((matchDetails.info.gameDuration)/60).toFixed(2)} key={item.summonerName}/>
                        )
                    }) 
                    } 
                </div>
            </div>
            
        </>
        )
    }
}
export default Match;