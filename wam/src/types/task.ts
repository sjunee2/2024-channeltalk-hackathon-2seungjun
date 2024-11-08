export interface Task {
  id: number
  status: string
  contents: string
  startDate: string
  endDate: string
  role: string
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
