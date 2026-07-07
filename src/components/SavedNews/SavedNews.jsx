import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews({ articles, currentUser, variant }) {
  const [savedArticles, setSavedArticles] = useState(articles);

  const handleDeleteCard = (id) => {
    setSavedArticles((prev) =>
      prev.filter((item) => (item._id || item.url) !== id),
    );
  };
  const getKeywordSummary = () => {
    if (savedArticles.length === 0) return "None";

    const counts = {};
    savedArticles.forEach((article) => {
      const keyword = article.keyword || "News";
      counts[keyword] = (counts[keyword] || 0) + 1;
    });

    const sortedKeywords = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a],
    );

    if (sortedKeywords.length === 1) {
      return sortedKeywords[0];
    }
    if (sortedKeywords.length === 2) {
      return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    }
    if (sortedKeywords.length === 3) {
      return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${sortedKeywords[2]}`;
    }

    const remainingCount = sortedKeywords.length - 2;
    return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${remainingCount} other`;
  };

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser?.name || "User"}, you have {savedArticles.length} saved
          articles
        </h1>
        <p className="saved-news__keywords">
          By keywords: <strong>{getKeywordSummary()}</strong>
        </p>
      </section>

      <section className="saved-news__content">
        <div className="saved-news__grid">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={article._id || article.url || index}
              article={article}
              isLoggedIn={true}
              variant={variant}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
