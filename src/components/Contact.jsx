const links = [
  { name: "Instagram", handle: "@username", icon: "◎" },
  { name: "LinkedIn", handle: "Profile", icon: "in" },
  { name: "Gmail", handle: "email@example.com", icon: "✉" },
  { name: "Reddit", handle: "u/username", icon: "●" },
];

function Menu({ navigate }) {
  return (
    <div className="menu-wrap">
      <button className="menu-button" aria-label="Open navigation">
        <span /><span /><span />
      </button>
      <div className="menu-panel">
        <button onClick={() => navigate("home", "vertical")}>Home</button>
        <button onClick={() => navigate("about", "vertical")}>About Me</button>
      </div>
    </div>
  );
}

export default function Contact({ navigate }) {
  return (
    <main className="page contact-page">
      <div className="page-heading">
        <Menu navigate={navigate} />
        <h2>Contact Me</h2>
      </div>

      <section className="contact-content">
        <h3>Have an idea?<br />Let's deploy it</h3>
        <div className="contact-links">
          {links.map((link) => (
            <a href="#" key={link.name} onClick={(event) => event.preventDefault()}>
              <span className="social-icon">{link.icon}</span>
              <span><strong>{link.name}</strong><small>{link.handle}</small></span>
              <span className="contact-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
