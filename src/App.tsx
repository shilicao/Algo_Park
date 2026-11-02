import "./App.css";

function App(){
    return (
        <main className = "academy">
            <header className = "topbar">
                <a className = "title" href = "/">Algo {" "} Academy</a>
                <nav aria-label = "Main navigation">
                    <a className = "active" href = "#">Training</a>
                    <a href = "#">Quest</a>
                    <a href = "#">Library</a>
                </nav>
                <div className = "level">★ Iron · Lv. 01</div>
            </header>
        </main>
    )
}
export default App;