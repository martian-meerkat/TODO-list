import { hot } from 'react-hot-loader';
import React, { FunctionComponent, useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { AdStringContext } from './context/ad-string-context';
import { Box, Container } from '@mui/material';
import AppHeader from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import News from './components/News/News';

import './App.css';

const App: FunctionComponent = () => {
    const queryClient = new QueryClient();
    const [showAd, toggleShowAd] = useState(true);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AdStringContext.Provider value={{showAd, toggleShowAd}}>
                    <Container className='main' maxWidth='xs' disableGutters={true}>
                        <Box className='todo-list-box'>
                            <AppHeader />
                            <TodoList />
                        </Box>
                        <News />
                    </Container>
                </AdStringContext.Provider>
            </QueryClientProvider>
        </>

    );
};

export default hot(module)(App);
