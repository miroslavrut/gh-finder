import { FC } from 'react';
import RepoItem from './RepoItem';

export interface IRepo {
  id: number;
  name: string;
  fullname: string;
  private: boolean;
  html_url: string;
  description: string;
  watchers_count: string;
  stargazers_count: string;
  open_issues: string;
  forks: string;
}

interface Props {
  repos: IRepo[];
}

const RepoList: FC<Props> = ({ repos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">Top Repositories</h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
