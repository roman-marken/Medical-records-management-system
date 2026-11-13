import type { Course } from '../data'
import { useCourses } from '../hooks/useCourses'
import { useLanguage } from '../hooks/useLanguage'
import { Icon } from './Icon'
export function CourseCard({ course }: { course: Course }) {
  const { hasCourse, addCourse, removeCourse } = useCourses()
  const { t } = useLanguage()
  const enrolled = hasCourse(course.id)
  return <article className="course-card"><div className={`course-mark ${course.color}`}>{course.icon}</div><div className="course-copy"><div className="course-platform">{course.platform}</div><h3>{course.title}</h3><p>{course.instructor} <span>·</span> {course.lessons} {t.lessons}</p><div className="course-progress"><span><i style={{ width: `${course.progress}%` }}/></span><b>{course.progress}%</b></div></div><button className={`course-enroll ${enrolled ? 'is-enrolled' : ''}`} onClick={() => enrolled ? removeCourse(course.id) : addCourse(course.id)}>{enrolled ? <><Icon name="check" size={15}/>{t.enrolled}</> : t.addCourse}</button></article>
}

