import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardLayout } from './pages/dashboard/DashboardLayout'
import { DashboardOverview } from './pages/dashboard/DashboardOverview'
import { MatchesPage } from './pages/dashboard/MatchesPage'
import { MatchDetailPage } from './pages/dashboard/MatchDetailPage'
import { PoolPage } from './pages/dashboard/PoolPage'
import { ProfilePage } from './pages/dashboard/ProfilePage'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="matches" element={<MatchesPage />} />
            <Route path="matches/:id" element={<MatchDetailPage />} />
            <Route path="pool" element={<Navigate to="/dashboard/pool/pool-1" replace />} />
            <Route path="pool/:id" element={<PoolPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
