import React from "react";
import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SearchResults.css";

function SearchResults({
  isLoading,
  articles,
  searchError,
  hasSearched,
  visibleCount,
  onShowMore,
  isLoggedIn,
  variant,
  onSaveArticle,
}) {
  if (!hasSearched && !isLoading) {
    return null;
  }

  return (
    <section className="search-results__section">
      {isLoading && <Preloader />}

      {!isLoading && (
        <>
          {searchError && (
            <p className="search-results__error">
              Sorry, something went wrong during the request. Please try again
              later.
            </p>
          )}

          {!searchError && articles.length === 0 && (
            <div className="nothing-found">
              <p className="nothing-found__text">Nothing Found</p>
            </div>
          )}

          {!searchError && articles.length > 0 && (
            <>
              <h2 className="search-results__title">Search results</h2>

              <NewsCardList
                articles={articles}
                visibleCount={visibleCount}
                isLoggedIn={isLoggedIn}
                variant={variant}
                onSaveArticle={onSaveArticle}
              />

              {visibleCount < articles.length && (
                <button
                  type="button"
                  className="search-results__show-more"
                  onClick={onShowMore}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default SearchResults;
