import { NOT_FOUND_HEIGHT, NOT_FOUND_WIDTH } from '@/data/not-found-bitmap'

type WordmarkProps = {
  className?: string
  label?: string
  'data-hero-wordmark'?: boolean
}

export function NotFoundWordmark({ className, label, ...rest }: WordmarkProps) {
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={{
        aspectRatio: `${NOT_FOUND_WIDTH * 51} / ${NOT_FOUND_HEIGHT * 50}`,
        backgroundColor: 'currentColor',
        maskImage: 'url(/brand/not-found-wordmark.svg)',
        maskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskImage: 'url(/brand/not-found-wordmark.svg)',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
      }}
      {...rest}
    />
  )
}