import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 375px;
    height: 100%;

    display: flex;
    flex-direction: column;

    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    
    background-color: #E5E5E5;
    color: #000000;

    margin: 0;
    margin: auto;
    padding: 0;
    user-select: none;
  } 
  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  span {
    display: inline-block;
  }
  p, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: #8f8f8fc9;
    border-radius: 8px;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export default GlobalStyle;
