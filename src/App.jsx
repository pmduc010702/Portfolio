import { useEffect, useMemo, useState } from 'react'
import { categories } from './data/films'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import FilmCard from './components/FilmCard'
import FilmModal from './components/FilmModal'
import Reveal from './components/Reveal'
import { smoothScrollTo } from './utils'


const SocialSvg = ({ type }) => {
  const icons = {
    youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
    tiktok: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.19 8.19 0 0 0 4.79 1.52V6.82a4.85 4.85 0 0 1-1.02-.13z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icons[type]} />
    </svg>
  )
}

function LoadingScreen() {
  return (
    <div className="loading-screen" aria-label="Loading portfolio">
      <div className="loading-mark">PMD</div>
      <div className="loading-name">Phan Minh Đức</div>
      <div className="loading-line"><span /></div>
      <div className="loading-caption">AI Filmmaker Portfolio</div>
    </div>
  )
}

export default function App() {
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contactForm, setContactForm] = useState({ name: '', email: '', project: '', budget: '' })
  const allFilms = useMemo(() => categories.flatMap((category) => category.films), [])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1350)
    return () => window.clearTimeout(timer)
  }, [])

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((current) => ({ ...current, [name]: value }))
  }

  const buildBriefText = () => [
    `Name: ${contactForm.name || 'Website visitor'}`,
    `Email: ${contactForm.email || 'Not provided'}`,
    `Budget / Scope: ${contactForm.budget || 'Not specified'}`,
    '',
    'Project idea:',
    contactForm.project || 'Not provided'
  ].join('\n')

  const handleGmailSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${contactForm.name || 'Website visitor'}`)
    const body = encodeURIComponent(buildBriefText())
    window.location.href = `mailto:pmduc010702@gmail.com?subject=${subject}&body=${body}`
  }

  const handleZaloSubmit = () => {
    window.open('https://zalo.me/0914405384', '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    if (!selectedFilm) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedFilm])

  return (
    <>
      {loading && <LoadingScreen />}
      <Cursor />
      <Navbar />

      <main>
        <section id="hero">
          <div className="hero-num">03</div>
          <div className="hero-left">
            <Reveal className="eyebrow">AI Cinema &nbsp;·&nbsp; Est. 2026</Reveal>
            <Reveal as="h1" className="h1" delay="d1">
              <span className="line-plain">VISUAL</span>
              <span className="line-italic">Storytelling</span>
              <span className="line-outline">Through AI</span>
            </Reveal>
            <Reveal as="p" className="hero-sub" delay="d2">
              Những thế giới chưa từng tồn tại — cho đến khi tôi kể chúng.
            </Reveal>
            <Reveal className="hero-btns" delay="d3">
              <button type="button" onClick={() => smoothScrollTo('#films')} className="btn-primary">Watch Films <span>→</span></button>
              <button type="button" onClick={() => smoothScrollTo('#workflow')} className="btn-ghost">See Process <span>↓</span></button>
            </Reveal>
          </div>
          <div className="hero-right">
            <img
              src="/img/banner.png"
              onError={(event) => { event.currentTarget.src = '/img/7.png' }}
              alt="AI Filmmaker cinematic hero banner"
              className="hero-img"
            />
            <div className="hero-img-overlay" />
          </div>
        </section>

        <section id="films" className="films-section">
          <Reveal className="section-head">
            <div className="sec-label">Selected Works</div>
            <h2 className="sec-h big">
              <span className="plain">Featured</span>
              <span className="italic">Films</span>
            </h2>
          </Reveal>

          {categories.map((category) => (
            <div key={category.number}>
              <Reveal className="category-wrap">
                <div className="cat-header">
                  <span className="cat-num">{category.number}</span>
                  <div>
                    <div className="cat-label">{category.label}</div>
                    <div className="cat-title">{category.title}</div>
                  </div>
                  <div className="cat-line" />
                  <span className="cat-count">{category.count}</span>
                </div>
              </Reveal>
              <Reveal className={category.layout === 'grid' ? 'films-grid-4 category-grid' : 'category-grid'} delay="d1">
                {category.films.map((film) => (
                  <FilmCard
                    key={film.id}
                    film={film}
                    full={category.layout === 'full'}
                    onClick={() => setSelectedFilm(film)}
                  />
                ))}
              </Reveal>
            </div>
          ))}
        </section>

        <div className="div-line page-line" />

        <section id="workflow" className="workflow-section">
          <div className="workflow-grid">
            <Reveal className="workflow-left wf-left">
              <div className="sec-label">Process</div>
              <h2 className="sec-h workflow-title">
                <span className="plain">The AI</span>
                <span className="italic">Filmmaking</span>
                <span className="plain muted">Method</span>
              </h2>
              <p className="workflow-sub">Quy trình không thay thế sự sáng tạo — nó giải phóng nó.</p>
            </Reveal>
            <div>
              {[
                ['01', 'Concept & Script', 'Từ ý tưởng ban đầu đến cấu trúc câu chuyện hoàn chỉnh, tôi sử dụng ChatGPT và Claude để phát triển kịch bản, xây dựng nhân vật và định hình cảm xúc cho từng dự án.', ['ChatGPT', 'Claude']],
                ['02', 'Visual Development', 'Nhân vật, bối cảnh, storyboard và định hướng hình ảnh được phát triển bằng ChatGPT và Banana Pro nhằm đảm bảo sự nhất quán về phong cách và cảm xúc trước khi bước vào sản xuất.', ['ChatGPT', 'Banana Pro']],
                ['03', 'Video Generation', 'Từng phân cảnh được tạo và tối ưu thông qua Veo 3 và Grok, tập trung vào chuyển động camera, diễn xuất nhân vật, ánh sáng và chất lượng điện ảnh.', ['Veo 3', 'Grok']],
                ['04', 'Sound & Music', 'Âm nhạc, hiệu ứng âm thanh và không gian cảm xúc được thiết kế để tăng chiều sâu cho câu chuyện và tạo trải nghiệm chân thực hơn cho người xem.', ['Suno AI']],
                ['05', 'Edit & Deliver', 'Dựng phim, tinh chỉnh nhịp kể chuyện, màu sắc và hoàn thiện sản phẩm cuối cùng theo tiêu chuẩn nội dung điện ảnh hiện đại.', ['CapCut']]
              ].map(([num, title, desc, tools], index) => (
                <Reveal key={num} className="wf-step" delay={`d${(index % 3) + 1}`} data-n={num}>
                  <div className="wf-num">{num}</div>
                  <div>
                    <div className="wf-title">{title}</div>
                    <div className="wf-desc">{desc}</div>
                    <div className="wf-tools">{tools.map((tool) => <span className="wt" key={tool}>{tool}</span>)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="div-line page-line" />

        <section id="about" className="about-section">
          <Reveal className="section-head about-head">
            <div className="sec-label">About</div>
            <h2 className="sec-h big">
              <span className="plain">The Human</span>
              <span className="italic">Behind the AI</span>
            </h2>
          </Reveal>
          <Reveal className="about-grid" delay="d1">
            <div className="about-img-wrap">
              <img
                className="about-img"
                src="/img/avt.png"
                alt="Filmmaker portrait"
              />
              <div className="about-img-label">
                <div className="about-role">AI Filmmaker · Director</div>
                <div className="about-name">Phan Minh Đức</div>
              </div>
            </div>
            <div className="about-content">
              <div className="about-quote">“Tôi không dùng AI để thay thế sự sáng tạo. <em>Tôi dùng AI để mở rộng giới hạn của nó.</em>”</div>
              <div className="about-body">
                Tôi là <strong>Phan Minh Đức</strong>, một AI Filmmaker tập trung vào việc kể chuyện bằng hình ảnh, kết hợp giữa tư duy sáng tạo và công nghệ AI hiện đại.
                <br /><br />
                Quy trình làm việc của tôi bao gồm toàn bộ chuỗi sản xuất nội dung: từ phát triển ý tưởng, viết kịch bản, thiết kế nhân vật, xây dựng thế giới, tạo video, âm nhạc cho đến hậu kỳ hoàn chỉnh.
                <br /><br />
                Thay vì chỉ tạo ra những hình ảnh đẹp, mục tiêu của tôi là xây dựng những câu chuyện có cảm xúc, có chiều sâu và để lại dấu ấn trong lòng người xem.
                <br /><br />
                AI không làm nên một bộ phim. Chính câu chuyện, cảm xúc và góc nhìn của người sáng tạo mới là điều tạo nên sự khác biệt.
              </div>
              <div className="toolkit-block">
                <div className="toolkit-label">AI Toolkit</div>
                <div className="toolkit-tags">
                  {['ChatGPT', 'Claude', 'Banana Pro', 'Veo 3', 'Grok', 'Suno AI', 'CapCut'].map((tool) => (
                    <span className="toolkit-tag" key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
              <div className="about-stats">
                {[
                  ['50+', 'Projects'],
                  ['7', 'AI Tools'],
                  ['10+', 'Genres'],
                  ['2025', 'Started Creating']
                ].map(([num, label]) => (
                  <div className="stat" key={label}><div className="stat-n">{num}</div><div className="stat-l">{label}</div></div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <div className="div-line page-line" />

        <section id="contact">
          <div className="contact-bg-text">Phan Minh Đức</div>
          <Reveal>
            <div className="sec-label centered">Get in Touch</div>
            <h2 className="contact-h">
              <span className="c1">Let's Create</span>
              <span className="c2">Something Together</span>
            </h2>
            <p className="contact-sub">Bạn có một câu chuyện muốn kể? Gửi brief nhanh cho tôi, tôi sẽ phản hồi với hướng triển khai phù hợp.</p>
          </Reveal>

          <Reveal className="contact-grid" delay="d1">
            <form className="contact-form" onSubmit={handleGmailSubmit}>
              <div className="form-row">
                <label>
                  <span>Your Name</span>
                  <input name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Tên của bạn" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" value={contactForm.email} onChange={handleContactChange} placeholder="email@example.com" required />
                </label>
              </div>
              <label>
                <span>Budget / Scope</span>
                <input name="budget" value={contactForm.budget} onChange={handleContactChange} placeholder="VD: AI short film, MV, brand visual..." />
              </label>
              <label>
                <span>Project Idea</span>
                <textarea name="project" value={contactForm.project} onChange={handleContactChange} placeholder="Mô tả ngắn ý tưởng, deadline, phong cách mong muốn..." rows="5" required />
              </label>
              <div className="contact-actions">
                <button type="submit" className="form-submit gmail-submit">Gửi qua Gmail <span>→</span></button>
                <button type="button" className="form-submit zalo-submit" onClick={handleZaloSubmit}>Chat Zalo <span>→</span></button>
              </div>
            </form>

            <aside className="contact-card">
              <div className="contact-card-label">Direct Contact</div>
              <a href="mailto:pmduc010702@gmail.com" className="contact-email">pmduc010702@gmail.com</a>
              <a href="tel:0914405384" className="contact-phone">0914 405 384</a>
              <div className="direct-actions">
                <a href="mailto:pmduc010702@gmail.com" className="direct-btn">Gmail</a>
                <a href="https://zalo.me/0914405384" target="_blank" rel="noreferrer" className="direct-btn direct-zalo">Zalo</a>
              </div>
              <div className="contact-note">Available for AI films, storyboarding, music videos, brand visuals and cinematic social content.</div>
              <div className="socials compact">
                <a href="#" className="soc"><SocialSvg type="youtube" />YouTube</a>
                <a href="#" className="soc"><SocialSvg type="instagram" />Instagram</a>
                <a href="#" className="soc"><SocialSvg type="tiktok" />TikTok</a>
                <a href="#" className="soc"><SocialSvg type="linkedin" />LinkedIn</a>
              </div>
            </aside>
          </Reveal>
        </section>
      </main>

      <footer>
        <p>© 2026 Phan Minh Đức · AI Filmmaker · All rights reserved</p>
        <p>Made with AI · Directed by Humans</p>
      </footer>

      <FilmModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />
    </>
  )
}
