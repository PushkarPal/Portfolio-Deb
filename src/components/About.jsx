function Menu({ navigate }) {
  return (
    <div className="menu-wrap">
      <button className="menu-button" aria-label="Open navigation">
        <span /><span /><span />
      </button>
      <div className="menu-panel">
        <button onClick={() => navigate("home", "vertical")}>Home</button>
        <button onClick={() => navigate("work/1", "horizontal")}>See My Work</button>
      </div>
    </div>
  );
}

export default function About({ navigate }) {
  return (
    <main className="page about-page">
      <div className="page-heading">
        <Menu navigate={navigate} />
        <h2>About Me</h2>
      </div>

      <section className="about-layout">
        <div className="about-image portrait-placeholder">
          <span>CLIENT<br />PHOTO</span>
        </div>
        <div className="about-content">
          <p className="eyebrow">A LITTLE ABOUT ME</p>
          <p className="about-lead">This space will hold the introduction written by the client.</p>
          <p className="about-body">We'll add Deb's own story here once the final information is available. The structure is intentionally ready for real content without changing the design.</p>

          <div className="interest-grid">
            <article><span>01</span><h3>Hobbies</h3><p>To be added.</p></article>
            <article><span>02</span><h3>Games</h3><p>To be added.</p></article>
            <article><span>03</span><h3>Music</h3><p>Playlist coming soon.</p></article>
          </div>
        </div>
      </section>

      <button className="bottom-link" onClick={() => navigate("contact", "vertical")}>
        Want to Collab / Contact <span>→</span>
      </button>
    </main>
  );
}
