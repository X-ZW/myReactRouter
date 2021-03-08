import React from 'react';

// 当前用window.history，源码中使用 history库创建

const globaHistory = window.history;

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: window.location
        }

        window.addEventListener('popstate', ()=>{
            this.setState({
                location: window.location
            })
        })
    }

    changeState = () => {
        this.setState({
            location: window.location
        })
    }

    render() {
        const {children} = this.props;
        const {location} = this.state;
        return (
            <React.Fragment>
                {
                    React.cloneElement(children, {
                        history: globaHistory,
                        location: location,
                        changeState: this.changeState
                    })
                }
            </React.Fragment>
        )
    }
}

export default Router;