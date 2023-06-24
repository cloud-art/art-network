interface IUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  password: string;
  avatar: string;
  posts: Array<string>;
  contacts: Array<string>;
}

export default IUser;
