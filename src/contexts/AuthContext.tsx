import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'

export type Student = { name: string; email: string; group: string }
type AuthValue = { student: Student | null; isAuthenticated: boolean; login: (student: Student) => void; logout: () => void }
export const AuthContext = createContext<AuthValue | null>(null)
const demoStudent: Student = { name: 'Марченко Роман Геннадійович', email: 'roman@example.com', group: 'Група 24' }

function initialStudent(): Student | null {
  const saved = localStorage.getItem('mystat-student')
  if (saved === 'logged-out') return null
  if (saved) { try { return JSON.parse(saved) as Student } catch { localStorage.removeItem('mystat-student') } }
  return demoStudent
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(initialStudent)
  const login = useCallback((next: Student) => { localStorage.setItem('mystat-student', JSON.stringify(next)); setStudent(next) }, [])
  const logout = useCallback(() => { localStorage.setItem('mystat-student', 'logged-out'); setStudent(null) }, [])
  const value = useMemo(() => ({ student, isAuthenticated: Boolean(student), login, logout }), [student, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

