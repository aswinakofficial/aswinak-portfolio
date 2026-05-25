import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactSchema } from '@/lib/schemas'

export function ContactForm() {
  const form = useForm({
    defaultValues: { name: '', email: '', subject: '', message: '' },
    validators: { onSubmit: contactSchema },
    onSubmit: async ({ value }) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      })
      if (!res.ok) {
        toast.error('Failed to send message. Please try again.')
        return
      }
      toast.success("Message sent! I'll get back to you soon.")
      form.reset()
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
      className="space-y-5"
    >
      <form.Field
        name="name"
        validators={{ onChange: contactSchema.shape.name }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Your name"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">
                {String(field.state.meta.errors[0])}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{ onChange: contactSchema.shape.email }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="you@example.com"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">
                {String(field.state.meta.errors[0])}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="subject"
        validators={{ onChange: contactSchema.shape.subject }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Subject</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="What's this about?"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">
                {String(field.state.meta.errors[0])}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="message"
        validators={{ onChange: contactSchema.shape.message }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Message</Label>
            <Textarea
              id={field.name}
              rows={5}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Tell me about your project..."
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-destructive">
                {String(field.state.meta.errors[0])}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Sending...' : 'Send message'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
