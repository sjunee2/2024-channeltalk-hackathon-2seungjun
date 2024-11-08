// import { useState } from 'react'

// import { format, addMonths, subMonths } from 'date-fns'
// import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
// import { isSameMonth, isSameDay, addDays, parse } from 'date-fns'

// const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat']

// const RenderDays = () => {
//   const days: JSX.Element[] = []
//   for (let i = 0; i < 7; i++) {
//     days.push(
//       <div
//         className="col"
//         key={i}
//       >
//         {date[i]}
//       </div>
//     )
//   }

//   return <div className="days row">{days}</div>
// }

// const RenderCells = ({
//   currentMonth,
//   selectedDate,
//   onDateClick,
// }: {
//   currentMonth: Date
//   selectedDate: Date
//   onDateClick: (day: Date) => void
// }) => {
//   const monthStart = startOfMonth(currentMonth)
//   const monthEnd = endOfMonth(monthStart)
//   const startDate = startOfWeek(monthStart)
//   const endDate = endOfWeek(monthEnd)

//   const rows = []
//   let days = []
//   let day = startDate
//   let formattedDate = ''

//   while (day <= endDate) {
//     for (let i = 0; i < 7; i++) {
//       formattedDate = format(day, 'd')
//       days.push(
//         <div
//           className={`col cell ${
//             !isSameMonth(day, monthStart)
//               ? 'disabled'
//               : isSameDay(day, selectedDate)
//                 ? 'selected'
//                 : format(currentMonth, 'M') !== format(day, 'M')
//                   ? 'not-valid'
//                   : 'valid'
//           }`}
//           key={String(day)}
//           onClick={() => onDateClick(day)}
//         >
//           <span
//             className={
//               format(currentMonth, 'M') !== format(day, 'M')
//                 ? 'text not-valid'
//                 : ''
//             }
//           >
//             {formattedDate}
//           </span>
//         </div>
//       )
//       day = addDays(day, 1)
//     }
//     rows.push(
//       <div
//         className="row"
//         key={day}
//       >
//         {days}
//       </div>
//     )
//     days = []
//   }
//   return <div className="body">{rows}</div>
// }

// export const Calender = () => {
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date())

//   const prevMonth = () => {
//     setCurrentMonth(subMonths(currentMonth, 1))
//   }
//   const nextMonth = () => {
//     setCurrentMonth(addMonths(currentMonth, 1))
//   }
//   const onDateClick = (day: Date) => {
//     setSelectedDate(day)
//   }

//   return (
//     <div className="calendar">
//       <div className="header row">
//         <div className="col col-start">
//           <span className="text">
//             <span className="text month">{format(currentMonth, 'M')}월</span>
//             {format(currentMonth, 'yyyy')}
//           </span>
//         </div>
//         <div className="col col-end">
//           <button onClick={prevMonth}>전</button>
//           <button onClick={nextMonth}>후</button>
//         </div>
//       </div>
//       <RenderDays />
//       <RenderCells
//         currentMonth={currentMonth}
//         selectedDate={selectedDate}
//         onDateClick={onDateClick}
//       />
//     </div>
//   )
// }
