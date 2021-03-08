import React from 'react';
import Layout from './Layout.jsx';
import { Router, Route } from "./Components/index.js";

const Two = () => <div>a/b</div>

const Render = () => {
    return (
        <div>
            <Router>
                <Layout>
                    <Route path='/' exact={true} children={(match) => 'index'} />
                    <Route path='/a' children={(match) => 'a'} />
                    <Route path='/a/b' component={<Two />} />
                </Layout>
            </Router>
        </div>
    )
}

export default Render