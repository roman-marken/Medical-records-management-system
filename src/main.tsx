import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter, Form, Link, NavLink, Outlet, redirect, RouterProvider, useRouteError,
  useActionData, useLoaderData, useNavigation, useParams, useSearchParams,
} from 'react-router-dom'
import './clinic.css'

type Doctor = { id: string; name: string; specialty: string; detail: string; color: string }
type Appointment = { id: string; doctorId: string; date: string; time: string; location: string }
type Visit = Appointment & { doctorName: string; specialty: string }

const doctors: Doctor[] = [
  { id: '1', name: 'Олена Коваль', specialty: 'Кардіолог', detail: 'Досвід 12 років · прийом дорослих', color: 'mint' },
  { id: '2', name: 'Андрій Мельник', specialty: 'Терапевт', detail: 'Досвід 9 років · сімейна медицина', color: 'blue' },
  { id: '3', name: 'Ірина Шевченко', specialty: 'Дерматолог', detail: 'Досвід 8 років · дерматоскопія', color: 'peach' },
  { id: '4', name: 'Максим Бондар', specialty: 'Невролог', detail: 'Досвід 15 років · консультації', color: 'lavender' },
]
const slots: Appointment[] = [
  { id: '101', doctorId: '1', date: '2027-02-18', time: '09:30', location: 'Кабінет 12' },
  { id: '102', doctorId: '2', date: '2027-02-18', time: '11:00', location: 'Кабінет 4' },
  { id: '103', doctorId: '3', date: '2027-02-19', time: '14:30', location: 'Кабінет 8' },
  { id: '104', doctorId: '4', date: '2027-02-20', time: '10:15', location: 'Кабінет 6' },
]
const getVisits = (): Visit[] => JSON.parse(localStorage.getItem('clinic-visits') || '[]') as Visit[]
const setVisits = (value: Visit[]) => localStorage.setItem('clinic-visits', JSON.stringify(value))
const currentUser = () => localStorage.getItem('clinic-user')
const dateText = (date: string) => new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`))
const doctorFor = (id: string) => doctors.find(doctor => doctor.id === id)
const slotFor = (id: string) => slots.find(slot => slot.id === id)

function authLoader({ request }: { request: Request }) {
  if (!currentUser()) {
    const url = new URL(request.url)
    return redirect(`/login?redirect=${encodeURIComponent(url.pathname + url.search)}`)
  }
  return null
}
function DoctorList() {
  const [params, setParams] = useSearchParams()
  const specialty = params.get('specialty') || ''
  const sort = params.get('sort') || 'name'
  const filtered = doctors.filter(d => !specialty || d.specialty === specialty).sort((a, b) => sort === 'specialty' ? a.specialty.localeCompare(b.specialty, 'uk') : a.name.localeCompare(b.name, 'uk'))
  return <><PageTitle eyebrow="НАША КОМАНДА" title="Лікарі клініки" intro="Оберіть спеціаліста та зручний час візиту." />
    <div className="filters"><label>Спеціалізація<select value={specialty} onChange={e => setParams(p => { e.target.value ? p.set('specialty', e.target.value) : p.delete('specialty'); return p })}><option value="">Усі спеціалісти</option>{doctors.map(d => <option key={d.specialty}>{d.specialty}</option>)}</select></label>
      <label>Сортування<select value={sort} onChange={e => setParams(p => { p.set('sort', e.target.value); return p })}><option value="name">За ім’ям</option><option value="specialty">За спеціалізацією</option></select></label></div>
    <div className="doctor-grid">{filtered.map(d => <DoctorCard key={d.id} doctor={d} />)}{!filtered.length && <p>За цим фільтром лікарів немає.</p>}</div>
  </>
}
function DoctorCard({ doctor }: { doctor: Doctor }) {
  return <article className="doctor-card"><div className={`avatar ${doctor.color}`}>{doctor.name.split(' ').map(x => x[0]).join('')}</div><span className="tag">{doctor.specialty}</span><h2>{doctor.name}</h2><p>{doctor.detail}</p><Link className="button secondary" to={`/doctors/${doctor.id}`}>Профіль лікаря <span>↗</span></Link></article>
}
function DoctorProfile() {
  const doctor = useLoaderData() as Doctor
  const { doctorId } = useParams()
  const available = slots.filter(slot => slot.doctorId === doctor.id)
  return <div data-doctor-id={doctorId}><Link className="back-link" to="/doctors">← Усі лікарі</Link><section className="profile"><div className={`avatar large ${doctor.color}`}>{doctor.name.split(' ').map(x => x[0]).join('')}</div><div><span className="tag">{doctor.specialty}</span><h1>{doctor.name}</h1><p>{doctor.detail}</p><p className="muted">Проводить первинні консультації, діагностику та складає індивідуальний план лікування.</p></div></section><h2 className="section-heading">Найближчий вільний час</h2><div className="slot-list">{available.length ? available.map(slot => <SlotCard key={slot.id} slot={slot} />) : <p>Вільних записів поки немає.</p>}</div></div>
}
function Appointments() {
  const [params, setParams] = useSearchParams()
  const query = params.get('specialty') || ''
  const visible = slots.filter(slot => !query || doctorFor(slot.doctorId)?.specialty === query)
  return <><PageTitle eyebrow="ОБЕРІТЬ ЗРУЧНИЙ ЧАС" title="Вільні записи" intro="Запишіться на прийом до одного з наших лікарів."/><div className="filters"><label>Спеціалізація<select value={query} onChange={e => setParams(e.target.value ? { specialty: e.target.value } : {})}><option value="">Усі спеціалісти</option>{doctors.map(d => <option key={d.specialty}>{d.specialty}</option>)}</select></label></div><div className="slot-list">{visible.map(slot => <SlotCard key={slot.id} slot={slot}/>)}</div></>
}
function SlotCard({ slot }: { slot: Appointment }) {
  const doctor = doctorFor(slot.doctorId)!
  return <article className="slot-card"><div className="slot-date"><strong>{new Date(`${slot.date}T12:00:00`).getDate()}</strong><span>{new Intl.DateTimeFormat('uk-UA', { month: 'short' }).format(new Date(`${slot.date}T12:00:00`))}</span></div><div className="slot-info"><span className="tag">{doctor.specialty}</span><h2>{doctor.name}</h2><p>{dateText(slot.date)} · {slot.time} · {slot.location}</p></div><Link className="button primary" to={`/appointments/${slot.id}`}>Записатися</Link></article>
}
function AppointmentDetail() {
  const slot = useLoaderData() as Appointment
  const { appointmentId } = useParams()
  const doctor = doctorFor(slot.doctorId)!
  const error = useActionData() as string | undefined
  const navigation = useNavigation()
  const minDate = new Date().toISOString().slice(0, 10)
  return <div data-appointment-id={appointmentId}><Link className="back-link" to="/appointments">← Усі вільні записи</Link><PageTitle eyebrow="ДЕТАЛІ ПРИЙОМУ" title="Запис до лікаря" intro={`${doctor.name} · ${doctor.specialty}`} /><div className="booking-panel"><p><b>Дата:</b> {dateText(slot.date)}, {slot.time}</p><p><b>Місце:</b> {slot.location}</p><p><b>Лікар:</b> {doctor.name}</p><Form method="post" className="booking-form"><label>Оберіть дату<input required type="date" name="date" min={minDate} defaultValue={slot.date}/></label><label>Коментар для лікаря<textarea name="note" rows={3} maxLength={300} placeholder="Коротко опишіть причину візиту (необов’язково)"/></label>{error && <p className="error" role="alert">{error}</p>}<button className="button primary" disabled={navigation.state === 'submitting'}>{navigation.state === 'submitting' ? 'Зберігаємо…' : 'Підтвердити запис'}</button></Form></div></div>
}
function MyAppointments() {
  const visits = useLoaderData() as Visit[]
  const [params] = useSearchParams()
  return <><PageTitle eyebrow="ОСОБИСТИЙ КАБІНЕТ" title="Мої записи" intro="Ваші майбутні візити до клініки."/>{params.get('created') && <div className="success" role="status">Запис успішно створено. Чекаємо на вас!</div>}{visits.length ? <div className="slot-list">{visits.map(visit => <article className="slot-card" key={visit.id}><div className="slot-date"><strong>{new Date(`${visit.date}T12:00:00`).getDate()}</strong><span>{new Intl.DateTimeFormat('uk-UA', { month: 'short' }).format(new Date(`${visit.date}T12:00:00`))}</span></div><div className="slot-info"><span className="tag">{visit.specialty}</span><h2>{visit.doctorName}</h2><p>{dateText(visit.date)} · {visit.time} · {visit.location}</p></div></article>)}</div> : <div className="empty"><p>У вас поки немає записів.</p><Link className="button primary" to="/appointments">Знайти вільний час</Link></div>}</>
}
function Login() {
  const error = useActionData() as string | undefined
  const [params] = useSearchParams()
  const navigation = useNavigation()
  return <AuthCard title="Вітаємо знову" intro="Увійдіть, щоб керувати своїми візитами."><Form method="post" className="booking-form"><input type="hidden" name="redirect" value={params.get('redirect') || '/my-appointments'}/><label>Email<input required name="email" type="email" autoComplete="email" placeholder="name@example.com"/></label><label>Пароль<input required name="password" type="password" autoComplete="current-password" minLength={4} placeholder="Ваш пароль"/></label>{error && <p className="error" role="alert">{error}</p>}<button className="button primary" disabled={navigation.state === 'submitting'}>Увійти</button><p className="auth-foot">Ще не маєте профілю? <Link to="/register">Зареєструватися</Link></p></Form></AuthCard>
}
function Register() {
  const error = useActionData() as string | undefined
  const navigation = useNavigation()
  return <AuthCard title="Створіть профіль" intro="Зареєструйтеся, щоб записуватися до лікарів."><Form method="post" className="booking-form"><label>Ім’я та прізвище<input required name="name" autoComplete="name" minLength={2} placeholder="Ваше ім’я"/></label><label>Email<input required name="email" type="email" autoComplete="email" placeholder="name@example.com"/></label><label>Пароль<input required name="password" type="password" autoComplete="new-password" minLength={4} placeholder="Щонайменше 4 символи"/></label>{error && <p className="error" role="alert">{error}</p>}<button className="button primary" disabled={navigation.state === 'submitting'}>Зареєструватися</button><p className="auth-foot">Вже маєте профіль? <Link to="/login">Увійти</Link></p></Form></AuthCard>
}
function AuthCard({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) { return <div className="auth-wrap"><section className="auth-card"><PageTitle title={title} intro={intro}/>{children}</section></div> }
function Home() { return <><section className="hero"><div><span className="tag">ТУРБОТА ПОРУЧ</span><h1>Здоров’я починається<br/>з простої розмови.</h1><p>Знайдіть свого лікаря та оберіть час для консультації онлайн.</p><div className="hero-actions"><Link className="button primary" to="/doctors">Знайти лікаря <span>→</span></Link><Link className="button secondary" to="/appointments">Вільні записи</Link></div></div><div className="hero-art"><div className="cross">＋</div><div className="hero-note"><span className="pulse">✳</span><span><b>Поруч із вами</b><small>Команда лікарів клініки</small></span></div></div></section><section className="home-bottom"><div><small>01 / СПЕЦІАЛІСТИ</small><h2>Уважна медицина —<br/>для кожного.</h2></div><p>Обирайте потрібну спеціалізацію, переглядайте профілі лікарів і записуйтеся на консультацію за кілька хвилин.</p><Link to="/doctors" className="plain-link">Переглянути лікарів ↗</Link></section></> }
function PageTitle({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) { return <header className="page-title">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{intro && <p>{intro}</p>}</header> }
function MainLayout() { return <div className="shell"><header className="topbar"><Link className="brand" to="/"><span className="brand-icon">✳</span> vita<span>care</span></Link><nav aria-label="Головна навігація"><NavLink end to="/">Головна</NavLink><NavLink to="/doctors">Лікарі</NavLink><NavLink to="/appointments">Вільний час</NavLink></nav><div className="top-actions">{currentUser() ? <><Link className="account-link" to="/my-appointments">Мій кабінет</Link><Form method="post" action="/logout"><button className="plain-button">Вийти</button></Form></> : <Link className="login-link" to="/login">Увійти <span>↗</span></Link>}</div></header><main className="content"><Outlet/></main><footer className="footer"><Link className="brand" to="/"><span className="brand-icon">✳</span> vita<span>care</span></Link><span>Дбайлива медицина у вашому місті</span><span>Пн–Сб · 08:00–20:00</span></footer></div> }
function PatientLayout() { return <div className="patient-shell"><aside className="patient-nav"><Link className="brand" to="/"><span className="brand-icon">✳</span> vita<span>care</span></Link><small>ОСОБИСТИЙ КАБІНЕТ</small><NavLink to="/my-appointments">Мої записи</NavLink><NavLink to="/doctors">Знайти лікаря</NavLink><Form method="post" action="/logout"><button className="plain-button">Вийти з акаунту →</button></Form></aside><main className="patient-content"><div className="patient-top"><Link to="/">← На головну</Link><span>{currentUser()}</span></div><Outlet/></main></div> }
function ErrorPage() { const error = useRouteError(); const notFound = typeof error === 'object' && error !== null && 'status' in error && error.status === 404; const message = typeof error === 'object' && error !== null && 'data' in error ? String(error.data) : ''; return <div className="not-found"><span className="eyebrow">{notFound ? '404 · НЕ ЗНАЙДЕНО' : 'ПОМИЛКА'}</span><h1>{message.includes('Лікаря') ? 'Лікаря не знайдено.' : message.includes('Запис') ? 'Запис не знайдено.' : 'Схоже, ця адреса змінилася.'}</h1><p>Перевірте адресу або поверніться на головну сторінку клініки.</p><Link className="button primary" to="/">На головну</Link></div> }

async function bookingAction({ request, params }: { request: Request; params: Record<string, string | undefined> }) {
  if (!currentUser()) return redirect(`/login?redirect=${encodeURIComponent(new URL(request.url).pathname)}`)
  const slot = slotFor(params.appointmentId || '')
  if (!slot) throw new Response('Запис не знайдено', { status: 404 })
  const data = await request.formData()
  const date = String(data.get('date') || '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < new Date().toISOString().slice(0, 10)) return 'Оберіть сьогоднішню або майбутню дату.'
  const doctor = doctorFor(slot.doctorId)!
  const visits = getVisits()
  visits.push({ ...slot, date, doctorName: doctor.name, specialty: doctor.specialty })
  setVisits(visits)
  return redirect('/my-appointments?created=1')
}
async function loginAction({ request }: { request: Request }) {
  const data = await request.formData()
  const email = String(data.get('email') || '').trim()
  const password = String(data.get('password') || '')
  if (!email.includes('@') || password.length < 4) return 'Перевірте email і пароль.'
  localStorage.setItem('clinic-user', email)
  return redirect(String(data.get('redirect') || '/my-appointments'))
}
async function registerAction({ request }: { request: Request }) {
  const data = await request.formData()
  const name = String(data.get('name') || '').trim()
  const email = String(data.get('email') || '').trim()
  const password = String(data.get('password') || '')
  if (name.length < 2 || !email.includes('@') || password.length < 4) return 'Заповніть усі поля коректно.'
  localStorage.setItem('clinic-user', email)
  return redirect('/my-appointments')
}
async function logoutAction() { localStorage.removeItem('clinic-user'); return redirect('/') }

const router = createBrowserRouter([
  { path: '/', Component: MainLayout, errorElement: <ErrorPage/>, children: [
    { index: true, Component: Home },
    { path: 'doctors', Component: DoctorList },
    { path: 'doctors/:doctorId', loader: ({ params }) => { const doctor = doctorFor(params.doctorId!); if (!doctor) throw new Response('Лікаря не знайдено', { status: 404 }); return doctor }, Component: DoctorProfile },
    { path: 'appointments', Component: Appointments },
    { path: 'appointments/:appointmentId', loader: ({ params }) => { const slot = slotFor(params.appointmentId!); if (!slot) throw new Response('Запис не знайдено', { status: 404 }); return slot }, action: bookingAction, Component: AppointmentDetail },
    { path: 'login', action: loginAction, Component: Login },
    { path: 'register', action: registerAction, Component: Register },
    { path: 'logout', action: logoutAction },
    { path: '*', Component: ErrorPage },
  ]},
  { path: '/my-appointments', loader: ({ request }) => { const auth = authLoader({ request }); return auth || getVisits() }, Component: PatientLayout, errorElement: <ErrorPage/>, children: [{ index: true, Component: MyAppointments }] },
])

createRoot(document.getElementById('app')!).render(<React.StrictMode><RouterProvider router={router}/></React.StrictMode>)

