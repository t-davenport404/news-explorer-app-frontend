import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";

function Main({
  articles,
  isLoading,
  hasSearched,
  searchError,
  visibleCount,
  handleShowMore,
  isLoggedIn,
  variant,
  handleSaveArticle,
  children,
}) {
  return (
    <section className="main">
      <div className="hero">{children}</div>

      {(isLoading || hasSearched) && (
        <SearchResults
          articles={articles}
          isLoading={isLoading}
          hasSearched={hasSearched}
          searchError={searchError}
          visibleCount={visibleCount}
          onShowMore={handleShowMore}
          isLoggedIn={isLoggedIn}
          variant={variant}
          onSaveArticle={handleSaveArticle}
        />
      )}
      <About />
    </section>
  );
}

export default Main;
