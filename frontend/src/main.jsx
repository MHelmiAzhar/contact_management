import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout.jsx'
import UserRegister from './components/User/UserRegister.jsx'
import UserLogin from './components/User/UserLogin.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import UserProfile from './components/User/UserProfile.jsx'
import UserLogout from './components/User/UserLogout.jsx'
import CreateContact from './components/contact/CreateContact.jsx'
import ContactList from './components/contact/ContactList.jsx'
import EditContact from './components/contact/EditContact.jsx'
import ContactDetail from './components/contact/ContactDetail.jsx'
import CreateAddress from './components/address/createAddress.jsx'
import EditAddress from './components/address/EditAddress.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<UserLogout />} />
          </Route>
          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<CreateContact />} />
            <Route path=":id">
              <Route index element={<ContactDetail />} />
              <Route path="edit" element={<EditContact />} />
              <Route path="addresses">
                <Route path="create" element={<CreateAddress />} />
                <Route path=":addressId/edit" element={<EditAddress />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
