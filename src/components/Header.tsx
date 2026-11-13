import { Icon } from './Icon'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'

export function Header({ onMenu, onProfile, onHome }: { onMenu: () => void; onProfile: () => void; onHome: () => void }) {
  const { student } = useAuth()
  const { language } = useLanguage()
  return <header className="topbar">
    <div className="top-brand"><button className="menu-toggle" onClick={onMenu} aria-label="Відкрити меню"><Icon name="menu" size={20}/></button><button className="wordmark" onClick={onHome}>MyStat</button></div>
    <div className="top-actions"><button className="reward-button"><Icon name="gift" size={18}/>{language === 'uk' ? 'Отримай 500€' : 'Get 500€'}</button><button className="round-action" aria-label="Календар"><Icon name="calendar" size={19}/></button><button className="round-action notify" aria-label="Сповіщення"><Icon name="bell" size={19}/><b>9+</b></button><button className="round-action" aria-label="QR-код"><Icon name="qr" size={20}/></button><button className="user-avatar" onClick={onProfile} aria-label={student?.name || 'Профіль'}><span>Р</span></button></div>
  </header>
}

