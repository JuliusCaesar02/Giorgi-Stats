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

  function printMatchHistory(){
    if(matchHistory === undefined){
      return(
        <div>Loading</div>
      )
    }
    else return(
      <div className="matchHistory"> 
        {  
        matchHistory.map((item)=>{
          console.log(item)
          return(
          <>    
            <div className={'match matchId' +item}>           
              <Match matchId={item} key={item}/>
            </div>
            {/* <div className="line"></div>   */}    
          </>
          )  
        })
        }
      </div>  
    )
  }

  return (  
    <>
      <div className="header">
        <Input input_text={'username'} button_text={'find'} key={1}/>
        {useEffect(() => {
        getId();
        }, [])}
        <h1>Giorgi Stats</h1>
        <Input input_text={'apiKey'} button_text={'submit'} key={2}/>      
      </div>

      <div className="profile">
        <div className="playerData">
          <div className='profileIcon' style={{backgroundImage: 'url(../data/profileicon/' +userData.profileIconId +'.png)'}}>
            <p>{userData.summonerLevel}</p> 
          </div>
          <h1>{userData.name}</h1>
        </div>
      </div>
      {printMatchHistory()}

    </>
 

  )
}
export default App;


