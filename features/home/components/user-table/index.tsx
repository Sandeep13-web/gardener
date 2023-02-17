import { Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react';

import { getUserTableData } from '@store/actions/user-table-actions';
import { useAppDispatch, useAppSelector } from '@store/redux-Hooks';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  address: string;
  quality: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Qualities',
    key: 'quality',
    dataIndex: 'quality',
    render: (_, { quality }) => (
      <>
        {quality.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'aggregate') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UserTable: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserTableData());
  }, []);
  const { Users } = useAppSelector((state) => state.userTable);
  const data: any = Users.map((item, index) => {
    return {
      key: item.id,
      name: item.name,
      address: item.address.city,
      quality: item.company.bs.split(' '),
    };
  });
  return <Table columns={columns} dataSource={data} />;
};
export default UserTable;
