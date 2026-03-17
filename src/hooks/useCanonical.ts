import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SITE_URL = "https://khinekyaw.com"

export function useCanonical() {
  const { pathname } = useLocation()

  useEffect(() => {
    const url = `${SITE_URL}${pathname === "/" ? "" : pathname.replace(/\/+$/, "")}`
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (link) {
      link.href = url
    } else {
      link = document.createElement("link")
      link.rel = "canonical"
      link.href = url
      document.head.appendChild(link)
    }

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.content = url
    }
  }, [pathname])
}
