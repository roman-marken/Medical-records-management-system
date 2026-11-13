import { useCourses } from '../hooks/useCourses'
import { useLanguage } from '../hooks/useLanguage'
import { CourseCard } from './CourseCard'
import { courses } from '../data'
export function MyCourses() { const { enrolledCourses } = useCourses(); const { t } = useLanguage(); return <section className="page-section"><div className="section-title-row"><div><div className="eyebrow">MY LEARNING</div><h1>{t.myCourses}</h1><p>Ваші курси та навчальний прогрес.</p></div><span className="count-pill">{enrolledCourses.length} курсів</span></div>{enrolledCourses.length ? <div className="courses-grid">{enrolledCourses.map(course => <CourseCard key={course.id} course={course}/>)}</div> : <div className="empty-state"><div className="empty-icon">◈</div><h2>{t.noCourses}</h2><p>Перегляньте каталог і оберіть напрямок, який вам цікавий.</p><div className="courses-grid suggested">{courses.slice(0, 2).map(course => <CourseCard key={course.id} course={course}/>)}</div></div>}</section> }

