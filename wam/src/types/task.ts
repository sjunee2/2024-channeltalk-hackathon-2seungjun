export interface Task {
  id: number
  status: 'proposal' | 'assign' | 'progress' | 'done'
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
