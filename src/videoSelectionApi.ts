import type { ImageSelectionGeometry, VideoSelectionUpload } from './segmentApi'

export interface SelectionLabels {
  category?: string
  sub?: string
  colors?: string[]
  materials?: string[]
  styles?: string[]
  features?: string[]
}

export interface ReusableAsset {
  asset_id: string
  name?: string
  glb_url?: string
  thumb_url?: string
  labels?: SelectionLabels
  source?: {
    video_id?: string
    track_id?: string | null
    t_best?: number
  }
}

export interface SelectionMatchCandidate {
  asset: ReusableAsset
  score: number
  reason?: string
}

export interface VideoSelectResponse {
  select_id: string
  labels: SelectionLabels
  candidates: SelectionMatchCandidate[]
  exact_match?: SelectionMatchCandidate | null
}

export interface VideoSelectConfirmResponse {
  asset_id?: string | null
  job_id?: string | null
  track_id: string
  quality_mode?: 'reuse' | 'fast' | 'production'
  library_attached?: boolean
}

export interface VideoSelectionDraftResponse {
  job_id: string
  status: 'queued'
  provider: 'fal'
  quality_mode: 'draft'
  isolation_mode: 'polygon'
  library_attached: false
}

const demoId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const labelsFor = (categoryHint = ''): SelectionLabels => ({
  category: categoryHint || '沙发',
  sub: categoryHint || '北欧布艺沙发',
  colors: ['米色'],
  materials: ['布艺'],
  styles: ['北欧'],
  features: ['柔软', '模块化'],
})

export async function submitVideoSelectionDraft(_input: {
  videoId: string
  time: number
  upload: VideoSelectionUpload
  prompt?: string
}): Promise<VideoSelectionDraftResponse> {
  return {
    job_id: demoId('draft'),
    status: 'queued',
    provider: 'fal',
    quality_mode: 'draft',
    isolation_mode: 'polygon',
    library_attached: false,
  }
}

export async function submitVideoSelection(input: {
  videoId: string
  time: number
  upload: VideoSelectionUpload
  categoryHint?: string
  trackId?: string
}): Promise<VideoSelectResponse> {
  return {
    select_id: demoId(`selection-${input.videoId}`),
    labels: labelsFor(input.categoryHint),
    candidates: [],
    exact_match: null,
  }
}

export async function confirmVideoSelection(input: {
  videoId: string
  selectId: string
  useAssetId?: string
  generateNew?: boolean
  rejectMatchedAsset?: boolean
  qualityMode?: 'fast' | 'production'
}): Promise<VideoSelectConfirmResponse> {
  return {
    asset_id: input.useAssetId ?? null,
    job_id: input.generateNew ? demoId(`job-${input.videoId}`) : null,
    track_id: input.selectId,
    quality_mode: input.useAssetId ? 'reuse' : 'fast',
    library_attached: false,
  }
}

export async function submitImagePostSelection(input: {
  postId: string
  slideIndex: number
  geometry: ImageSelectionGeometry
  categoryHint?: string
}): Promise<VideoSelectResponse> {
  return {
    select_id: demoId(`selection-${input.postId}`),
    labels: labelsFor(input.categoryHint),
    candidates: [],
    exact_match: null,
  }
}

export async function confirmImagePostSelection(input: {
  postId: string
  selectId: string
  useAssetId?: string
  generateNew?: boolean
}): Promise<VideoSelectConfirmResponse> {
  return {
    asset_id: input.useAssetId ?? null,
    job_id: input.generateNew ? demoId(`job-${input.postId}`) : null,
    track_id: input.selectId,
    quality_mode: input.useAssetId ? 'reuse' : 'fast',
    library_attached: false,
  }
}
