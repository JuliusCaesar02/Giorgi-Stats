import './App.scss';
import { useEffect, useState } from "react";
import Input from './components/input/input';
import Match from './components/match/match';

function App(){
  const [userData, setUserData] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);

   function getId(){ 
    console.log('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +localStorage.getItem('username') +'?api_key=' +localStorage.getItem('apiKey'))

    fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +localStorage.getItem('username') +'?api_key=' +localStorage.getItem('apiKey'))
      .then(response => response.json())
      .then(remoteData  => {
        setUserData(remoteData);
        getMatchHistory(remoteData.puuid)
      })
      .catch(err => console.error('getId error:', err));    
  }

  function getMatchHistory(puuid){
    console.log('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'+puuid +'/ids?start=0&count=10&api_key='+localStorage.getItem('apiKey'))

    fetch('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'+puuid +'/ids?start=0&count=10&api_key='+localStorage.getItem('apiKey'))
      .then(response => response.json())
      .then(remoteData  => {
        setMatchHistory(remoteData);
      })
      .catch(err => console.error('getMatchHistory error:', err));
  }

  return (
    
    <>
      <Input input_text={'username'} button_text={'find'}/>
      {useEffect(() => {
      getId();
      }, [])}

      <Input input_text={'apiKey'} button_text={'submit'}/>      

      <div className="Profile">
        <div className='profileIcon' style={{backgroundImage: 'url(http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/' +userData.profileIconId +'.png)'}}>
          <p>{userData.summonerLevel}</p>
        </div>


        <h1>{userData.name}</h1>
        <div>Match history</div>
        {  
        matchHistory.map((item)=>{
          return(
          <>
          <p className='matchId'>{item}</p>
          <div className="match">
            <Match matchId={item} key={item}/>
          </div>
          </>
        )  
        })
        }
      </div>
    </>
    
  );
}
export default App;

