import { useEffect, useMemo, useState } from 'react'
import { useFilterStore } from '../../store/filter'
import Filter from '../../componenets/Filter'
import Calendar from '../../componenets/Calendar'
import List from '../../componenets/List'
import { isMobile } from '../../utils/userAgent'
import { Task, User } from '../../types/task'
import { FaCalendarAlt, FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import LeaderBoard from '../LeaderBoard'
import { BASE_URL } from '../../secret'
import { getWamData } from '../../utils/wam'

const CalendarPage = () => {
  const [taskData, setTaskData] = useState<Task[]>([])

  const { status, role, assignUser } = useFilterStore()

  const [page, setPage] = useState<'calendar' | 'list' | 'leaderBoard'>(
    'calendar'
  )

  // const chatTitle = useMemo(() => getWamData('chatTitle') ?? '', [])

  // const appId = useMemo(() => getWamData('appId') ?? '', [])
  const channelId = useMemo(() => getWamData('channelId') ?? '', [])
  // const managerId = useMemo(() => getWamData('managerId') ?? '', [])
  // const userId = useMemo(() => getWamData('userId') ?? '', [])
  // const message = useMemo(() => getWamData('message') ?? '', [])
  // const chatId = useMemo(() => getWamData('chatId') ?? '', [])
  // const chatType = useMemo(() => getWamData('chatType') ?? '', [])
  // // const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? false), [])
  // const rootMessageId = useMemo(() => getWamData('rootMessageId'), [])

  const filterTasks = (
    tasks: Task[],
    status: string,
    role: string,
    assignUser: string
  ) => {
    return tasks.filter(
      (task) =>
        (status !== 'none' ? task.status === status : true) &&
        (role !== 'none' ? task.role === role : true) &&
        (assignUser !== 'none' ? task.assignUser.includes(assignUser) : true)
    )
  }
  const filteredData = filterTasks(taskData, status, role, assignUser)

  const [userData, setUserData] = useState<User[]>([])
  const [myData, setMyData] = useState<User>({
    id: '123124',
    avatarUrl: 'https://avatars.githubusercontent.com/u/58812281?v=4',
    role: '소유자',
    name: '2sj',
    totalTasks: 6,
    completedTasks: 5,
  })

  useEffect(() => {
    fetch(`${BASE_URL}/functions/task/all-user`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
    fetch(`${BASE_URL}/functions/task/user/{userId}`)
      .then((res) => res.json())
      .then((data) => setMyData(data))
    fetch(`${BASE_URL}/functions/task/${channelId}`)
      .then((res) => res.json())
      .then((data) => {
        setTaskData(data)
      })
  }, [channelId])

  return (
    <div
      style={{
        width: '800px',
        height: '700px',
        backgroundColor: 'whiteSmoke',
        display: 'flex',
        justifyContent: 'center',
        padding: isMobile() ? '16px' : '0 24px 24px 24px',
        overflow: 'scroll',
      }}
    >
      <Wrapper>
        <ToggleWrapper>
          <ToggleButton
            onClick={() => {
              setPage((prev) => {
                if (prev === 'calendar') return 'list'
                else if (prev === 'list') return 'leaderBoard'
                else return 'calendar'
              })
            }}
          >
            {page === 'calendar' ? <FaBars /> : <FaCalendarAlt />}
          </ToggleButton>
          {page !== 'leaderBoard' && <Filter />}
        </ToggleWrapper>
        {page === 'calendar' ? (
          <Calendar taskData={filteredData} />
        ) : page === 'list' ? (
          <List taskData={filteredData} />
        ) : (
          <LeaderBoard
            myData={myData}
            userData={userData}
          />
        )}
      </Wrapper>
    </div>
  )
}

const ToggleWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 60px;
`

const ToggleButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #4a4f5a;
    font-size: 24px;
    transition: transform 0.3s ease;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export default CalendarPage
