import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'

import Store from "./Redux/Store"
const root = ReactDOM.createRoot(document.getElementById("root"))
// Wrap the App component with the Provider and pass the store as a prop
root.render(
    <>
        <Provider store={Store}>
            <App />
        </Provider>
    </>
)