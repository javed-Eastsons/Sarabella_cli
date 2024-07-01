import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  // TextInput,
  Button,
  Alert,
  TouchableOpacity,Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, DrawerActions,TabActions  } from '@react-navigation/native';
import { TextInput } from "react-native-paper";


import EnvVariables from "../../constant/EnvVariables";
import Splash from "../../components/Splash";
import ButtonComp from "../../components/ButtonComp";

const data = [
  { label: "Admin", value: "1" },
  // { label: "Users", value: "2" },
  { label: "Customer", value: "2" },
  { label: "Agents", value: "3" },
  { label: "Manufacturing Units", value: "4" },
];

const Login = (props) => {
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(null);
  const [dataload, setDataLoaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [userId, setUserId]=useState(undefined)
  const [fname, setFname]=useState(undefined)

  useEffect(() => {
    props.navigation.addListener('focus',async()=>{
      var first_name = await AsyncStorage.getItem("first_name");
      setFname(await AsyncStorage.getItem('first_name'))
      console.log('first name in login='+fname)
    })
    
  }, [fname]);
  console.log('first name in login screen outside useEffect='+fname)

  console.log("value=" , label,email,password);

//   const loginHandler = useCallback(async () => {
//     if (label != "" && email != "" && password != "") {
//       setApiLoader(true);
//       const data = new FormData();
//       data.append("user_type", label=='Customer'?'Users':label);
//       data.append("email", email);
//       data.append("password", password);

//       let webApiUrl = EnvVariables.API_HOST + "api/User/methodPostlogin.php";
//       console.log('webapi body='+data)

//       let res = await fetch(webApiUrl, {
//         method: "post",
//         body: data,
//         contentType: 'application/json',
//       });
// console.log(res,'resresresres')
//       let responseJson = await res.json();
//       console.log("response=" + JSON.stringify(responseJson));
//       if (responseJson.status == true) { 
//         //setUserId(await responseJson.user_id)
//         // setTimeout(async()=>{
//          await AsyncStorage.setItem("user_id", responseJson.user_id);
//          await AsyncStorage.setItem("loginStatus", "true");
//          await AsyncStorage.setItem("first_name", responseJson.first_name);
//          await AsyncStorage.setItem("last_name", responseJson.last_name);
//          await AsyncStorage.setItem("profile_image", responseJson.profile_image);
//          await AsyncStorage.setItem("user_type", label=='Customer'?'Users':label);

//          props.navigation.dispatch(TabActions.jumpTo('Main',{userType:label=='Customer'?'Users':label}))
         
//         //  props.navigation.dispatch(DrawerActions.jumpTo('Main',{userType:label=='Customer'?'Users':label}))

//         //  props.navigation.navigate("Main",{userType:label=='Customer'?'Users':label});
//          setEmail('');
//          setPassword('')
//         // },5000)

//         // const pushAction = StackActions.push('HomeMain', { userType:label=='Customer'?'Users':label });
//         // props.navigation.dispatch(pushAction);
//         // props.navigation.dispatch(StackActions.popToTop())

//         // props.navigation.dispatch(StackActions.replace('HomeMain',{userType:label=='Customer'?'Users':label}))
         
        
//         //props.navigation.navigate("HomeMain",{userType:label, id:responseJson.user_id});
//         setApiLoader(false);
//         //props.navigation.navigate("SplashScreen");
//       } else {
//         setApiLoader(false);
//         Alert.alert("", "Invalid email or Password", [
//           { text: "Ok", style: "cancel" },
//         ]);
//       }
//       // setTimeout(() => {
//       //   setApiLoader(false);
//       // }, 5000);
//     } else {
//       console.log('label='+value+" email="+email+" password="+password)
//       Alert.alert("", "Kindly fill empty fields", [
//         { text: "Ok", style: "cancel" },
//       ]);
//   }
// },[label, email, password]);


const loginHandler = useCallback(async () => {
  if (label !== "" && email !== "" && password !== "") {
      setApiLoader(true);

      const data = {
          user_type: label === 'Customer' ? 'Users' : label,
          email: email,
          password: password
      };

      let webApiUrl = `${EnvVariables.API_HOST}api/User/methodPostlogin.php`;
      console.log('webApiUrl:', webApiUrl);
      console.log('Request Body:', data);

      try {
          let res = await fetch(webApiUrl, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          console.log('Response Status:', res.status);
          console.log('Response Headers:', res.headers);

          let responseText = await res.text();
          console.log("Response Text:", responseText);

          if (res.status === 202) {
              console.warn('Request accepted but not yet processed.');
              // Optionally, you can handle rechecking the request status if the server provides a way.
              Alert.alert("", "Request accepted, processing...", [{ text: "Ok", style: "cancel" }]);
          } else if (res.ok) {
              let responseJson;
              try {
                  responseJson = JSON.parse(responseText);
              } catch (error) {
                  console.error('Failed to parse JSON:', error);
                  throw new Error('Server returned invalid JSON');
              }
              console.log("Response JSON:", responseJson);

              if (responseJson.status) {
                  await AsyncStorage.setItem("user_id", responseJson.user_id);
                  await AsyncStorage.setItem("loginStatus", "true");
                  await AsyncStorage.setItem("first_name", responseJson.first_name);
                  await AsyncStorage.setItem("last_name", responseJson.last_name);
                  await AsyncStorage.setItem("profile_image", responseJson.profile_image);
                  await AsyncStorage.setItem("user_type", label === 'Customer' ? 'Users' : label);

                  props.navigation.dispatch(TabActions.jumpTo('Main', { userType: label === 'Customer' ? 'Users' : label }));

                  setEmail('');
                  setPassword('');
              } else {
                  Alert.alert("", "Invalid email or Password", [{ text: "Ok", style: "cancel" }]);
              }
          } else {
              console.error('HTTP Error:', res.status, res.statusText);
              Alert.alert("", "Server error, please try again later.", [{ text: "Ok", style: "cancel" }]);
          }
      } catch (error) {
          console.error('Fetch Error:', error);
          Alert.alert("", "Network error, please try again later.", [{ text: "Ok", style: "cancel" }]);
      } finally {
          setApiLoader(false);
      }
  } else {
      Alert.alert("", "Kindly fill empty fields", [{ text: "Ok", style: "cancel" }]);
  }
}, [label, email, password]);


  // const [idfromLogin, setIdFromLogin ]=useState()
  // useEffect(async()=>{
  //   setIdFromLogin(await AsyncStorage.getItem("user_id"))
  // },[idfromLogin])

  //console.log('id from login='+idfromLogin)

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
    <View
      style={{
        flex: 1,
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: Constants.statusBarHeight ? "#102799" : null,
      }}
    >
      {apiLoader ? (
        <Splash style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Image
         source={require("../../assets/logo.png")}
         resizeMode="contain"
         resizeMethod="scale"
         style={{ width: 160, height: 100, tintColor:'blue' }}
       />
       <Text style={{fontWeight:'bold'}}>Loading...</Text>
     </Splash>
      ) : (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../assets/SplashImg.png")}
            style={{ width: "100%", height: "100%", flex: 1 }}
            resizeMode="stretch"
          >
            {/* <View style={{alignSelf:'center'}}><Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 150, height: 150 }}
          /></View> */}
            <View
              style={{
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={{alignSelf:'center'}}><Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 170, height: 170 }}
          /></View>
              <ImageBackground
                source={require("../../assets/frame.png")}
                style={{
                  width: "100%",
                  alignSelf: "center",
                  height: 320,
                  justifyContent: "center",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
                resizeMode="cover"
              >
                <Dropdown
                  style={[styles.dropdown,isFocus && { borderColor: "black" }]}
                  containerStyle={{top:Platform.OS=='android'&& -30}}
                  placeholderStyle={{ fontSize: 16 , color: 'black'}}
                  itemTextStyle={{ color: 'black', fontSize: 16 }}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select User Type" : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setLabel(item.label);
                    setIsFocus(false);
                  }}
                />
                <TextInput
                  style={{...styles.dropdown, paddingHorizontal:0, width:'90%'}}
                  mode='outlined'
                  placeholder="Username"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                  style={{...styles.dropdown, paddingHorizontal:0}}
                  placeholder="Password"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  mode='outlined'
                  secureTextEntry={passwordVisible}
                  maxFontSizeMultiplier={1}
                  right={
                    <TextInput.Icon
                      name={passwordVisible == true ? "eye-off-outline" : "eye"}
                      style={{marginTop:'50%'}}
                      onPress={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    />
                  }
                />

                <View style={{ marginTop: 20, marginHorizontal:'20%' }}>
                  <ButtonComp title={'Login'} onPress={loginHandler} />
                  {/* <Button
                    title="Login"
                    color={"#102799"}
                    onPress={loginHandler}
                  /> */}
                </View>
                <Text style={{ textAlign: "center", marginTop: 15 }}>
                  IF DON'T HAVE ACCOUNT{" "}
                  <Text
                    onPress={() => props.navigation.navigate("Signup")}
                    style={{
                      textDecorationLine: "underline",
                      color: "#102799",
                    }}
                  >
                    REGISTER NOW
                  </Text>
                </Text>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderColor: "gray",
    //borderWidth: 0.5,
    paddingHorizontal: 8,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    height: 40,
    backgroundColor: "white",
    // marginHorizontal:10
  },

  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

});

export default Login;
