import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsById } from "../api/api";
import NewsItem from "../components/NewsItem";
import LoadingSpinner from "../components/LoadingSpinner";

function NewsDetailPage({ onNotFound }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsById(id)
      .then(setItem)
      .catch((err) => {
        if (err.status === 404) {
          onNotFound();
        }
      })
      .finally(() => setLoading(false));
  }, [id, onNotFound]);

  if (loading) return <LoadingSpinner />;

  return item ? <NewsItem item={item} full /> : null;
}

export default NewsDetailPage;
