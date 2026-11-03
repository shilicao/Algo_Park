import "./App.css";

function App(){
    return (
        <main className = "academy">
            <header className = "topbar">
              <a className = "logo" href = "/" aria-label = "logo design">
                <span className = "crest" aria-hidden = "true">
                  <span className="crest-bars"><i /><i /><i /></span>
                  <span className = "crest-glint">✦</span>
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
                    <span className = "moon active" aria-hidden = "true">☾</span>
                  </button>
                </div>
            </header>
        </main>
    )
}
export default App;