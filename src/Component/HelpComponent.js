import React, { Component } from 'react';

const divStyle = {
    marginBottom: '7px',
    marginRight: '27px'
};

class HelpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSubmit () {
        if (window.sessionStorage.getItem("featureAllowed") === "false") {
            this.props.history.push('/login');
        }
        else {     this.props.history.push('/Management');
        }
    }

    render() {
        return (
            <div>
                <div>
                <h1>Help Page</h1>
                <br />
                <h1>WORK IN PROGRESS</h1>
                </div>
                <div>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div>
                        <br />
                        <button style={divStyle} className="btn btn-success" type="submit">Management</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default HelpComponent