import React, {useState, useEffect} from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './Components/NewsCards/NewsCards';
const alanKey = 'b5e668854e71ecbf7ed107fea99a9dfe2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)
    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand : ({command, articles, number}) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy : true}) : number
                    const article = articles[parsedNumber - 1]
                    if (article){
                        window.open(article.url, '_blank')
                    }
                }
            }
        })
    }, [])
    
  return <div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
  </div>
};

export default App;