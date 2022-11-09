import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import { AdStringContext } from '../../context/ad-string-context';
import { requestNews } from '../../services/todos.service';

import './News.css';

const GetNewsFromAPI = () => {
    const [ news, setNews ] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const newsFromAPI = await requestNews();
            setNews(newsFromAPI.articles.map((article: { title: string; }) => article.title));
        }
        fetchData();
    }, []);
    return news ? (
        <p style={{ whiteSpace: "nowrap" }}>{news.join(" | ")} +++ </p>
    ) : (
        <p style={{ visibility: "hidden" }}>Loading news...</p>
    );
};

const News = () => {
    return (<AdStringContext.Consumer>
        {({ showAd }) => (showAd ? <Ticker
        offset="run-in"
        speed={10}>
            {() => <GetNewsFromAPI />}
        </Ticker> : null)}
    </AdStringContext.Consumer>)
}

export default News;