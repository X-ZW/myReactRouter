import { button } from 'antd';
import React, { useEffect } from 'react';

const Layout = props => {
    // 处理props 给Route 使用，源码中使用 Context
    let { children, history, ...rest } = props;
    const goTo = (url, state = {}) => {
        if (!url) return;
        history.pushState(state, '', url);
        // 更新location
        // Router 中 popstate 监听的是浏览器前进后退
        rest.changeState && rest.changeState();
    }
    children = React.Children.toArray(children);
    children = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            history: history,
            ...rest
        });
    })
    return (
        <div>
            <button onClick={() => { goTo('/') }}>首页</button>
            <button onClick={() => { goTo('/a') }}>a</button>
            <button onClick={() => { goTo('/a/b') }}>a/b</button>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout