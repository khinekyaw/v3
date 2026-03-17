import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Blog, Hero, Projects } from "./sections"
import { Layout } from "./components/layout"
import { Experiences } from "./sections/Experiences"
import { CustomCursor } from "./components/CustomCursor"
import { AnimatedOutlet } from "./components/AnimatedOutlet"
import { ProjectsPage } from "./pages/ProjectsPage"
import { ProjectDetailPage } from "./pages/ProjectDetailPage"
import { BlogPage } from "./pages/BlogPage"
import { BlogDetailPage } from "./pages/BlogDetailPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { PacmanCurtain } from "./components/PacmanCurtain"
import { useThemeProvider, ThemeContext } from "./hooks/useTheme"
import { useCanonical } from "./hooks/useCanonical"
import { Analytics } from "@vercel/analytics/react"

function AppLayout() {
  useCanonical()

  return (
    <Layout>
      <AnimatedOutlet />
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
  const themeCtx = useThemeProvider()

  return (
    <ThemeContext.Provider value={themeCtx}>
      <BrowserRouter>
        <CustomCursor />
        <div className="min-h-screen bg-background relative">
          <div className="relative z-10">
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </div>

        {themeCtx.themeSwitching && (
          <PacmanCurtain
            key={themeCtx.switchCount}
            inverted
            onCovered={themeCtx.onThemeCovered}
            onDone={themeCtx.onThemeDone}
          />
        )}
      </BrowserRouter>
      <Analytics />
    </ThemeContext.Provider>
  )
}

export default App
