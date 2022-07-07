import { useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

interface Props {}

export interface IUser {
  id: number;
  login: string;
  avatar_url: string;
}

const UserResults = (props: Props) => {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user: IUser) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;
