import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Layout from 'components/Layouts';
import LoadingIcon from 'components/LoadingIcon';
import RegisterModal from './Register';
import reducer from './reducer';
import saga from './saga';
import { makeSelectIsLoadingProducts, makeSelectProducts } from './selectors';
import { requestProducts } from './actions';
import FormLogin from './Form';

const key = 'loginPage';

function LoginPage({ dispatch, isLoadingProducts }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(requestProducts());
  }, []);

  return (
    <Layout isShowBackground>
      {isLoadingProducts ? (
        <LoadingIcon />
      ) : (
        <>
          <FormLogin setOpenForm={setOpenForm} />
          {openForm && <RegisterModal setOpenForm={setOpenForm} />}
        </>
      )}
    </Layout>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  isLoadingProducts: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  isLoadingProducts: makeSelectIsLoadingProducts(),
});

export default connect(mapStateToProps)(LoginPage);
