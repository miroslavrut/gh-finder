import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

interface Props {}

const Home = (props: Props) => {
  return (
    <div>
      <UserSearch />
      <UserResults />
    </div>
  );
};

export default Home;
