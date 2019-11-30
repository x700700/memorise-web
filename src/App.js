import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Game from "./pages/Game";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Game/>
        </div>
    );
}

export default App;
