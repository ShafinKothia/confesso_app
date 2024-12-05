import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import axios from 'axios';

export const CheckIsLoggedIn = async () => {

  const token = await AsyncStorage.getItem('confessotoken');
  var returnstate = { isLoggedIn: false, detail: "", id: "" }
  if (Boolean(token) === true) {
    await axios
      .get(`apilinkusers/users/me`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((userData) => {
        returnstate = { isLoggedIn: true, detail: "Logged In", id: userData.data.id }
      })
      .catch((error) => {
        returnstate = { isLoggedIn: false, detail: error?.response?.data?.detail, id: "" }

        // if(error.response.data.detail == "Session Expired"){
        //   return false
        // }
        // else{
        //   return true;
        // }
      });

  }
  else {
    returnstate = { isLoggedIn: false, detail: "Not Logged In", id: "" }

  }

  return returnstate
};

export const GetChannels = async () => {
  const token = await AsyncStorage.getItem('confessotoken');
  const loginData = await CheckIsLoggedIn()

  if (loginData.isLoggedIn) {

    return axios.get(`apilinkchannels/get_user_channels`, {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((res) => { return res.data })
  }
}

export async function AddConfession(channel_id, confession) {
  const token = await AsyncStorage.getItem('confessotoken');

  return axios.post(`apilinkconfessions/create_confession`, { confession: confession, channel_id: channel_id }, {
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res.data }).catch((err) => {
    console.log(err);
  })
}

export async function AddConfessionImage(formdata, confession_id) {
  const token = await AsyncStorage.getItem('confessotoken');
  console.log(confession_id);
  return axios.post(`apilinkconfessions/create_confession_image/` + confession_id, formdata, {
    headers: {
      Authorization: 'Bearer ' + token,
      "Content-Type": 'multipart/form-data',
    }
  }).then((res) => { return res.data }).catch((err) => {
    console.log(JSON.stringify(err));
  })
}

export async function UploadImage(confession_id, image_data) {
  const token = await AsyncStorage.getItem('confessotoken');

  return axios.post(`apilinkconfessions/create_confession_image/${confession_id}`, { image_in: image_data }, {
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res.data })
}

export async function GetImageAPI(image_id) {
  const token = await AsyncStorage.getItem('confessotoken');
  return axios.get(`apilinkconfessions/get_confession_image`, {
    params: { id: image_id },
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res.data })
}

export async function JoinChannelAPI(quick_name) {
  const token = await AsyncStorage.getItem('confessotoken');

  return axios.post(`apilinkchannels/join_channel`, { quick_name: quick_name }, {
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res.data }).catch((err) => { throw err.response.data })
}

export async function ApproveConfessionAPI(id) {
  const token = await AsyncStorage.getItem('confessotoken');

  return axios.post(`apilinkconfessions/approve_confession`, { id: id }, {
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res.data }).catch((err) => { throw err.response.data })
}

export async function LogOut() {
  await AsyncStorage.removeItem('confessotoken');

};

export async function AddChannelAPI(channel) {
  const token = await AsyncStorage.getItem('confessotoken')

  return axios.post(`apilinkchannels/create_channel`, { "name": channel }, { headers: { Authorization: 'Bearer ' + token } }).then((res) => {
    return res
  })
}

export async function GetCreatedConfessions() {
  const token = await AsyncStorage.getItem('confessotoken')

  return axios.get(`apilinkchannels/get_self_channels`, { headers: { Authorization: 'Bearer ' + token } }).then((res) => { return res.data })
}

export async function GetUnapprovedConfessions(id) {
  const token = await AsyncStorage.getItem('confessotoken');

  return axios.get(`apilinkconfessions/get_unapproved_confessions`, {
    params: { channel_id: id },
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res })
}


export async function GetAllConfessions(id) {
  const token = await AsyncStorage.getItem('confessotoken');

  return axios.get(`apilinkconfessions/get_confessions_by_channel_id`, {
    params: { channel_id: id },
    headers: { Authorization: 'Bearer ' + token }
  }).then((res) => { return res })
}


export async function Login(username, password, navigation) {
  let LoginData = {};
  const logindata =
    'grant_type=password' +
    '&' +
    'username=' +
    username +
    '&password=' +
    password;

  return axios
    .post(`apilinkusers/token`, logindata, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      AsyncStorage.setItem('confessotoken', response.data.access_token);

      return { status: "Success", token: response.data.access_token, user_id: response.data.user_id }
    })
    .catch((error) => {
      return error.response.data.detail
    });
};
