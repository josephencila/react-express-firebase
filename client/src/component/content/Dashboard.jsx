import { useAuth } from "../../hook/useAuth"

const Dashboard = () => {
  const {authUser} = useAuth()

  return (
    <div>
      <h2>Welcome back {authUser?.email}</h2>
    </div>
  )
}

export default Dashboard
