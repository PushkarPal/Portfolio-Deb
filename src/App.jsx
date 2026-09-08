import { useCallback, useEffect, useRef, useState } from "react";
import Home from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const getRoute = () => {
  const hash = window.location.hash.replace(/^#/, "") || "home";
  if (hash === "about" || hash === "contact") return hash;
  if (/^work(?:\/[1-5])?$/.test(hash)) return hash;
  return "home";
};

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [direction, setDirection] = useState("vertical");
  const routeRef = useRef(getRoute());

  const navigate = useCallback((nextRoute, nextDirection = "vertical") => {
    if (nextRoute === routeRef.current) return;
    routeRef.current = nextRoute;
    setDirection(nextDirection);
    window.history.pushState({}, "", `#${nextRoute}`);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      const nextRoute = getRoute();
      const previousRoute = routeRef.current;
      if (previousRoute === nextRoute) return;

      const previousWork = previousRoute.match(/^work\/(\d+)$/);
      const nextWork = nextRoute.match(/^work\/(\d+)$/);

      if (previousWork && nextWork) {
        const previousIndex = Number(previousWork[1]);
        const nextIndex = Number(nextWork[1]);
        setDirection(nextIndex > previousIndex ? "vertical" : "vertical-reverse");
      } else {
        setDirection("vertical");
      }

      routeRef.current = nextRoute;
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
    };
  }, []);

  const workMatch = route.match(/^work(?:\/(\d+))?$/);
  const workIndex = workMatch ? Math.max(0, Math.min(4, Number(workMatch[1] || 1) - 1)) : 0;

  let page;
  if (route === "about") {
    page = <About navigate={navigate} />;
  } else if (route === "contact") {
    page = <Contact navigate={navigate} />;
  } else if (workMatch) {
    page = <Projects navigate={navigate} initialWork={workIndex} />;
  } else {
    page = <Home navigate={navigate} />;
  }

  return (
    <div className="site-shell">
      <div key={route} className={`page-transition page-transition--${direction}`}>
        {page}
      </div>
    </div>
  );
}
