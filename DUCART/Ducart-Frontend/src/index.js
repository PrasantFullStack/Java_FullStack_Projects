import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import { Provider } from 'react-redux'

import Store from './Redux/Store'

//what is the root of the app
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <>
        <Provider store={Store}>
            <App/>
        </Provider>
    </>
)