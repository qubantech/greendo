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

const AppRoot = AppRootModule.routeProps.element;




ReactDOM.render(
    <React.StrictMode>
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
    </React.StrictMode>,
    document.getElementById('root')
)
