import { Button, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { UserSample } from "../interfaces";
import { Text, View } from "../components/Themed";
import React from "react";
import { RootTabScreenProps } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logoutUser, registerUserThunk, updateUserProfileThunk } from "../redux/user/userSlice";
import { StackActions, useNavigation } from "@react-navigation/native";
import { initialState } from "../redux/user";
import { Center } from "native-base";
import { Switch, HStack, NativeBaseProvider } from "native-base";
import {ScrollView} from 'react-native';


export default function ProfileScreen({
  navigation
  
}: RootTabScreenProps<"TabTwo">) {
  const dispatch = useAppDispatch();
  const [userFirstName, setFirstName] = useState("");
  const [userLastName, setLastName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userAddress, setUserAddress] = useState(""); 

  const user = useAppSelector((state) => state.user);
  let data = { ...initialState };

  const Handicap = () => {
    return <HStack alignItems="center" space={4}>
        <Text>Handicap?</Text>
        <Switch size="sm" />
      </HStack>;
  };
      
  return (
    <ScrollView>
    <View style={styles.container}>
      <Center w="100%">
        <Text style={styles.title}>
          {" "}
          Parking Spot Detector{"\n"} Update Profile
        </Text>
   
              <Center flex={1} px="5">
                  <Handicap />
              </Center>
     

        <TextInput
          style={styles.input}
          placeholder="First name"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setFirstName(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setLastName(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setUserEmail(val)}
        />
         <TextInput
          style={styles.input}
          placeholder="Address line 1"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setUserAddress(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address line 2 (optional)"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setUserAddress(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setUserAddress(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setUserAddress(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip code"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setUserAddress(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(val) => setUserPass(val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(val) => setUserPass(val)}
        />
        <TouchableOpacity
          style = {styles.logoutBtn}
          onPress={() => {
          }}
        >
        <Text>Update</Text>
        </TouchableOpacity>

         <TouchableOpacity
        style = {styles.logoutBtn}
         onPress={() => {
           dispatch(logoutUser());
           navigation.dispatch(StackActions.replace("SignIn"));
         }}
       >
       <Text>Logout</Text>
      </TouchableOpacity>

      </Center>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "70%",

    backgroundColor: "#C19FDE",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#7059A3",
  },

  title: {
    fontSize: 30,
    textAlign: "center",
  },

  image: {
    width: "50%",
    resizeMode: "contain",
    // marginBottom: 40,
  },
});
