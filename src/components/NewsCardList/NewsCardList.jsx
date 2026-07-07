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
    <div className="card__list_container">
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
    </div>
  );
}

export default NewsCardList;
