import { Alert } from 'smallfish/antd';
import { Link } from 'smallfish/router';
import { connect } from 'smallfish/dva';

export default connect(({ global }) => ({
  global,
}))(props => (
  <div>
    <Alert message={props.global.slogan} />
    <Link to="/2">to 2</Link>
  </div>
));
