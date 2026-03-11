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
    slug: "suzuki-myanmar-motor",
    title: "Suzuki Myanmar Motor",
    logo: "/suzuki-myanmar-motor-logo.png",
    summary:
      "Pixel-perfect, mobile-first web app for one of Myanmar's leading automotive brands.",
    description:
      "Pixel-perfect, mobile-first web app for one of Myanmar's leading automotive brands.",
    video: "",
    links: [{ label: "WEBSITE", href: "#" }],
  },
  {
    slug: "chit-maymay",
    title: "Chit MayMay",
    logo: "/chitmaymay-logo.png",
    summary:
      "Landing page for a parenting app.",
    description:
      "Animated landing page with scroll triggers, mouse interactions & Lottie animations.",
    video: "",
    links: [{ label: "WEBSITE", href: "#" }],
  },
  {
    slug: "codigo-design-system",
    title: "Codigo Design System",
    summary:
      "Scalable React component library co-created with the design team. Cut dev time by 20%.",
    description:
      "Scalable React component library co-created with the design team. Cut dev time by 20%.",
    video: "",
    links: [{ label: "GITHUB", href: "#" }],
  },
  {
    slug: "ai-chatbot-platform",
    title: "AI Chatbot Platform",
    summary:
      "NLP-powered chatbot built with Django, deployed across Telegram, Messenger & WordPress.",
    description:
      "NLP-powered chatbot built with Django, deployed across Telegram, Messenger & WordPress.",
    video: "",
    links: [{ label: "GITHUB", href: "#" }],
  },
]

export const experimentProjects: Project[] = [
  {
    slug: "arisa",
    title: "Arisa",
    summary: "Interactive 3D AI companion.",
    description:
      "An interactive 3D AI agent rendered in the browser, inspired by Grok's Ani. Users can speak or type to Arisa, and she responds with voice, synchronized lip movements, body animations, and emotion-driven facial expressions — all in real time.\n\n## How It Works\n\nThe user records audio or types a message. Audio is transcribed via ElevenLabs STT, then sent to xAI Grok which returns a text response along with an animation state and facial expression weights. The response is converted back to speech with ElevenLabs TTS, and lip-sync viseme data is extracted using Rhubarb. On the frontend, a 3D avatar rendered with Three.js and React Three Fiber plays the matching body animation, blends facial morph targets for the expression, and synchronizes mouth shapes to the audio.\n\n## Key Features\n\n- **Voice and text input** — speak or type, Arisa understands both\n- **Real-time lip sync** — mouth shapes driven by viseme data from Rhubarb\n- **LLM-controlled animations** — Grok decides the body animation and facial expression for each response\n- **Emotion-aware responses** — happy, sad, angry, relaxed, surprised — reflected in both voice tone and 3D expression\n- **Morph target blending** — smooth transitions between facial expressions using blend shapes\n\n## Tech Stack\n\n| Layer | Technology |\n|-------|------------|\n| Frontend | React, React Three Fiber, Three.js, Tailwind CSS |\n| Backend | Node.js, Express, TypeScript |\n| LLM | xAI Grok |\n| Voice | ElevenLabs (STT + TTS) |\n| Lip Sync | Rhubarb |\n| 3D | FBX animations, morph target blending |",
    logo: "/arisa.png",
    video: "",
    links: [{ label: "GITHUB", href: "#" }],
  },
  {
    slug: "agent-zero",
    title: "Agent Zero",
    summary: "Fully offline voice assistant.",
    description:
      "A fully offline, real-time voice assistant that runs entirely on your own hardware. Zero listens for a wake word, records your speech, transcribes it with Faster Whisper, generates a response using a local Qwen3-1.7B language model, and speaks it back with Kokoro-82M text-to-speech — all without any cloud services or API keys. Features include always-on wake word detection via OpenWakeWord, WebRTC voice activity detection, streaming LLM responses for low latency, sentence-chunked TTS for fast time-to-first-word, mid-sentence interruption handling, conversation memory across turns, and automatic sleep after idle periods. Built for privacy-sensitive environments, air-gapped systems, or anyone who wants a capable voice assistant without sending data off-device.",
    logo: "/zero.png",
    video: "",
    links: [{ label: "GITHUB", href: "#" }],
  },

  {
    slug: "text-styles-to-tailwind-css",
    title: "Text Styles to Tailwind CSS",
    summary:
      "Figma plugin that converts your text styles into Tailwind CSS utility classes.",
    description:
      "A Figma community plugin that bridges the gap between design and development. Select any text layer or text style in Figma, and the plugin instantly generates the corresponding Tailwind CSS utility classes — including font size, weight, line height, letter spacing, and font family.\n\n## How It Works\n\nSelect a text layer or text style in your Figma file. The plugin reads the style properties and maps them to their Tailwind CSS equivalents. Copy the generated classes directly into your code — no manual translation needed.\n\n## Key Features\n\n- **One-click conversion** — select a text layer and get Tailwind classes instantly\n- **Full style coverage** — handles font size, weight, line height, letter spacing, and font family\n- **Works with text styles** — supports both local text styles and individual text layers\n- **Copy-ready output** — generated classes are ready to paste into your JSX or HTML",
    logo: "/text-styles-to-taiwindcss-logo.png",
    image: "/text-styles-to-taiwindcss-cover.png",
    links: [
      {
        label: "FIGMA",
        href: "https://www.figma.com/community/plugin/1538977485542040849/text-styles-to-tailwind-css",
      },
    ],
  },
]

export const allProjects = [...professionalProjects, ...experimentProjects]
