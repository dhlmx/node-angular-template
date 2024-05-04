export const CRUD = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
  list: 'list'
};

export const DB = {
  users: {
    table: 'users',
    field: 'User',
    _id : { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' },
    userName : { required: true, max: 0, min: 0, maxLength: 60, minLength: 1, pattern: '' },
    name : { required: true, max: 0, min: 0, maxLength: 200, minLength: 1, pattern: '' },
    email : { required: true, max: 0, min: 0, maxLength: 100, minLength: 1, pattern: '' },
    password : { required: true, max: 0, min: 0, maxLength: 100, minLength: 1, pattern: '' },
    profileImage: { required: false, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' },
    __v: { required: false, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' }
  }
};
