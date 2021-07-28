import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import { useCallback, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = styled.div`
  color: red;
`;
const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [Nickname, onChangeNickname] = useInput("");
  const [Password, onChangePassword] = useInput("");

  const [PasswordCheck, setPasswordCheck] = useState("");
  const [PasswordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== Password);
    },
    [Password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState("");
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);
  const onSubmit = useCallback(() => {
    if (Password !== PasswordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, Nickname, Password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        passwordCheck,
        term,
      },
    });
  }, [email, Password, PasswordCheck, term]);
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-eamil">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
            type="email"
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={Nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={Password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-passwordCheck">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={PasswordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {PasswordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            말을 잘 들을것을 동의함
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div stlye={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
