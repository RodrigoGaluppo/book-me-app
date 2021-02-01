import styled from "styled-components"

export const Info = styled.div`
    background-color:#323232;
    width:100%;
    padding: 5px 2%;
    margin:0 auto;
    min-height:100vh;
    color:white;
    h1{ 
        padding:0 2%;
        margin-top:40px;
        font-size:26px;
        >strong{
            color:#04D361
        }
    }
    p{
        margin-top:10px;
        font-size:16px;
        padding: 0 2%;
        >strong{
            color:#04D361
        }
    }
    svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
`