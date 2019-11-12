import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import Cabecalho from '../../components/Cabecalho';
import NavMenu from '../../components/NavMenu';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import Tweet from '../../components/Tweet';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            novoTweet: '',
            tweets: [],
        }
    }

    componentDidMount() {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`)
            .then((response => response.json()))
                .then((tweets) => {
                    this.setState({
                        tweets,
                    })
                });
    }

    addTweet = (infosDoEvento) => {
        infosDoEvento.preventDefault();
        if (this.state.novoTweet.length > 0) {
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ conteudo: this.state.novoTweet })
            })
                .then((serverResponse) => {
                    return serverResponse.json();
                })
                    .then((tweetFromServer) => {
                        this.setState({
                            tweets: [tweetFromServer, ...this.state.tweets],
                        });
                    });
        }
    };
    
    render() {
        const { novoTweet, tweets } = this.state;
        return (
            <Fragment>
                <Helmet>
                    <title>
                        Twitelum - ({`${this.state.tweets.length}`})
                    </title>
                </Helmet>
                <Cabecalho>
                    <NavMenu usuario="@arnaldo" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.addTweet}>
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
                                {tweets.length > 0 ? tweets.map((tweetInfo, index) => {
                                    return (
                                        <Tweet
                                            key={tweetInfo._id}
                                            texto={tweetInfo.conteudo}
                                            usuario={tweetInfo.usuario}
                                        />
                                    );
                                }) : <p>{'Crie um novo tweet agora!'}</p>}
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
