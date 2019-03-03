import React from 'react';
import { Layout } from 'antd';
import DataList from './list';

const {
  Header, Sider, Content,
} = Layout;

export default class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <DataList />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
