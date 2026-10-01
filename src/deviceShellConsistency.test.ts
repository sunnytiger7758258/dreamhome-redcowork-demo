import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const pageNames = ['capture', 'inspiration-library', 'my-favorites', 'my-home']

describe('phone shell consistency', () => {
  it.each(pageNames)('%s uses the same viewport-fit scaling as the feed', (pageName) => {
    const css = readFileSync(
      join(process.cwd(), `public/prototype/pages/${pageName}/dreamhome-d-system.css`),
      'utf8',
    )
    expect(css).toContain('width: 320px;')
    expect(css).toContain('height: 694px;')
    expect(css).toContain('zoom: min(1, calc((100dvh - 56px) / 694px), calc((100vw - 36px) / 320px));')
  })
})
