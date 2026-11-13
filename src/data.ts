export type Course = { id: string; title: string; platform: string; instructor: string; progress: number; color: string; icon: string; lessons: number }

export const courses: Course[] = [
  { id: 'react', title: 'Створення вебдодатків з використанням React', platform: 'React', instructor: 'Олена Коваль', progress: 68, color: 'violet', icon: '⚛', lessons: 24 },
  { id: 'figma', title: 'UI/UX дизайн у Figma', platform: 'Дизайн', instructor: 'Марія Литвин', progress: 35, color: 'orange', icon: '◈', lessons: 18 },
  { id: 'typescript', title: 'TypeScript для початківців', platform: 'Frontend', instructor: 'Андрій Мельник', progress: 12, color: 'blue', icon: 'TS', lessons: 20 },
  { id: 'html', title: 'HTML та CSS: сучасна верстка', platform: 'Frontend', instructor: 'Ірина Шевченко', progress: 100, color: 'pink', icon: '⌘', lessons: 16 },
]

export const activities = [
  { kind: 'person', title: 'Оцінка уроку/викладача студентом', subtitle: '', reward: '+1', type: 'diamond' },
  { kind: 'grade', title: 'Створення вебдодатків з використанням React', subtitle: 'Робота в класі', reward: '+4', type: 'coin', day: '11' },
  { kind: 'calendar', title: 'Створення вебдодатків з використанням React', subtitle: 'Відвідування заняття', reward: '+1', type: 'diamond' },
  { kind: 'grade', title: 'Створення вебдодатків з використанням React', subtitle: 'Самостійна робота', reward: '+2', type: 'coin', day: '11' },
  { kind: 'person', title: 'Оцінка уроку/викладача студентом', subtitle: '', reward: '+1', type: 'diamond' },
  { kind: 'badge', title: 'Бейдж місяця', subtitle: '', reward: '+10', type: 'diamond' },
  { kind: 'grade', title: 'Створення вебдодатків з використанням React', subtitle: 'Самостійна робота', reward: '+2', type: 'coin', day: '11' },
]

export const students = [
  { name: 'Олексійчук Захар Павлович', score: 4439, initials: 'ОЗ' },
  { name: 'Птущенко Михайло Денисович', score: 4143, initials: 'ПМ' },
  { name: 'Акінін Ілля Михайлович', score: 3425, initials: 'АІ' },
  { name: 'Лебедєв Давид', score: 2301, initials: 'ЛД' },
  { name: 'Черкас Вадим Вікторович', score: 2078, initials: 'ЧВ' },
  { name: 'Марченко Роман Геннадійович', score: 2059, initials: 'МР', self: true },
  { name: 'Феде Іван Іванович', score: 2011, initials: 'ФІ' },
  { name: 'Галаган Максим Олександрович', score: 1728, initials: 'ГМ' },
]

