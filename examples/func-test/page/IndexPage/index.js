import { Alert, Icon, Button } from 'smallfish/antd';
import { Link } from 'smallfish/router';
import { connect } from 'smallfish/dva';
import { PageHeader } from 'smallfish/ant-design-pro';

export default connect(({ global }) => ({
  global,
}))(props => (
  <div>
    <Alert message={props.global.slogan} />
    <Link to="/2">to 2</Link>
    <PageHeader
      title="Hello smallfish"
      breadcrumbList={[{ title: 'ttest' }]}
      action={
        <Button type="primary">
          <Icon type="plus" />
          <span>Create Budget Pool</span>
        </Button>
      }
    />
  </div>
));
