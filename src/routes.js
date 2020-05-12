import * as React from 'react'; 
import { BrowserRouter,Route,Switch } from 'react-router-dom'; 

import Main from './pages/main'; 
import Options from './pages/options'; 
import TestMyCounter from './pages/testMyCounter'; 

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component = { Main } /> 
                <Route path="/options" component = { Options } /> 
                <Route path="/testMyCounter"  component = { TestMyCounter } /> 

            </Switch>
        </BrowserRouter>
    ); 
}