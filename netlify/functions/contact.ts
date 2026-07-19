import type { Config, Context } from '@netlify/functions'
import { handleContactRequest } from '../../src/lib/contact-handler'

/**
 * Netlify Function handler for the contact form.
 * The `config.path` below mounts this at /api/contact so the frontend
 * fetch('/api/contact') works identically on both Azure SWA and Netlify.
 */
export default async (req: Request, _context: Context): Promise<Response> => {
  return handleContactRequest(req)
}

export const config: Config = {
  path: '/api/contact',
}
