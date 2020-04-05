import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent().then(importedComponent => {
                this.setState({component: importedComponent.default})
            })
        }

        render() {
            const C = this.state.component ? this.state.component : null;
            return (
                C ? <C {...this.props}/> : null
            )
        }
    }
}
export default asyncComponent;