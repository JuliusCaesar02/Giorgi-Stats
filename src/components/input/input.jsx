import React from 'react'
import $ from 'jquery';

function Input({input_text, button_text}){
    return(
        <form onSubmit={()=>{
          localStorage.setItem(input_text, $('.'+input_text).val())
        }}>
          <input type="text" placeholder={input_text} className={input_text}/>
          <input type='submit' value={button_text} className={button_text}/>
        </form>
    )
}

export default Input;