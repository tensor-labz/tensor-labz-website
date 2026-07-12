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
    className="w-full cursor-pointer appearance-none rounded-lg px-3 py-1.5 text-sm"
    style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--input-border)',
      color: 'var(--text-primary)',
      outline: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23aaa'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      paddingRight: '2rem',
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
