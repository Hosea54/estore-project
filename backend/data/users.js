import bcryptjs from 'bcryptjs'
const users =[
  {
    name:'Admin User',
    email:'admin@email.com',
    password: bcryptjs.hashSync('123456',10),
    isAdmin:true,
  },
  {
    name:'John Doe',
    email:'john@email.com',
    password: bcryptjs.hashSync('123456',10),
    isAdmin:false,
  },
  {
    name:'Jane Doe',
    email:'admin@email.com',
    password: bcryptjs.hashSync('123456',10),
    isAdmin:true,
  },
]
export default users;
