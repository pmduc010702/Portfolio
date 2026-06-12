import { useEffect } from 'react'

export default function FilmModal({ film, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!film) return null

  return (
    <div id="modal" className="on">
      <button className="modal-bg" onClick={onClose} aria-label="Close modal" />
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-inner">
          <div className="modal-type">{film.type}</div>
          <div className="modal-title">{film.title}</div>
          <div className="yt-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&vq=hd1080`}
              title={film.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
            <div className="yt-shield-top" />
            <div className="yt-shield-topright" />
            <div className="yt-shield-suggest" />
            <div className="yt-shield-bl" />
            <div className="yt-shield-br" />
          </div>
          <div className="modal-cols">
            <div>
              <div className="modal-label">About This Film</div>
              {film.desc.split('\n\n').map((paragraph) => (
                <p className="modal-text modal-p" key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <div className="modal-label">AI Tools Used</div>
              <div className="modal-tags">{film.tools.map((tool) => <span className="m-tag" key={tool}>{tool}</span>)}</div>
              <div className="modal-label modal-process-label">Production Process</div>
              <div className="modal-steps">
                {film.steps.map(([title, desc], index) => (
                  <div className="m-step" key={title}>
                    <span className="m-step-n">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="m-step-title">{title}</div>
                      <div className="m-step-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <a href={`https://youtube.com/watch?v=${film.youtubeId}`} target="_blank" rel="noreferrer" className="mf-btn mf-btn-primary">Watch on YouTube →</a>
            <button onClick={onClose} className="mf-btn mf-btn-ghost">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
