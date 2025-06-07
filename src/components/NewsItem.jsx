function NewsItem({ item, full }) {
  return (
    <div className={`fade-in ${full ? 'news-detail' : 'news-card'}`}>
      <img 
        src={item.image} 
        alt={item.title} 
        className={full ? 'news-detail-image' : 'news-image'}
      />
      <div className={full ? 'news-detail-content' : 'news-content'}>
        <h2 className={full ? 'news-detail-title' : 'news-title'}>{item.title}</h2>
        {full && <p className="news-detail-content">{item.content}</p>}
      </div>
    </div>
  );
}

export default NewsItem;
