export interface Post {
  slug: string;
  date: string;
  title: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'figma-to-code-pixel-perfect-ui-with-claude-code',
    date: '14 March 2026',
    title: 'Figma to Code: Achieving Pixel-Perfect UI with Claude Code',
    tags: ['AI', 'Claude Code', 'Figma', 'Frontend'],
    content: `*Note: This post was written by Claude Code. Real posts coming soon. Probably.*

I've been building UIs from Figma designs for years now. The workflow has always been the same: open the design, squint at spacing values, copy hex codes, write the markup, refresh the browser, compare side by side, tweak, repeat. It works, but it's slow and honestly pretty tedious.

A few weeks ago I started using Claude Code to handle the Figma-to-code translation, and it's changed how I work. Not in some magical "AI does everything" way. More like having a really fast pair programmer who's good at the boring parts.

## The Old Way

Here's what the typical flow used to look like. I'd get a design from our team, open it in Figma, and start measuring things manually. Padding, gaps, font sizes, border radius, colors. Then I'd write the JSX and Tailwind classes by hand, constantly switching between the browser and Figma to make sure things lined up.

The worst part was always the small stuff. Is that gap 12px or 16px? Is the text \`foreground-secondary\` or \`foreground-tertiary\`? These tiny decisions add up and eat into your time.

## How Claude Code Fits In

What I do now is pretty simple. I take a screenshot of the Figma section I'm working on and feed it to Claude Code along with my existing design tokens and component library. Then I ask it to build the component.

The first output is rarely perfect. But it gets about 85-90% of the way there, which is the key. The structure is right, the hierarchy makes sense, and most of the spacing is close. From there I just need to fine-tune.

Here's what a typical prompt looks like for me:

\`\`\`
Here's a screenshot of the hero section from our Figma.
Use our existing design tokens and Tailwind config.
Match the spacing and typography as closely as possible.
\`\`\`

That's it. No complicated setup or prompt engineering.

## What It Gets Right

**Layout structure.** Claude Code is surprisingly good at looking at a design and figuring out the right flex/grid setup. It picks up on alignment, wrapping behavior, and responsive patterns without much guidance.

**Design token usage.** Once it knows your token system, it uses the right variables instead of hardcoding values. So you get \`text-foreground-secondary\` instead of \`text-gray-500\`, which keeps everything consistent.

**Component composition.** It understands when something should be its own component vs inline markup. That saves cleanup time later.

## What Still Needs Work

Spacing is the main thing. It'll get close but sometimes it's off by a few pixels. A \`gap-3\` where it should be \`gap-4\`, that kind of thing. Easy to fix but you do need to check.

Responsive behavior is another area where I still step in. The desktop layout usually looks great, but breakpoint decisions need human judgment. How should this grid collapse on mobile? Should this text resize or stay fixed? Those choices depend on context that a screenshot alone can't convey.

And animations or interactions obviously need to be added manually. Claude Code can scaffold the static UI, but the motion design is still on you.

## My Actual Workflow Now

1. Screenshot the Figma section
2. Feed it to Claude Code with my project context
3. Review the output and drop it into my codebase
4. Compare against Figma and adjust spacing or tokens
5. Add responsive tweaks and interactions

The whole loop for a single section takes maybe 15-20 minutes now instead of an hour or more. And I spend that time on the interesting parts like animation and interaction details, not counting pixels.

## A Few Tips

**Give it your design tokens upfront.** The more context Claude Code has about your color system, spacing scale, and typography, the better the output. I usually just point it at my Tailwind config and component files.

**Work section by section.** Don't try to do an entire page in one shot. Break it into hero, features, footer, etc. Smaller chunks give better results.

**Keep your component library clean.** If your existing components are well-structured, Claude Code will pick up on the patterns and reuse them naturally. Messy code in, messy code out.

## Is It Worth It?

For me, absolutely. The time savings are real, and it lets me focus on the parts of frontend work that actually require creativity and judgment. I'm not going to pretend it's magic or that you can just hand off a whole design and walk away. You can't. But as a tool that handles the repetitive translation work? It's been genuinely useful.

The way I think about it: Claude Code doesn't replace the craft of building good UI. It just removes a lot of the busywork that was never really the craft to begin with.
`,
  },
];
