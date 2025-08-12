import { Link, useNavigate, useParams } from 'react-router'
import { useLocalStorage } from 'react-use'
import { alertError, alertSuccess } from '../../lib/alert'
import { detailContact } from '../../lib/api/contactApi'
import { getAddressById, updateAddress } from '../../lib/api/addressApi'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province/State is required'),
  country: z.string().min(1, 'Country is required'),
  postal_code: z.string().min(1, 'Postal Code is required')
})

export default function EditAddress() {
  const { id, addressId } = useParams()
  const [contact, setContact] = useState({})
  const [token, _] = useLocalStorage('token', '')
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    province: '',
    country: '',
    postal_code: ''
  })
  const [err, setErr] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = addressSchema.safeParse(formData)
    if (!result.success) {
      const messages = result.error.issues
        .map((error) => error.message)
        .join(', ')
      setErr(messages)
      await alertError(messages)
      return
    }

    // If validation passes, proceed with the API call
    try {
      const response = await updateAddress(token, id, addressId, formData)
      if (response.status === 200) {
        alertSuccess('Address updated successfully')
        navigate({
          pathname: `/dashboard/contacts/${id}`
        })
      } else {
        alertError('Failed to update address')
      }
    } catch (error) {
      console.log(error)
      alertError('An error occurred while updating address')
    }
  }

  const fetchAddress = async () => {
    try {
      const response = await getAddressById(token, id, addressId)
      if (response.status === 200) {
        const data = await response.json()
        setFormData({
          street: data.data.street || '',
          city: data.data.city || '',
          province: data.data.province || '',
          country: data.data.country || '',
          postal_code: data.data.postal_code || ''
        })
      } else {
        await alertError('Failed to fetch address details')
      }
    } catch (error) {
      await alertError('An error occurred while fetching address details')
    }
  }

  const fetchContact = async () => {
    try {
      const response = await detailContact(token, id)
      if (response.status === 200) {
        const data = await response.json()
        console.log('Contact data:', data.data)
        setContact(data.data)
      } else {
        await alertError('Failed to fetch contact details')
      }
    } catch (error) {
      console.log('Error fetching contact details:', error)
      await alertError('An error occurred while fetching contact details')
    }
  }

  useEffect(() => {
    fetchAddress()
    fetchContact()
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
          <i className="fas fa-map-marker-alt text-blue-400 mr-3"></i> Edit
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
                  {contact.first_name} {contact.last_name}
                </h2>
                <p className="text-gray-300 text-sm">
                  {contact.email} • {contact.phone}
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
                  value={formData.street}
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
                    value={formData.city}
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
                    value={formData.province}
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
                    value={formData.country}
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
                    value={formData.postal_code}
                    onChange={handleChange}
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
                <i className="fas fa-save mr-2"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
