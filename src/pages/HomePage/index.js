import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { ReactReduxContext } from 'react-redux';
import { TweetsThunkActions } from '../../store/ducks/tweets';
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
import TweetsContainer from '../../containers/TweetsContainer';

class HomePage extends Component {

    constructor() {
        super();
        this.state = {
            newTweet: '',
            totalTweets: 0,
        }
    }

    static contextType = ReactReduxContext;

    componentDidMount() {
        const store = this.context.store;
        store.subscribe(() => {
            this.setState({
                totalTweets: store.getState().tweets.data.length,
            });
        });
    }

    addTweet = (event) => {
        event.preventDefault();
        if (this.state.newTweet.length > 0) {
            const store = this.context.store;
            store.dispatch(TweetsThunkActions.addTweet(this.state.newTweet))
                    .then(() => {
                        this.setState({ newTweet: '' });
                    });
        }
    };
    
    render() {
        const { newTweet, totalTweets } = this.state;
        return (
            <Fragment>
                <Helmet>
                    <title>
                        Twitelum - ({`${totalTweets.length}`})
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
                            <TweetsContainer />
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
