import { Alert } from 'smallfish/antd';
import { Link } from 'smallfish/router';

export default () => (
  <div>
    <Alert message="smallfish" />
    <Link to="/2">to 2</Link>
  </div>
);
