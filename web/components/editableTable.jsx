import React from 'react';
import {
  Form, Button, Table, Popconfirm,
} from 'antd';
import EditableCell from './editableCell';

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'id',
        dataIndex: 'key',
        width: '10%',
      },
      {
        title: '拦截API',
        dataIndex: 'api',
        editable: true,
      },
      {
        title: '域名',
        dataIndex: 'url',
        editable: true,
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="确定删除吗？" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            ) : null
        ),
      },
    ];

    this.state = {
      dataSource: [
        {
          key: 1,
          api: '/test/api',
          url: 'http://localhost',
        },
      ],
      count: 1,
    };
  }

  componentWillMount() {
    if (!this.isSupportLocalStorage()) return;
    const { rules } = window.localStorage;
    if (typeof rules === 'undefined') return;
    const { dataSource: oldDataSource, count: oldCount } = JSON.parse(rules);
    this.setState({ dataSource: oldDataSource, count: oldCount });
  }

  componentDidUpdate() {
    if (!this.isSupportLocalStorage()) return;
    const rules = this.state;
    window.localStorage.rules = JSON.stringify(rules);
  }

  componentWillUnmount() {
    if (!this.isSupportLocalStorage()) return;
    const rules = this.state;
    window.localStorage.rules = JSON.stringify(rules);
  }

  isSupportLocalStorage =() => (!!window.localStorage)

  handleDelete = (key) => {
    const { dataSource } = this.state;
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count + 1,
      api: `/test/api/${count}`,
      url: 'http://localhost',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave = (row) => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          添加一行
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
