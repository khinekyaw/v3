export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  logo?: string
  image?: string
  video?: string
  links: { label: string; href: string }[]
}

export const professionalProjects: Project[] = [
  {
    slug: "renonation",
    title: "Renonation",
    logo: "/images/projects/renonation-logo.webp",
    video: "/images/projects/renonation-demo.webm",
    summary: "Singapore renovation platform.",
    description:
      "Contributed to the frontend development of a Singapore-based platform that connects homeowners with vetted interior designers and renovation professionals.",
    links: [{ label: "Website", href: "https://www.renonation.sg" }],
  },
  {
    slug: "suzuki-myanmar-motor",
    title: "Suzuki Myanmar",
    logo: "/images/projects/suzuki-myanmar-motor-logo.webp",
    image: "/images/projects/suzuki-myanmar-motor-demo.webp",
    summary: "Official website for Suzuki Myanmar Motor.",
    description:
      "Led the development of a pixel-perfect, mobile-first website for Suzuki Myanmar Motor.",
    links: [{ label: "Website", href: "https://suzukimyanmar.com/" }],
  },
  {
    slug: "spotvnow",
    title: "SPOTV NOW",
    logo: "/images/projects/spotv-logo.webp",
    image: "/images/projects/spotv-demo.webp",
    summary: "Korean sports streaming platform.",
    description:
      "Assisted with frontend development for a Korean sports streaming platform delivering live and on-demand coverage of major leagues and tournaments across Asia.",
    links: [{ label: "Website", href: "https://www.spotvnow.com/Home" }],
  },
  {
    slug: "chit-maymay",
    title: "Chit MayMay",
    logo: "/images/projects/chitmaymay-logo.webp",
    image: "/images/projects/chitmaymay-demo.webp",
    summary: "Landing page for a parenting app.",
    description:
      "Led the development of the marketing website for this parenting app.",
    video: "",
    links: [{ label: "Website", href: "https://chitmaymay.com" }],
  },
  {
    slug: "codigo",
    title: "Codigo",
    logo: "/images/projects/codigo-logo.webp",
    image: "/images/projects/codigo-demo.webp",
    summary: "Digital agency website.",
    description:
      "Maintained and improved the frontend of the agency’s website.",
    video: "",
    links: [{ label: "Website", href: "https://codigo.co" }],
  },
  {
    slug: "waddy",
    title: "Waddy",
    logo: "/images/projects/waddy-logo.webp",
    image: "/images/projects/waddy-cover.webp",
    summary: "Burmese chatbot platform.",
    description:
      "Led the development of an internal chatbot platform that enables businesses to create and manage chatbots with Myanmar and English language support.",
    video: "",
    links: [],
  },
]

export const experimentProjects: Project[] = [
  {
    slug: "arisa",
    title: "Arisa",
    summary: "Interactive 3D AI companion.",
    description:
      "An interactive 3D AI agent rendered in the browser, inspired by Grok's Ani. Users can speak or type to Arisa, and she responds with voice, synchronized lip movements, body animations, and emotion-driven facial expressions — all in real time.\n\n## How It Works\n\nThe user records audio or types a message. Audio is transcribed via ElevenLabs STT, then sent to xAI Grok which returns a text response along with an animation state and facial expression weights. The response is converted back to speech with ElevenLabs TTS, and lip-sync viseme data is extracted using Rhubarb. On the frontend, a 3D avatar rendered with Three.js and React Three Fiber plays the matching body animation, blends facial morph targets for the expression, and synchronizes mouth shapes to the audio.\n\n## Key Features\n\n- **Voice and text input** — speak or type, Arisa understands both\n- **Real-time lip sync** — mouth shapes driven by viseme data from Rhubarb\n- **LLM-controlled animations** — Grok decides the body animation and facial expression for each response\n- **Emotion-aware responses** — happy, sad, angry, relaxed, surprised — reflected in both voice tone and 3D expression\n- **Morph target blending** — smooth transitions between facial expressions using blend shapes\n\n## Tech Stack\n\n| Layer | Technology |\n|-------|------------|\n| Frontend | React, React Three Fiber, Three.js, Tailwind CSS |\n| Backend | Node.js, Express, TypeScript |\n| LLM | xAI Grok |\n| Voice | ElevenLabs (STT + TTS) |\n| Lip Sync | Rhubarb |\n| 3D | FBX animations, morph target blending |",
    logo: "/images/projects/arisa.webp",
    image: "/images/projects/arisa-demo.webp",
    links: [{ label: "GITHUB", href: "#" }],
  },
  {
    slug: "agent-zero",
    title: "Agent Zero",
    summary: "Fully offline voice assistant.",
    description:
      "My first attempt at building a fully local voice assistant, everything runs on your own machine. Say a wake word, talk to it, and it talks back. Simple as that.\n\nIt uses Faster Whisper for speech-to-text, a small local language model (Qwen3-1.7B) to generate responses, and Kokoro-82M to speak them out loud. The whole pipeline stays on-device, so nothing leaves your computer.\n\n## How It Works\n\n- **Wake word detection** — always listening for the trigger phrase, then starts recording\n- **Voice activity detection** — knows when you've stopped talking so it can respond\n- **Streaming responses** — starts generating and speaking before the full response is ready, so it feels snappy\n- **Conversation memory** — remembers what you said earlier in the conversation\n- **Auto sleep** — goes quiet after a period of inactivity\n\nThis was mostly a learning project to explore how far you can push local-only AI.",
    logo: "/images/projects/agent-zero-logo.webp",
    image: "/images/projects/agent-zero-demo.webp",
    links: [{ label: "GITHUB", href: "#" }],
  },
  {
    slug: "portfolio-v3",
    title: "Portfolio V3",
    logo: "/images/projects/pacman-logo.webp",
    image: "/v3-demo.webp",
    summary: "This website, vibe coded with Claude Code.",
    description:
      "My personal portfolio website, fully vibe coded with Claude Code. I fed it the Figma design and let it do the heavy lifting. Built with React, Tailwind CSS, and a lot of AI-assisted back and forth.\n\nUI design inspired by [SimpFolio by Hisyam Akbar](https://dribbble.com/shots/26490004-Minimalist-Personal-Site-SimpFolio) on Dribbble.\n\nBuilt with Claude Code.",
    links: [{ label: "GITHUB", href: "#" }],
  },
  {
    slug: "text-styles-to-tailwind-css",
    title: "Text Styles to Tailwind CSS",
    summary: "A Figma community plugin.",
    description:
      "A Figma community plugin that bridges the gap between design and development. Select any text layer or text style in Figma, and the plugin instantly generates the corresponding Tailwind CSS utility classes — including font size, weight, line height, letter spacing, and font family.\n\n## How It Works\n\nSelect a text layer or text style in your Figma file. The plugin reads the style properties and maps them to their Tailwind CSS equivalents. Copy the generated classes directly into your code — no manual translation needed.\n\n## Key Features\n\n- **One-click conversion** — select a text layer and get Tailwind classes instantly\n- **Full style coverage** — handles font size, weight, line height, letter spacing, and font family\n- **Works with text styles** — supports both local text styles and individual text layers\n- **Copy-ready output** — generated classes are ready to paste into your JSX or HTML",
    logo: "/images/projects/text-styles-to-taiwindcss-logo.webp",
    image: "/images/projects/text-styles-to-taiwindcss-cover.webp",
    links: [
      {
        label: "FIGMA",
        href: "https://www.figma.com/community/plugin/1538977485542040849/text-styles-to-tailwind-css",
      },
    ],
  },
]

export const allProjects = [...professionalProjects, ...experimentProjects]
