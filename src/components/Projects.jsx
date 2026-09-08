import { useEffect, useState } from "react";

const works = [1, 2, 3, 4, 5].map((number) => ({
  number: String(number).padStart(2, "0"),
  title: `Work ${number}`,
  description: "Project description will be added once the client's work details are available.",
}));

function Menu({ navigate }) {
  return (
    <div className="menu-wrap">
      <button className="menu-button" aria-label="Open navigation">
        <span /><span /><span />
      </button>
      <div className="menu-panel">
        <button onClick={() => navigate("home", "horizontal")}>Home</button>
        <button onClick={() => navigate("about", "vertical")}>About Me</button>
      </div>
    </div>
  );
}

function WorkSlide({ work, index, navigate }) {
  const reversed = index % 2 === 1;

  return (
    <article className={`work-slide ${reversed ? "work-slide--reversed" : ""}`}>
      <div className="work-copy">
        <p className="work-number">{work.number}</p>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <button className="work-link">See Work <span>↗</span></button>
      </div>
      <div className="work-image"><span>WORK<br />IMAGE</span></div>
      <button className="next-arrow" onClick={() => navigate(`work/${index + 2}`, "horizontal")} aria-label="Next work">
        →
      </button>
      <button className="bottom-link" onClick={() => navigate("contact", "vertical")}>
        Collab / Contact <span>→</span>
      </button>
    </article>
  );
}

export default function Projects({ navigate, initialWork }) {
  const [current, setCurrent] = useState(initialWork);

  useEffect(() => {
    setCurrent(initialWork);
  }, [initialWork]);

  useEffect(() => {
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 10) return;
      const next = event.deltaY > 0 ? Math.min(works.length - 1, current + 1) : Math.max(0, current - 1);
      if (next !== current) {
        navigate(`work/${next + 1}`, "vertical");
        setCurrent(next);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, navigate]);

  return (
    <main className="work-page">
      <div className="work-topline">
        <Menu navigate={navigate} />
        <div>
          <p className="eyebrow">PORTFOLIO</p>
          <h2>What I do?</h2>
        </div>
        <p className="work-count">{String(current + 1).padStart(2, "0")} / 05</p>
      </div>
      <div className="work-viewport">
        <div className="work-track" style={{ transform: `translateY(-${current * 100}%)` }}>
          {works.map((work, index) => <WorkSlide key={work.number} work={work} index={index} navigate={navigate} />)}
        </div>
      </div>
    </main>
  );
}
