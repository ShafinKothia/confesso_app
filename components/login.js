import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Button,
  Icon,
  Text,
  IconButton,
  FormControl,
  Stack,
  Alert,
  VStack,
  HStack,
  useToast,
  CloseIcon,
  Input
} from 'native-base';
import { Animated, Dimensions, Platform, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Login as LoginFunctionAPI } from './functions';
import { Auth } from './auth';
import { useSafeAreaFrame } from 'react-native-safe-area-context';


export default function Login({ navigation }) {
  const [formData, setFormData] = useState({});
  const toast = useToast()
  const frame = useSafeAreaFrame()
  const TopPass = useRef(new Animated.Value(0)).current;
  const TopUser = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState({ username: false, password: false })

  const { isLoggedIn, changeIsLoggedIn, changeUserId, userId, buttonColor1 } = Auth.useAuth();

  const [errors, setErrors] = useState({
    username: { error: false, message: '' },
    password: { error: false, message: '' },
  });
  const [buttonLoading, setButtonLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTransperant: true,
      headerLeft: () => (
        <IconButton
          icon={<Icon as={Ionicons} size={7} name="ios-arrow-back" />}
          _icon={{ color: 'black' }}
          variant="solid"
          size={9}
          backgroundColor="white"
          borderRadius="full"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => null,
    });
  }, []);

  useEffect(() => {
    passwordAnimation()

  }, [isFocused.password])

  useEffect(() => {
    usernameAnimation()
  }, [isFocused.username])

  useEffect(() => {

  }, [isFocused])

  const passwordLabelStyle = {
    position: "absolute",
    left: 0,
    top: TopPass.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 6],
    }),
    fontSize: TopPass.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: '#999999',
    paddingLeft: 24,
    fontFamily: 'Montserrat-Regular-400',
    fontWeight: 400

  };

  const usernameLabelStyle = {
    position: "absolute",
    left: 0,
    top: TopUser.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 6],
    }),
    fontSize: TopUser.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: '#999999',
    paddingLeft: 24,
    fontFamily: 'Montserrat-Regular-400',
    fontWeight: 400

  };

  const passwordAnimation = () => {

    Animated.timing(TopPass, {
      toValue: (isFocused.password || formData?.password !== undefined || formData?.password === '') ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }
  const usernameAnimation = () => {
    Animated.timing(TopUser, {
      toValue: (isFocused.username || formData?.username !== undefined || formData?.username === '') ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }


  const validateForm = () => {
    setButtonLoading(true)
    console.log(formData);
    if (formData.username === undefined) {
      const updatedValue = {
        username: { error: true, message: 'Please enter your username' },
      };
      setErrors({ ...errors, ...updatedValue });
      return false;
    } else {
      const updatedValue = {
        username: { error: false, message: '' },
      };
      setErrors({ ...errors, ...updatedValue });
    }

    if (formData.password === undefined) {
      const updatedValue = {
        password: { error: true, message: 'Please enter your password' },
      };
      setErrors((prevErrors) => ({ ...prevErrors, ...updatedValue }));
      return false;
    } else {
      const updatedValue = {
        password: { error: false, message: '' },
      };
      setErrors((prevErrors) => ({ ...prevErrors, ...updatedValue }));
    }
    return true;
  };

  const AddAlert = (title, status) => {
    toast.show({
      placement: 'top',
      render: () => {
        return (
          <View w={frame.width - 50}>
            <Alert w={frame.width - 70} borderRadius={10} status={status}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {title}
                    </Text>
                  </HStack>
                  <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                  }} icon={<CloseIcon size="3" />} _icon={{
                    color: "coolGray.600"
                  }} />
                </HStack>
              </VStack>
            </Alert>
          </View>)
      }
    })
  }

  const LoginFunction = async () => {
    console.log('HEllo');
    await LoginFunctionAPI(
      formData.username,
      formData.password,
      navigation
    ).then((res) => {
      if (res.status !== 'Success') {
        const updatedValue = {
          password: { error: true, message: res },
        };
        setErrors((prevErrors) => ({ ...prevErrors, ...updatedValue }));
        setButtonLoading(false)
      }
      else {
        setButtonLoading(false)
        changeIsLoggedIn(true)
        changeUserId(res.user_id)
        AddAlert("Logged In", "success")

        // navigation.replace('Home', { navigate_data: "Logged In" })
      }

    });
  };

  const onSubmit = async () => {
    validateForm() ? LoginFunction() : setButtonLoading(false);

  };


  return (
    <View
      height={frame.height}
      borderWidth={1}
      padding="20px"
      bgColor="#121212"
      alignItems="center"
      justifyContent='center'
      paddingX="10px"
    >
      <Text fontFamily='Montserrat-Regular-400' textAlign='center' color='white' marginBottom='30px' fontSize='40'>Login</Text>
      <FormControl
        flexDirection='column' isRequired isInvalid={errors.username.error}>
        <View style={{ ...styles.inputWrap, height: 80 }}>
          <Animated.Text style={usernameLabelStyle}>Username</Animated.Text>
          <TextInput

            onFocus={() => setIsFocused(isFocused => ({ ...isFocused, ...{ username: true } }))}
            onBlur={() => setIsFocused(isFocused => ({ ...isFocused, ...{ username: false } }))}
            autoComplete='username'
            textContentType='username'
            style={styles.input}
            autoCapitalize='none'
            // style={{b}}
            placeholderTextColor="#999999"
            cursorColor='#663399'
            value={formData.username}

            onChangeText={(value) => {
              setFormData({ ...formData, username: value });

            }}

          />
        </View>
        <View paddingLeft='20px' marginTop='2px'>
          {errors.username.error ? (
            <View flexDirection='row' >
              {/* <Icon as={Ionicons} marginTop='12px' name='warning' size={4} color='red.500' /> */}
              <FormControl.ErrorMessage style={{ height: '40px' }} >
                {errors.username.message}
              </FormControl.ErrorMessage>
            </View>
          ) : null}
        </View>
      </FormControl>
      <FormControl style={styles.inputWrap} marginTop={3} isRequired isInvalid={errors.password.error}>
        <Animated.Text style={passwordLabelStyle}>Password</Animated.Text>
        <Input
          onFocus={() => setIsFocused(isFocused => ({ ...isFocused, ...{ password: true } }))}
          onBlur={() => setIsFocused(isFocused => ({ ...isFocused, ...{ password: false } }))}
          // textContentType="password"
          autoComplete="password"
          variant='unstyled'
          autoCapitalize='none'
          style={styles.input}
          textContentType='password'
          type={showPassword ? 'text' : 'password'}
          InputRightElement={
            <Icon
              as={Ionicons}
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={5}
              mr={2}
              mt={2}
              height='100%'
              color="muted.500"
              onPress={() => setShowPassword(!showPassword)}
            />
          }

          // placeholder="Password"
          value={formData.password}
          onChangeText={(value) => {
            setFormData({ ...formData, password: value });
          }}
        />
        <View paddingLeft='10px' marginTop='2px' >
          {errors.password.error ? (
            <View flexDirection='row' >
              <FormControl.ErrorMessage >
                {errors.password.message}
              </FormControl.ErrorMessage>
            </View>
          ) : null}
        </View>
      </FormControl>

      <Button marginBottom='20px' height='50px' width='100%' style={styles.submitButton} bgColor='#663399' onPress={() => onSubmit()} isLoading={buttonLoading} >
        <Text style={styles.submitButtonText}>Submit</Text>
      </Button>
      <Text onPress={() => { navigation.replace('Register') }} marginBottom='100px' color='muted.400'>New here? <Text underline>Sign up</Text> now!</Text>


    </View >
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    // flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
    height: 80,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#663399',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20
  },
  input: {
    fontFamily: 'Montserrat-Regular-400',
    fontSize: 18,
    color: 'white',
    // lineHeight: 1.2,
    // paddingVertical: 0,
    paddingTop: 20,
    paddingHorizontal: 26,
    marginBottom: 10,
    height: 50,
    marginTop: 18,
    width: '100%',
    // textTransform: 'lowercase',
    paddingLeft: 24,
    // flex: 1,
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'white'


    // padding: 0 26px;
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,

  },
  submitButtonText: {
    // fontSize: 12
    fontFamily: 'Montserrat-Bold-700',
    fontSize: 12,
    color: '#FFFFFF',
    // lineHeight: 1.2,
    textTransform: 'uppercase',

  }

})
