import { useCallback, useEffect, useRef, useState } from "react";
import Home from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const TRANSITION_MS = 820;

const getRoute = () => {
  const hash = window.location.hash.replace(/^#/, "") || "home";
  if (hash === "about" || hash === "contact") return hash;
  if (/^work(?:\/[1-5])?$/.test(hash)) return hash;
  return "home";
};

const getWorkIndex = (route) => {
  const match = route.match(/^work\/(\d+)$/);
  return match ? Math.max(0, Math.min(4, Number(match[1]) - 1)) : null;
};

export default function App() {
  const initialRoute = getRoute();
  const [route, setRoute] = useState(initialRoute);
  const [transition, setTransition] = useState(null);
  const routeRef = useRef(initialRoute);
  const timerRef = useRef(null);

  const startTransition = useCallback((nextRoute, direction) => {
    const previousRoute = routeRef.current;
    if (nextRoute === previousRoute) return;

    routeRef.current = nextRoute;
    setTransition({ from: previousRoute, direction });
    setRoute(nextRoute);

    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setTransition(null), TRANSITION_MS);
  }, []);

  const navigate = useCallback((nextRoute, nextDirection = "vertical") => {
    if (nextRoute === routeRef.current) return;
    window.history.pushState({}, "", `#${nextRoute}`);
    startTransition(nextRoute, nextDirection);
  }, [startTransition]);

  useEffect(() => {
    const onLocationChange = () => {
      const nextRoute = getRoute();
      const previousRoute = routeRef.current;
      if (previousRoute === nextRoute) return;

      const previousWork = getWorkIndex(previousRoute);
      const nextWork = getWorkIndex(nextRoute);
      let direction = "vertical";

      if (previousWork !== null && nextWork !== null) {
        direction = nextWork > previousWork ? "vertical" : "vertical-reverse";
      }

      startTransition(nextRoute, direction);
    };

    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
      window.clearTimeout(timerRef.current);
    };
  }, [startTransition]);

  const renderPage = (pageRoute, interactive = true) => {
    const workMatch = pageRoute.match(/^work(?:\/(\d+))?$/);
    const workIndex = workMatch
      ? Math.max(0, Math.min(4, Number(workMatch[1] || 1) - 1))
      : 0;

    if (pageRoute === "about") return <About navigate={navigate} />;
    if (pageRoute === "contact") return <Contact navigate={navigate} />;
    if (workMatch) {
      return (
        <Projects
          navigate={navigate}
          initialWork={workIndex}
          interactive={interactive}
        />
      );
    }
    return <Home navigate={navigate} />;
  };

  return (
    <div className="site-shell">
      <div className="gradient-canvas" aria-hidden="true" />

      <div className={`route-stage${transition ? ` route-stage--${transition.direction}` : ""}`}>
        {transition && (
          <div className="route-layer route-layer--outgoing">
            {renderPage(transition.from, false)}
          </div>
        )}

        <div className="route-layer route-layer--current">
          {renderPage(route, true)}
        </div>
      </div>
    </div>
  );
}
