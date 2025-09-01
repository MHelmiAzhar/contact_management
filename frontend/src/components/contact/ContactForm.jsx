import { useState, useEffect } from 'react'
import { alertError, alertSuccess } from '../../lib/alert'
import { z } from 'zod'

const contactSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(8).max(15)
})

export default function ContactForm({
  mode = 'create',
  initialData = {},
  onSubmit
}) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  })
  const [err, setErr] = useState({})

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        phone: initialData.phone || ''
      })
    }
  }, [mode, initialData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = contactSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message
      })
      setErr(fieldErrors)
      await alertError(fieldErrors)
      return
    }
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        {err.first_name && <span>{err.first_name}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {err.last_name && <span>{err.last_name}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {err.email && <span>{err.email}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {err.phone && <span>{err.phone}</span>}
      </div>
      <button type="submit">
        {mode === 'edit' ? 'Update' : 'Create'} Contact
      </button>
    </form>
  )
}
