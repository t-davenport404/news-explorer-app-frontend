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
    <main className="main">
      <section className="hero">{children}</section>

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
    </main>
  );
}

export default Main;
