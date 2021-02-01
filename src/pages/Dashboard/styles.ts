import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`
    max-width:900px;
    width:100%;
    height:100vh;
    margin:0 auto;
    position:relative;

`
export const Info = styled.div`
    background-color:#323232;
    width:100%;
    padding: 20px 2%;
    color:white;

    h1{
        margin-top:5px;
        font-size:22px;
        >strong{
            color:#04D361
        }
    }
    p{
        margin-top:10px;
        font-size:16px;
        >strong{
            color:#04D361;
        }
    }
    .over{ 
        color:#04D361;
        
    }
    .below{
        color:#c53030;
    }
`
export const Search = styled.div`
    width:100%;
    padding: 0 2%;
    margin: 30px auto;
    h1{
        margin-top:5px;
        font-size:22px;
        >strong{
            color:#04D361
        }
    }
    form{
        margin-top:10px;
        max-width:100%;
        
        display:flex;

        > div{
            width:100%;
            height:100%;
        }
    }
`
export const ListRooms = styled.div`
    width:100%;
    height:100%;
    max-height:55vh;
    overflow-y:auto; 
    overflow-x:hidden;
    div{
        position: relative;
        transition:0.5s;
        &:active{
            opacity:0.4;
        }
        &:hover{
            transform:translateX(10px)
        }
        & + div{
            margin-top:20px;
        }
        a{
        background:#fff;
        border-radius:5px;
        display:block;
        text-decoration:none;
        display:flex;
        align-items:center;
        div{
            width:100%;
                
            padding: 10px 2%;
            strong{
                font-size:18px;
                color:#3D3D4D;
                width:100%;
                display:flex;
            }
            p{
                font-size:16px;
                color:#A8A8B3;
                margin-top:4px;
                display:inline-block;
            }        
        }
    }
    }
    button{
        position:absolute;
        right:10px;
        top:20px;
        width:10%;
        display:inline-block;
        background-color:transparent;
        border:0;
        svg{
            color:#c53030;
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


export const AddRoom = styled.div`
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
    span{
        line-height:65px;
        font-size:45px;
    }
    &:active{
        background-color:${shade(0.3,"#04D361")};
    }
    a{
        text-decoration:none;
        color:black;
    }
`

export const User = styled.div`
    background-color:${shade(0.3,"#323232")};
    width:50px;
    height:50px;
    cursor: pointer;
    border-radius:calc(50px/2);
    
    position:absolute;
    top:40px;
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