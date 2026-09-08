export default function Hero({ navigate }) {
  return (
    <main className="screen home-screen">
      <div className="home-divider" aria-hidden="true" />

      <div className="home-portrait" aria-label="Debabrat Behera">
        <img
          src="/Portfolio-Deb/debabrat-behera.png"
          alt="Debabrat Behera"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            filter: "saturate(.88) contrast(1.02) brightness(.92)",
            WebkitMaskImage: "linear-gradient(90deg, #000 0%, #000 66%, rgba(0,0,0,.9) 78%, rgba(0,0,0,.45) 91%, transparent 100%)",
            maskImage: "linear-gradient(90deg, #000 0%, #000 66%, rgba(0,0,0,.9) 78%, rgba(0,0,0,.45) 91%, transparent 100%)",
          }}
        />
      </div>

      <div className="home-copy float-stagger">
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
    </main>
  );
}
