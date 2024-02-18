import React from 'react';

const all_fields_array = [
  [
    //(0) add new system user
    {
      id: 'User type',
      field_type: 'select',
      span: 12,
      name: 'usertype',
      source: { url: '/api/usertypes', value: 'usertypename', name: 'usertypename' },
    },
    {
      id: 'Name',
      field_type: 'text',
      span: 12,
      name: 'name',
    },
    {
      id: 'Email',
      field_type: 'text',
      span: 12,
      name: 'email',
    },
    {
      id: 'Password',
      field_type: 'password',
      span: 12,
      name: 'password',
    },
    {
      id: 'Confirm Password',
      field_type: 'password',
      span: 12,
      name: 'password_confirmation',
    },
  ],
  [
    //(1) create user role fields
    { id: 'Role Name', name: 'role_name', field_type: 'text', span: 12 },
  ],
  [
    //(2) Assign right to role fields
    {
      id: 'Role',
      field_type: 'select',
      span: 12,
      name: 'role_id',
      source: { url: '/api/users/roles', value: 'id', name: 'role_name' },
    },
    {
      id: 'Right',
      field_type: 'select',
      span: 12,
      name: 'right_id',
      source: { url: '/api/rights/all', value: 'id', name: 'right_to' },
    },
  ],
  [
    //(3) create user role fields
    { id: 'Right To', name: 'right_to', field_type: 'text', span: 12 },
  ],
  [
    //(4) another one
    {
      id: 'Subcategory',
      field_type: 'select',
      span: 12,
      name: 'subcategory_id',
      source: { url: '/api/subcategories/all', value: 'id', name: 'subcategory_name' },
    },
    {
      id: 'Product Code',
      field_type: 'text',
      span: 6,
      name: 'product_code',
    },
    {
      id: 'Name',
      field_type: 'text',
      span: 6,
      name: 'common_name',
    },
  ],
  [
    //(5) new user fields
    {
      id: 'Name',
      field_type: 'text',
      span: 6,
      name: 'name',
    },
    {
      id: 'Email',
      field_type: 'email',
      span: 6,
      name: 'email',
    },
    {
      id: 'Password',
      field_type: 'password',
      span: 6,
      name: 'password',
    },
    {
      id: 'Confirm Password',
      field_type: 'password',
      span: 6,
      name: 'password_confirmation',
    },
    {
      id: 'Assign Role',
      field_type: 'select',
      span: 12,
      name: 'role_id',
      source: { url: '/api/users/roles', value: 'id', name: 'role_name' },
    },
  ],
];
export default all_fields_array;
