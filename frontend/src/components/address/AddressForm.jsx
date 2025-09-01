import { useState, useEffect } from 'react'
import { alertError, alertSuccess } from '../../lib/alert'
import { z } from 'zod'

const addressSchema = z.object({
  street: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  province: z.string().min(2).max(100),
  country: z.string().min(2).max(100),
  postal_code: z.string().min(5).max(10)
})

export default function AddressForm({
  mode = 'create',
  initialData = {},
  onSubmit
}) {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: ''
  })
  const [err, setErr] = useState({})

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        street: initialData.street || '',
        city: initialData.city || '',
        province: initialData.province || '',
        country: initialData.country || '',
        postal_code: initialData.postal_code || ''
      })
    }
  }, [mode, initialData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = addressSchema.safeParse(formData)
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
        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        {err.street && <span>{err.street}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {err.city && <span>{err.city}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="province">Province</label>
        <input
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
        />
        {err.province && <span>{err.province}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        {err.country && <span>{err.country}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="text"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
        {err.postal_code && <span>{err.postal_code}</span>}
      </div>
      <button type="submit">
        {mode === 'edit' ? 'Update' : 'Create'} Address
      </button>
    </form>
  )
}
