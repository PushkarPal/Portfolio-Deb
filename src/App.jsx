import { useEffect, useState } from "react";
import Home from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const getRoute = () => {
  const hash = window.location.hash.replace(/^#/, "") || "home";
  if (hash === "about" || hash === "contact") return hash;
  if (hash.startsWith("work")) return hash;
  return "home";
};

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [direction, setDirection] = useState("vertical");

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onPopState);
    };
  }, []);

  const navigate = (nextRoute, nextDirection = "vertical") => {
    if (nextRoute === route) return;
    setDirection(nextDirection);
    window.history.pushState({}, "", `#${nextRoute}`);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

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
