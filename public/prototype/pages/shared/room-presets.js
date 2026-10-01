// 房间尺寸预设：room-setup 中间页与 my-home 生成链路的尺寸单一真源。
export const ROOM_PRESETS = {
  'wide-living':      { name: '横厅客厅',     w: 9,   d: 5.5, h: 2.8 },
  'long-living':      { name: '窄长客厅',     w: 5,   d: 9,   h: 2.8 },
  'square-lounge':    { name: '方形会客厅',   w: 8,   d: 7,   h: 2.8 },
  'l-living':         { name: 'L形客厅',      w: 8,   d: 7,   h: 2.8 },
  'bay-bedroom':      { name: '飘窗卧室',     w: 4.2, d: 5.2, h: 2.8 },
  'standard-bedroom': { name: '普通方形卧室', w: 5,   d: 5,   h: 2.8 },
};

export const ROOM_LIMITS = {
  w: [2.4, 14],
  d: [2.4, 14],
  h: [2.2, 3.6],
  step: 0.1,
};

export const isPresetId = (id) => Object.prototype.hasOwnProperty.call(ROOM_PRESETS, id);

const clampOne = (value, [min, max], fallback) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number * 10) / 10));
};

export function clampRoom(dims = {}, templateId = '') {
  const base = ROOM_PRESETS[templateId] || { w: 5, d: 5, h: 2.8 };
  return {
    w: clampOne(dims.w, ROOM_LIMITS.w, base.w),
    d: clampOne(dims.d, ROOM_LIMITS.d, base.d),
    h: clampOne(dims.h, ROOM_LIMITS.h, base.h),
  };
}

export const presetRoom = (templateId) => {
  const preset = ROOM_PRESETS[templateId];
  return preset ? { w: preset.w, d: preset.d, h: preset.h } : null;
};

export const isDefaultRoom = (templateId, dims) => {
  const preset = presetRoom(templateId);
  if (!preset || !dims) return true;
  return Math.abs(preset.w - dims.w) < 0.05
    && Math.abs(preset.d - dims.d) < 0.05
    && Math.abs(preset.h - dims.h) < 0.05;
};
