import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlRole } from '../util/sql-role-conveter';
import { convertSqlUser } from '../util/sql-user-conveter';

export async function findByUsernameAndPassword(username: string, password: string) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    await client.query(`set schema 'project0'`);
    const queryString = `SELECT * FROM users us
      INNER JOIN role ro ON (us.roleid = ro.roleid)
      WHERE username = $1 AND password = $2`;
    const result = await client.query(queryString, [username, password]);
    const user = result.rows[0];
    console.log(user);
    if (user) {
      const convertedUser = convertSqlUser(user);
      convertedUser.role = convertSqlRole(user);
      return convertedUser;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

//for get /users
export async function findAllUsers() {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const result = await client.query('SELECT * FROM project0.users AS u INNER JOIN project0.role AS r ON u.roleId = r.roleId');
    //return result.rows.map(convertSqlShip);
    return result.rows;
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

//for find users by id
export async function findById(id: number) {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const queryString = `SELECT * FROM project0.users WHERE userId = $1`;
    const result = await client.query(queryString, [id]);
    console.log(result.rows);
    //return result.rows[0] && convertSqlShip(result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}

export async function updateUser(user) {
  let client: PoolClient;
  try {
    console.log(`userId = ${user.userId}`)
    client = await connectionPool.connect();
    const queryString = `UPDATE project0.users SET
    username = $1, password = $2, firstname = $3, lastname = $4, email = $5, roleid = $6  WHERE userid = $7`;
    const params = [user.username, user.password, user.firstname, user.lastname, user.email, user.roleid, user.userid];
    
    const result = await client.query(queryString, params);
    console.log(`result ${result.rows[0]}`);
    if(result){
      const query1 = `SELECT * FROM project0.users WHERE userId = $1`;
      const result1 = await client.query(query1, [user.userid]);
      return result1.rows[0];
    }

  } catch (err) {
    console.log(err);
    return undefined;
  } finally {
    client && client.release();
  }
}


