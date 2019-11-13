import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationContext } from '../../contexts/NotificationContext';
import './tweet.css';

class Tweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: props.liked,
            totalLikes: props.totalLikes || 0,
        };
    }

    likeHandler = () => {
        const { liked, totalLikes } = this.state;
        const { id } = this.props;

        this.setState({
            liked: !liked,
            totalLikes: liked ? totalLikes - 1 : totalLikes + 1,
        });

        fetch(`http://twitelum-api.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
        { method: 'POST' })
            .then(response => response.json())
            .then(response => {
                this.context.setMsg(response.message);
            });
    }

    handleClick = () => {
        this.props.onClick && this.props.onClick();
    }

    static contextType = NotificationContext;

    render() {
        const { user, text, likesUsers } = this.props;
        return (
            <article className="tweet">
                <div className="tweet__cabecalho">
                    <img className="tweet__fotoUsuario" src={user.foto} alt={user.nome} />
                    <span className="tweet__nomeUsuario">{user.nome}</span>
                    <a href="/"><span className="tweet__userName">@{user.login}</span></a>
                </div>
                <p className="tweet__conteudo" onClick={this.handleClick}>
                    {text ? <span>{text}</span> : ''}
                </p>
                <footer className="tweet__footer">
                    {
                        this.props.removable && (
                            <button onClick={this.props.removeHandler} className="btn btn--blue btn--remove">
                                X
                            </button>
                        )
                    }
                    <button className="btnLike btn btn--clean" onClick={this.likeHandler}>
                        <svg className={`icon icon--small iconHeart ${this.state.liked ? 'iconHeart--active' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 38h38V0H0v38z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
                            </g>
                        </svg>
                        {this.state.totalLikes}
                    </button>
                </footer>
                {likesUsers && likesUsers.length ? (
                        <div className="tweet__likes">{likesUsers.map(item => <div className="tweet__likes-user" key={item}>{`${item.usuario.login}`}</div>)}</div>
                    ) : ''}
            </article>
        );
    }
}

Tweet.defaultProps = {
    user: {},
    liked: false,
};

Tweet.propTypes = {
    removable: PropTypes.bool,
    totalLikes: PropTypes.number,
    liked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        foto: PropTypes.string,
        login: PropTypes.string,
        nome: PropTypes.string,
    }),
    conteudo: PropTypes.string,
    removeHandler: PropTypes.func,
    onClick: PropTypes.func,
};

export default Tweet;