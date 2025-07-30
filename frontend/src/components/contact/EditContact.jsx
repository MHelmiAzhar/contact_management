import { Link, useParams } from 'react-router'
import { useEffectOnce, useLocalStorage } from 'react-use'
import {
  detailContact,
  editContact,
  getContacts
} from '../../lib/api/contactApi'
import { useEffect, useState } from 'react'
import { alertError, alertSuccess } from '../../lib/alert'

export default function EditContact() {
  const { id } = useParams()
  const [token, _] = useLocalStorage('token', '')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const fetchContact = async () => {
    try {
      const response = await detailContact(token, id)
      if (response.status === 200) {
        const data = await response.json()
        setFirstName(data.data.first_name)
        setLastName(data.data.last_name)
        setEmail(data.data.email)
        setPhone(data.data.phone)
      } else {
        await alertError('Failed to fetch contact details')
      }
    } catch (error) {
      await alertError('An error occurred while fetching contact details')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedContact = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    }

    try {
      const response = await editContact(token, id, updatedContact)
      const responseBody = await response.json()
      console.log('ini response', responseBody)
      if (response.status === 200) {
        await alertSuccess('Contact updated successfully')
        // Optionally, redirect to the contact list or detail page
      } else {
        await alertError('Failed to update contact')
      }
    } catch (error) {
      await alertError('An error occurred while updating contact')
    }
  }

  useEffect(() => {
    fetchContact()
  }, [])

  return (
    <>
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard/contacts"
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Contacts
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-user-edit text-blue-400 mr-3"></i> Edit Contact
        </h1>
      </div>

      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  for="first_name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  for="last_name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label
                for="email"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-500"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                for="phone"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-500"></i>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/dashboard/contacts"
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
    </>
  )
}
