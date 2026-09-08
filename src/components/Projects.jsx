import { useEffect, useRef, useState } from "react";

const works = [1, 2, 3, 4, 5].map((number) => ({
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

function MovingContent({ work, index, className = "" }) {
  const reversed = index % 2 === 1;

  return (
    <div className={`work-content ${reversed ? "work-content--reversed" : ""} ${className}`}>
      <div className="work-copy">
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <button className="work-link">See Work <span>↗</span></button>
      </div>
      <div className="work-image"><span>WORK<br />IMAGE</span></div>
    </div>
  );
}

export default function Projects({ navigate, initialWork, interactive = true }) {
  const [current, setCurrent] = useState(initialWork);
  const [incoming, setIncoming] = useState(null);
  const [flowDirection, setFlowDirection] = useState("next");
  const currentRef = useRef(initialWork);
  const previousRouteWork = useRef(initialWork);
  const wheelLocked = useRef(false);
  const unlockTimer = useRef(null);
  const flowTimer = useRef(null);

  const startLocalFlow = (nextIndex, direction) => {
    const next = Math.max(0, Math.min(works.length - 1, nextIndex));
    const previous = currentRef.current;
    if (next === previous || incoming !== null) return;

    currentRef.current = next;
    setFlowDirection(direction);
    setIncoming(next);

    window.clearTimeout(flowTimer.current);
    flowTimer.current = window.setTimeout(() => {
      setCurrent(next);
      setIncoming(null);
    }, 720);
  };

  const navigateWork = (nextIndex, direction = "next") => {
    const next = Math.max(0, Math.min(works.length - 1, nextIndex));
    const previous = currentRef.current;
    if (next === previous) return;

    window.history.pushState({}, "", `#work/${next + 1}`);
    navigate(`work/${next + 1}`, "work-local");
  };

  useEffect(() => {
    const previous = previousRouteWork.current;

    if (initialWork !== previous) {
      startLocalFlow(initialWork, initialWork > previous ? "next" : "previous");
    } else {
      currentRef.current = initialWork;
      setCurrent(initialWork);
    }

    previousRouteWork.current = initialWork;
  }, [initialWork]);

  useEffect(() => () => {
    window.clearTimeout(unlockTimer.current);
    window.clearTimeout(flowTimer.current);
  }, []);

  useEffect(() => {
    if (!interactive) return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 12) return;

      if (wheelLocked.current) {
        window.clearTimeout(unlockTimer.current);
        unlockTimer.current = window.setTimeout(() => {
          wheelLocked.current = false;
        }, 260);
        return;
      }

      const previous = currentRef.current;
      const next = event.deltaY > 0
        ? Math.min(works.length - 1, previous + 1)
        : Math.max(0, previous - 1);

      if (next === previous || incoming !== null) return;

      event.preventDefault();
      wheelLocked.current = true;
      currentRef.current = next;
      setCurrent(next);
      window.history.replaceState({}, "", `#work/${next + 1}`);

      window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        wheelLocked.current = false;
      }, 320);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.clearTimeout(unlockTimer.current);
    };
  }, [interactive, incoming]);

  const hasPrevious = current > 0;
  const hasNext = current < works.length - 1;

  return (
    <main className="work-page">
      <div className="work-topline">
        <Menu navigate={navigate} />
        <div>
          <h2>What I do?</h2>
        </div>
        <p className="work-count">{String(current + 1).padStart(2, "0")} / 05</p>
      </div>

      <div className="work-viewport">
        <div className="work-content-stage">
          <MovingContent work={works[current]} index={current} className="work-content--active" />
          {incoming !== null && (
            <MovingContent
              work={works[incoming]}
              index={incoming}
              className={`work-content--incoming work-content--${flowDirection}`}
            />
          )}
        </div>
      </div>

      {hasPrevious && (
        <button
          className="previous-arrow"
          onClick={() => navigateWork(current - 1, "previous")}
          aria-label="Previous work"
        >
          ←
        </button>
      )}

      {hasNext && (
        <button
          className="next-arrow"
          onClick={() => navigateWork(current + 1, "next")}
          aria-label="Next work"
        >
          →
        </button>
      )}

      <button className="bottom-link" onClick={() => navigate("contact", "vertical")}>
        Collab / Contact <span>→</span>
      </button>
    </main>
  );
}
