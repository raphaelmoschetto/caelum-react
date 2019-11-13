import React, { createContext, useState } from 'react';

export const NotificationContext = createContext({
    msg: '',
    setMsg: () => {},
});

export const NotificationContextProvider = ({ children }) => {
    const [msg, setMsg] = useState('');

    return (
        <NotificationContext.Provider value={{ msg, setMsg }}>
            {children}
            {msg && (
                <div className="notificacaoMsg" onAnimationEnd={() => setMsg("")}>
                    {msg}
                </div>
            )}
        </NotificationContext.Provider>
    );
};