import { useState } from "react";
import { formatDate } from "../../helpers/helpers";
import "./NewsCard.css";

function NewsCard({
  article,
  isLoggedIn,
  variant,
  onDeleteCard,
  onSaveArticle,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const { source, title, publishedAt, description, urlToImage, url } = article;

  const handleIconClick = () => {
    if (variant === "saved") {
      onDeleteCard(article._id || article.url);
    } else if (isLoggedIn) {
      if (!isSaved) {
        onSaveArticle(article);
      }
      setIsSaved(!isSaved);
    }
  };

  return (
    <article className="news-card__card">
      <img src={urlToImage} alt={title} className="news-card__image" />

      {variant === "saved" && (
        <span className="news-card__keyword">{article.keyword || "News"}</span>
      )}

      <div className="news-card__button-container">
        {!isLoggedIn && variant === "home" && isTooltipVisible && (
          <span className="news-card__tooltip">Sign in to save articles</span>
        )}
        {variant === "saved" && isTooltipVisible && (
          <span className="news-card__tooltip">Remove from saved</span>
        )}

        <button
          type="button"
          className={`card__action-button ${
            variant === "saved"
              ? "card__action-button_type_trash"
              : isSaved
                ? "card__action-button_status_saved"
                : "card__action-button_type_bookmark"
          }`}
          onClick={handleIconClick}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          aria-label={variant === "saved" ? "Delete article" : "Save article"}
        />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        <div className="card__content">
          <span className="card__date">{formatDate(publishedAt)}</span>
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
          <span className="card__source">{source?.name || source}</span>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
