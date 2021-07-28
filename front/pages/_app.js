import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";
//페이지에서 공통되는걸 처리하는 파일임
const NodeBird = ({ Component }) => {
  return (
    // next redux에서는 자동으로 provider로 감싸주기때문에
    // 원래 redux를 적용하듯이 최상위에서 provider로 감싸줄 필요가 없다.
    // 감싸주면 오히려 중복이 되어 에러발생
    <>
      {/* head컴포넌트가 따로 있어서 head에 원하는 정보를 넣을 수 있다. */}
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default wrapper.withRedux(withReduxSaga(NodeBird));
