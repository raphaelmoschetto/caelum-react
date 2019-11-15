const TWEETS_URL = 'https://twitelum-api.herokuapp.com/tweets';
export const TweetsService = {
    load: () => {
        return fetch(`${TWEETS_URL}?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }).then(serverResponse => serverResponse.json());
    },
    add: conteudo => {
        return fetch(`${TWEETS_URL}?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ conteudo }),
        }).then(response => {
            return response.json();
        });
    },
    remove: id => {
        return fetch(`${TWEETS_URL}/${id}?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
        { method: 'DELETE' })
            .then(response => response.json());
    },
    like: id => {
        return fetch(`${TWEETS_URL}/${id}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
        {
            method: 'POST',
        }).then(response => response.json());
    }
}