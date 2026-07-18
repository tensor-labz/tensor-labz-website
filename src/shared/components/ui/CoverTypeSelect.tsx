export const COVER_TYPES = [
  { value: 'image', label: 'Image', icon: 'FaImage' },
  { value: 'video', label: 'Video (direct)', icon: 'FaVideo' },
  { value: 'youtube', label: 'YouTube', icon: 'FaYoutube' },
  { value: 'drive_image', label: 'Drive Image', icon: 'FaGoogleDrive' },
  { value: 'drive_video', label: 'Drive Video', icon: 'FaGoogleDrive' },
] as const;

export type CoverTypeValue = (typeof COVER_TYPES)[number]['value'];

const CoverTypeSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <select
    value={value || 'image'}
    onChange={(e) => onChange(e.target.value)}
    className="w-full cursor-pointer appearance-none rounded-lg border border-input-border bg-surface px-3 py-1.5 pr-8 text-sm text-fg outline-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23aaa'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
    }}
  >
    {COVER_TYPES.map((t) => (
      <option key={t.value} value={t.value}>
        {t.label}
      </option>
    ))}
  </select>
);

export default CoverTypeSelect;
