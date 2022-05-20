/* eslint-disable react/prop-types */
import { connect } from 'react-redux';
import Layout from 'components/Layouts';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsDarkMode } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import HomeSearch from './HomeSearch';
import HomeOverview from './HomeOverview';
import HomeLastest from './HomeLastest';

import { makeSelectTotalOverviews } from './selectors';

const key = 'homePage';

function HomePage({ totalOverviews }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Layout isShowBackground>
      <HomeSearch />
      <HomeOverview />
      <HomeLastest />
    </Layout>
  );
}

HomePage.propTypes = {
  // totalOverviews: PropTypes.number
};
const mapStateToProps = createStructuredSelector({
  totalOverviews: makeSelectTotalOverviews(),
  isDarkMode: makeSelectIsDarkMode(),
});

export default connect(mapStateToProps)(HomePage);
