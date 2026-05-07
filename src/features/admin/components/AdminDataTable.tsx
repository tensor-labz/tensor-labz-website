import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaPlus, FaImage } from 'react-icons/fa';
import { MODULES } from '../config/modules';

/* ── mock rows per module so the table looks populated ── */
const MOCK_DATA: Record<string, Record<string, unknown>[]> = {
  hero: [
    { id: '1', img: 'https://via.placeholder.com/80x80?text=Slide+1', title: 'Creating Sustainable Impact', subtitle: 'Through Technology' },
    { id: '2', img: 'https://via.placeholder.com/80x80?text=Slide+2', title: 'Innovation Driven', subtitle: 'Engineering solutions for tomorrow' },
  ],
  services: [
    { id: '1', imageURL: 'https://via.placeholder.com/80x80?text=SVC', title: 'AI & Machine Learning', description: 'End-to-end ML pipelines and model deployment', slug: 'ai-ml', show_in_home: 'true' },
    { id: '2', imageURL: 'https://via.placeholder.com/80x80?text=SVC', title: 'Robotics & Automation', description: 'Custom robotic systems and industrial automation', slug: 'robotics', show_in_home: 'true' },
    { id: '3', imageURL: '', title: 'IoT Solutions', description: 'Connected device ecosystems and real-time dashboards', slug: 'iot', show_in_home: 'false' },
  ],
  projects: [
    { id: '1', imageURL: 'https://via.placeholder.com/80x80?text=PRJ', title: 'Smart Farm Monitor', description: 'Real-time crop monitoring using IoT sensors and ML', slug: 'smart-farm', is_top: true },
    { id: '2', imageURL: 'https://via.placeholder.com/80x80?text=PRJ', title: 'Autonomous Delivery Bot', description: 'Last-mile delivery robot with obstacle avoidance', slug: 'delivery-bot', is_top: false },
  ],
  about: [
    { id: '1', components: 'Our Mission', value: 'Transforming visions into realities through technology.' },
    { id: '2', components: 'Our Vision', value: 'A world where technology enables sustainable growth.' },
    { id: '3', components: 'Years of Experience', value: '3+ years building innovative solutions.' },
  ],
  contact: [
    { id: '1', contact: 'email', title: 'Email Us', value: 'hello@tensorlabz.com' },
    { id: '2', contact: 'phone', title: 'Call Us', value: '+94 77 048 4739' },
    { id: '3', contact: 'address', title: 'Visit Us', value: 'Colombo, Sri Lanka' },
  ],
  social: [
    { id: '1', social_media: 'Linkedin', value: 'https://linkedin.com/company/tensor-labz' },
    { id: '2', social_media: 'Instagram', value: 'https://instagram.com/tensorlabz' },
    { id: '3', social_media: 'Youtube', value: 'https://youtube.com/@tensorlabz' },
  ],
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

const AdminDataTable = memo(() => {
  const navigate = useNavigate();
  const { module: moduleId = 'hero' } = useParams();

  const mod = MODULES.find((m) => m.id === moduleId);
  const rows = MOCK_DATA[moduleId] ?? [];

  if (!mod) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'var(--text-muted)' }}>Module not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
          >
            {mod.label}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {rows.length} {rows.length === 1 ? 'record' : 'records'}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate(`/admin/${moduleId}/new`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        >
          <FaPlus size={12} />
          New
        </motion.button>
      </div>

      {/* Table card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        {/* Column headers */}
        <div
          className="grid grid-cols-[64px_1fr_1fr] gap-4 px-5 py-3 text-xs font-semibold tracking-widest uppercase"
          style={{
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--glass-border)',
            backgroundColor: 'var(--glass-bg-subtle)',
          }}
        >
          <span>Image</span>
          <span>Title</span>
          <span className="hidden sm:block">Description</span>
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <FaImage size={32} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No records yet.{' '}
              <button
                className="underline"
                style={{ color: 'var(--accent)' }}
                onClick={() => navigate(`/admin/${moduleId}/new`)}
              >
                Create one
              </button>
            </p>
          </div>
        ) : (
          rows.map((row, i) => {
            const imgSrc = mod.imageField ? String(row[mod.imageField] ?? '') : '';
            const title = String(row[mod.titleField] ?? '—');
            const desc = mod.descriptionField ? String(row[mod.descriptionField] ?? '') : '';
            const id = String(row.id ?? i);

            return (
              <motion.div
                key={id}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[64px_1fr_1fr] gap-4 px-5 py-4 items-center cursor-pointer transition-colors group"
                style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--glass-border-subtle)' : 'none' }}
                onClick={() => navigate(`/admin/${moduleId}/${id}`)}
                whileHover={{ backgroundColor: 'var(--glass-bg-hover)' }}
              >
                {/* Col 1 — Image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--glass-bg-raised)' }}>
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <FaImage size={18} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                  )}
                </div>

                {/* Col 2 — Title (clickable hint) */}
                <div className="min-w-0">
                  <p
                    className="font-semibold text-sm truncate group-hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {title}
                  </p>
                </div>

                {/* Col 3 — Description */}
                <div className="min-w-0 hidden sm:block">
                  <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                    {desc || '—'}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
});

AdminDataTable.displayName = 'AdminDataTable';
export default AdminDataTable;
