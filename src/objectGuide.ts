export type GuideDetection = {
  box: { x: number; y: number; w: number; h: number }
  label: string
  confidence: number
}

export async function warmupFurnitureDetector(): Promise<void> {}

export async function prepareFurnitureLabels(_video: HTMLVideoElement): Promise<void> {}

export async function detectGuideFurniture(
  video: HTMLVideoElement,
  targetBox?: GuideDetection['box'],
): Promise<GuideDetection | null> {
  const width = Math.max(1, video.offsetWidth)
  const height = Math.max(1, video.offsetHeight)
  const box = targetBox ?? {
    x: width * 0.2,
    y: height * 0.45,
    w: width * 0.6,
    h: height * 0.32,
  }
  const centerY = box.y + box.h / 2
  return {
    box,
    label: centerY < height * 0.4 ? '吊灯' : '沙发',
    confidence: 0.94,
  }
}
