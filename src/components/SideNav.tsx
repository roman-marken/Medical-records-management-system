import { Icon } from './Icon'
import { useLanguage } from '../hooks/useLanguage'
export type ViewName = 'home' | 'courses' | 'myCourses' | 'profile' | 'settings' | 'homework' | 'grades' | 'schedule' | 'reviews' | 'awards' | 'shop' | 'payment' | 'news' | 'contacts' | 'chats'
const items: { view: ViewName; key: keyof ReturnType<typeof useLanguage>['t']; icon: string }[] = [
  { view: 'home', key: 'home', icon: 'cap' }, { view: 'homework', key: 'homework', icon: 'task' }, { view: 'grades', key: 'grades', icon: 'chart' }, { view: 'schedule', key: 'schedule', icon: 'calendar' }, { view: 'courses', key: 'materials', icon: 'book' }, { view: 'reviews', key: 'reviews', icon: 'people' }, { view: 'awards', key: 'awards', icon: 'award' }, { view: 'shop', key: 'shop', icon: 'shop' }, { view: 'payment', key: 'payment', icon: 'wallet' }, { view: 'news', key: 'news', icon: 'megaphone' }, { view: 'contacts', key: 'contacts', icon: 'image' }, { view: 'chats', key: 'chats', icon: 'chat' },
]
export function SideNav({ open, active, onClose, onNavigate }: { open: boolean; active: ViewName; onClose: () => void; onNavigate: (view: ViewName) => void }) {
  const { t } = useLanguage()
  return <><button className={`drawer-scrim ${open ? 'visible' : ''}`} aria-label="Закрити меню" onClick={onClose}/><aside className={`side-rail ${open ? 'drawer-open' : ''}`}><nav aria-label="Основна навігація">{items.map((item, index) => <button key={item.view} className={`nav-item ${active === item.view ? 'selected' : ''} ${index === 8 ? 'nav-divider' : ''}`} title={t[item.key]} onClick={() => { onNavigate(item.view); onClose() }}><Icon name={item.icon} size={20}/><span>{t[item.key]}</span></button>)}</nav><button className={`nav-item side-settings ${active === 'settings' ? 'selected' : ''}`} onClick={() => { onNavigate('settings'); onClose() }}><Icon name="settings" size={20}/><span>{t.settings}</span></button></aside></>
}

