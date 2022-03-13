import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { CommonModules } from './modules';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AppRootModule from './app.module/app'
import Navigation from "./app.module/app.layouts/app.navigation/navigation";
import {cameraStore} from "./modules/camera.module/store";

const AppRoot = AppRootModule.routeProps.element;

// @ts-ignore
export const StoreContext = React.createContext();


ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={cameraStore}>
        <BrowserRouter>
            <Routes>
                <Route {...AppRootModule.routeProps}/>
                {
                    CommonModules.map(module =>
                        <Route {...module.routeProps}
                               key={module.name}
                        />
                    )
                }
            </Routes>
        </BrowserRouter>
        </StoreContext.Provider >
    </React.StrictMode>,
    document.getElementById('root')
)
