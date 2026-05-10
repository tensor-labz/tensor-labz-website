export const SOCIAL_PLATFORMS = [
  { value: 'linkedin', label: 'LinkedIn', icon: 'FaLinkedin' },
  { value: 'tiktok', label: 'TikTok', icon: 'FaTiktok' },
  { value: 'youtube', label: 'YouTube', icon: 'FaYoutube' },
  { value: 'facebook', label: 'Facebook', icon: 'FaFacebook' },
  { value: 'instagram', label: 'Instagram', icon: 'FaInstagram' },
] as const;

export type SocialPlatformValue = (typeof SOCIAL_PLATFORMS)[number]['value'];

const SocialPlatformSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <select
    value={value || 'linkedin'}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-1.5 rounded-lg text-sm appearance-none cursor-pointer"
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
    {SOCIAL_PLATFORMS.map((p) => (
      <option key={p.value} value={p.value}>
        {p.label}
      </option>
    ))}
  </select>
);

export default SocialPlatformSelect;
