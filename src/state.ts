import { User } from './model/user';
import { Spaceship } from './model/spaceship';
import { Role } from './model/role';

export let rolelist: Role[] = [
  new Role(0, 'Lord'),
  new Role(1, 'Ogre'),
  new Role(2, 'Princess')
  //new Role(3, 'Fan')
];

export let users: User[] = [
  new User(1, 'TheLordQuad', 'imNotShort', 'Lord', 'Farquad','quadmeister@gmail.com', rolelist[0]),
  new User(2, 'SwampOgre', 'onions', 'Shrek', 'theOgre','iloveonions@gmail.com',rolelist[1]),
  new User(3, 'Princessxoxo','whereIsMyPrince','Princess','Fiona','iamstuckinatower@gmail.com', rolelist[2]),
  new User(4, 'FantasyCharacters','weHaveNoWhereToGo', 'Fantasy','Characters', 'wewantourhomes@gmail.com', rolelist[3])
];

export let spaceships: Spaceship[] = [
  new Spaceship(1, 2, 'Enterprise', 5000, 5000, 'its a ship'),
  new Spaceship(2, 2, 'Tesla', 5000, 5000, 'its a ship'),
  new Spaceship(3, 2, 'SS Minow', 5000, 5000, 'its a ship'),
  new Spaceship(4, 2, 'X-Wing', 5000, 5000, 'its a ship'),
  new Spaceship(5, 4, 'Salmon Catcher', 5000, 5000, 'its a ship'),
  new Spaceship(6, 6, 'Serrenity', 5000, 5000, 'its a ship'),
  new Spaceship(7, 3, 'Yes', 5000, 5000, 'its a ship'),
];
