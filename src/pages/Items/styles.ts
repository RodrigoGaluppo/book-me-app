import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`
    max-width:900px;
    width:100%;
    height:100vh;
    margin:0 auto;
    position:relative; 
`
export const Text = styled.div`
    margin: 0 auto;
    width:100%;
    padding: 10px 0;
    h1{ 
        color:#323232;
        padding: 0 2%;
        margin-top:10px;
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
export const ListItems = styled.div`
    margin-top:20px;
    width:100%;
    height:100%;
    max-height:55vh;
    overflow-y:auto; 
    overflow-x:hidden;
        div{

            background-color:#323232;
            border-radius:5px;
            display:block;
            align-items:center;
            width:100%;
            position:relative;
            padding: 10px 2%;
            strong{
                font-size:18px;
                color:#FFF;
                width:100%;
                display:flex;
            }
            p{
                font-size:16px;
                color:#FFF;
                margin-top:4px;
                display:inline-block;
               span{
                  font-weight:bold;
                  color:#04D361;
                  font-size:16px;
                  margin-top:4px;
                  display:inline-block;
               }
            }
            > button{
                position:absolute;
                right:10px;
                top:25px;
                display:inline-block;
                color:#cbcbd6;
                background:transparent;
                border:0;
                outline:0;
            }
        transition:0.5s;
        & + div {
            margin-top:20px;
        }
        &:hover{
            transform:translateX(20px)
        }
    }
    h1{
        margin-top:5px;
        font-size:22px;
        >strong{
            color:#04D361
        }
    }
    padding: 0 2%;
`


export const AddItem = styled.div`
    width:65px;
    height:65px;
    cursor: pointer;
    border-radius:calc(65px/2);
    background-color:#04D361;
    position:absolute;
    bottom:10px;
    right:10px;
    color:black;
    text-align:center;
    a{
        text-decoration:none;
        color:black;
    }
    span{
        line-height:65px;
        font-size:45px; 
    }
    &:active{
        background-color:${shade(0.3,"#04D361")};
    }
`