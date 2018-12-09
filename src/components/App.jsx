import React from "react";
import classNames from 'classnames';

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import cyan from '@material-ui/core/colors/lightBlue';

import ChartContainer from './ChartContainer';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: orange,
        secondary: cyan
    }
});

import './App.scss';

class App extends React.Component {
    state = {
        open: false
    };

    constructor(props) {
        super(props);
    }

    openDrawer = () => {
        this.setState({
            open: true
        });
    };

    closeDrawer = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar className={classNames('app-bar', this.state.open && 'app-bar-shifted')}>
                    <Toolbar>
                        <IconButton>
                            <MenuIcon onClick={this.openDrawer}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent"
                        anchor="left"
                        open={this.state.open}
                        className="fill-height"
                        classes={{ paper: classNames('controller-drawer', !this.state.open && 'controller-drawer-closed') }}
                        onClick={this.closeDrawer}>
                    <div>
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <h1>Hi!</h1>
                </Drawer>
                <div className="fill-block filled-from-top-bar">
                    <ChartContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;