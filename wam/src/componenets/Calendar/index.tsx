import { useState } from 'react'
import { Task } from '../../types/task'
import { format, addMonths, subMonths } from 'date-fns'
import styled from 'styled-components'
import { groupDatesByWeek } from './groupDatesByWeek'
import { Button } from '@mantine/core'

const dayList = ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat']

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const DateListContainer = styled.div`
  display: flex;
`
const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const WeekContainer = styled.div`
  display: flex;
`
const Cell = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  align-items: center;
`
const DateContainer = styled(Cell)`
  gap: 5px;
  height: 80px;
`
const DayContainer = styled(Cell)`
  border-bottom: 1px solid black;
  height: 20px;
`
const DateText = styled.p``

interface CalendarProps {
  taskData: Task[]
}

const Calendar = ({ taskData }: CalendarProps) => {
  const today = new Date()
  const [curDate, setCurDate] = useState<Date>(today)
  const curYear = curDate.getFullYear()
  const curMonth = curDate.getMonth()

  const firstDate = new Date(curYear, curMonth, 1)
  const startDay = new Date(firstDate)
  startDay.setDate(1 - firstDate.getDay())

  const lastDate = new Date(curYear, curMonth + 1, 0)
  const endDay = new Date(lastDate)
  endDay.setDate(lastDate.getDate() + (6 - lastDate.getDay()))

  const dateList = groupDatesByWeek(startDay, endDay, taskData)

  const toPrevMonth = () => {
    setCurDate(subMonths(curDate, 1))
  }
  const toNextMonth = () => {
    setCurDate(addMonths(curDate, 1))
  }

  console.log(dateList)
  return (
    <Wrapper>
      <ButtonWrapper>
        <Button onClick={toPrevMonth}>이전달</Button>
        <h1>{`${format(curDate, 'M')}월 ${format(curDate, 'yyyy')}`}</h1>
        <Button onClick={toNextMonth}>다음달</Button>
      </ButtonWrapper>
      <DateListContainer>
        {dayList.map((val) => (
          <DayContainer key={`key-${val}`}>{val}</DayContainer>
        ))}
      </DateListContainer>
      <MonthContainer>
        {dateList.map((weekData, weekInd) => (
          <WeekContainer key={`${weekInd}-week`}>
            {weekData.map((dateData, dateInd) => (
              <DateContainer key={`${weekInd}-${dateInd}`}>
                <DateText>{dateData.date.getDate()}</DateText>
                <div>{dateData.tasks.map((val) => val.title)}</div>
              </DateContainer>
            ))}
          </WeekContainer>
        ))}
      </MonthContainer>
    </Wrapper>
  )
}

export default Calendar
