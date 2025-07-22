import { useEffectOnce, useLocalStorage } from 'react-use'
import { userLogout } from '../../lib/api/userApi'
import { alertError } from '../../lib/alert'
import { useNavigate } from 'react-router'

export default function UserLogout() {
  const [token, setToken] = useLocalStorage('token', '')
  const navigate = useNavigate()
  async function handleLogout() {
    const response = await userLogout({ token })
    const responseBody = response.json()

    if (response.status == 200) {
      setToken('')
      console.log('User logged out successfully')
      await navigate({ pathname: '/login' })
    } else {
      await alertError(responseBody.errors)
    }
  }
  useEffectOnce(() => {
    handleLogout().then(() => console.log('User logged out'))
  })
  return <></>
}
