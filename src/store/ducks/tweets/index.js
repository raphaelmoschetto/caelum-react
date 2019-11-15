import { TweetsService } from '../../../services/TweetsService';

export const TweetsThunkActions = {
    loadTweets: () => {
        return dispatch => {
            dispatch({ type: 'tweets/LOAD' });

            TweetsService.load()
                .then(tweets => {
                    dispatch({
                        type: 'tweets/LOAD_SUCCESS',
                        payload: { data: tweets },
                    });
                }).catch(() => {
                    dispatch({ type: 'tweets/LOAD_FAILED' });
                });
        }
    },

    addTweet: content => {
        return async dispatch => {
            const response = await TweetsService.add(content);
            dispatch({ type: 'tweets/ADD', payload: { tweet: response } });
        }
    },

    removeTweet: id => {
        return async dispatch => {
            await TweetsService.remove(id);
            dispatch({
                type: 'tweets/REMOVE',
                payload: { idDoTweet: id },
            });
        }
    },
};

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: false,
}

export function tweetsReducer(state = INITIAL_STATE, action = {}) {
    if (action.type === 'tweets/LOAD') {
        return {
            ...state,
            error: false,
        }
    }
    if (action.type === 'tweets/LOAD_SUCCESS') {
        const tweets = action.payload.data;
        return {
            ...state,
            data: tweets,
            error: false,
        }
    }
    if (action.type === 'tweets/LOAD_FAILED') {
        return {
            ...state,
            data: [],
            error: true,
        }
    }
    if (action.type === 'tweets/ADD') {
        return {
            ...state,
            data: [action.payload.tweet, ...state.data],
            error: false,
        }
    }
    if (action.type === 'tweets/REMOVE') {
        const newList = state.data.filter(
            tweet => tweet._id !== action.payload.idDoTweet
        );
        return {
            ...state,
            data: newList,
        }
    }
    return state;
}