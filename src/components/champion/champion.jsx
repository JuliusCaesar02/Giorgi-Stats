import "./champion.scss"
import React from 'react';

function Champion({championId, championLevel, championPoints}) {

    function getChampionName(championId){
        let championList = require('../../champion.json');
        for(var i in championList.data){
            if(championList.data[i].key == championId){
                return championList.data[i].name.replace("'", "");
            }
        }
    }

    return (
        <div className="champion">
            <div className="images">
                <img className="championIcon" src={'../../../data/champions/icon/' +getChampionName(championId) +'.png'} alt="" />
                <img className="mastery" src={"../../../data/mastery/Champion_Mastery_Level_" +championLevel +"_Flair.png"} alt="" />
            </div>
            <div className="text">
                <div>{getChampionName(championId)}</div>
                <div>{championPoints}</div>
            </div>
        </div>
    )
}

export default Champion;