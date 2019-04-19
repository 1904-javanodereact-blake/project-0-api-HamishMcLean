import express from 'express';
import * as spaceshipDao  from '../daos/spaceship.dao';
import { authMiddleware } from '../middleware/auth.middleware';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const reimbursmentRouter = express.Router();


/**
 * find all spaceships
 * endpoint: /spaceships
 */
reimbursmentRouter.get('', [
  authMiddleware(['admin']),
  async (req, res) => {
  const ships = await spaceshipDao.findAllSpaceship();
  res.json(ships);
}]);

/**
 * find reimbursment by user
 * endpoint: /spaceships/:id
 */
reimbursmentRouter.get('/:id', async (req, res) => {
  const id = +req.params.id;
  console.log(`retreiving spaceship with id: ${id}`);
  res.json(await spaceshipDao.findById(id));
});

/**
 * find spaceships by owner id
 * endpoint: /spaceships/owner/:id
 */
reimbursmentRouter.get('/owner/:ownerId', async (req, res) => {
  res.json(await spaceshipDao.findByOwner(+req.params.ownerId));
});

/**
 * Submit Reimbursment
 * Endpoint: POST/Reimbursments
 */
reimbursmentRouter.post('', (req, res) => {
  console.log(`creating spaceship`, req.body);
  res.status(201);
  res.send('created spaceship');
});

/**
 * Update Reimbursment
 * Endpoint: PATCH/reimbursments
 */

reimbursmentRouter.patch('', (req, res) => {
  console.log(`updating spaceship`, req.body);
  res.send('updated spaceship');
});
