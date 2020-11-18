import React from 'react';
import Routes from "./routes/index";
import GlobalStyle from "./styles/global";
import {BrowserRouter} from "react-router-dom";
const App:React.FC = ()=>(
    <>
    <BrowserRouter>
    <Routes/>
    </BrowserRouter>
    <GlobalStyle/>
    </>
    )

export default App;
