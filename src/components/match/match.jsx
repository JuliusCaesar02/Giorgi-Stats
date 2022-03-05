import React, { useEffect, useState } from 'react';
import Stats from '../stats/stats';
import './match.scss'
import $ from 'jquery';

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

    function formatta(matchId){
        ///////////////////////////////
        //Mettere a posto assolutamente
        //Metodo poco convinvente e
        //spesso difettoso. 
        //Trovare alternativa wrap
        ///////////////////////////////
        const team100 = "<div class='team100 win" +matchDetails.info.teams[0].win +"'></div>"
        const team200 = "<div class='team200 win" +matchDetails.info.teams[1].win +"'></div>"
        if(matchId != sessionStorage.getItem('lastMatchId')){
        ///////////////////////////////
        //Costretto a fare così per non 
        //avere una matrioska di div
        //A volte però neanche renderizza
        //o lo fa solo in parte
        ///////////////////////////////
        $('.matchId' +matchId +' .teamId100').wrapAll(team100)
        $('.matchId' +matchId +' .teamId200').wrapAll(team200)
        sessionStorage.setItem('lastMatchId', matchId);  
        } 
    }

    useEffect(()=>{
        getMatchDetails(matchId)
      }, [matchId])  

    if(matchDetails != undefined){
        $(window).on('load', function() {
            formatta(matchId)
        })
        return(
            <>
                {console.log(matchDetails.info)}
                {
                    matchDetails.info.participants.map((item)=>{
                        return(    
                            <>      
                            <Stats player={item}/>          
                            </>             
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