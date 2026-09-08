export default function Hero({ navigate }) {
  return (
    <main className="screen home-screen">
      <div className="home-copy">
        <p className="eyebrow">WEB DEVELOPMENT</p>
        <h1>Deb</h1>
        <p className="home-intro">Building thoughtful experiences for the web.</p>
        <div className="home-actions">
          <button onClick={() => navigate("about", "vertical")} className="text-button">
            About Me <span>↗</span>
          </button>
          <button onClick={() => navigate("work/1", "horizontal")} className="text-button text-button--filled">
            See My Work <span>→</span>
          </button>
        </div>
      </div>

      <div className="portrait-placeholder" aria-label="Client photo placeholder">
        <span>CLIENT<br />PHOTO</span>
      </div>

      <p className="corner-note">PORTFOLIO / 2026</p>
    </main>
  );
}
