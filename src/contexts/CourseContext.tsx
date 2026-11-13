import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import { courses, type Course } from '../data'
type CourseValue = { enrolledCourses: Course[]; addCourse: (id: string) => void; removeCourse: (id: string) => void; hasCourse: (id: string) => boolean }
export const CourseContext = createContext<CourseValue | null>(null)
function initialIds() { try { const stored = localStorage.getItem('mystat-courses'); return stored ? JSON.parse(stored) as string[] : ['react', 'figma'] } catch { return ['react', 'figma'] } }
export function CourseProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(initialIds)
  const addCourse = useCallback((id: string) => setIds(current => { if (current.includes(id) || !courses.some(course => course.id === id)) return current; const next = [...current, id]; localStorage.setItem('mystat-courses', JSON.stringify(next)); return next }), [])
  const removeCourse = useCallback((id: string) => setIds(current => { const next = current.filter(courseId => courseId !== id); localStorage.setItem('mystat-courses', JSON.stringify(next)); return next }), [])
  const hasCourse = useCallback((id: string) => ids.includes(id), [ids])
  const enrolledCourses = useMemo(() => ids.map(id => courses.find(course => course.id === id)).filter((course): course is Course => Boolean(course)), [ids])
  const value = useMemo(() => ({ enrolledCourses, addCourse, removeCourse, hasCourse }), [enrolledCourses, addCourse, removeCourse, hasCourse])
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
}

