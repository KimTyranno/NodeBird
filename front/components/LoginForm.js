import { Button, Form, Input } from "antd";
import Link from "next/Link";
import { useCallback, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";
// div태그면서 css를 적용시킴
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginForm = () => {
  // 각각의 reducer에 initialState를 설정해두면 컴포넌트에서 useSelector로 가져올 수 있다.
  // 이렇게 가져온 prop은 값이 바뀌게 되면 리렌더링된다.
  const { loginLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [Password, onChangePassword] = useInput("");

  // 컴포넌트의 props로 넘겨주는 함수는 useCallback을 쓰면 최적화가 된다
  const onSubmitForm = useCallback(() => {
    console.log(email, Password);
    dispatch(loginRequestAction({ email, Password }));
  }, [email, Password]);
  return (
    // onFinish에는 e.preventDefault가 적용되어있으므로 그 처리를 안해도된다.
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
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
      {/* 
        태그에다가 직접 스타일을 지정하면 
        리액트의 virtualDom이 리렌더링 시켜버리니까 (직접 스타일을 지정한 부분만
        Styled-components를 쓰면된다. 
        
        성능에 크게 문제가 없으면 그냥 인라인으로 써도됨.
        styled-components로 쓰면 최적화할때 좋다.
      */}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
          로그인
        </Button>
        {/* href는 Link에 넣는게 좋고, a태그에는 안넣는게 좋다  */}
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
      <div></div>
    </FormWrapper>
  );
};

export default LoginForm;
