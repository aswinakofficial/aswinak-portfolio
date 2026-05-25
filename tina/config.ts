import { defineConfig } from 'tinacms'

const PILL_COLORS = [
  'bg-blue text-white',
  'bg-orange text-white',
  'bg-secondary text-secondary-foreground',
  'bg-card text-foreground',
]

const SKILL_ACCENTS = [
  'bg-orange text-white',
  'bg-blue text-white',
  'bg-foreground text-background',
]

export default defineConfig({
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: { mediaRoot: '', publicFolder: 'public' },
  },
  schema: {
    collections: [
      // ── Blog posts ───────────────────────────────────────────
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'mdx',
        fields: [
          { type: 'string',    name: 'title',       label: 'Title',        required: true },
          { type: 'string',    name: 'description', label: 'Description',  required: true, ui: { component: 'textarea' } },
          { type: 'datetime',  name: 'publishedAt',  label: 'Published At', required: true },
          { type: 'string',    name: 'tags',         label: 'Tags',         list: true },
          { type: 'string',    name: 'slug',         label: 'Slug',         required: true },
          { type: 'rich-text', name: 'body',         label: 'Body',         isBody: true },
        ],
      },

      // ── Projects ─────────────────────────────────────────────
      {
        name: 'projects',
        label: 'Projects',
        path: 'src/content/projects',
        format: 'mdx',
        fields: [
          { type: 'string',  name: 'title',       label: 'Title',       required: true },
          { type: 'string',  name: 'description', label: 'Description', required: true, ui: { component: 'textarea' } },
          {
            type: 'string', name: 'category', label: 'Category', required: true,
            options: ['Solutions', 'Open Source', 'For Fun'],
          },
          { type: 'string',    name: 'tags',     label: 'Tags',        list: true },
          { type: 'boolean',   name: 'featured', label: 'Featured on homepage' },
          { type: 'string',    name: 'demo',     label: 'Demo URL' },
          { type: 'string',    name: 'github',   label: 'GitHub URL' },
          { type: 'string',    name: 'slug',     label: 'Slug',        required: true },
          { type: 'rich-text', name: 'body',     label: 'Body',        isBody: true },
        ],
      },

      // ── Hero section ─────────────────────────────────────────
      {
        name: 'hero',
        label: 'Hero Section',
        path: 'src/content/site',
        match: { include: 'hero' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'name',                label: 'Your Name',           required: true },
          { type: 'string', name: 'tagline',             label: 'Tagline',             required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'certBadge',           label: 'Cert Badge Text' },
          { type: 'string', name: 'location',            label: 'Location' },
          { type: 'string', name: 'stickerAvailability', label: 'Sticker: Availability' },
          { type: 'string', name: 'stickerCurrent',      label: 'Sticker: Currently' },
          {
            type: 'object', name: 'rolePills', label: 'Role / Tech Pills', list: true,
            ui: { itemProps: (item: { label?: string }) => ({ label: item.label ?? 'Pill' }) },
            fields: [
              { type: 'string', name: 'label', label: 'Label', required: true },
              { type: 'string', name: 'color', label: 'Color', options: PILL_COLORS },
            ],
          },
        ],
      },

      // ── Skills section ───────────────────────────────────────
      {
        name: 'skills',
        label: 'What I Work With',
        path: 'src/content/site',
        match: { include: 'skills' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object', name: 'groups', label: 'Skill Groups', list: true,
            ui: { itemProps: (item: { label?: string }) => ({ label: item.label ?? 'Group' }) },
            fields: [
              { type: 'string', name: 'label',  label: 'Group Name',   required: true },
              { type: 'string', name: 'accent', label: 'Header Color', options: SKILL_ACCENTS },
              { type: 'string', name: 'lead',   label: 'Description',  ui: { component: 'textarea' } },
              { type: 'string', name: 'skills', label: 'Skills',       list: true },
            ],
          },
        ],
      },

      // ── Hire CTA ─────────────────────────────────────────────
      {
        name: 'hireCta',
        label: 'Hire CTA Section',
        path: 'src/content/site',
        match: { include: 'hire-cta' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'availabilityLabel', label: 'Availability Badge' },
          { type: 'string', name: 'headline',          label: 'Headline Line 1',   required: true },
          { type: 'string', name: 'headlineLine2',     label: 'Headline Line 2' },
          { type: 'string', name: 'description',       label: 'Description',       ui: { component: 'textarea' } },
          { type: 'string', name: 'email',             label: 'Contact Email',     required: true },
        ],
      },

      // ── About page ───────────────────────────────────────────
      {
        name: 'about',
        label: 'About Page',
        path: 'src/content/site',
        match: { include: 'about' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'headline',    label: 'Page Headline' },
          { type: 'string', name: 'subheadline', label: 'Sub-headline', ui: { component: 'textarea' } },
          { type: 'string', name: 'bio',         label: 'Bio Paragraphs', list: true },
          {
            type: 'object', name: 'experience', label: 'Experience', list: true,
            ui: { itemProps: (item: { title?: string }) => ({ label: item.title ?? 'Role' }) },
            fields: [
              { type: 'string', name: 'title',       label: 'Job Title',   required: true },
              { type: 'string', name: 'period',      label: 'Period',      required: true },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
            ],
          },
        ],
      },

      // ── Footer ───────────────────────────────────────────────
      {
        name: 'footer',
        label: 'Footer',
        path: 'src/content/site',
        match: { include: 'footer' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'name',      label: 'Display Name',   required: true },
          { type: 'string', name: 'tagline',   label: 'Footer Tagline', ui: { component: 'textarea' } },
          { type: 'string', name: 'email',     label: 'Email',          required: true },
          { type: 'string', name: 'copyright', label: 'Copyright Name' },
          { type: 'string', name: 'builtWith', label: 'Built With Text' },
        ],
      },

      // ── Certifications ───────────────────────────────────────
      {
        name: 'certifications',
        label: 'Certifications',
        path: 'src/content/site',
        match: { include: 'certifications' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object', name: 'certifications', label: 'Certifications', list: true,
            ui: { itemProps: (item: { code?: string }) => ({ label: item.code ?? 'Cert' }) },
            fields: [
              { type: 'string', name: 'name',   label: 'Full Name',  required: true },
              { type: 'string', name: 'code',   label: 'Code',       required: true },
              { type: 'string', name: 'issuer', label: 'Issuer' },
              { type: 'string', name: 'year',   label: 'Year' },
            ],
          },
        ],
      },
    ],
  },
})
