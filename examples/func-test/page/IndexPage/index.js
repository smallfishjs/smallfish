import { Alert, Icon, Button } from 'smallfish/antd';
import { Link } from 'smallfish/router';
import { connect } from 'smallfish/dva';
import { PageHeader } from 'smallfish/ant-design-pro';
import styled from 'smallfish/styled';

const CustomButton = styled.div`
  border: 1px solid #eee;
  width: 100px;
  height: 20px;
  line-height: 20px;
  text-align: center;
`;

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
    <CustomButton>Custom</CustomButton>
  </div>
));
