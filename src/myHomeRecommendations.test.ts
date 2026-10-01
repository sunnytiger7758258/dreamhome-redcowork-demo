import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const page = readFileSync(
  join(process.cwd(), 'public/prototype/pages/my-home/index.html'),
  'utf8',
)
const assetLibrary = readFileSync(
  join(process.cwd(), 'public/prototype/pages/shared/asset-library-data.js'),
  'utf8',
)

describe('my home intelligent recommendations', () => {
  it('keeps AI recommendations in the renovation drawer', () => {
    expect(page).toContain('data-drawer-mode="ai"')
    expect(page).toContain('getDrawerAiRecommendations()')
    expect(page).toContain('包工球为你挑了这些')
  })

  it('only exposes collected furniture to assembly and recommendations', () => {
    expect(page).toContain("return getFavoriteAssets('furniture');")
    expect(page).toContain("function getRecommendationAssets() { return getFavoriteAssets('furniture'); }")
    expect(page).toContain("asset?.kind==='furniture'&&favorites.has(asset.id)")
  })

  it('seeds eleven representative furniture favorites', () => {
    const defaults = assetLibrary.match(/export const DEFAULT_FAVORITE_IDS = \[([\s\S]*?)\];/)?.[1] ?? ''
    expect(defaults.match(/'ast_[^']+'/g)).toHaveLength(11)
    expect(assetLibrary).toContain('redcowork-eleven-assets-v2')
  })

  it('starts with three collected floorplans and only links to browse from the empty state', () => {
    const floorplanDefaults = assetLibrary.match(/export const DEFAULT_FLOORPLAN_FAVORITE_IDS = \[([\s\S]*?)\];/)?.[1] ?? ''
    expect(floorplanDefaults.match(/'floorplan-[^']+'/g)).toHaveLength(3)
    expect(assetLibrary).toContain('redcowork-three-floorplans-v1')
    expect(page).not.toContain('template-card--all')
    expect(page).not.toContain('查看灵感库<span>更多户型模板</span>')
    expect(page).toContain('templates.length ? cards : empty')
    expect(page).toContain('当前暂无收藏可用的户型哦～')
    expect(page).toContain('>去浏览</a>')
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
