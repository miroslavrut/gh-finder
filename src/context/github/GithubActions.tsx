const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const searchUsers = async (text: string) => {
  const params = new URLSearchParams({ q: text });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `${GITHUB_TOKEN}`,
    },
  });

  const { items } = await response.json();

  return items;
};

export const getUserAndRepos = async (login: string) => {
  const [user, repos] = await Promise.all([
    fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `${GITHUB_TOKEN}`,
      },
    }),
    fetch(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `${GITHUB_TOKEN}`,
      },
    }),
  ]);

  return { user: await user.json(), repos: await repos.json() };
};
