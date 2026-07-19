import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
})

/**
 * Platform-agnostic contact form handler.
 * Used by both Azure SWA (/api/contact) and Netlify Functions.
 */
export async function handleContactRequest(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await request.json() as unknown
    const data = schema.parse(body)

    // TODO: Replace with Resend / Azure Communication Services / any email provider
    console.log('Contact form submission:', data)

    return new Response(JSON.stringify({ success: true, message: 'Message received!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid form data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
