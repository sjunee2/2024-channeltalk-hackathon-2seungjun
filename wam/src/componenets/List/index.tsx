import { Role, Task, User } from '../../types/task'

interface ListProps {
  taskData: Task[]
  roleData: Role[]
  userData: User[]
  myData: User
}

const List = ({props}: {props: ListProps[]}) => {
  return <div>리스트 입니다</div>
};

export default List
