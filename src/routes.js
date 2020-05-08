import * as React from 'react'; 
import { BrowserRouter,Route,Switch } from 'react-router-dom'; 

import Main from './pages/main'; 
import Options from './pages/options'; 

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = { Main } />
                <Route path="/options" component = { Options } /> 
            </Switch>
        </BrowserRouter>
    ); 
}