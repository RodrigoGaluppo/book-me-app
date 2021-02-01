import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`
    max-width:900px;
    width:100%;
    height:100vh;
    margin:0 auto;
    position:relative;

    @media screen and (max-width:600px){
        .wrapper{
            top:40vh;
            margin: 0 auto;
            left:0;
            right:0;
            .DayPicker-wrapper {
                font-size:1.2em;
            }
        }
    }
    @media screen and (max-width:330px){
        .wrapper{
            
            top:230px;
            .DayPicker-wrapper {
                font-size:0.8em;
            }
        }
    }
    
`
export const Text = styled.div`
    margin: 0 auto;
    position:absolute;
    left:0;
    h1{ 
        color:#323232;
        padding: 0 2%;

        margin-top:20px;
        font-size:24px;
    }
`
export const Info = styled.div`
    background-color:#323232;
    width:100%;
    padding: 5px 2%;
    margin:0 auto;
    min-height:110px;
    
    color:white;
    > span{
        position:absolute;
        top:30px;
        svg{
            color:white;
        }
    }
    h1{ 
        padding-left:30px;
        margin-top:20px;
        font-size:24px;
        >strong{
            color:#04D361
        }
    }
    p{
        margin-top:10px;
        font-size:16px;
        padding-left:32px;
        >strong{
            color:#04D361
        }
    }
    .over{ 
        color:#04D361;
        
    }
    .below{
        color:#c53030;
    }
`

export const CalendarWrapper = styled.div`
    position:absolute;
    right:0;
    max-width:350px;
    width:100%;
    min-height:40vh;
    margin: 10px auto;
    padding: 0 2%;

    .DayPicker {
        border-radius: 10px;
    }

  .DayPicker-wrapper {
    height:100%;
    width:100%;
    padding-bottom: 0;
    background: #323232;
    border-radius: 10px;
    font-size:0.9em;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
    color:#fff;
  }
  .DayPicker-Day--today {
    font-weight: normal;
    color:black;
  }
  .DayPicker-Day--selected {
    background: #04D361 !important;
    border-radius: 15px;
    color: #232129 !important;
  }
  .DayPicker-Month {
    width: 100%;
    
  }
  .DayPicker-Day {
    width: 10px;
    height:10px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

`
