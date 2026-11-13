import { useAuth } from '../hooks/useAuth'
import { useCourses } from '../hooks/useCourses'
import { useLanguage } from '../hooks/useLanguage'
import { Icon } from './Icon'
export function UserProfile() { const { student, logout } = useAuth(); const { enrolledCourses } = useCourses(); const { t } = useLanguage(); return <section className="page-section profile-page"><div className="eyebrow">STUDENT ACCOUNT</div><h1>{t.profileTitle}</h1><article className="profile-card"><div className="profile-photo">Р</div><div className="profile-info"><h2>{student?.name}</h2><p>{student?.email}</p><span className="group-badge"><Icon name="people" size={15}/>{student?.group || t.group}</span></div><button className="subtle-button" onClick={logout}>{t.signOut}</button></article><div className="profile-stats"><div><Icon name="book"/><b>{enrolledCourses.length}</b><span>{t.myCourses}</span></div><div><Icon name="check"/><b>68%</b><span>{t.progress}</span></div><div><Icon name="award"/><b>13</b><span>Місце у групі</span></div></div></section> }

