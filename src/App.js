import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

import wordsToNumbers from 'words-to-numbers';

const App = () => {

    const classes = useStyles();

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(() => {
        alanBtn({
            key: '3764c276c4676775d32f5d5873184af62e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadLines') {
                    // alert("this code was executed");
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    window.open(article.url, '_blank');
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src='https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg' className={classes.alanLogo} alt='alan logo' />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>

    )
}

export default App;


// news api key = '6baebc0686614413aff7688634997fef';