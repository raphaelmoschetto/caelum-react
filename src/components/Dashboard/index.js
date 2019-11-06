import React, { Component } from 'react'
import './dashboard.css'

class Dashboard extends Component {
    render() {
        return (
            <div className={`dashboard${this.props.posicao ? ` dashboard__${this.props.posicao}` : ''}`}>
                {this.props.children}
            </div>
        )
    }
}

export default Dashboard