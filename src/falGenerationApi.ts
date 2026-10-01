import type { FurnitureCategory, LibraryComponent } from './types'
import { CATEGORY_COLOR } from './types'

export interface FalSubmitResponse {
  job_id: string
  status: 'queued'
  provider: 'fal'
  submit_ms?: number
}

export interface FalJobResponse {
  status: 'queued' | 'running' | 'succeeded' | 'failed'
  progress?: number
  provider?: 'fal' | 'selfhost'
  model_url?: string | null
  thumbnail_url?: string | null
  error?: string | null
  quality_mode?: 'draft' | 'fast' | 'production' | null
  library_attached?: boolean
}

const jobStartedAt = new Map<string, number>()

export async function submitFalGeneration(_imageDataUrl: string, _prompt: string): Promise<FalSubmitResponse> {
  return {
    job_id: `demo-job-${Date.now()}`,
    status: 'queued',
    provider: 'fal',
    submit_ms: 60,
  }
}

export function getFalJob(jobId: string): Promise<FalJobResponse> {
  const startedAt = jobStartedAt.get(jobId) ?? Date.now()
  jobStartedAt.set(jobId, startedAt)
  const elapsed = Date.now() - startedAt
  if (elapsed < 1200) return Promise.resolve({ status: 'running', progress: 36, quality_mode: 'fast' })
  if (elapsed < 2600) return Promise.resolve({ status: 'running', progress: 78, quality_mode: 'fast' })
  return Promise.resolve({
    status: 'succeeded',
    progress: 100,
    model_url: null,
    thumbnail_url: null,
    quality_mode: 'fast',
    library_attached: false,
  })
}

export function falJobToComponent(job: FalJobResponse, fallback: {
  id: string
  name: string
  category: FurnitureCategory
  snapshot: string
}): LibraryComponent {
  const color = CATEGORY_COLOR[fallback.category]
  const thumbnail = job.thumbnail_url || fallback.snapshot
  return {
    id: `demo-${fallback.id}`,
    category: fallback.category,
    name: fallback.name,
    source: 'REDcowork 纯前端演示',
    sourceDescription: '使用本地 Mock 流程生成，不依赖后端服务',
    size: '待识别尺寸',
    styleTags: ['DreamHome', '演示资产', '纯前端'],
    thumbnail,
    color,
    sticker: thumbnail,
    completedImageUrl: thumbnail,
    modelUrl: job.model_url || undefined,
  }
}
