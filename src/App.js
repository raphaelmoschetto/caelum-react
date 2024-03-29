import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

    constructor() {
        super();
        this.state = {
            novoTweet: '',
        }
    }
    
    render() {
        const { novoTweet } = this.state;
        return (
            <Fragment>
            <Cabecalho>
                <NavMenu usuario="@arnaldo" />
            </Cabecalho>
            <div className="container">
                <Dashboard>
                    <Widget>
                        <form className="novoTweet">
                            <div className="novoTweet__editorArea">
                                <span className={`
                                    novoTweet__status
                                    ${novoTweet.length > 140 ? ' novoTweet__status--invalido' : ''}
                                `}>{novoTweet.length}/140</span>
                                <textarea
                                    className="novoTweet__editor"
                                    placeholder="O que está acontecendo?"
                                    onChange={(e) => this.setState({ novoTweet: e.target.value })}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="novoTweet__envia"
                                disabled={novoTweet.length > 140 || novoTweet.length === 0}
                            >Tweetar</button>
                        </form>
                    </Widget>
                    <Widget>
                        <TrendsArea />
                    </Widget>
                </Dashboard>
                <Dashboard posicao="centro">
                    <Widget>
                        <div className="tweetsArea">
                            <Tweet />
                        </div>
                    </Widget>
                </Dashboard>
            </div>
            </Fragment>
        );
    }
}

export default App;
