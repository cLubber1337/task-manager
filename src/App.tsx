import React from 'react';
import './App.css';
import {Header} from "components/Header/Header";
import {TodoListContainer} from "components/TodoListContainer/TodoListContainer";
import {Container} from "@material-ui/core";
import {TodoListAdder} from "components/TodoListAdder/TodoListAdder";

function App() {
    return (
        <div className="App">
            <Header/>
            <TodoListAdder/>
            <Container fixed>
                <TodoListContainer/>
            </Container>
        </div>
    );
}

export default App;
