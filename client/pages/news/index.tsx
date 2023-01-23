import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Article, color } from '@modules/common/types/types-interfaces';
import ArticleContainer from '@modules/common/components/Fragments/Article-Container';
import Newsstripes from '@modules/common/components/Fragments/New-Stripes';
import Stripes from '@modules/common/components/Fragments/Stripes';
import LoadingCircle from '@modules/common/components/loadingbar/loading-circle';
import { toNormalCase } from '@modules/common/utils/utility-functions';

export default function News({ currentUser }: any) {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    axios.get('api/getnews').then((data) => {
      // console.log(data.data.response.docs);
      setArticles(data.data.docs);
      setIsLoading(false);
    });
  }, []);
  return (
    <Fragment>
      <div className='max-w-[1800px] w-[90vw] h-full flex flex-col justify-start items-center p-12 gap-4'>
        <h1 className='h-16 font-extrabold text-lg '>News </h1>
        <div className='flex flex-col md:flex-row md:gap-8 md:flex-wrap md:justify-center items-center w-11/12 gap-4'>
          {isLoading && (
            <div className='h-full w-full flex justify-center items-center'>
              <LoadingCircle />
            </div>
          )}
          {articles && <Stripes />}
          {articles &&
            articles.map((article) => {
              return (
                <ArticleContainer
                  key={article.web_url}
                  abstract={article.abstract}
                  web_url={article.web_url}
                  lead_paragraph={article.lead_paragraph}
                  news_desk={toNormalCase(article.news_desk)}
                />
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}

News.getInitialProps = async (context: any, client: any, currentUser: any) => {
  return currentUser;
};
