import { useEffect, useState } from "react";
import { fetchNews } from "../api/api";
import NewsList from "../components/NewsList";

function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews().then(setNews).catch(() => {});
  }, []);

  return <NewsList news={news} />;
}

export default NewsPage;
