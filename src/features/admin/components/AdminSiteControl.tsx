import { memo, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaBuilding, FaSave, FaCheck,
  FaPlus, FaTrash, FaEdit, FaTimes,
} from 'react-icons/fa';
import { supabase } from '../../../lib/supabase';
import { ImageField } from './AdminCrudForm';

function deriveLink(contact: string, value: string): string {
  const t = contact.toLowerCase();
  if (t.includes('email') || t.includes('mail')) return `mailto:${value}`;
  if (t.includes('whatsapp')) return `https://wa.me/${value.replace(/\D/g, '')}`;
  if (t.includes('phone') || t.includes('tel') || t.includes('mobile'))
    return `tel:${value.replace(/[\s\-()]/g, '')}`;
  if (t.includes('address') || t.includes('location') || t.includes('map'))
    return value.startsWith('http') ? value : `https://maps.google.com/search?q=${encodeURIComponent(value)}`;
  return '';
}

/* ════════════════════════════════════════════════════════
   Types
════════════════════════════════════════════════════════ */
interface CompanyInfo {
  name: string; tagline: string; description: string;
  logo_url: string; logo_url_dark: string;
  available_hours: string;
  who_we_are: string; vision: string; mission: string;
}
interface ContactRow { id?: number; contact: string; title: string; value: string; link: string; }
interface SocialRow  { id?: number; social_media: string; value: string; }

const COMPANY_DEFAULT: CompanyInfo = {
  name: '', tagline: '', description: '', logo_url: '', logo_url_dark: '',
  available_hours: '',
  who_we_are: '', vision: '', mission: '',
};

/* ════════════════════════════════════════════════════════
   Tab definitions — add more here as Site Control grows
════════════════════════════════════════════════════════ */
const TABS = [
  { id: 'company', label: 'Company Info', icon: FaBuilding },
] as const;

type TabId = (typeof TABS)[number]['id'];

/* ════════════════════════════════════════════════════════
   Shared UI primitives
════════════════════════════════════════════════════════ */
const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
};
const inputCls = 'px-3 py-2 rounded-lg text-sm outline-none w-full';

const Field = ({ label, value, onChange, placeholder, multiline, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; type?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</label>
    {multiline
      ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          rows={4} className="px-3.5 py-2.5 rounded-xl text-sm resize-none outline-none w-full" style={inputStyle} />
      : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="px-3.5 py-2.5 rounded-xl text-sm outline-none w-full" style={inputStyle} />
    }
  </div>
);

const SectionDivider = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="pb-3">
    <h3 className="text-sm font-semibold"
      style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}>{title}</h3>
    {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
  </div>
);

const IconBtn = ({ onClick, icon: Icon, title, danger }: {
  onClick: () => void; icon: React.ElementType; title?: string; danger?: boolean;
}) => (
  <button type="button" onClick={onClick} title={title}
    className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0"
    style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--glass-border)',
      color: danger ? 'var(--error, #ef4444)' : 'var(--text-muted)' }}>
    <Icon size={11} />
  </button>
);

const SaveRowBtn = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick}
    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
    <FaCheck size={10} /> Save
  </button>
);

/* ════════════════════════════════════════════════════════
   Company Info tab — all sections in one scrollable page
════════════════════════════════════════════════════════ */
const CompanyInfoTab = ({ data, onChange }: {
  data: CompanyInfo; onChange: (u: CompanyInfo) => void;
}) => {
  const set = (key: keyof CompanyInfo) => (v: string) => onChange({ ...data, [key]: v });

  /* ── Contact CRUD ── */
  const [contactRows,  setContactRows]  = useState<ContactRow[]>([]);
  const [contactEdit,  setContactEdit]  = useState<number | 'new' | null>(null);
  const [contactDraft, setContactDraft] = useState<ContactRow>({ contact: '', title: '', value: '', link: '' });

  const refreshContact = useCallback(async () => {
    const { data: rows } = await supabase.from('contact').select('*').order('id');
    setContactRows((rows as ContactRow[]) ?? []);
  }, []);

  useEffect(() => { refreshContact(); }, [refreshContact]);

  const saveContact = async () => {
    const resolvedLink = contactDraft.link || deriveLink(contactDraft.contact, contactDraft.value);
    const payload = { contact: contactDraft.contact, title: contactDraft.title, value: contactDraft.value, link: resolvedLink || null };
    if (contactEdit === 'new') {
      await supabase.from('contact').insert(payload);
    } else {
      await supabase.from('contact').update(payload).eq('id', contactEdit);
    }
    setContactEdit(null);
    refreshContact();
  };

  /* ── Social CRUD ── */
  const [socialRows,  setSocialRows]  = useState<SocialRow[]>([]);
  const [socialEdit,  setSocialEdit]  = useState<number | 'new' | null>(null);
  const [socialDraft, setSocialDraft] = useState<SocialRow>({ social_media: '', value: '' });

  const refreshSocial = useCallback(async () => {
    const { data: rows } = await supabase.from('social').select('*').order('id');
    setSocialRows((rows as SocialRow[]) ?? []);
  }, []);

  useEffect(() => { refreshSocial(); }, [refreshSocial]);

  const saveSocial = async () => {
    if (socialEdit === 'new') {
      await supabase.from('social').insert({ social_media: socialDraft.social_media, value: socialDraft.value });
    } else {
      await supabase.from('social').update({ social_media: socialDraft.social_media, value: socialDraft.value }).eq('id', socialEdit);
    }
    setSocialEdit(null);
    refreshSocial();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-8">

      {/* ── General ── */}
      <section>
        <SectionDivider title="General" subtitle="Company name, branding, and public description." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Company Name" value={data.name}        onChange={set('name')}        placeholder="Tensor Labz" />
          <Field label="Tagline"      value={data.tagline}     onChange={set('tagline')}     placeholder="Short headline shown on the site" />
          <div className="sm:col-span-2">
            <Field label="Description" value={data.description} onChange={set('description')} multiline
              placeholder="Empowering creators and problem-solvers…" />
          </div>
          <div className="sm:col-span-2">
            <Field label="Available Hours" value={data.available_hours} onChange={set('available_hours')}
              placeholder="Mon – Fri: 8:00 AM – 6:00 PM" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Logo — Light mode</label>
            <ImageField
              value={data.logo_url}
              onChange={(v) => set('logo_url')(String(v ?? ''))}
              folder="assets/upload"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Logo — Dark mode</label>
            <ImageField
              value={data.logo_url_dark}
              onChange={(v) => set('logo_url_dark')(String(v ?? ''))}
              folder="assets/upload"
            />
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--glass-border)' }} />

      {/* ── Contact Details ── */}
      <section>
        <div className="flex items-start justify-between gap-3 mb-1">
          <SectionDivider title="Contact Details" subtitle="Address, email, phone, and hours shown in the footer." />
          <button type="button" disabled={contactEdit !== null}
            onClick={() => { setContactEdit('new'); setContactDraft({ contact: '', title: '', value: '', link: '' }); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 mt-0.5"
            style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)', opacity: contactEdit !== null ? 0.5 : 1 }}>
            <FaPlus size={10} /> Add
          </button>
        </div>

        <div className="space-y-2">
          {/* New-row form */}
          {contactEdit === 'new' && (
            <div className="flex flex-col gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--accent)' }}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input value={contactDraft.contact} onChange={(e) => setContactDraft({ ...contactDraft, contact: e.target.value })}
                  placeholder="Type (email / phone / address…)" className={inputCls + ' sm:w-40'} style={inputStyle} />
                <input value={contactDraft.title} onChange={(e) => setContactDraft({ ...contactDraft, title: e.target.value })}
                  placeholder="Label" className={inputCls + ' sm:w-28'} style={inputStyle} />
                <input value={contactDraft.value} onChange={(e) => setContactDraft({ ...contactDraft, value: e.target.value })}
                  placeholder="Value" className={`${inputCls} flex-1`} style={inputStyle} />
              </div>
              <div className="flex gap-2">
                <input value={contactDraft.link} onChange={(e) => setContactDraft({ ...contactDraft, link: e.target.value })}
                  placeholder="Link (optional — e.g. https://maps.google.com/…)" className={`${inputCls} flex-1`} style={inputStyle} />
                <div className="flex gap-1.5 shrink-0">
                  <SaveRowBtn onClick={saveContact} />
                  <IconBtn onClick={() => setContactEdit(null)} icon={FaTimes} />
                </div>
              </div>
            </div>
          )}

          {contactRows.length === 0 && contactEdit !== 'new' && (
            <p className="text-xs py-6 text-center rounded-xl"
              style={{ color: 'var(--text-muted)', backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
              No contact entries yet — click Add.
            </p>
          )}

          {contactRows.map((row) => contactEdit === row.id ? (
            /* Edit-row form */
            <div key={row.id} className="flex flex-col gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--accent)' }}>
              <div className="flex flex-col sm:flex-row gap-2">
                <input value={contactDraft.contact} onChange={(e) => setContactDraft({ ...contactDraft, contact: e.target.value })}
                  placeholder="Type" className={inputCls + ' sm:w-40'} style={inputStyle} />
                <input value={contactDraft.title} onChange={(e) => setContactDraft({ ...contactDraft, title: e.target.value })}
                  placeholder="Label" className={inputCls + ' sm:w-28'} style={inputStyle} />
                <input value={contactDraft.value} onChange={(e) => setContactDraft({ ...contactDraft, value: e.target.value })}
                  placeholder="Value" className={`${inputCls} flex-1`} style={inputStyle} />
              </div>
              <div className="flex gap-2">
                <input value={contactDraft.link} onChange={(e) => setContactDraft({ ...contactDraft, link: e.target.value })}
                  placeholder="Link (optional — e.g. https://maps.google.com/…)" className={`${inputCls} flex-1`} style={inputStyle} />
                <div className="flex gap-1.5 shrink-0">
                  <SaveRowBtn onClick={saveContact} />
                  <IconBtn onClick={() => setContactEdit(null)} icon={FaTimes} />
                </div>
              </div>
            </div>
          ) : (
            /* Display row */
            <div key={row.id} className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
              <span className="text-xs px-2 py-0.5 rounded-md shrink-0 font-medium"
                style={{ backgroundColor: 'var(--glass-bg-raised)', color: 'var(--text-muted)' }}>
                {row.contact || '—'}
              </span>
              <span className="text-xs w-24 shrink-0 truncate" style={{ color: 'var(--text-muted)' }}>{row.title}</span>
              <span className="text-sm flex-1 min-w-0 truncate" style={{ color: 'var(--text-primary)' }}>{row.value}</span>
              <div className="flex gap-1.5 shrink-0">
                <IconBtn onClick={() => { setContactEdit(row.id!); setContactDraft({ ...row, link: row.link ?? '' }); }} icon={FaEdit} title="Edit" />
                <IconBtn onClick={async () => { await supabase.from('contact').delete().eq('id', row.id!); refreshContact(); }}
                  icon={FaTrash} title="Delete" danger />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--glass-border)' }} />

      {/* ── Social Media ── */}
      <section>
        <div className="flex items-start justify-between gap-3 mb-1">
          <SectionDivider title="Social Media" subtitle="Platform links shown in the footer." />
          <button type="button" disabled={socialEdit !== null}
            onClick={() => { setSocialEdit('new'); setSocialDraft({ social_media: '', value: '' }); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 mt-0.5"
            style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)', opacity: socialEdit !== null ? 0.5 : 1 }}>
            <FaPlus size={10} /> Add
          </button>
        </div>

        <div className="space-y-2">
          {socialEdit === 'new' && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--accent)' }}>
              <input value={socialDraft.social_media} onChange={(e) => setSocialDraft({ ...socialDraft, social_media: e.target.value })}
                placeholder="Platform (LinkedIn, Facebook…)" className={inputCls + ' sm:w-44'} style={inputStyle} />
              <input value={socialDraft.value} onChange={(e) => setSocialDraft({ ...socialDraft, value: e.target.value })}
                placeholder="https://…" className={`${inputCls} flex-1`} style={inputStyle} />
              <div className="flex gap-1.5 shrink-0">
                <SaveRowBtn onClick={saveSocial} />
                <IconBtn onClick={() => setSocialEdit(null)} icon={FaTimes} />
              </div>
            </div>
          )}

          {socialRows.length === 0 && socialEdit !== 'new' && (
            <p className="text-xs py-6 text-center rounded-xl"
              style={{ color: 'var(--text-muted)', backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
              No social links yet — click Add.
            </p>
          )}

          {socialRows.map((row) => socialEdit === row.id ? (
            <div key={row.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--glass-bg-raised)', border: '1px solid var(--accent)' }}>
              <input value={socialDraft.social_media} onChange={(e) => setSocialDraft({ ...socialDraft, social_media: e.target.value })}
                placeholder="Platform" className={inputCls + ' sm:w-44'} style={inputStyle} />
              <input value={socialDraft.value} onChange={(e) => setSocialDraft({ ...socialDraft, value: e.target.value })}
                placeholder="https://…" className={`${inputCls} flex-1`} style={inputStyle} />
              <div className="flex gap-1.5 shrink-0">
                <SaveRowBtn onClick={saveSocial} />
                <IconBtn onClick={() => setSocialEdit(null)} icon={FaTimes} />
              </div>
            </div>
          ) : (
            <div key={row.id} className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
              <span className="text-sm font-medium w-36 shrink-0 truncate" style={{ color: 'var(--text-primary)' }}>
                {row.social_media || '—'}
              </span>
              <a href={row.value} target="_blank" rel="noopener noreferrer"
                className="text-xs flex-1 min-w-0 truncate hover:underline" style={{ color: 'var(--text-muted)' }}>
                {row.value}
              </a>
              <div className="flex gap-1.5 shrink-0">
                <IconBtn onClick={() => { setSocialEdit(row.id!); setSocialDraft({ ...row }); }} icon={FaEdit} title="Edit" />
                <IconBtn onClick={async () => { await supabase.from('social').delete().eq('id', row.id!); refreshSocial(); }}
                  icon={FaTrash} title="Delete" danger />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--glass-border)' }} />

      {/* ── Who We Are / Vision & Mission ── */}
      <section className="pb-6">
        <SectionDivider title="Who We Are & Mission" subtitle="Company identity and values displayed publicly." />
        <div className="grid grid-cols-1 gap-4">
          <Field label="Who We Are" value={data.who_we_are} onChange={set('who_we_are')} multiline
            placeholder="A brief story about who you are, what drives you, and what makes you different…" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Vision"  value={data.vision}  onChange={set('vision')}  multiline placeholder="Our vision for the future…" />
            <Field label="Mission" value={data.mission} onChange={set('mission')} multiline placeholder="Our mission and purpose…" />
          </div>
        </div>
      </section>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   AdminSiteControl — main shell
════════════════════════════════════════════════════════ */
const AdminSiteControl = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') ?? 'company') as TabId;

  const [company, setCompany] = useState<CompanyInfo>(COMPANY_DEFAULT);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('company_info').select('*').maybeSingle().then(({ data: row, error }) => {
      if (error) console.error('[SiteControl] company_info fetch error:', error);
      if (row) {
        setCompany({
          name:          row.name          ?? '',
          tagline:       row.tagline       ?? '',
          description:   row.description   ?? '',
          logo_url:        row.logo_url        ?? '',
          logo_url_dark:   row.logo_url_dark   ?? '',
          available_hours: row.available_hours  ?? '',
          who_we_are:      row.who_we_are       ?? '',
          vision:        row.vision        ?? '',
          mission:       row.mission       ?? '',
        });
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('company_info').upsert({ id: 1, ...company }, { onConflict: 'id' });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="h-full flex flex-col">

      {/* ── Header ── */}
      <div className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4"
        style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <h2 className="text-base sm:text-xl font-bold truncate"
          style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}>
          Site Control
        </h2>
        <button type="button" onClick={handleSave} disabled={saving || loading}
          className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
          style={{ backgroundColor: saved ? 'var(--success, #22c55e)' : 'var(--accent)', color: '#fff',
            opacity: saving || loading ? 0.6 : 1 }}>
          {saved ? <FaCheck size={11} /> : <FaSave size={11} />}
          {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {/* ── Tab bar ── */}
      <div className="shrink-0 flex overflow-x-auto no-scrollbar"
        style={{ borderBottom: '1px solid var(--glass-border)' }}>
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button key={id} onClick={() => setSearchParams({ tab: id })}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                borderBottom: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                marginBottom: '-1px',
              }}>
              <Icon size={12} />
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {loading
          ? <div className="flex items-center justify-center h-32">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading…</p>
            </div>
          : activeTab === 'company' && <CompanyInfoTab data={company} onChange={setCompany} />
        }
      </div>
    </div>
  );
});

AdminSiteControl.displayName = 'AdminSiteControl';
export default AdminSiteControl;
