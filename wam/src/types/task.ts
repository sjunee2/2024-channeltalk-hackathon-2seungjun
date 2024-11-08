type StatusType = 'proposal' | 'assign' | 'progress' | 'done'

export interface Task {
  id: number
  status: StatusType
  title: string
  contents: string
  startDate: string
  endDate: string
  role: string
  assignUser: string[]
}

export interface User {
  id: string
  role: string
  nickname: string
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
