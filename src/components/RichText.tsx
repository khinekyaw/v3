import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface RichTextProps {
  content: string
}

export function RichText({ content }: RichTextProps) {
  return (
    <div
      className="prose max-w-none leading-relaxed text-foreground-secondary
      prose-headings:font-pixel prose-headings:font-normal prose-headings:uppercase prose-headings:text-foreground
      prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-xl
      prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-base
      prose-p:mb-5
      prose-a:text-foreground prose-a:decoration-pixel-orange prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-pixel-orange
      prose-strong:font-semibold prose-strong:text-foreground
      prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
      prose-pre:border-[3px] prose-pre:border-border prose-pre:bg-night prose-pre:p-5 prose-pre:text-night-foreground prose-pre:rounded-none
      prose-ul:my-5 prose-ul:pl-5 prose-ol:my-5 prose-ol:pl-5
      prose-li:mb-1.5 prose-li:text-foreground-secondary prose-li:marker:text-pixel-orange
      prose-blockquote:border-l-4 prose-blockquote:border-pixel-orange prose-blockquote:pl-5 prose-blockquote:font-normal prose-blockquote:text-foreground-secondary
      prose-hr:my-10 prose-hr:border-t-2 prose-hr:border-dashed prose-hr:border-border-light
      prose-img:border-[3px] prose-img:border-border
      prose-table:my-6 prose-table:w-full
      prose-thead:border-b-[3px] prose-thead:border-border
      prose-th:py-2 prose-th:pr-4 prose-th:text-left prose-th:font-pixel prose-th:text-[12px] prose-th:font-normal prose-th:uppercase prose-th:text-foreground
      prose-td:py-2 prose-td:pr-4 prose-td:text-sm prose-td:text-foreground-secondary
      prose-tr:border-b-2 prose-tr:border-dashed prose-tr:border-border-light
    "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
