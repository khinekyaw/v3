import { Blog, Experiences, Footer, Hero, Navbar, Projects } from "./sections"

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Experiences />
          <Projects />
          <Blog />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
