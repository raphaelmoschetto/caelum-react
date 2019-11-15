import React, { Component, Fragment } from 'react';
import { TweetsThunkActions } from '../store/ducks/tweets';
import Tweet from '../components/Tweet';
import Modal from '../components/Modal';
import { ReactReduxContext } from 'react-redux';

class TweetsContainer extends Component {
    constructor() {
        super();
        this.state = {
            tweets: [],
            activeTweetOnModal: {},
        }
    }

    static contextType = ReactReduxContext;

    componentDidMount() {
        const store = this.context.store;
        store.subscribe(() => {
            this.setState({
                tweets: store.getState().tweets.data,
            });
        });
        store.dispatch(TweetsThunkActions.loadTweets()); 
    }

    removeTweet(idToRemove) {
        const store = this.context.store;
        store.dispatch(TweetsThunkActions.removeTweet(idToRemove))
            .then(() => {
                this.closeModal();
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

    render() {
        const { tweets } = this.state;
        return (
            <Fragment>
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

export default TweetsContainer;
