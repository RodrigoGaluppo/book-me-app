import styled from "styled-components"
import {shade} from "polished"

export const Container = styled.div`
    input{
            padding-left:10px;
            width:70%;
            height:70px;
            border:0;
            border-radius:5px 0 0 5px;
            & ::placeholder{
                color:#a8a8b3;
            }
            color:#3a3a3a;
            border:2px solid white;
        }
        button{
            font-size:14px;
            width:30%;
            height:70px;
            background:#04D361;
            border-radius: 0px 5px 5px 0;
            border:0;
            color:#3a3a3a;
            font-weight:bold;
            transition:background-color 0.1s;
            &:hover{
                background:${shade(0.3,"#04D361")}
            }
        }
    

`
