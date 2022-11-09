import React from 'react';

export const AdStringContext = React.createContext({
    showAd: true,
    toggleShowAd: (show: boolean) => {}
});
