import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import * as newsApi from "../../utils/newsApi";
import * as auth from "../../utils/auth";
import "./App.css";

import Header from "../Header/Header";
import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";

import Modal from "../Modal/Modal";
import SignUpModal from "../SignUpModal/SignUpModal";
import SignInModal from "../SignInModal/SignInModal";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  const [currentUser, setCurrentUser] = useState({
    name: "",
  });

  const location = useLocation();
  const headerVariant = location.pathname === "/" ? "home" : "saved";

  const navigate = useNavigate();

  useEffect(() => {
    if (activeModal !== "") {
      document.body.classList.add("modal-is-open");
    } else {
      document.body.classList.remove("modal-is-open");
    }

    return () => document.body.classList.remove("modal-is-open");
  }, [activeModal]);

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setSearchError(false);
    setHasSearched(true);
    setVisibleCount(3);
    setArticles([]);

    newsApi
      .searchNews(keyword)
      .then((data) => {
        if (data.articles) {
          const articlesWithKeyword = data.articles.map((article) => ({
            ...article,
            keyword: keyword || "News",
          }));

          setArticles(articlesWithKeyword);
        }
      })
      .catch((err) => {
        console.error(err);
        setSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveArticle = (clickedArticle) => {
    if (!savedArticles.some((item) => item.url === clickedArticle.url)) {
      const updatedArticles = [clickedArticle, ...savedArticles];
      setSavedArticles(updatedArticles);

      if (currentUser.id) {
        localStorage.setItem(
          `saved_articles_${currentUser.id}`,
          JSON.stringify(updatedArticles),
        );
      }
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const handleRegister = ({ name, email, password }) => {
    setSavedArticles([]);

    auth
      .register(name, email, password)
      .then(() => {
        setActiveModal("success");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);

          auth
            .checkToken(data.token)
            .then((userData) => {
              const user = userData.data || userData;

              setCurrentUser(user);
              setIsLoggedIn(true);

              const storedArticles = localStorage.getItem(
                `saved_articles_${user.id}`,
              );
              setSavedArticles(
                storedArticles ? JSON.parse(storedArticles) : [],
              );

              navigate("/");
              closeActiveModal();
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", _id: "" });
    setArticles([]);
    setHasSearched(false);
    setSavedArticles([]);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleSignInClick={() => setActiveModal("login")}
          handleSignUpClick={() => setActiveModal("registration")}
          onSearchSubmit={handleSearchSubmit}
          handleLogout={handleLogout}
          variant={headerVariant}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  articles={articles}
                  isLoading={isLoading}
                  hasSearched={hasSearched}
                  searchError={searchError}
                  visibleCount={visibleCount}
                  handleShowMore={handleShowMore}
                  isLoggedIn={isLoggedIn}
                  variant="home"
                  handleSaveArticle={handleSaveArticle}
                ></Main>
              }
            />
            <Route
              path="/saved-news"
              element={
                isLoggedIn ? (
                  <>
                    <SavedNews
                      articles={savedArticles}
                      currentUser={currentUser}
                      variant="saved"
                    />
                  </>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />

      <SignUpModal
        isOpen={activeModal === "registration"}
        handleRegister={handleRegister}
        onClose={closeActiveModal}
        handleLoginClick={() => setActiveModal("login")}
      />
      <SignInModal
        isOpen={activeModal === "login"}
        handleLogin={handleLogin}
        onClose={closeActiveModal}
        handleSignUpClick={() => setActiveModal("registration")}
      />

      <Modal
        isOpen={activeModal === "success"}
        onClose={closeActiveModal}
        name="success"
        hasForm={false}
      >
        <h2 className="modal__title" style={{ marginBottom: "14px" }}>
          Registration successfully completed!
        </h2>
        <button
          type="button"
          className="modal__redirect-link"
          onClick={() => setActiveModal("login")}
        >
          Sign in
        </button>
      </Modal>
    </div>
  );
}

export default App;
