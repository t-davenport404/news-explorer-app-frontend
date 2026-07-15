import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  visibleCount,
  isLoggedIn,
  variant,
  onSaveArticle,
}) {
  return (
    <ul className="card__list">
      {articles.slice(0, visibleCount).map((article, index) => (
        <li key={index} className="card__item">
          <NewsCard
            key={article.url || index}
            article={article}
            isLoggedIn={isLoggedIn}
            variant={variant}
            onSaveArticle={onSaveArticle}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
