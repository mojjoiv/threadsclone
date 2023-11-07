import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
  Pressable,
} from 'react-native';
import tailwind from 'twrnc';
import React, {useEffect, useState} from 'react';
import {loadUser, loginUser} from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const {error, isAuthenticated} = useSelector((state: any) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    loginUser(email, password)(dispatch);
  };

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Email and password not matching!',
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert('Email and password not matching!');
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
      if (Platform.OS === 'android') {
      ToastAndroid.show('Login successful!', ToastAndroid.LONG);
      } else{
        Alert.alert('Login successful!');
      }
    }
  }, [isAuthenticated, error]);

  return (
    <View className="flex-[1] items-center justify-center">
      {/* <View className="w-[70%]">
        <Text className="text-[25px] font-[600] text-center text-black">
          Login
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          placeholderTextColor={'#000'}
          onChangeText={text => setEmail(text)}
          className="w-full h-[35px] border border-[#00000072] px-2 my-2 text-black"
        />
        <TextInput
          placeholder="Enter your password"
          className="w-full h-[35px] border border-[#00000072] px-2 my-2 text-black"
          value={password}
          placeholderTextColor={'#000'}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity className="mt-6">
          <Text
            className="w-full text-[#fff] text-center pt-[8px] text-[20px] h-[40px] bg-black"
            onPress={submitHandler}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          className="pt-3 text-black"
          onPress={() => navigation.navigate('Signup')}>
          Don't have any account? <Text>Sign up</Text>
        </Text>
      </View> */}
      <View style={tailwind`flex-1 items-center justify-center`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <Text style={tailwind`text-5xl font-bold mb-6 text-slate-900`}>Login</Text>

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4`}
          placeholderTextColor="#000"
          placeholder="Enter email address"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={tailwind`w-full bg-white border border-slate-200 rounded-md h-14 px-4`}
          placeholderTextColor="#000"
          placeholder="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable
              className="mt-6"
              style={tailwind`bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center`}
            >
              {/* selected state */}
              <View style={tailwind`bg-green-400 w-4 h-4 rounded-sm`} />
            </Pressable>
            <Text style={tailwind`text-slate-900`}>Remember me</Text>
          </View>
          <Pressable className="mt-6">
            <Text style={tailwind`text-blue-400 font-bold`}>Reset password</Text>
          </Pressable>
        </View>

        <TouchableOpacity className="mt-6"
          // className="mt-6"
          style={tailwind`h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6`}
        >
          <View style={tailwind`flex-1 flex items-center`}>
            <Text 
            style={tailwind`text-white text-base font-medium`}
            onPress={submitHandler}
            >Login</Text>
          </View>
          </TouchableOpacity>
        <Text
          className="pt-3 text-black"
          onPress={() => navigation.navigate('Signup')}>
          Don't have any account? <Text>Sign up</Text>
        </Text>
      </View>
    </View>
    </View>
  );
};

export default LoginScreen;
