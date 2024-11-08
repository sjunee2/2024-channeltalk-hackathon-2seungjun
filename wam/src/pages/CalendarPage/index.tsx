import { useEffect, useState } from 'react'
import { useFilterStore } from '../../store/filter'
import { Button } from '@channel.io/bezier-react'
import Filter from '../../componenets/Filter'
import Calendar from '../../componenets/Calendar'
import List from '../../componenets/List'
import { isMobile } from '../../utils/userAgent'
import { Task } from '../../types/task'

const CalendarPage = () => {
  const [taskData, setTaskData] = useState<Task[]>([])
  const { status, role, assignUser } = useFilterStore()

  const [page, setPage] = useState<'calendar' | 'list'>('calendar')

  // const chatTitle = useMemo(() => getWamData('chatTitle') ?? '', [])

  // const appId = useMemo(() => getWamData('appId') ?? '', [])
  // const channelId = useMemo(() => getWamData('channelId') ?? '', [])
  // const managerId = useMemo(() => getWamData('managerId') ?? '', [])
  // const message = useMemo(() => getWamData('message') ?? '', [])
  // const chatId = useMemo(() => getWamData('chatId') ?? '', [])
  // const chatType = useMemo(() => getWamData('chatType') ?? '', [])
  // const broadcast = useMemo(() => Boolean(getWamData('broadcast') ?? false), [])
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

  useEffect(() => {
    setTaskData([
      {
        id: 1,
        status: 'proposal',
        title: '제안서 작성',
        contents: '제안서 작성하기',
        startDate: '2021-09-01',
        endDate: '2024-09-10',
        role: 'owner',
        assignUser: ['123'],
      },
      {
        id: 2,
        status: 'progress',
        title: '제안서 검토',
        contents: '제안서 검토하기',
        startDate: '2021-09-01',
        endDate: '2024-09-10',
        role: 'owner',
        assignUser: ['123'],
      },
    ])
  }, [])

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
  // const userData: User[] = []
  // const myData: User = { id: '123124', role: '소유자', nickname: '2sj' }

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
            setPage((prev) => (prev === 'calendar' ? 'list' : 'calendar'))
          }}
        />
        <Filter />
          <Calendar taskData={filteredData} />
          <Calendar taskData={taskData} />
        ) : (
          <List taskData={filteredData} />
        )}
      </div>
    </div>
  )
}

export default CalendarPage
