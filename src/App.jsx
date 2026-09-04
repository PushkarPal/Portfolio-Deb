import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function App() {
return (
<div className="min-h-screen">
<Navbar />
<main>
<Hero />
<About />
<Experience />
<Projects />
<Contact />
</main>
<Footer />
</div>
);
}
export default App;