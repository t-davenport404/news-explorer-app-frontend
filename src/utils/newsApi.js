export const NEWS_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const API_KEY = "48ea34578a774d82b7384fee9e406a8a";

export const searchNews = (keyword) => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 7);

  const to = toDate.toISOString().split("T")[0];
  const from = fromDate.toISOString().split("T")[0];

  const url = `${NEWS_BASE_URL}?q=${encodeURIComponent(keyword)}&apiKey=${API_KEY}&from=${from}&to=${to}&pageSize=100`;

  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
