import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Button,
  Icon,
  Text,
  Input,
  IconButton,
  FormControl,
  Stack,
  HStack,
  VStack,
  Alert,
  useToast,
} from 'native-base';
import { Dimensions, Platform, StyleSheet, Animated } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Auth } from './auth';

export default function Register({ navigation }) {
  const { buttonColor1 } = Auth.useAuth()
  const toast = useToast()
  const [formData, setFormData] = useState({});
  const TopPass = useRef(new Animated.Value(0)).current;
  const TopUser = useRef(new Animated.Value(0)).current;
  const TopConfirmPass = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState({ username: false, password: false, confirm_password: false })
  const [errors, setErrors] = useState({
    username: { error: false, message: '', display_name: 'username' },
    password: { error: false, message: '', display_name: 'password' },
    confirm_password: {
      error: false,
      message: '',
      display_name: 'confirm password',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);


  useEffect(() => {
    passwordAnimation()

  }, [isFocused.password])

  useEffect(() => {
    usernameAnimation()
  }, [isFocused.username])

  useEffect(() => {
    confirmPasswordAnimation()

  }, [isFocused.confirm_password])



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

  const confirmPasswordLabelStyle = {
    position: "absolute",
    left: 0,
    top: TopConfirmPass.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 6],
    }),
    fontSize: TopConfirmPass.interpolate({
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
  const confirmPasswordAnimation = () => {

    Animated.timing(TopConfirmPass, {
      toValue: (isFocused.confirm_password || formData?.confirm_password !== undefined || formData?.confirm_password === '') ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

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

  const validateForm = () => {
    setButtonLoading(true)
    var ErrorsIndex = [];
    var UpdatedErrors = {};
    var returnState = true

    for (var isError in errors) {
      var updatedValue = {};
      if (Boolean(formData[isError]) === false) {
        updatedValue[isError] = {
          error: true,
          message: `Please enter your ${errors[isError].display_name}`,
          display_name: errors[isError].display_name,
        };
        returnState = false
        setButtonLoading(false)

      } else {
        updatedValue[isError] = {
          error: false,
          message: ``,
          display_name: errors[isError].display_name,
        };
      }

      UpdatedErrors = { ...UpdatedErrors, ...updatedValue };
    }
    regex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)

    if (!regex.test(formData.username)) {
      const updatedValue = {
        username: { error: true, message: 'Username can only contain letters, numbers, underscores and periods' },
      };
      UpdatedErrors = { ...UpdatedErrors, ...updatedValue };
      setButtonLoading(false)

    }
    else if (formData.username === undefined) {
      const updatedValue = {
        username: { error: true, message: 'Please enter your username' },
      };
      UpdatedErrors = { ...UpdatedErrors, ...updatedValue };
      setButtonLoading(false)

    } else {
      const updatedValue = {
        username: { error: false, message: '' },
      };
      UpdatedErrors = { ...UpdatedErrors, ...updatedValue };

    }
    setErrors(UpdatedErrors)

    return returnState;
  };

  const onSubmit = async () => {
    setButtonLoading(true)
    validateForm()
      ? 
      axios
        .post(`apilinkusers/register`, {
          username: formData.username,
          password: formData.password,
          confirm_password: formData.confirm_password,
        })
        .then((res) => {
          if (res.data.status == false) {
            var UpdatedErrors = {};
            Object.keys(res.data.component_errors).map((e, i) => {
              var updatedValue = {};
              updatedValue[e] = {
                error: true,
                message: res.data.component_errors[e].message,
                display_name: errors[e].display_name,
              };
              UpdatedErrors = { ...UpdatedErrors, ...updatedValue };
            })
            setErrors({ ...errors, ...UpdatedErrors });
            setButtonLoading(false)

          }
          else {
            toast.show({
              render: () => <Alert status='success'>
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="1" />
                      <Text fontSize="md" color="coolGray.800">
                        Registered        </Text>
                    </HStack>

                  </HStack>
                </VStack>
              </Alert>
            })
            // navigation.replace('Login')
          }
        })
      
      : {}

  };

  return (
    <View
      height={Dimensions.get('screen').height}
      borderWidth={1}
      bgColor="#121212"
      padding="20px"
      alignItems="center"
      paddingTop="75px"
      paddingX="10px"
    >
      <Text fontFamily='Montserrat-Regular-400' textAlign='center' marginBottom='20px' color='white' fontSize='40'>Register</Text>

      <FormControl
        flexDirection='column' isRequired isInvalid={errors.username.error}>
        <View style={{ ...styles.inputWrap, height: 80 }}>

          <Animated.Text style={usernameLabelStyle}>Username</Animated.Text>
          <Input
            onFocus={() => setIsFocused(isFocused => ({ ...isFocused, ...{ username: true } }))}
            onBlur={() => setIsFocused(isFocused => ({ ...isFocused, ...{ username: false } }))}
            autoComplete='username'
            style={styles.input}
            variant='unstyled'
            placeholderTextColor="#999999"
            value={formData.username}

            onChangeText={(value) => {
              setFormData({ ...formData, username: value });
            }}

          />
        </View>
        <View paddingLeft='10px'>
          {errors.username.error ? (
            <View flexDirection='row' style={{ maxHeight: 50 }} >
              <Icon as={Ionicons} name='warning' size={4} color='red.500' style={{ marginTop: 3 }} />
              <FormControl.ErrorMessage style={{ marginTop: 0 }} >
                {errors.username.message}
              </FormControl.ErrorMessage>
            </View>
          ) : null}
        </View>
      </FormControl>
      <View minHeight='110px' maxHeight='130px'>
        <FormControl style={styles.inputWrap} marginTop={3} isRequired isInvalid={errors.password.error}>
          <Animated.Text style={passwordLabelStyle}>Password</Animated.Text>
          <Input
            onFocus={() => setIsFocused(isFocused => ({ ...isFocused, ...{ password: true } }))}
            onBluzr={() => setIsFocused(isFocused => ({ ...isFocused, ...{ password: false } }))}
            textContentType="password"
            autoComplete="password"
            variant='unstyled'
            style={styles.input}
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Icon
                as={Ionicons}
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={5}
                mr="2"
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
          <View paddingLeft='10px' marginTop='2px'  >
            {errors.password.error ? (
              <View flexDirection='row' >
                <Icon as={Ionicons} marginTop='12px' name='warning' size={4} color='red.500' />
                <FormControl.ErrorMessage >
                  {errors.password.message}
                </FormControl.ErrorMessage>
              </View>
            ) : null}
          </View>
        </FormControl>
      </View>
      <View maxHeight='130px'>

        <FormControl style={styles.inputWrap} isRequired isInvalid={errors.confirm_password.error}>
          <Animated.Text style={confirmPasswordLabelStyle}>Confirm Password</Animated.Text>
          <Input
            onFocus={() => setIsFocused(isFocused => ({ ...isFocused, ...{ confirm_password: true } }))}
            onBlur={() => setIsFocused(isFocused => ({ ...isFocused, ...{ confirm_password: false } }))}
            textContentType="password"

            variant='unstyled'
            style={styles.input}
            type={showConfirmPassword ? 'text' : 'password'}
            InputRightElement={
              <Icon
                as={Ionicons}
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={5}
                mr="2"
                color="muted.500"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }

            // placeholder="Password"
            value={formData.confirm_password}
            onChangeText={(value) => {
              setFormData({ ...formData, confirm_password: value });
            }}
          />
          <View paddingLeft='10px' marginTop='2px' >
            {errors.confirm_password.error ? (
              <View flexDirection='row' >
                <Icon as={Ionicons} marginTop='12px' marginBottom='35px' name='warning' size={4} color='red.500' />
                <FormControl.ErrorMessage >
                  {errors.confirm_password.message}
                </FormControl.ErrorMessage>
              </View>
            ) : null}
          </View>
        </FormControl>
      </View>
      {/* <Button marginBottom='20px' height='50px' width='100%' style={styles.submitButton} bgColor="#663399" onPress={() => onSubmit()} isLoading={buttonLoading} >
        <Text style={styles.submitButtonText}>Register</Text>
      </Button> */}
      <Button marginBottom='20px' height='50px' width='100%' style={styles.submitButton} isDisabled={buttonLoading} colorScheme='purple' onPress={() => onSubmit()} isLoading={buttonLoading}>
        <Text style={styles.submitButtonText}>Register</Text> 
      </Button>
      <Text onPress={() => { navigation.replace('Login') }} marginBottom='100px' color='muted.400'>Already Here? <Text underline>Log In</Text> now!</Text>
    </View>
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
    // marginTop: 20
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
