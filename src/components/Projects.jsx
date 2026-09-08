import { useEffect, useRef, useState } from "react";

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

function WorkSlide({ work, index, navigateWork, navigate }) {
  const reversed = index % 2 === 1;
  const hasNext = index < works.length - 1;

  return (
    <article className={`work-slide ${reversed ? "work-slide--reversed" : ""}`}>
      <div className="work-copy">
        <p className="work-number">{work.number}</p>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <button className="work-link">See Work <span>↗</span></button>
      </div>
      <div className="work-image"><span>WORK<br />IMAGE</span></div>
      {hasNext && (
        <button
          className="next-arrow"
          onClick={() => navigateWork(index + 1, "horizontal")}
          aria-label="Next work"
        >
          →
        </button>
      )}
      <button className="bottom-link" onClick={() => navigate("contact", "vertical")}>
        Collab / Contact <span>→</span>
      </button>
    </article>
  );
}

export default function Projects({ navigate, initialWork }) {
  const [current, setCurrent] = useState(initialWork);
  const currentRef = useRef(initialWork);
  const wheelLocked = useRef(false);
  const unlockTimer = useRef(null);

  const navigateWork = (nextIndex, direction = "vertical") => {
    const next = Math.max(0, Math.min(works.length - 1, nextIndex));
    if (next === currentRef.current) return;

    currentRef.current = next;
    setCurrent(next);
    window.history.pushState({}, "", `#work/${next + 1}`);

    if (direction === "vertical") {
      // Keep the work page mounted so a single wheel gesture cannot
      // create a new listener and jump through multiple works.
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  useEffect(() => {
    currentRef.current = initialWork;
    setCurrent(initialWork);
  }, [initialWork]);

  useEffect(() => {
    const onPopState = () => {
      const match = window.location.hash.match(/^#work\/(\d+)$/);
      if (!match) return;

      const next = Math.max(0, Math.min(works.length - 1, Number(match[1]) - 1));
      currentRef.current = next;
      setCurrent(next);
      wheelLocked.current = true;
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        wheelLocked.current = false;
      }, 500);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 10) return;

      // A trackpad sends many wheel events for one physical gesture.
      // Lock until the wheel has been quiet long enough for the gesture to end.
      if (wheelLocked.current) {
        window.clearTimeout(unlockTimer.current);
        unlockTimer.current = window.setTimeout(() => {
          wheelLocked.current = false;
        }, 550);
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const previous = currentRef.current;
      const next = direction > 0
        ? Math.min(works.length - 1, previous + 1)
        : Math.max(0, previous - 1);

      if (next === previous) return;

      event.preventDefault();
      wheelLocked.current = true;
      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        wheelLocked.current = false;
      }, 550);

      navigateWork(next, "vertical");
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(unlockTimer.current);
    };
  }, []);

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
        <div
          className="work-track"
          style={{ transform: `translateY(-${current * 82}vh)` }}
        >
          {works.map((work, index) => (
            <WorkSlide
              key={work.number}
              work={work}
              index={index}
              navigateWork={navigateWork}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
