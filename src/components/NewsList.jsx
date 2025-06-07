import { Link } from "react-router-dom";
import NewsItem from "./NewsItem";

function NewsList({ news }) {
  return (
    <div className="news-page">
      <div className="container">
        <h1 className="page-title">Latest News</h1>
        <div className="news-list">
          {news.map((item) => (
            <Link key={item.id} to={`/news/${item.id}`} className="news-card">
              <NewsItem item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsList;
