import express from 'express';
import { users } from '../state';
import { User } from '../model/user';
import { authMiddleware } from '../middleware/auth.middleware';
import * as userDao from '../daos/user.dao';
//import { convertSqlRole } from '../util/sql-role-conveter';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();


/**
 * find all users
 * endpoint: /users
 */
userRouter.get('', [

  authMiddleware(['Lord','Princess']),
  async (req, res) => {
    console.log('retreiving all users');
    const users = await userDao.findAllUsers();
    res.json(users);
  }]);

/**
 * find user by id
 * endpoint: /users/:id
 */

userRouter.get('/:id', async (req, res) => {
  const id: number = +req.params.id;
  console.log(`retreiving user with id: ${id}`);
  //const user = users.find(u => u.userId === id);
  const user = await userDao.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});


userRouter.post('', (req, res) => {
  console.log(`creating user`, req.body);
  const user: User = req.body;
  user.userId = Math.floor(Math.random() * 10000000);
  users.push(user);
  res.status(201);
  res.send(user);
});

/**
 * Patch
 * Endpoint: patch/ users
 */

userRouter.patch('', async (req, res) => {
  //const { body } = req; // destructuring
  console.log(`updating user`, req.body);

  const user = await userDao.updateUser(req.body);
    // console.log(`u = `, u);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  
});
  


/**
 * login
 * endpoint: /login
 */

userRouter.post('/login', async (req, res) => {
  // const username = req.params.username; // req.body['username']
  // const password = req.params.password; // req.body['password']
  const { username, password} = req.body;

  console.log(username);
  console.log(password);
  const user = await userDao.findByUsernameAndPassword(username, password);
  if (user) {
    // attach the user data to the session object
    req.session.user = user;
    res.json(user);
  } else {
    res.sendStatus(401);
  }
});

/**
 * Find Reimbursments by Status
 * Endpoint: /reimbursements/status/:statusId
 */



/**
 * Find reimbursment by user
 *  Endpoint: /reimbursements/author/userId/:userId
 */




