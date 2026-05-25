// ─────────────────────────────────────────────────────────────────────────────
//  Site content — edit via Tina CMS (pnpm cms) or directly in src/content/site/
// ─────────────────────────────────────────────────────────────────────────────

import heroData from '../content/site/hero.json'
import skillsData from '../content/site/skills.json'
import hireCTAData from '../content/site/hire-cta.json'
import aboutData from '../content/site/about.json'
import footerData from '../content/site/footer.json'
import certificationsData from '../content/site/certifications.json'
import faqData from '../content/site/faq.json'

export const hero = heroData
export const skills = skillsData
export const certifications = certificationsData.certifications
export const hireCta = hireCTAData
export const about = aboutData
export const footer = footerData
export const faqs = faqData.faqs
