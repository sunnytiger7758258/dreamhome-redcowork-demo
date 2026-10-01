import { describe, expect, it } from 'vitest'
import { AVAILABLE_ASSETS } from './availableAssets.generated'
import { assetsForVideoFrame, detectedFurnitureForVideoFrame } from './availableAssets.generated'
import { FEED_VIDEOS } from './types'

describe('reviewed asset delivery paths', () => {
  it('maps every canonical asset to the bundled prototype media', () => {
    expect(AVAILABLE_ASSETS).toHaveLength(2)

    for (const asset of AVAILABLE_ASSETS) {
      expect(asset.sticker).toBe(`/prototype/assets/library/${asset.id}.jpg`)
      expect(asset.completedImageUrl).toBe(`/prototype/assets/library/${asset.id}.jpg`)
      expect(asset.sourceCropUrl).toBe(`/prototype/assets/frames/${asset.id}.jpg`)
      expect(asset.modelUrl).toBe(`/prototype/assets/models/${asset.id}.glb`)
      expect(asset.sourceVideo?.frameImg).toBe(`/prototype/assets/frames/${asset.id}.jpg`)
    }
  })

  it('links one reviewed component to each retained video', () => {
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
