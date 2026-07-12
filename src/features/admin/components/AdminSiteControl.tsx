import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactIcon from '../../../shared/components/ui/ReactIcon';
import { ImageField } from './AdminCrudForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  createRecord,
  updateRecord,
  deleteRecord,
  fetchRecords,
  selectModuleRecords,
} from '../../../store/adminSlice';
import {
  loadSiteSettings,
  saveMultipleSiteSettings,
  selectSiteSettings,
  selectSiteSettingsStatus,
} from '../../../store/siteSettingsSlice';

function deriveLink(contact: string, value: string): string {
  const t = contact.toLowerCase();
  if (t.includes('email') || t.includes('mail')) return `mailto:${value}`;
  if (t.includes('whatsapp'))
    return `https://wa.me/${value.replace(/\D/g, '')}`;
  if (t.includes('phone') || t.includes('tel') || t.includes('mobile'))
    return `tel:${value.replace(/[\s\-()]/g, '')}`;
  if (t.includes('address') || t.includes('location') || t.includes('map'))
    return value.startsWith('http')
      ? value
      : `https://maps.google.com/search?q=${encodeURIComponent(value)}`;
  return '';
}

/* ════════════════════════════════════════════════════════
   Types
════════════════════════════════════════════════════════ */
interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  logo_url: string;
  logo_url_dark: string;
  available_hours: string;
  who_we_are: string;
  vision: string;
  mission: string;
  domains: string;
}
interface ContactRow {
  id?: number;
  contact: string;
  title: string;
  value: string;
  link: string;
}
interface SocialRow {
  id?: number;
  social_media: string;
  value: string;
}

const COMPANY_DEFAULT: CompanyInfo = {
  name: '',
  tagline: '',
  description: '',
  logo_url: '',
  logo_url_dark: '',
  available_hours: '',
  who_we_are: '',
  vision: '',
  mission: '',
  domains: '',
};

const TABS = [
  { id: 'company', label: 'Company Info', icon: 'FaBuilding' },
  { id: 'page', label: 'Page Control', icon: 'FaLayerGroup' },
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

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      className="text-xs font-medium"
      style={{ color: 'var(--text-muted)' }}
    >
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl px-3.5 py-2.5 text-sm outline-none"
        style={inputStyle}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none"
        style={inputStyle}
      />
    )}
  </div>
);

const SectionDivider = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="pb-3">
    <h3
      className="text-sm font-semibold"
      style={{ color: 'var(--text-primary)', fontFamily: '"Syne", sans-serif' }}
    >
      {title}
    </h3>
    {subtitle && (
      <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
        {subtitle}
      </p>
    )}
  </div>
);

const IconBtn = ({
  onClick,
  icon,
  title,
  danger,
}: {
  onClick: () => void;
  icon: string;
  title?: string;
  danger?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
    style={{
      backgroundColor: 'var(--glass-bg-raised)',
      border: '1px solid var(--glass-border)',
      color: danger ? 'var(--error, #ef4444)' : 'var(--text-muted)',
    }}
  >
    <ReactIcon name={icon} size={11} />
  </button>
);

const SaveRowBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold"
    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
  >
    <ReactIcon name="FaCheck" size={10} /> Save
  </button>
);

/* ════════════════════════════════════════════════════════
   Company Info tab — all sections in one scrollable page
════════════════════════════════════════════════════════ */
const CompanyInfoTab = ({
  data,
  onChange,
}: {
  data: CompanyInfo;
  onChange: (u: CompanyInfo) => void;
}) => {
  const dispatch = useAppDispatch();
  const set = (key: keyof CompanyInfo) => (v: string) =>
    onChange({ ...data, [key]: v });

  /* ── Contact CRUD ── */
  const selectContactRows = useMemo(() => selectModuleRecords('contact'), []);
  const contactRecords = useAppSelector(selectContactRows);
  const contactRows = contactRecords as unknown as ContactRow[];

  const [contactEdit, setContactEdit] = useState<number | 'new' | null>(null);
  const [contactDraft, setContactDraft] = useState<ContactRow>({
    contact: '',
    title: '',
    value: '',
    link: '',
  });

  const refreshContact = useCallback(() => {
    dispatch(fetchRecords({ moduleId: 'contact' }));
  }, [dispatch]);

  useEffect(() => {
    refreshContact();
  }, [refreshContact]);

  const saveContact = async () => {
    const resolvedLink =
      contactDraft.link || deriveLink(contactDraft.contact, contactDraft.value);
    const payload = {
      contact: contactDraft.contact,
      title: contactDraft.title,
      value: contactDraft.value,
      link: resolvedLink || null,
    };
    if (contactEdit === 'new') {
      await dispatch(createRecord({ moduleId: 'contact', data: payload }));
    } else {
      await dispatch(
        updateRecord({
          moduleId: 'contact',
          id: contactEdit as number,
          data: payload,
        })
      );
    }
    setContactEdit(null);
    dispatch(fetchRecords({ moduleId: 'contact' }));
  };

  /* ── Social CRUD ── */
  const selectSocialRows = useMemo(() => selectModuleRecords('social'), []);
  const socialRecords = useAppSelector(selectSocialRows);
  const socialRows = socialRecords as unknown as SocialRow[];

  const [socialEdit, setSocialEdit] = useState<number | 'new' | null>(null);
  const [socialDraft, setSocialDraft] = useState<SocialRow>({
    social_media: '',
    value: '',
  });

  const refreshSocial = useCallback(() => {
    dispatch(fetchRecords({ moduleId: 'social' }));
  }, [dispatch]);

  useEffect(() => {
    refreshSocial();
  }, [refreshSocial]);

  const saveSocial = async () => {
    if (socialEdit === 'new') {
      await dispatch(
        createRecord({
          moduleId: 'social',
          data: {
            social_media: socialDraft.social_media,
            value: socialDraft.value,
          },
        })
      );
    } else {
      await dispatch(
        updateRecord({
          moduleId: 'social',
          id: socialEdit as number,
          data: {
            social_media: socialDraft.social_media,
            value: socialDraft.value,
          },
        })
      );
    }
    setSocialEdit(null);
    dispatch(fetchRecords({ moduleId: 'social' }));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6 sm:px-6">
      {/* ── General ── */}
      <section>
        <SectionDivider
          title="General"
          subtitle="Company name, branding, and public description."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Company Name"
            value={data.name}
            onChange={set('name')}
            placeholder="Tensor Labz"
          />
          <Field
            label="Tagline"
            value={data.tagline}
            onChange={set('tagline')}
            placeholder="Short headline shown on the site"
          />
          <div className="sm:col-span-2">
            <Field
              label="Description"
              value={data.description}
              onChange={set('description')}
              multiline
              placeholder="Empowering creators and problem-solvers…"
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Available Hours"
              value={data.available_hours}
              onChange={set('available_hours')}
              placeholder="Mon – Fri: 8:00 AM – 6:00 PM"
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Domains / Capabilities"
              value={data.domains}
              onChange={set('domains')}
              placeholder="Mechatronics, 3D CAD Modeling, PCB Design, Embedded Systems"
            />
            <p
              className="mt-1 text-[10px]"
              style={{ color: 'var(--text-muted)' }}
            >
              Comma-separated tags shown on the About page.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              Logo — Light mode
            </label>
            <ImageField
              value={data.logo_url}
              onChange={(v) => set('logo_url')(String(v ?? ''))}
              folder="assets/upload"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              Logo — Dark mode
            </label>
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
        <div className="mb-1 flex items-start justify-between gap-3">
          <SectionDivider
            title="Contact Details"
            subtitle="Address, email, phone, and hours shown in the footer."
          />
          <button
            type="button"
            disabled={contactEdit !== null}
            onClick={() => {
              setContactEdit('new');
              setContactDraft({ contact: '', title: '', value: '', link: '' });
            }}
            className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
              opacity: contactEdit !== null ? 0.5 : 1,
            }}
          >
            <ReactIcon name="FaPlus" size={10} /> Add
          </button>
        </div>

        <div className="space-y-2">
          {/* New-row form */}
          {contactEdit === 'new' && (
            <div
              className="flex flex-col gap-2 rounded-xl px-4 py-3"
              style={{
                backgroundColor: 'var(--glass-bg-raised)',
                border: '1px solid var(--accent)',
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={contactDraft.contact}
                  onChange={(e) =>
                    setContactDraft({
                      ...contactDraft,
                      contact: e.target.value,
                    })
                  }
                  placeholder="Type (email / phone / address…)"
                  className={inputCls + ' sm:w-40'}
                  style={inputStyle}
                />
                <input
                  value={contactDraft.title}
                  onChange={(e) =>
                    setContactDraft({ ...contactDraft, title: e.target.value })
                  }
                  placeholder="Label"
                  className={inputCls + ' sm:w-28'}
                  style={inputStyle}
                />
                <input
                  value={contactDraft.value}
                  onChange={(e) =>
                    setContactDraft({ ...contactDraft, value: e.target.value })
                  }
                  placeholder="Value"
                  className={`${inputCls} flex-1`}
                  style={inputStyle}
                />
              </div>
              <div className="flex gap-2">
                <input
                  value={contactDraft.link}
                  onChange={(e) =>
                    setContactDraft({ ...contactDraft, link: e.target.value })
                  }
                  placeholder="Link (optional — e.g. https://maps.google.com/…)"
                  className={`${inputCls} flex-1`}
                  style={inputStyle}
                />
                <div className="flex shrink-0 gap-1.5">
                  <SaveRowBtn onClick={saveContact} />
                  <IconBtn
                    onClick={() => setContactEdit(null)}
                    icon="FaTimes"
                  />
                </div>
              </div>
            </div>
          )}

          {contactRows.length === 0 && contactEdit !== 'new' && (
            <p
              className="rounded-xl py-6 text-center text-xs"
              style={{
                color: 'var(--text-muted)',
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              No contact entries yet — click Add.
            </p>
          )}

          {contactRows.map((row) =>
            contactEdit === row.id ? (
              /* Edit-row form */
              <div
                key={row.id}
                className="flex flex-col gap-2 rounded-xl px-4 py-3"
                style={{
                  backgroundColor: 'var(--glass-bg-raised)',
                  border: '1px solid var(--accent)',
                }}
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={contactDraft.contact}
                    onChange={(e) =>
                      setContactDraft({
                        ...contactDraft,
                        contact: e.target.value,
                      })
                    }
                    placeholder="Type"
                    className={inputCls + ' sm:w-40'}
                    style={inputStyle}
                  />
                  <input
                    value={contactDraft.title}
                    onChange={(e) =>
                      setContactDraft({
                        ...contactDraft,
                        title: e.target.value,
                      })
                    }
                    placeholder="Label"
                    className={inputCls + ' sm:w-28'}
                    style={inputStyle}
                  />
                  <input
                    value={contactDraft.value}
                    onChange={(e) =>
                      setContactDraft({
                        ...contactDraft,
                        value: e.target.value,
                      })
                    }
                    placeholder="Value"
                    className={`${inputCls} flex-1`}
                    style={inputStyle}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    value={contactDraft.link}
                    onChange={(e) =>
                      setContactDraft({ ...contactDraft, link: e.target.value })
                    }
                    placeholder="Link (optional — e.g. https://maps.google.com/…)"
                    className={`${inputCls} flex-1`}
                    style={inputStyle}
                  />
                  <div className="flex shrink-0 gap-1.5">
                    <SaveRowBtn onClick={saveContact} />
                    <IconBtn
                      onClick={() => setContactEdit(null)}
                      icon="FaTimes"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Display row */
              <div
                key={row.id}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <span
                  className="shrink-0 rounded-md px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--glass-bg-raised)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {row.contact || '—'}
                </span>
                <span
                  className="w-24 shrink-0 truncate text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {row.title}
                </span>
                <span
                  className="min-w-0 flex-1 truncate text-sm"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {row.value}
                </span>
                <div className="flex shrink-0 gap-1.5">
                  <IconBtn
                    onClick={() => {
                      setContactEdit(row.id!);
                      setContactDraft({ ...row, link: row.link ?? '' });
                    }}
                    icon="FaEdit"
                    title="Edit"
                  />
                  <IconBtn
                    onClick={async () => {
                      await dispatch(
                        deleteRecord({ moduleId: 'contact', id: row.id! })
                      );
                      dispatch(fetchRecords({ moduleId: 'contact' }));
                    }}
                    icon="FaTrash"
                    title="Delete"
                    danger
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--glass-border)' }} />

      {/* ── Social Media ── */}
      <section>
        <div className="mb-1 flex items-start justify-between gap-3">
          <SectionDivider
            title="Social Media"
            subtitle="Platform links shown in the footer."
          />
          <button
            type="button"
            disabled={socialEdit !== null}
            onClick={() => {
              setSocialEdit('new');
              setSocialDraft({ social_media: '', value: '' });
            }}
            className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--glass-bg-raised)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
              opacity: socialEdit !== null ? 0.5 : 1,
            }}
          >
            <ReactIcon name="FaPlus" size={10} /> Add
          </button>
        </div>

        <div className="space-y-2">
          {socialEdit === 'new' && (
            <div
              className="flex flex-col items-stretch gap-2 rounded-xl px-4 py-3 sm:flex-row sm:items-center"
              style={{
                backgroundColor: 'var(--glass-bg-raised)',
                border: '1px solid var(--accent)',
              }}
            >
              <input
                value={socialDraft.social_media}
                onChange={(e) =>
                  setSocialDraft({
                    ...socialDraft,
                    social_media: e.target.value,
                  })
                }
                placeholder="Platform (LinkedIn, Facebook…)"
                className={inputCls + ' sm:w-44'}
                style={inputStyle}
              />
              <input
                value={socialDraft.value}
                onChange={(e) =>
                  setSocialDraft({ ...socialDraft, value: e.target.value })
                }
                placeholder="https://…"
                className={`${inputCls} flex-1`}
                style={inputStyle}
              />
              <div className="flex shrink-0 gap-1.5">
                <SaveRowBtn onClick={saveSocial} />
                <IconBtn onClick={() => setSocialEdit(null)} icon="FaTimes" />
              </div>
            </div>
          )}

          {socialRows.length === 0 && socialEdit !== 'new' && (
            <p
              className="rounded-xl py-6 text-center text-xs"
              style={{
                color: 'var(--text-muted)',
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              No social links yet — click Add.
            </p>
          )}

          {socialRows.map((row) =>
            socialEdit === row.id ? (
              <div
                key={row.id}
                className="flex flex-col items-stretch gap-2 rounded-xl px-4 py-3 sm:flex-row sm:items-center"
                style={{
                  backgroundColor: 'var(--glass-bg-raised)',
                  border: '1px solid var(--accent)',
                }}
              >
                <input
                  value={socialDraft.social_media}
                  onChange={(e) =>
                    setSocialDraft({
                      ...socialDraft,
                      social_media: e.target.value,
                    })
                  }
                  placeholder="Platform"
                  className={inputCls + ' sm:w-44'}
                  style={inputStyle}
                />
                <input
                  value={socialDraft.value}
                  onChange={(e) =>
                    setSocialDraft({ ...socialDraft, value: e.target.value })
                  }
                  placeholder="https://…"
                  className={`${inputCls} flex-1`}
                  style={inputStyle}
                />
                <div className="flex shrink-0 gap-1.5">
                  <SaveRowBtn onClick={saveSocial} />
                  <IconBtn onClick={() => setSocialEdit(null)} icon="FaTimes" />
                </div>
              </div>
            ) : (
              <div
                key={row.id}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <span
                  className="w-36 shrink-0 truncate text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {row.social_media || '—'}
                </span>
                <a
                  href={row.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 truncate text-xs hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {row.value}
                </a>
                <div className="flex shrink-0 gap-1.5">
                  <IconBtn
                    onClick={() => {
                      setSocialEdit(row.id!);
                      setSocialDraft({ ...row });
                    }}
                    icon="FaEdit"
                    title="Edit"
                  />
                  <IconBtn
                    onClick={async () => {
                      await dispatch(
                        deleteRecord({ moduleId: 'social', id: row.id! })
                      );
                      dispatch(fetchRecords({ moduleId: 'social' }));
                    }}
                    icon="FaTrash"
                    title="Delete"
                    danger
                  />
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--glass-border)' }} />

      {/* ── Who We Are / Vision & Mission ── */}
      <section className="pb-6">
        <SectionDivider
          title="Who We Are & Mission"
          subtitle="Company identity and values displayed publicly."
        />
        <div className="grid grid-cols-1 gap-4">
          <Field
            label="Who We Are"
            value={data.who_we_are}
            onChange={set('who_we_are')}
            multiline
            placeholder="A brief story about who you are, what drives you, and what makes you different…"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Vision"
              value={data.vision}
              onChange={set('vision')}
              multiline
              placeholder="Our vision for the future…"
            />
            <Field
              label="Mission"
              value={data.mission}
              onChange={set('mission')}
              multiline
              placeholder="Our mission and purpose…"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Hero Slides tab
════════════════════════════════════════════════════════ */
interface HeroRow {
  id?: number;
  title: string;
  subtitle: string;
  img: string;
  cta_label: string;
  cta_link: string;
  sort_order: number;
}

const HERO_DEFAULT: HeroRow = {
  title: '',
  subtitle: '',
  img: '',
  cta_label: '',
  cta_link: '',
  sort_order: 0,
};

const HeroSlidesTab = () => {
  const dispatch = useAppDispatch();
  const selectHeroRows = useMemo(() => selectModuleRecords('hero'), []);
  const heroRecords = useAppSelector(selectHeroRows);
  const rows = heroRecords as unknown as HeroRow[];

  const [editId, setEditId] = useState<number | 'new' | null>(null);
  const [draft, setDraft] = useState<HeroRow>(HERO_DEFAULT);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    dispatch(fetchRecords({ moduleId: 'hero' }));
  }, [dispatch]);

  useEffect(() => {
    refresh();
    setLoading(false);
  }, [refresh]);

  const save = async () => {
    const payload = {
      title: draft.title,
      subtitle: draft.subtitle,
      img: draft.img,
      cta_label: draft.cta_label,
      cta_link: draft.cta_link,
      sort_order: draft.sort_order,
    };
    if (editId === 'new') {
      await dispatch(createRecord({ moduleId: 'hero', data: payload }));
    } else {
      await dispatch(
        updateRecord({ moduleId: 'hero', id: editId as number, data: payload })
      );
    }
    setEditId(null);
    dispatch(fetchRecords({ moduleId: 'hero' }));
  };

  const startEdit = (row: HeroRow) => {
    setEditId(row.id!);
    setDraft({ ...row });
  };

  const startNew = () => {
    setEditId('new');
    setDraft(HERO_DEFAULT);
  };

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <SectionDivider
          title="Hero Slides"
          subtitle="Slides shown in the home page hero carousel."
        />
        <button
          type="button"
          disabled={editId !== null}
          onClick={startNew}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
          style={{
            backgroundColor: 'var(--glass-bg-raised)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-muted)',
            opacity: editId !== null ? 0.5 : 1,
          }}
        >
          <ReactIcon name="FaPlus" size={10} /> Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {editId === 'new' && (
          <HeroSlideForm
            draft={draft}
            onChange={setDraft}
            onSave={save}
            onCancel={() => setEditId(null)}
          />
        )}

        {rows.length === 0 && editId !== 'new' && (
          <p
            className="rounded-xl py-8 text-center text-xs"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            No hero slides yet — click Add Slide.
          </p>
        )}

        {rows.map((row) =>
          editId === row.id ? (
            <HeroSlideForm
              key={row.id}
              draft={draft}
              onChange={setDraft}
              onSave={save}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <div
              key={row.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              {row.img && (
                <img
                  src={row.img}
                  alt={row.title}
                  className="h-10 w-14 shrink-0 rounded-lg object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      'none';
                  }}
                />
              )}
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {row.title || '(No title)'}
                </p>
                {row.subtitle && (
                  <p
                    className="mt-0.5 truncate text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {row.subtitle}
                  </p>
                )}
              </div>
              <span
                className="shrink-0 rounded-md px-2 py-0.5 text-xs"
                style={{
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--glass-bg-raised)',
                }}
              >
                #{row.sort_order}
              </span>
              <div className="flex shrink-0 gap-1.5">
                <IconBtn
                  onClick={() => startEdit(row)}
                  icon="FaEdit"
                  title="Edit"
                />
                <IconBtn
                  onClick={async () => {
                    await dispatch(
                      deleteRecord({ moduleId: 'hero', id: row.id! })
                    );
                    dispatch(fetchRecords({ moduleId: 'hero' }));
                  }}
                  icon="FaTrash"
                  title="Delete"
                  danger
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const HeroSlideForm = ({
  draft,
  onChange,
  onSave,
  onCancel,
}: {
  draft: HeroRow;
  onChange: (d: HeroRow) => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const set = (key: keyof HeroRow) => (v: string | number) =>
    onChange({ ...draft, [key]: v });

  return (
    <div
      className="flex flex-col gap-3 rounded-xl px-4 py-4"
      style={{
        backgroundColor: 'var(--glass-bg-raised)',
        border: '1px solid var(--accent)',
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label="Title"
          value={draft.title}
          onChange={set('title')}
          placeholder="Main heading"
        />
        <Field
          label="Subtitle"
          value={draft.subtitle}
          onChange={set('subtitle')}
          placeholder="Short supporting text"
        />
        <Field
          label="CTA Label"
          value={draft.cta_label}
          onChange={set('cta_label')}
          placeholder="e.g. Learn More"
        />
        <Field
          label="CTA Link"
          value={draft.cta_link}
          onChange={set('cta_link')}
          placeholder="/services/all"
        />
        <Field
          label="Sort Order"
          value={String(draft.sort_order)}
          onChange={(v) => set('sort_order')(Number(v))}
          type="number"
          placeholder="0"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          Slide Image
        </label>
        <ImageField
          value={draft.img}
          onChange={(v) => set('img')(String(v ?? ''))}
          folder="Home/Hero"
        />
      </div>
      <div className="flex justify-end gap-2">
        <SaveRowBtn onClick={onSave} />
        <IconBtn onClick={onCancel} icon="FaTimes" />
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   About Media tab
════════════════════════════════════════════════════════ */
interface MediaRow {
  id?: number;
  type: 'image' | 'video';
  url: string;
  title: string;
  sort_order: number;
}

const MEDIA_DEFAULT: MediaRow = {
  type: 'image',
  url: '',
  title: '',
  sort_order: 0,
};

const AboutMediaTab = () => {
  const dispatch = useAppDispatch();
  const selectMediaRows = useMemo(() => selectModuleRecords('about_media'), []);
  const mediaRecords = useAppSelector(selectMediaRows);
  const rows = mediaRecords as unknown as MediaRow[];

  const [editId, setEditId] = useState<number | 'new' | null>(null);
  const [draft, setDraft] = useState<MediaRow>(MEDIA_DEFAULT);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    dispatch(fetchRecords({ moduleId: 'about_media' }));
  }, [dispatch]);

  useEffect(() => {
    refresh();
    setLoading(false);
  }, [refresh]);

  const save = async () => {
    const payload = {
      type: draft.type,
      url: draft.url,
      title: draft.title,
      sort_order: draft.sort_order,
    };
    if (editId === 'new') {
      await dispatch(createRecord({ moduleId: 'about_media', data: payload }));
    } else {
      await dispatch(
        updateRecord({
          moduleId: 'about_media',
          id: editId as number,
          data: payload,
        })
      );
    }
    setEditId(null);
    dispatch(fetchRecords({ moduleId: 'about_media' }));
  };

  const startEdit = (row: MediaRow) => {
    setEditId(row.id!);
    setDraft({ ...row });
  };

  const startNew = () => {
    setEditId('new');
    setDraft(MEDIA_DEFAULT);
  };

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <SectionDivider
          title="About Media Gallery"
          subtitle="Images and videos displayed in the About Us page gallery."
        />
        <button
          type="button"
          disabled={editId !== null}
          onClick={startNew}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
          style={{
            backgroundColor: 'var(--glass-bg-raised)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-muted)',
            opacity: editId !== null ? 0.5 : 1,
          }}
        >
          <ReactIcon name="FaPlus" size={10} /> Add Item
        </button>
      </div>

      <div className="space-y-3">
        {editId === 'new' && (
          <MediaItemForm
            draft={draft}
            onChange={setDraft}
            onSave={save}
            onCancel={() => setEditId(null)}
          />
        )}

        {rows.length === 0 && editId !== 'new' && (
          <p
            className="rounded-xl py-8 text-center text-xs"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            No media items yet — click Add Item.
          </p>
        )}

        {rows.map((row) =>
          editId === row.id ? (
            <MediaItemForm
              key={row.id}
              draft={draft}
              onChange={setDraft}
              onSave={save}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <div
              key={row.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                backgroundColor: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'var(--glass-bg-raised)' }}
              >
                <ReactIcon
                  name={row.type === 'video' ? 'FaYoutube' : 'FaImage'}
                  size={16}
                  style={{
                    color: row.type === 'video' ? '#ef4444' : 'var(--accent)',
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {row.title || '(No title)'}
                </p>
                <p
                  className="mt-0.5 truncate text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {row.url}
                </p>
              </div>
              <span
                className="shrink-0 rounded-md px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor:
                    row.type === 'video'
                      ? 'rgba(239,68,68,0.1)'
                      : 'var(--accent-soft)',
                  color: row.type === 'video' ? '#ef4444' : 'var(--accent)',
                }}
              >
                {row.type}
              </span>
              <span
                className="shrink-0 rounded-md px-2 py-0.5 text-xs"
                style={{
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--glass-bg-raised)',
                }}
              >
                #{row.sort_order}
              </span>
              <div className="flex shrink-0 gap-1.5">
                <IconBtn
                  onClick={() => startEdit(row)}
                  icon="FaEdit"
                  title="Edit"
                />
                <IconBtn
                  onClick={async () => {
                    await dispatch(
                      deleteRecord({ moduleId: 'about_media', id: row.id! })
                    );
                    dispatch(fetchRecords({ moduleId: 'about_media' }));
                  }}
                  icon="FaTrash"
                  title="Delete"
                  danger
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const MediaItemForm = ({
  draft,
  onChange,
  onSave,
  onCancel,
}: {
  draft: MediaRow;
  onChange: (d: MediaRow) => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const set = (key: keyof MediaRow) => (v: string | number) =>
    onChange({ ...draft, [key]: v });

  return (
    <div
      className="flex flex-col gap-3 rounded-xl px-4 py-4"
      style={{
        backgroundColor: 'var(--glass-bg-raised)',
        border: '1px solid var(--accent)',
      }}
    >
      {/* Type toggle */}
      <div className="flex gap-2">
        {(['image', 'video'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onChange({ ...draft, type: t, url: '' })}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors"
            style={
              draft.type === t
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : {
                    backgroundColor: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-muted)',
                  }
            }
          >
            <ReactIcon
              name={t === 'video' ? 'FaYoutube' : 'FaImage'}
              size={11}
            />
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field
          label="Title"
          value={draft.title}
          onChange={set('title')}
          placeholder="Caption shown below media"
        />
        <Field
          label="Sort Order"
          value={String(draft.sort_order)}
          onChange={(v) => set('sort_order')(Number(v))}
          type="number"
          placeholder="0"
        />
      </div>

      {draft.type === 'video' ? (
        <Field
          label="YouTube Embed URL"
          value={draft.url}
          onChange={set('url')}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
        />
      ) : (
        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            Image
          </label>
          <ImageField
            value={draft.url}
            onChange={(v) => set('url')(String(v ?? ''))}
            folder="about"
          />
        </div>
      )}

      <div className="flex justify-end gap-2">
        <SaveRowBtn onClick={onSave} />
        <IconBtn onClick={onCancel} icon="FaTimes" />
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   Page Content Tab
════════════════════════════════════════════════════════ */
interface PageContentDraft {
  [key: string]: string;
  // Home — services section
  'services.label': string;
  'services.title': string;
  'services.description': string;
  // Home — projects section
  'projects.label': string;
  'projects.title': string;
  'projects.description': string;
  // Posts page
  'posts.label': string;
  'posts.title': string;
  'posts.description': string;
  'posts.page_size': string;
  // About page
  'about.hero_label': string;
  'about.vision_label': string;
  'about.vision_title': string;
  'about.our_vision': string;
  'about.our_mission': string;
  'about.story_label': string;
  'about.story_title': string;
  'about.media_label': string;
  'about.media_title': string;
  'about.facts_label': string;
  'about.facts_title': string;
  // Contact page
  'contact.hero_label': string;
  // Services / Insights page
  'services.hero_label': string;
  // Hero stat labels
  'hero.stat_projects': string;
  'hero.stat_services': string;
  'hero.stat_years': string;
}

const PAGE_CONTENT_DEFAULTS: PageContentDraft = {
  'services.label': '◈ What We Do',
  'services.title': 'What We Offer',
  'services.description':
    'Innovative solutions tailored to your digital transformation needs.',
  'projects.label': '◈ Featured Work',
  'projects.title': 'Our Latest Projects',
  'projects.description': 'Selected engineering projects and innovations.',
  'posts.label': '◈ Insights',
  'posts.title': 'Posts & Articles',
  'posts.description':
    'Engineering articles, project deep-dives, and technical insights from the team.',
  'posts.page_size': '20',
  'about.hero_label': 'Who We Are',
  'about.vision_label': 'What Drives Us',
  'about.vision_title': 'Vision & Mission',
  'about.our_vision': 'Our Vision',
  'about.our_mission': 'Our Mission',
  'about.story_label': 'Our Story',
  'about.story_title': 'Building a Better Tomorrow',
  'about.media_label': 'In Focus',
  'about.media_title': 'Our Work & Story',
  'about.facts_label': 'Key Facts',
  'about.facts_title': 'By the Numbers',
  'contact.hero_label': 'Get In Touch',
  'services.hero_label': 'Insights & Services',
  'hero.stat_projects': 'Projects',
  'hero.stat_services': 'Services',
  'hero.stat_years': 'Years',
};

const PageContentTab = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSiteSettings);
  const status = useAppSelector(selectSiteSettingsStatus);
  const [draft, setDraft] = useState<PageContentDraft>(PAGE_CONTENT_DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === 'idle') dispatch(loadSiteSettings());
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setDraft((prev) => {
        const next = { ...prev };
        (
          Object.keys(PAGE_CONTENT_DEFAULTS) as (keyof PageContentDraft)[]
        ).forEach((k) => {
          if (settings[k] !== undefined) next[k] = settings[k];
        });
        return next;
      });
    }
  }, [status, settings]);

  const set = (key: keyof PageContentDraft) => (v: string) =>
    setDraft((d) => ({ ...d, [key]: v }));

  const handleSave = async () => {
    setSaving(true);
    await dispatch(saveMultipleSiteSettings(draft));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6 sm:px-6">
      {/* Save button */}
      <div className="flex items-center justify-between">
        <SectionDivider
          title="Page Content"
          subtitle="Edit visible titles and descriptions on public pages."
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all"
          style={{
            backgroundColor: saved
              ? 'var(--success, #22c55e)'
              : 'var(--accent)',
            color: '#fff',
            opacity: saving ? 0.6 : 1,
          }}
        >
          <ReactIcon name={saved ? 'FaCheck' : 'FaSave'} size={10} />
          {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {/* Services section */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Services Section
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Accent Label"
            value={draft['services.label']}
            onChange={set('services.label')}
            placeholder="◈ What We Do"
          />
          <Field
            label="Heading"
            value={draft['services.title']}
            onChange={set('services.title')}
            placeholder="What We Offer"
          />
        </div>
        <Field
          label="Description"
          value={draft['services.description']}
          onChange={set('services.description')}
          placeholder="Short tagline shown below the heading"
          multiline
        />
      </div>

      {/* Projects section */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Latest Projects Section
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Accent Label"
            value={draft['projects.label']}
            onChange={set('projects.label')}
            placeholder="◈ Featured Work"
          />
          <Field
            label="Heading"
            value={draft['projects.title']}
            onChange={set('projects.title')}
            placeholder="Our Latest Projects"
          />
        </div>
        <Field
          label="Description"
          value={draft['projects.description']}
          onChange={set('projects.description')}
          placeholder="Short tagline shown below the heading"
          multiline
        />
      </div>

      {/* Posts page */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Posts Page
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Accent Label"
            value={draft['posts.label']}
            onChange={set('posts.label')}
            placeholder="◈ Tensor Labz // Posts"
          />
          <Field
            label="Page Title"
            value={draft['posts.title']}
            onChange={set('posts.title')}
            placeholder="Insights & Updates"
          />
        </div>
        <Field
          label="Description"
          value={draft['posts.description']}
          onChange={set('posts.description')}
          placeholder="Shown below the page title"
          multiline
        />
      </div>

      {/* Posts pagination */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Posts Pagination
        </p>
        <div className="max-w-xs">
          <Field
            label="Posts per page"
            value={draft['posts.page_size']}
            onChange={set('posts.page_size')}
            type="number"
            placeholder="20"
          />
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Number of posts shown per page.
        </p>
      </div>

      {/* About page */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          About Page
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Hero Label"
            value={draft['about.hero_label']}
            onChange={set('about.hero_label')}
            placeholder="Who We Are"
          />
          <Field
            label="Vision Section Label"
            value={draft['about.vision_label']}
            onChange={set('about.vision_label')}
            placeholder="What Drives Us"
          />
          <Field
            label="Vision Section Title"
            value={draft['about.vision_title']}
            onChange={set('about.vision_title')}
            placeholder="Vision & Mission"
          />
          <Field
            label="Vision Card Heading"
            value={draft['about.our_vision']}
            onChange={set('about.our_vision')}
            placeholder="Our Vision"
          />
          <Field
            label="Mission Card Heading"
            value={draft['about.our_mission']}
            onChange={set('about.our_mission')}
            placeholder="Our Mission"
          />
          <Field
            label="Story Section Label"
            value={draft['about.story_label']}
            onChange={set('about.story_label')}
            placeholder="Our Story"
          />
          <Field
            label="Story Section Title"
            value={draft['about.story_title']}
            onChange={set('about.story_title')}
            placeholder="Building a Better Tomorrow"
          />
          <Field
            label="Media Section Label"
            value={draft['about.media_label']}
            onChange={set('about.media_label')}
            placeholder="In Focus"
          />
          <Field
            label="Media Section Title"
            value={draft['about.media_title']}
            onChange={set('about.media_title')}
            placeholder="Our Work & Story"
          />
          <Field
            label="Facts Section Label"
            value={draft['about.facts_label']}
            onChange={set('about.facts_label')}
            placeholder="Key Facts"
          />
          <Field
            label="Facts Section Title"
            value={draft['about.facts_title']}
            onChange={set('about.facts_title')}
            placeholder="By the Numbers"
          />
        </div>
      </div>

      {/* Contact & Services pages */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Contact & Services Pages
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Contact Hero Label"
            value={draft['contact.hero_label']}
            onChange={set('contact.hero_label')}
            placeholder="Get In Touch"
          />
          <Field
            label="Services Hero Label"
            value={draft['services.hero_label']}
            onChange={set('services.hero_label')}
            placeholder="Insights & Services"
          />
        </div>
      </div>

      {/* Hero stat labels */}
      <div
        className="space-y-3 rounded-xl p-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Home Hero — Stat Labels
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field
            label="Projects Label"
            value={draft['hero.stat_projects']}
            onChange={set('hero.stat_projects')}
            placeholder="Projects"
          />
          <Field
            label="Services Label"
            value={draft['hero.stat_services']}
            onChange={set('hero.stat_services')}
            placeholder="Services"
          />
          <Field
            label="Years Label"
            value={draft['hero.stat_years']}
            onChange={set('hero.stat_years')}
            placeholder="Years"
          />
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   AdminSiteControl — main shell
════════════════════════════════════════════════════════ */
const AdminSiteControl = memo(() => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') ?? 'company') as TabId;

  const [company, setCompany] = useState<CompanyInfo>(COMPANY_DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectCompanyRecords = useMemo(
    () => selectModuleRecords('company_info'),
    []
  );
  const companyRecords = useAppSelector(selectCompanyRecords);

  useEffect(() => {
    dispatch(fetchRecords({ moduleId: 'company_info' }));
  }, [dispatch]);

  useEffect(() => {
    const row = companyRecords[0] as Record<string, unknown> | undefined;
    if (row) {
      setCompany({
        name: (row.name as string) ?? '',
        tagline: (row.tagline as string) ?? '',
        description: (row.description as string) ?? '',
        logo_url: (row.logo_url as string) ?? '',
        logo_url_dark: (row.logo_url_dark as string) ?? '',
        available_hours: (row.available_hours as string) ?? '',
        who_we_are: (row.who_we_are as string) ?? '',
        vision: (row.vision as string) ?? '',
        mission: (row.mission as string) ?? '',
        domains: (row.domains as string) ?? '',
      });
    }
    setLoading(false);
  }, [companyRecords]);

  const handleSave = async () => {
    setSaving(true);
    await dispatch(
      updateRecord({
        moduleId: 'company_info',
        id: 1,
        data: { id: 1, ...company },
      })
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ── */}
      <div
        className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4"
        style={{ borderBottom: '1px solid var(--glass-border)' }}
      >
        <h2
          className="truncate text-base font-bold sm:text-xl"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Syne", sans-serif',
          }}
        >
          Site Control
        </h2>
        {activeTab === 'company' && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all sm:px-4 sm:py-2.5 sm:text-sm"
            style={{
              backgroundColor: saved
                ? 'var(--success, #22c55e)'
                : 'var(--accent)',
              color: '#fff',
              opacity: saving || loading ? 0.6 : 1,
            }}
          >
            {saved ? (
              <ReactIcon name="FaCheck" size={11} />
            ) : (
              <ReactIcon name="FaSave" size={11} />
            )}
            {saved ? 'Saved!' : saving ? 'Saving…' : 'Save'}
          </button>
        )}
      </div>

      {/* ── Tab bar ── */}
      <div
        className="no-scrollbar flex shrink-0 overflow-x-auto"
        style={{ borderBottom: '1px solid var(--glass-border)' }}
      >
        {TABS.map(({ id, label, icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setSearchParams({ tab: id })}
              className="flex items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors sm:px-5"
              style={{
                borderBottom: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                marginBottom: '-1px',
              }}
            >
              <ReactIcon name={icon} size={12} />
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading && activeTab === 'company' ? (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Loading…
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'company' && (
              <CompanyInfoTab data={company} onChange={setCompany} />
            )}
            {activeTab === 'page' && (
              <>
                <HeroSlidesTab />
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <div style={{ borderTop: '1px solid var(--glass-border)' }} />
                </div>
                <AboutMediaTab />
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <div style={{ borderTop: '1px solid var(--glass-border)' }} />
                </div>
                <PageContentTab />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});

AdminSiteControl.displayName = 'AdminSiteControl';
export default AdminSiteControl;
