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
    min-height:100px;
    
    color:white;
    > span{
        position:absolute;
        top:50px;
        svg{
            color:white;
        }
    }
    h1{ 
        padding-left:40px;
        margin-top:40px;
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
`
export const Search = styled.div`
    max-width:100%;
    margin: 10px auto;
    display:flex;
    h1{
        margin-top:5px;
        font-size:22px;

        >strong{
            color:#04D361
        }
    }
    form{
        padding: 0 2%;
        max-width:350px;

        width:100%;
        > div{
            width:100%;
            height:100%;
        }
    }
`
export const User = styled.div`
    background-color:${shade(0.3,"#323232")};
    width:50px;
    height:50px;
    cursor: pointer;
    border-radius:calc(50px/2);
    
    position:absolute;
    top:35px;
    right:10px;
    color:#04D361;
    text-align:center;
    svg{
        position:relative;
        top:50%;
        transform:translateY(-50%)
    }
    &:active{
        border:0;
        background-color:${shade(0.5,"#323232")};
    }
    a{  
        outline:0;
        border:0;
        text-decoration:none;
        color:#04D361;
    }

`
