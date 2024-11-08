import { useState } from 'react'
import { Task } from '../../types/task'
import { format, addMonths, subMonths } from 'date-fns'
import styled from 'styled-components'
import { groupDatesByWeek } from './groupDatesByWeek'
import { Button } from '@mantine/core'
import { colorsArray } from './colors'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
  padding: 0 30px 0 30px;
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
  height: 90px;
`
const DayContainer = styled(Cell)`
  border-bottom: 1px solid black;
  height: 20px;
`
const DateText = styled.p`
  height: 8px;
`

const TaskColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const TaskContainer = styled.div<{ color: string }>`
  height: 16px;
  width: 70px;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`

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
        <FaChevronLeft style={{width: '16px', height: '16px'}} onClick={toPrevMonth}></FaChevronLeft>
        <h1>{`${format(curDate, 'yyyy')}년 ${format(curDate, 'M')}월`}</h1>
        <FaChevronRight style={{width: '16px', height: '16px'}} onClick={toNextMonth}></FaChevronRight>
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
                <TaskColumn>
                  {dateData.tasks.map((val, taskInd) => {
                    if (taskInd < 3)
                      return (
                        <TaskContainer
                          key={`${weekInd}-${dateInd}-${taskInd}`}
                          color={colorsArray[Math.floor(Math.random() * 50)]}
                        >
                          {val.title}
                        </TaskContainer>
                      )
                  })}
                </TaskColumn>
              </DateContainer>
            ))}
          </WeekContainer>
        ))}
      </MonthContainer>
    </Wrapper>
  )
}

export default Calendar
