import React, { useState, useEffect } from 'react';
import style from "./News.module.css";
import ArticleDialog from '../../components/dialog/ArticleDialog';
import MysteriousText from '../../components/MysteriousText/MysteriousText';
import useConfigPage from '../../store/configPage';

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { news, getNews } = useConfigPage();
  
  useEffect(() => {
    getNews('Intelekt');
  }, [getNews]);

  const handleOpenDialog = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDialog = () => {
    setSelectedArticle(null);
  };

  const renderNewsItem = (article, index) => {
    const isEven = index % 2 === 0;
    const imageOrder = isEven ? "md:order-1" : "md:order-2";
    const contentOrder = isEven ? "md:order-2" : "md:order-1";

    return (
      <div key={index} className="mb-12 grid items-center gap-x-6 md:grid-cols-2 xl:gap-x-12">
        <div className={`mb-6 md:mb-0 ${imageOrder}`}>
          <div
            className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20 cursor-pointer"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => handleOpenDialog(article)}
          >
            <img src={article.url} className="w-full" alt={article.title} />
            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
            </div>
          </div>
        </div>

        <div className={contentOrder}>
          <h3 className="mb-3 text-2xl font-bold">{article.title}</h3>
          <div className="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
              stroke="currentColor" className="mr-2 h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
            {article.category}
          </div>
          <p className="mb-6 text-neutral-500 dark:text-neutral-300">
            <small>Опубліковано <u>{new Date(article.date).toLocaleDateString()}</u> by
              <a href="#!"> {article.author}</a>
            </small>
          </p>
          <div className="text-neutral-500 dark:text-neutral-300">
            <MysteriousText>
              {article.preview}
            </MysteriousText>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.animationBorderSM + ' text-white relative'}>
      <div className="container my-24 mx-auto md:px-6">
        <section className="mb-32 text-center md:text-left">
          <div className="relative py-16 px-4">
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-full w-full bg-gradient-to-b from-black/50 to-transparent opacity-50"></div>
            </div>
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-24 h-1 bg-blue-500 mb-8 rounded-full glow-effect"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  <MysteriousText>Останні новини</MysteriousText>
                </h2>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8 text-lg">
                  <MysteriousText>
                    Будьте в курсі останніх оновлень та спеціальних пропозицій від Intelekt
                  </MysteriousText>
                </p>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-[2px] bg-gray-700"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="w-12 h-[2px] bg-gray-700"></div>
                </div>
              </div>
            </div>
          </div>

          {news.map((article, index) => renderNewsItem(article, index))}
        </section>
      </div>
      
      <ArticleDialog 
        open={!!selectedArticle} 
        handleClose={handleCloseDialog}
        article={selectedArticle}
      />
    </div>
  );
}