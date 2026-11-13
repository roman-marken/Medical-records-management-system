import { courses } from '../data'
import { useLanguage } from '../hooks/useLanguage'
import { useCourses } from '../hooks/useCourses'
import { CourseCard } from './CourseCard'
import type { ViewName } from './SideNav'
export function CourseList({ onNavigate }: { onNavigate: (view: ViewName) => void }) {
  const { t } = useLanguage()
  const { enrolledCourses } = useCourses()
  return <section className="page-section"><div className="section-title-row"><div><div className="eyebrow">MYSTAT LEARNING</div><h1>{t.courseCatalog}</h1><p>Навчайтеся у власному темпі та відстежуйте свій поступ.</p></div><button className="subtle-button" onClick={() => onNavigate('myCourses')}>{t.myCourses} <span className="count-pill">{enrolledCourses.length}</span></button></div><div className="courses-grid">{courses.map(course => <CourseCard key={course.id} course={course}/>)}</div></section>
}

