import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useLocalStorage } from 'react-use'
import { detailContact } from '../../lib/api/contactApi'
import { alertError, alertSuccess } from '../../lib/alert'
import { z } from 'zod'
import { createAddress } from '../../lib/api/addressApi'

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province/State is required'),
  country: z.string().min(1, 'Country is required'),
  postal_code: z.string().min(1, 'Postal Code is required')
})

export default function CreateAddress() {
  const { id } = useParams()
  const [contacts, setContacts] = useState({})
  const [token, _] = useLocalStorage('token', '')
  const navigate = useNavigate()
  const [form, setForm] = useState({
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: ''
  })
  const [errors, setErrors] = useState({})

  const fetchContactDetails = async () => {
    try {
      const response = await detailContact(token, id)
      if (response.status === 200) {
        const data = await response.json()
        setContacts(data.data)
      } else {
        await alertError('Failed to fetch contact details')
        throw new Error('Failed to fetch contact details')
      }
    } catch (error) {
      console.error('Error fetching contact details:', error)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = addressSchema.safeParse(form)
    if (!result.success) {
      // Ambil error dari Zod
      const fieldErrors = {}
      const messages = result.error.issues.map((err) => {
        fieldErrors[err.path[0]] = err.message
        return ` ${err.message}`
      })
      setErrors(fieldErrors)
      await alertError(messages)
      return
    }

    const response = await createAddress(token, id, form)
    if (response.status === 200) {
      await alertSuccess('Alamat berhasil ditambahkan')
      navigate({
        pathname: `/dashboard/contacts/${id}`
      })

      // Redirect or show success message
    } else {
      const errorData = await response.json()
      console.error('Error creating address:', errorData)
      await alertError('Failed to create address')
    }
  }

  useEffect(() => {
    fetchContactDetails()
  }, [])
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to={`/dashboard/contacts/${id}`}
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Contact Details
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-plus-circle text-blue-400 mr-3"></i> Add New
          Address
        </h1>
      </div>

      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          {/* <!-- Contact Information --> */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                <i className="fas fa-user text-white"></i>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {contacts.first_name} {contacts.last_name}
                </h2>
                <p className="text-gray-300 text-sm">
                  {contacts.email} • {contacts.phone}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                for="street"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Street
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-road text-gray-500"></i>
                </div>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter street address"
                  value={form.street}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  for="city"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-city text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  for="province"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Province/State
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-map text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter province or state"
                    value={form.province}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label
                  for="country"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-flag text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  for="postal_code"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Postal Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-mail-bulk text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter postal code"
                    value={form.postal_code}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to={`/dashboard/contacts/${id}`}
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
              >
                <i className="fas fa-times mr-2"></i> Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Add Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
