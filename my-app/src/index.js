import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </>
);

