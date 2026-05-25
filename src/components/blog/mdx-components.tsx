import type { ComponentPropsWithoutRef } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type ImgProps = ComponentPropsWithoutRef<'img'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MdxComponents: Record<string, any> = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="font-display font-black text-3xl mt-10 mb-4 tracking-tight" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="font-display font-black text-2xl mt-10 mb-3 tracking-tight" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="font-display font-black text-xl mt-8 mb-2 tracking-tight" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <p className="my-4 leading-7 font-medium" {...props}>{children}</p>
  ),
  a: ({ children, href, ...props }: AnchorProps) => (
    <a
      href={href}
      className="font-bold underline underline-offset-4 decoration-2 text-orange hover:bg-secondary transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: CodeProps) => (
    <code
      className="relative bg-muted border-[2px] border-border px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: PreProps) => (
    <pre
      className="my-6 overflow-x-auto border-[4px] border-border bg-foreground text-background p-5 text-sm font-mono neo-shadow"
      {...props}
    >
      {children}
    </pre>
  ),
  ul: ({ children, ...props }: ListProps) => (
    <ul className="my-4 ml-6 list-disc space-y-1 font-medium" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: ListProps) => (
    <ol className="my-4 ml-6 list-decimal space-y-1 font-medium" {...props}>{children}</ol>
  ),
  li: ({ children, ...props }: ListItemProps) => (
    <li className="leading-7" {...props}>{children}</li>
  ),
  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote className="brut-blockquote" {...props}>
      {children}
    </blockquote>
  ),
  img: ({ alt, src, ...props }: ImgProps) => (
    <img
      alt={alt ?? ''}
      src={src}
      loading="lazy"
      className="my-6 max-w-full border-[4px] border-border neo-shadow"
      {...props}
    />
  ),
}
