import { useState } from 'react'
import { useFilterStore } from '../../store/filter'
import { Button } from '@channel.io/bezier-react'
import Filter from '../../componenets/Filter'
import Calendar from '../../componenets/Calendar'
import List from '../../componenets/List'
import { isMobile } from '../../utils/userAgent'
import { Task, User } from '../../types/task'
import LeaderBoard from '../LeaderBoard'

const CalendarPage = () => {
  const [taskData, setTaskData] = useState<Task[]>([])
  const { status, role, assignUser } = useFilterStore()

  const [page, setPage] = useState<'calendar' | 'list' | 'leaderBoard'>(
    'calendar'
  )

  // const chatTitle = useMemo(() => getWamData('chatTitle') ?? '', [])

  // const appId = useMemo(() => getWamData('appId') ?? '', [])
  // const channelId = useMemo(() => getWamData('channelId') ?? '', [])
  // const managerId = useMemo(() => getWamData('managerId') ?? '', [])
  // const userId = useMemo(() => getWamData('userId') ?? '', [])
  // const message = useMemo(() => getWamData('message') ?? '', [])
  // const chatId = useMemo(() => getWamData('chatId') ?? '', [])
  // const chatType = useMemo(() => getWamData('chatType') ?? '', [])
  // // const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? false), [])
  // const rootMessageId = useMemo(() => getWamData('rootMessageId'), [])

  // const handleSend = useCallback(
  //   async (sender: string): Promise<void> => {
  //     if (chatType === 'group') {
  //       switch (sender) {
  //         case 'bot':
  //           await callFunction(appId, 'sendAsBot', {
  //             input: {
  //               groupId: chatId,
  //               broadcast,
  //               rootMessageId,
  //             },
  //           })
  //           break
  //         case 'manager':
  //           await callNativeFunction('writeGroupMessageAsManager', {
  //             channelId,
  //             groupId: chatId,
  //             rootMessageId,
  //             broadcast,
  //             dto: {
  //               plainText: message,
  //               managerId,
  //             },
  //           })
  //           break
  //         default:
  //           // NOTE: should not reach here
  //           console.error('Invalid message sender')
  //       }
  //     } else if (chatType === 'directChat') {
  //       // FIXME: Implement
  //     } else if (chatType === 'userChat') {
  //       // FIXME: Implement
  //     }
  //   },
  //   [
  //     appId,
  //     broadcast,
  //     channelId,
  //     chatId,
  //     chatType,
  //     managerId,
  //     message,
  //     rootMessageId,
  //   ]
  // )

  // useEffect(() => {
  //   // callFunction(appId, '')
  //   // const data = async () => {
  //   //   await callFunction(appId, 'sendAsBot', {
  //   //     input: {
  //   //       groupId: chatId,
  //   //       broadcast,
  //   //       rootMessageId,
  //   //     },
  //   //   })
  //   // }();
  //   setTaskData([
  //     {
  //       id: 1,
  //       status: 'proposal',
  //       title: `${channelId}`,
  //       contents: 'channelId',
  //       startDate: '2021-09-01',
  //       endDate: '2024-09-10',
  //       role: 'owner',
  //       assignUser: ['123'],
  //     },
  //     {
  //       id: 2,
  //       status: 'progress',
  //       title: `${appId}`,
  //       contents: 'appId',
  //       startDate: '2021-09-01',
  //       endDate: '2024-09-10',
  //       role: 'owner',
  //       assignUser: ['123'],
  //     },
  //     {
  //       id: 3,
  //       status: 'progress',
  //       title: `${userId}`,
  //       contents: 'userId',
  //       startDate: '2021-09-01',
  //       endDate: '2024-09-10',
  //       role: 'owner',
  //       assignUser: ['123'],
  //     },
  //     {
  //       id: 4,
  //       status: 'progress',
  //       title: `${managerId}`,
  //       contents: 'managerId',
  //       startDate: '2021-09-01',
  //       endDate: '2024-09-10',
  //       role: 'owner',
  //       assignUser: ['123'],
  //     },
  //     {
  //       id: 5,
  //       status: 'progress',
  //       title: `${chatType}`,
  //       contents: 'chatType',
  //       startDate: '2021-09-01',
  //       endDate: '2024-09-10',
  //       role: 'owner',
  //       assignUser: ['123'],
  //     },
  //     {
  //       id: 6,
  //       status: 'progress',
  //       title: `${rootMessageId}`,
  //       contents: 'rootMessageId',
  //       startDate: '2021-09-01',
  //       endDate: '2024-09-10',
  //       role: 'owner',
  //       assignUser: ['123'],
  //     },
  //   ])
  // }, [appId, channelId, managerId, chatType, rootMessageId, userId])

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

  // const filteredData = useMemo(() => tas)

  // const roleData: Role[] = []
  const userData: User[] = [
    {
      id: '123124',
      avatarUrl: 'https://avatars.githubusercontent.com/u/58812281?v=4',
      role: '소유자',
      name: 'halion',
      totalTasks: 6,
      completedTasks: 5,
    },
    {
      id: '123124',
      avatarUrl: 'https://avatars.githubusercontent.com/u/58812281?v=4',
      role: '소유자',
      name: '2sj',
      totalTasks: 9,
      completedTasks: 8,
    },
    {
      id: '123124',
      avatarUrl: 'https://avatars.githubusercontent.com/u/58812281?v=4',
      role: '소유자',
      name: '2ewhaejklrsj',
      totalTasks: 6,
      completedTasks: 10,
    },
    {
      id: '123124',
      avatarUrl: 'https://avatars.githubusercontent.com/u/58812281?v=4',
      role: '소유자',
      name: 'adsf',
      totalTasks: 6,
      completedTasks: 12,
    },
  ]
  const myData: User = {
    id: '123124',
    avatarUrl: 'https://avatars.githubusercontent.com/u/58812281?v=4',
    role: '소유자',
    name: '2sj',
    totalTasks: 6,
    completedTasks: 5,
  }

  return (
    <div
      style={{
        width: '800px',
        height: '700px',
        backgroundColor: 'whiteSmoke',
        display: 'flex',
        justifyContent: 'center',
        padding: isMobile() ? '16px' : '0 24px 24px 24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          onClick={() => {
            setPage('leaderBoard')
          }}
        />
        {page !== 'leaderBoard' && <Filter />}
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
      </div>
    </div>
  )
}

export default CalendarPage
