import { describe, expect, it } from 'vitest'
import { AVAILABLE_ASSETS, AVAILABLE_ASSETS_BY_VIDEO } from './availableAssets.generated'
import { assetsForVideoFrame, detectedFurnitureForVideoFrame } from './availableAssets.generated'
import { FEED_VIDEOS } from './types'

describe('reviewed asset delivery paths', () => {
  it('maps every canonical asset to the bundled prototype media', () => {
    expect(AVAILABLE_ASSETS).toHaveLength(22)

    for (const asset of AVAILABLE_ASSETS) {
      expect(asset.sticker).toBe(`/prototype/assets/library/${asset.id}.jpg`)
      expect(asset.completedImageUrl).toBe(`/prototype/assets/library/${asset.id}.jpg`)
      expect(asset.sourceCropUrl).toBe(`/prototype/assets/frames/${asset.id}.jpg`)
      expect(asset.modelUrl).toBe(`/prototype/assets/models/${asset.id}.glb`)
      expect(asset.sourceVideo?.frameImg).toBe(`/prototype/assets/frames/${asset.id}.jpg`)
    }
  })

  it('links every reviewed component to one of the two retained videos', () => {
    expect(AVAILABLE_ASSETS_BY_VIDEO.vid_40734d7f2e6c).toHaveLength(7)
    expect(AVAILABLE_ASSETS_BY_VIDEO.vid_5c7efd168eb7).toHaveLength(15)
    expect(AVAILABLE_ASSETS.every((asset) => (
      asset.sourceVideo?.videoId === 'vid_40734d7f2e6c'
      || asset.sourceVideo?.videoId === 'vid_5c7efd168eb7'
    ))).toBe(true)

    const chair = assetsForVideoFrame('vid_40734d7f2e6c', 0)
    const table = assetsForVideoFrame('vid_5c7efd168eb7', 118.5)
    expect(detectedFurnitureForVideoFrame('vid_40734d7f2e6c', 0, chair)).toContain('办公椅')
    expect(detectedFurnitureForVideoFrame('vid_5c7efd168eb7', 118.5, table)).toContain('餐桌')
  })

  it('starts the Feed with a video that has reviewed component data', () => {
    expect(FEED_VIDEOS.map((video) => video.id)).toEqual([
      'vid_40734d7f2e6c',
      'vid_5c7efd168eb7',
    ])
  })
})
