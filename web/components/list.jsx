import React from 'react';
import EditableTable from './editableTable';

export default class ContentList extends React.Component {
  render() {
    return (
      <div>
        <h1>代理列表信息:</h1>
        <EditableTable />
      </div>
    );
  }
}
