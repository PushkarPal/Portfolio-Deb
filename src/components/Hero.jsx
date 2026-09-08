export default function Hero({ navigate }) {
  return (
    <main className="screen home-screen">
      <div className="home-divider" aria-hidden="true" />

      <div className="home-copy">
        <div className="home-identity">
          <p className="home-name">Debabrat Behera</p>
          <p className="home-occupation">Web Developer</p>
          <p className="home-quote">“one line of thought/quote”</p>
        </div>

        <div className="home-actions">
          <button onClick={() => navigate("about", "vertical")} className="text-button">
            About Me
          </button>
          <button onClick={() => navigate("work/1", "horizontal")} className="text-button text-button--outline-link">
            See My Work <span>→</span>
          </button>
        </div>
      </div>

      <div className="portrait-placeholder home-portrait" aria-label="Client photo placeholder">
        <span>CLIENT<br />PHOTO</span>
      </div>
    </main>
  );
}
