import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from 'app/App';
import {HashRouter, HashRouter as Router} from 'react-router-dom';
import {createTheme} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";
import {Provider} from "react-redux";
import store from "app/store";

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: "#71ab71",
        },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </HashRouter>,
);

