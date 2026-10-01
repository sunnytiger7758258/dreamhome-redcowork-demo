import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const page = readFileSync(
  join(process.cwd(), 'public/prototype/pages/inspiration-library/index.html'),
  'utf8',
)

describe('inspiration library approved home', () => {
  it('uses the icon entry layout and featured furniture feed', () => {
    expect(page).toContain('class="fn-grid"')
    expect(page).toContain("label: '找案例'")
    expect(page).toContain("label: '找户型'")
    expect(page).toContain("label: '找家具'")
    expect(page).toContain("label: '找风格'")
    expect(page).toContain('精选家具')
  })

  it('does not restore the retired style-first or floorplan rail', () => {
    expect(page).not.toContain('先选风格，再拼家具')
    expect(page).not.toContain("const rails = ['floorplan']")
    expect(page).not.toContain('<span class="section-tag">户型类</span>')
  })

  it('keeps only the two approved reconstructed homes', () => {
    expect(page).toContain("videoId: 'vid_40734d7f2e6c'")
    expect(page).toContain("videoId: 'vid_91fe552c5f7d'")
    expect(page).not.toContain("videoId: 'vid_5f32a0ac954a'")
  })
})
