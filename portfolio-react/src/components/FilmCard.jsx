export default function FilmCard({ film, full = false, onClick }) {
  return (
    <button className={`card ${full ? 'card-full' : ''}`} onClick={onClick} type="button">
      <img className="card-img" src={film.image} alt={film.title} />
      <div className="card-overlay" />
      <span className="card-static">{film.type}</span>
      <div className="play-circle" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="card-body">
        <div className="card-meta">{film.type}</div>
        <div className="card-title">{film.title}</div>
        <div className="card-desc">{film.desc.split('\n\n')[0]}</div>
        <div className="card-tags">
          {film.tools.slice(0, 4).map((tool) => <span className="tag" key={tool}>{tool}</span>)}
        </div>
      </div>
    </button>
  )
}
