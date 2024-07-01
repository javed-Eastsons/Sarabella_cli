import {
  LOGIN_DATA,
  PET_LIST,
  COUNTRY_LIST,
  STATE_LIST,
  CITY_LIST,
  CATEGORY_LIST,
  BREED_LIST,
  ALL_POSTS,
  ALLPETS_CATEGORY
} from './types';
import AsyncStorage from '@react-native-community/async-storage';
import axios, * as others from 'axios';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logistical } from '../../utils';
import { Globals } from '../../Config/index';


export const LoginUser = (email, pass, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/UserLogin/UserLogin.php";
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', pass);

    console.log("FORMDATAAAAA", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
          AsyncStorage.setItem('token', JSON.stringify(responseJson.token));
          console.log(responseJson.accessToken, 'token');


          dispatch({
            type: LOGIN_DATA,
            payload: responseJson,
          });
          navigation.navigate('Auth')
          //   Alert.alert(response.response[0])
          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const registerUser = (username, email, pass, gender, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/UserRegistration/UserRegistration.php";
    var formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', pass);
    formData.append('gender', gender);
    formData.append('device_token', 'erhge534y859748jejhejr893758jerrtretret');
    formData.append('device_type', 'Android');


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ` ${Globals.baseUrl}/UserRegistration/UserRegistration.php`,
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),
      data: formData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data),'hhh');
        Alert.alert(JSON.stringify(response.data?.message))
      })
      .catch((error) => {
        console.log(error);
      });
      // .catch ((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const petListing = (email, navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/PetListing/RegisteredUserPetListing.php?email=pushpendra@eastsons.com`;
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'HIMHIMHIMHIMHIMHIM');


          dispatch({
            type: PET_LIST,
            payload: responseJson?.Pet_List,
          });
         
          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const countryList = () => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CountryList/CountryList.php";
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'countrycountrycountry');


          dispatch({
            type: COUNTRY_LIST,
            payload: responseJson?.country_list,
          });
         
          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const stateList = (countryId) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/StateList/StateList.php?country_id=${countryId}`;
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'statestatestatestate');


          dispatch({
            type: STATE_LIST,
            payload: responseJson?.state_list,
          });
         
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const cityList = (stateId) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/CityList/CityList.php?state_id=${stateId}`;
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'citycitycitycitycitycitycity');


          dispatch({
            type: CITY_LIST,
            payload: responseJson?.city_list,
          });
         
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const categoryList = () => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/CategoryList/CategoryList.php";
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("CategoryList", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'CategoryListCategoryListCategoryList');


          dispatch({
            type: CATEGORY_LIST,
            payload: responseJson?.Category_List,
          });
         
          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const breedList = (catId) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/BreedList/BreedList.php?pet_category_id=${catId}`;
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'BREED_LISTBREED_LISTBREED_LIST');


          dispatch({
            type: BREED_LIST,
            payload: responseJson?.Breed_list,
          });
         
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

export const allPetsPostListing = (email,  navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      "/AllPetsPostListing/AllPetsPostListing.php";
    var formData = new FormData();
    formData.append('user_login_email', email);

    console.log("allPetsPostListingFORMDATAAAAA", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("ALL_POSTSALL_POSTSALL_POSTS", responseJson);

        if (responseJson.status == true) {


          dispatch({
            type: ALL_POSTS,
            payload: responseJson?.Post_List,
          });
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const AllPetsListingByCategory = cat_name => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +
      `/AllPetsListingByCategory/AllPetsListingByCategory.php?cat_name=${cat_name}`;
  


    return fetch(url1, {
      method: "GET",
      headers: { }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("AllPetsListingByCategory", responseJson);

        if (responseJson.status == true) {
       
          console.log(responseJson, 'AllPetsListingByCategoryAllPetsListingByCategory');


          dispatch({
            type: ALLPETS_CATEGORY,
            payload: responseJson?.all_Pets,
          });
         
          resolve(responseJson);
        } else {
          Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};


export const logout = (email,  navigation) => {
  return (dispatch, getState) => {
    const url1 =
      Globals.baseUrl +

      "/LogOut/LogOut.php";
    var formData = new FormData();
    formData.append('session_email', email);

    console.log("logout", formData);

    return fetch(url1, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // "Authorization": authtoken,
      }),

      body: formData,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log("LogoutLogout", responseJson);

        if (responseJson.status == true) {


          // dispatch({
          //   type: ALL_POSTS,
          //   payload: responseJson?.Post_List,
          // });
          navigation.navigate('Login')
          resolve(responseJson);
        } else {
          // Alert.alert('Something Went Wrong');
        }
      })
      .catch((error) => console.log("LLLLLLLLL", error.message));
  };
};

