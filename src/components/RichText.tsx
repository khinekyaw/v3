import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichTextProps {
  content: string;
}

export function RichText({ content }: RichTextProps) {
  return (
    <div className="prose prose-sm max-w-none text-foreground-secondary leading-relaxed
      prose-headings:text-foreground prose-headings:font-bold
      prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
      prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
      prose-p:mb-4
      prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 hover:prose-a:opacity-80
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:text-foreground prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-secondary prose-pre:rounded-xl prose-pre:p-4
      prose-ul:my-4 prose-ul:pl-4 prose-ol:my-4 prose-ol:pl-4
      prose-li:mb-1 prose-li:text-foreground-secondary
      prose-blockquote:border-l-2 prose-blockquote:border-foreground-tertiary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground-tertiary
      prose-hr:border-secondary prose-hr:my-8
      prose-img:rounded-xl
      prose-table:w-full prose-table:my-4
      prose-thead:border-b prose-thead:border-border
      prose-th:text-foreground prose-th:font-semibold prose-th:text-left prose-th:py-2 prose-th:pr-4 prose-th:text-xs
      prose-td:text-foreground-secondary prose-td:py-2 prose-td:pr-4 prose-td:text-xs
      prose-tr:border-b prose-tr:border-border-light
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
