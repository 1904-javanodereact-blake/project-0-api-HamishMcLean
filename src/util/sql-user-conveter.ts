import { User } from '../model/user';
import { SqlUser } from '../dto/sql-user.dto';


export function convertSqlUser(user: SqlUser) {
  return new User(user.userId, user.username, undefined , user.firstname, user.lastname, user.email);
}