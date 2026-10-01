import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const page = readFileSync(
  join(process.cwd(), 'public/prototype/pages/my-home/index.html'),
  'utf8',
)

describe('my home intelligent recommendations', () => {
  it('keeps AI recommendations in the renovation drawer', () => {
    expect(page).toContain('data-drawer-mode="ai"')
    expect(page).toContain('getDrawerAiRecommendations()')
    expect(page).toContain('包工球为你挑了这些')
  })

  it('reads the full trimmed furniture catalog instead of favorites only', () => {
    expect(page).toContain("return getAssets('furniture');")
  })

  it('does not show the feed mascot in my home', () => {
    expect(page).toContain('.match-assistant-launcher,.match-assistant-nudge,.match-assistant-scrim,.match-assistant-panel { display:none !important; }')
  })

  it('does not rebuild placeholder furniture from primitive geometry', () => {
    expect(page).toContain('家具只展示资产库里的真实 GLB')
    expect(page).not.toContain('const addBox=(w,h,d,x,y,z')
    expect(page).not.toContain('new THREE.CylinderGeometry(r1,r2,h,16)')
  })
})
