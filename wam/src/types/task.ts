type StatusType = 'proposal' | 'assign' | 'progress' | 'done'

export interface Task {
  id: number
  taskStatus: StatusType
  title: string
  contents: string
  startDate: string
  endDate: string
  role: string
  taskUserMaps: number[]
}

export interface User {
  id: string
  name: string
  role: string
  completedTasks: number
  totalTasks: number
  avatarUrl: string
}

export interface Role {
  id: string
  name: string
}

export type FilterType = 'status' | 'role' | 'assignUser'

export interface FilterStatusInterface {
  status: StatusType[]
  role: string[]
  assignUser: string[]
}
