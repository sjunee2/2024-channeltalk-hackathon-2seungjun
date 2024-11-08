import styled from 'styled-components'
import { User } from '../../types/task'
import talk_happy from './talk_happy.png'
import talk_soso from './talk_soso.png'
import talk_sad from './talk_sad.png'

interface LeaderBoardProps {
  userData: User[]
  myData: User
}
const LeaderBoard = ({ userData, myData }: LeaderBoardProps) => {
  const remainTask = myData.totalTasks - myData.completedTasks
  const status = remainTask <= 1 ? 0 : remainTask <= 3 ? 1 : 2
  const imgSrc = status === 0 ? talk_happy : status === 1 ? talk_soso : talk_sad

  return (
    <Wrapper>
      <QuestWrapper>
        <CharacterWrapper status={status}>
          <Character src={imgSrc} />
        </CharacterWrapper>
        <Quest>
          남은 퀘스트 <QuestNum>4</QuestNum>개
        </Quest>
      </QuestWrapper>
      <LeaderBoardWrapper>
        <Title>🏆 리더 보드 🏆</Title>
        <LeaderBoardList>
          {userData
            .sort((a, b) => b.completedTasks - a.completedTasks)
            .map((user, ind) => (
              <UserCard key={user.id}>
                <LeftSide>
                  <Rank rank={ind}>{ind + 1}</Rank>
                  <ProfileImage src={user.avatarUrl} />
                  <Name>{user.name}</Name>
                </LeftSide>
                <RightSide rank={ind}>{user.completedTasks}개 완료!</RightSide>
              </UserCard>
            ))}
        </LeaderBoardList>
      </LeaderBoardWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`
const CharacterWrapper = styled.div<{ status: 1 | 0 | 2 }>`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15%;
  background-color: #572dff;
`

const QuestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const Character = styled.img`
  width: 100px;
`
const Quest = styled.div`
  font-size: 30px;
  font-weight: 500;
`
const QuestNum = styled.span`
  font-weight: 700;
  color: #572dff;
`

const LeaderBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const Title = styled.h1``

const LeaderBoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;
`

const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Rank = styled.span<{ rank: number }>`
  font-size: 12;
  font-weight: bold;
  color: ${({ rank }) =>
    rank === 0
      ? '#FABE00'
      : rank === 1
        ? '#435F7A'
        : rank === 2
          ? '#DE7567'
          : 'black'};
`
const Name = styled.span`
  font-size: 12;
  font-weight: bold;
`

const RightSide = styled.span<{ rank: number }>`
  font-size: 12;
  font-weight: bold;
  color: ${({ rank }) =>
    rank === 0
      ? '#FABE00'
      : rank === 1
        ? '#435F7A'
        : rank === 2
          ? '#DE7567'
          : 'black'};
`

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
`
export default LeaderBoard
