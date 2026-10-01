import { captureBbox } from './segmentApi'

type Point = { x: number; y: number }
type Box = { x: number; y: number; w: number; h: number }

export type EdgeSamResult = {
  dataUrl: string
  elapsedMs: number
  box: Box
  outlinePath: string
}

export async function warmupEdgeSam(): Promise<void> {}

export async function waitForEdgeSamIdle(): Promise<void> {}

export async function prepareEdgeSamFrame(_video: HTMLVideoElement): Promise<void> {}

export function bindPreparedEdgeSamFrame(_video: HTMLVideoElement): boolean {
  return true
}

export async function segmentWithEdgeSam(
  video: HTMLVideoElement,
  path: Point[],
  box: Box,
): Promise<EdgeSamResult | null> {
  const startedAt = performance.now()
  const dataUrl = await captureBbox(video, box)
  if (!dataUrl) return null
  const outlinePath = path.length > 1
    ? `${path.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x - box.x} ${point.y - box.y}`).join(' ')} Z`
    : `M 0 0 H ${box.w} V ${box.h} H 0 Z`
  return {
    dataUrl,
    elapsedMs: Math.round(performance.now() - startedAt),
    box,
    outlinePath,
  }
}
