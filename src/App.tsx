import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { SideNav, type ViewName } from './components/SideNav'
import { Dashboard } from './components/Dashboard'
import { CourseList } from './components/CourseList'
import { MyCourses } from './components/MyCourses'
import { UserProfile } from './components/UserProfile'
import { Settings } from './components/Settings'
import { LoginForm } from './components/LoginForm'
import { useAuth } from './hooks/useAuth'
import { useLanguage } from './hooks/useLanguage'
import { Icon } from './components/Icon'

export function App() {
  const [view, setView] = useState<ViewName>('home')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  useEffect(() => { if (!isAuthenticated) setView('home') }, [isAuthenticated])
  const goHome = () => setView('home')
  let content
  if (!isAuthenticated) content = <LoginForm onDone={goHome}/>
  else if (view === 'home') content = <Dashboard/>
  else if (view === 'courses') content = <CourseList onNavigate={setView}/>
  else if (view === 'myCourses') content = <MyCourses/>
  else if (view === 'profile') content = <UserProfile/>
  else if (view === 'settings') content = <Settings/>
  else content = <section className="page-section placeholder-page"><div className="placeholder-icon"><Icon name={view === 'schedule' ? 'calendar' : view === 'grades' ? 'chart' : 'book'} size={28}/></div><div className="eyebrow">MYSTAT STUDENT</div><h1>{t[view in t ? view as keyof typeof t : 'home']}</h1><p>Цей розділ навчального кабінету готовий до наповнення.</p><button className="subtle-button" onClick={goHome}>Повернутися на головну</button></section>
  return <div className="app-shell"><Header onMenu={() => setDrawerOpen(true)} onProfile={() => setView('profile')} onHome={goHome}/><SideNav open={drawerOpen} active={view} onClose={() => setDrawerOpen(false)} onNavigate={setView}/><main className={`main-area ${view === 'home' ? 'dashboard-area' : ''}`}>{content}</main></div>
}

