import React, { memo } from 'react';
import { pathToRegexp } from 'path-to-regexp';

class Route extends React.Component {
    formateUrl = (path, {exact}) => {
        // path ===> /a/:id?/:type?
        // pathname ===> /a/2/edit
        // layout 包装过
        const pathname = this.props.location.pathname;
        const keys = [];
        const regexp = pathToRegexp(path, keys, {
            end: exact,
            strict: false,
            sensitive: false
        });
        
        const match = regexp.exec(pathname);
        if (!match) return null;
        const [url, ...values] = match;
        const isExact = pathname === url;
        if (exact && !isExact) return null;
        return {
            path, // the path used to match
            url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
            isExact, // whether or not we matched exactly
            params: keys.reduce((memo, key, index) => {
                memo[key.name] = values[index];
                return memo;
            }, {})
        };
    }
    render() {
        const { children, path, exact = false, component, render } = this.props;
        const params = this.formateUrl(path, { exact });
        if (!params) return null;
        if (children) {
            if (typeof children === 'function') {
                return children({ match: params })
            } else {
                return (<React.Fragment>
                    {
                        React.cloneElement(children, {
                            match: params
                        })
                    }
                </React.Fragment>)
            }
        }
        if (component) {
            return (<React.Fragment>
                {
                    React.cloneElement(component, {
                        match: params
                    })
                }
            </React.Fragment>)
        }
        if (render) {
            return render({ match: params })
        }
        return null
    }
}

export default Route