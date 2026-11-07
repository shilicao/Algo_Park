import "./App.css";

function App(){
  return (
    <main className = "academy">
      {/* navigation layouts */}
      <header className = "topbar">
        <a className = "logo" href = "/" aria-label = "logo design">
          <span className="crest" aria-hidden="true">
            <svg className="book-icon" viewBox="0 0 48 48">
              <path
                d="M24 17c-5-4-11-5-18-3v22c7-2 13-1 18 4 5-5 11-6 18-4V14c-7-2-13-1-18 3Z"
                fill="rgba(180, 140, 255, 0.14)"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round">
              </path>
              <path d="M24 17v23M11 20c4-.5 7 .3 10 2M11 26c4-.5 7 .3 10 2M37 20c-4-.5-7 .3-10 2M37 26c-4-.5-7 .3-10 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round">
              </path>
              <path
                d="m35 4 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1L35 4Z"
                fill="#fff0ad">
              </path>
            </svg>
          </span>
          <span className = "title">
            Algo{" "}Academy
          </span>
        </a>
        <nav className = "navigation" aria-label = "Main navigation">
            <a className = "active" href = "#">Training</a>
            <a href = "#">Quest</a>
            <a href = "#">Library</a>
        </nav>
        <div className = "rhs-actions">
          <span className = "level">★ Iron · Lv. 01</span>
          <button className = "theme-toggle" type = "button" aria-label = "switch" aria-pressed = "true">
            <span className = "sun" aria-hidden = "true">☼</span>
            <span className = "moon active" aria-hidden = "true">
              <svg viewBox = "0 0 24 24">
                <path d ="M19.2 15.4A8.2 8.2 0 0 1 8.6 4.8a8.2 8.2 0 1 0 10.6 10.6Z"
                  fill="currentColor">
                </path>
                <path d="m17.6 2.5.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"
                    fill="currentColor">
                </path>
                <path d="m21.3 8.5.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1Z"
                  fill="currentColor">
                </path>
              </svg>
            </span>
          </button>
        </div>
      </header> 

      {/* middle sction layouts */}
      <section className = "center-layouts" aria-label = "Algorithm workspace">
        <aside className = "middle">
          <h2>
            <span className = "algorithm-icon" aria-hidden = "true">
              ⚙
            </span>
            Algorithms
          </h2>
        </aside>

        <section className = "middle area" aria-label = "sorting">
          <div className = "area-header">Sorting Section</div>
          <div className = "area-holder">Visualization</div>
        </section>

        <aside className = "middle details">
          {/* Decorative panel trim: inset outline and top rails, separate from the badge/content. */}
          <span className="details-inset-frame" aria-hidden="true" />
          <div className="details-frame-rails" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className = "details-icon" aria-hidden = "true">
            <span>⚔︎</span>
          </div>
          <h2>Algorithm Details</h2>
        </aside>
      </section>
    </main>
  )
}
export default App;
