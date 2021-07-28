import PropTypes from "prop-types";
import Link from "next/Link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row{
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child{
    padding-left: 0 !important
  }

  .ant-col:last-child{
    padding-right: 0 !important
  }
`;
const AppLayout = ({ children }) => {
  // isLoggedIn이 바뀌면 AppLayout컴포넌트가 리렌더링됨
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      {/* 
        gutter는 Col사이의 간격을 벌릴때 사용
       */}
      <Row gutter={8}>
        {/* 
        모바일    xs
        태블릿    sm
        데스크탑  md
        Col은 24등분으로 구성되어있어서
        xs={24}라는건 모바일 사이즈일때 100%를 차지한다는뜻
        md={6}은 데스크탑 사이즈로 되면 25%를 차지한다는뜻임

        정확한 사이즈는 antd의 Grid를 참고
       */}
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          오른쪽메뉴
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = { children: PropTypes.node.isRequired };

export default AppLayout;
