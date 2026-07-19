import { handleContactRequest } from '../../src/lib/contact-handler'

// Azure Static Web Apps serverless function handler
export default async function handler(request: Request): Promise<Response> {
  return handleContactRequest(request)
}
