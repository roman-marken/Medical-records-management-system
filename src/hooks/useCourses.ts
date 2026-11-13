import { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext'
export function useCourses() { const value = useContext(CourseContext); if (!value) throw new Error('useCourses must be used inside CourseProvider'); return value }

