import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            axios.interceptors.request.use(req => {
                this.nullifyError();
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error.response.data.error });
            });
        }

        state = {
            error: null
        }

        nullifyError = () => this.setState({ error: null });

        render() {
           return  (<>
                <Modal show={this.state.error} cancled={this.nullifyError}>
                    {this.state.error ? this.state.error : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </>)
        }
    }
}

export default withErrorHandler;