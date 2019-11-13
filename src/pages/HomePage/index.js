import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { NotificationContext } from '../../contexts/NotificationContext';
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import Tweet from '../../components/Tweet';
import Modal from '../../components/Modal';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            newTweet: '',
            tweets: [],
            activeTweetOnModal: {},
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

    addTweet = (event) => {
        event.preventDefault();
        if (this.state.newTweet.length > 0) {
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ conteudo: this.state.newTweet })
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

    removeTweet(idToRemove) {
        fetch(`https://twitelum-api.herokuapp.com/tweets/${idToRemove}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
        { method: 'DELETE' })
            .then(response => response.json())
            .then(response => {
                const tweetList = this.state.tweets.filter(tweet => tweet._id !== idToRemove);
                this.setState({
                    tweets: tweetList,
                }, () => {
                    this.closeModal();
                    this.context.setMsg(response.message);
                });
            });
    }

    openModal = tweet => {
        this.setState({
            activeTweetOnModal: tweet,
        });
    }

    closeModal = () => {
        this.setState({
            activeTweetOnModal: {},
        });
    }

    static contextType = NotificationContext;
    
    render() {
        const { newTweet, tweets } = this.state;
        return (
            <Fragment>
                <Helmet>
                    <title>
                        Twitelum - ({`${this.state.tweets.length}`})
                    </title>
                </Helmet>
                <Header>
                    <NavMenu usuario="@arnaldo" />
                </Header>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.addTweet}>
                                <div className="novoTweet__editorArea">
                                    <span className={`
                                        novoTweet__status
                                        ${newTweet.length > 140 ? ' novoTweet__status--invalido' : ''}
                                    `}>{newTweet.length}/140</span>
                                    <textarea
                                        className="novoTweet__editor"
                                        placeholder="O que está acontecendo?"
                                        onChange={(e) => this.setState({ newTweet: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="novoTweet__envia"
                                    disabled={newTweet.length > 140 || newTweet.length === 0}
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
                                {tweets.length > 0 ? tweets.map((tweetInfo) => {
                                    return (
                                        <Tweet
                                            id={tweetInfo._id}
                                            liked={tweetInfo.likeado}
                                            totalLikes={tweetInfo.totalLikes}
                                            key={tweetInfo._id}
                                            text={tweetInfo.conteudo}
                                            user={tweetInfo.usuario}
                                            removable={tweetInfo.removivel}
                                            removeHandler={() => this.removeTweet(tweetInfo._id)}
                                            onClick={() => this.openModal(tweetInfo)}
                                        />
                                    );
                                }) : <p>{'Crie um novo tweet agora!'}</p>}
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
                <Modal
                    isOpened={!!this.state.activeTweetOnModal._id}
                    onClosed={this.closeModal}
                >
                    {() => (
                        <Tweet
                            id={this.state.activeTweetOnModal._id}
                            liked={this.state.activeTweetOnModal.likeado}
                            likesUsers={this.state.activeTweetOnModal.likes}
                            totalLikes={this.state.activeTweetOnModal.totalLikes}
                            text={this.state.activeTweetOnModal.conteudo}
                            user={this.state.activeTweetOnModal.usuario}
                            removable={this.state.activeTweetOnModal.removivel}
                            removeHandler={() => this.removeTweet(this.state.activeTweetOnModal._id)}
                        />
                    )}
                </Modal>
            </Fragment>
        );
    }
}

export default HomePage;
