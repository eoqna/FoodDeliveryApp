import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null); // generic : 타입
  const passwordRef = useRef<TextInput | null>(null);
  
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    if(!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }

    if(!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    
    Alert.alert('알림', '로그인 되었습니다..');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp')
  }, [navigation]);

  const canGoNext = email && password;

  return (
    <View>
      <View
        style={styles.inputWrapper}
      >
        <Text
          style={styles.label}
        >
          이메일
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder='이메일을 입력해주세요.'
          value={email}
          importantForAutofill='yes'
          autoComplete='email'
          textContentType='emailAddress'
          keyboardType='email-address'
          returnKeyType='next'
          ref={emailRef}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          onChangeText={onChangeEmail}
          clearButtonMode='while-editing'
        />
      </View>

      <View
        style={styles.inputWrapper}
      >
        <Text
          style={styles.label}
        >
          비밀번호
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder='비밀번호를 입력해주세요.'
          value={password}
          ref={passwordRef}
          secureTextEntry
          importantForAutofill='yes'
          autoComplete='password'
          textContentType='password'
          clearButtonMode='while-editing'
          onChangeText={onChangePassword}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View
        style={styles.buttonWrapper}
      >
        <Pressable
          style={
            !canGoNext
              ? styles.loginButton 
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          onPress={onSubmit}
          disabled={!canGoNext}
        >
          <Text
            style={styles.loginButtonText}
          >
            로그인
          </Text>
        </Pressable>

        <Pressable
          onPress={toSignUp}
        >
          <Text
          >
            회원가입
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonWrapper: {
    alignItems: 'center',

  }
})

export default SignIn;