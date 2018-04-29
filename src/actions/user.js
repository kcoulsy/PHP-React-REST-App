import axios from 'axios';
import {root} from '../config/config';

export const apiUrl = root;

export const addUser = (user) => {
  console.log('adding user', user)
  const url = apiUrl + 'user/add';
  return axios({
    method: 'post',
    url,
    data: user
  }).then((response)=>{
    console.log(response);
    if(response.status === 200) {
      return response.status;
    }
  });
}

export const editUser = (user) => {
  const url = apiUrl + 'user/update/' + user.id;
  return axios({
    method: 'put',
    url,
    data: user
  }).then((response)=>{
    if(response.status === 200) {
      return response.status;
    }
  });
}

export const getAllUsers = () => {
  const url = apiUrl + 'users';
  return axios({
    method: 'get',
    url,
    data: {}
  }).then((response)=>{
    if(response.status === 200) {
      return response.data;
    }
  })
}
export const getUsersByOffset = (offset) => {
  const url = apiUrl + 'users/' + offset;
  return axios({
    method: 'get',
    url,
    data: {}
  }).then((response)=>{
    if(response.status === 200) {
      return response.data;
    }
  })
}

export const getUserById = (id) => {
  const url =  apiUrl + 'user/' + id;
  return axios({
    method: 'get',
    url,
    data: {}
  }).then((response)=>{
    if(response.status === 200) {
      return response.data[0];
    }
  })
}


export const deleteUserById = (id) => {
  const url = apiUrl + 'user/delete/' + id;
  return axios({
    method: 'delete',
    url,
    data: {}
  }).then((response)=>{
    if(response.status === 200) {
      return response.status;
    }
  });
}
