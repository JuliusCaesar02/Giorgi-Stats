import './App.scss';
import { useEffect, useState } from "react";
import Input from './components/input/input';
import Match from './components/match/match';
import Champion from './components/champion/champion';

function App(){
  const [userData, setUserData] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [mastery, setMastery] = useState([]);

   function getId(){ 
    console.log('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +localStorage.getItem('username') +'?api_key=' +localStorage.getItem('apiKey'))

    fetch('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +localStorage.getItem('username') +'?api_key=' +localStorage.getItem('apiKey'))
      .then(response => response.json())
      .then(remoteData  => {
        setUserData(remoteData);
        getMatchHistory(remoteData.puuid)
        getMastery(remoteData.id)
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

  function getMastery(id){
    console.log('https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' +id +'?api_key='+localStorage.getItem('apiKey'))

    fetch('https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' +id +'?api_key='+localStorage.getItem('apiKey'))
      .then(response => response.json())
      .then(remoteData  => {
        setMastery(remoteData);
      })
      .catch(err => console.error('getMastery error:', err));
    /* https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/iXRL81GEsrQ6nKkpOicuH_wRiSNTsWWfoY73H5fsWI5i9quN?api_key=RGAPI-21a17221-e2c3-477a-8a13-413508d612d9 */
  }

  function printMastery(){
    if(mastery === undefined){
      return(
        <div>Loading</div>
      )
    }
    else{ 
      let slicedArray = mastery.slice(0, 6);
      return(
        <>
        {slicedArray.map((item)=>{
          console.log(item)
          return(
            <Champion championId={item.championId} championLevel={item.championLevel} championPoints={item.championPoints}/>
          )
        })}
        </>
    )
    }
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
        <img src="../data/logo.svg" alt="" />
        <Input input_text={'apiKey'} button_text={'submit'} key={2}/>      
      </div>

      <div className="profile">
        <div className="mastery">{printMastery()}</div>
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


