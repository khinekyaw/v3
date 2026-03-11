import { useEffect } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom"
import { Blog, Hero, Projects } from "./sections"
import { Layout } from "./components/layout"
import { ProjectsPage } from "./pages/ProjectsPage"
import { ProjectDetailPage } from "./pages/ProjectDetailPage"
import { BlogPage } from "./pages/BlogPage"
import { BlogDetailPage } from "./pages/BlogDetailPage"
import { Experiences } from "./sections/Experiences"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Experiences />
      <Projects />
      <Blog />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background relative">
        <div className="relative z-10">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
