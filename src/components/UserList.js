import { Button, Modal, Table } from 'antd';
import React from 'react'
import { useState } from 'react'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import Input from 'antd/es/input/Input';
const UserList = () => {
   // Getting contacts from redux state
  //  const users= 
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [userEdit,setUserEdit] = useState(null);
  const userData= useSelector((state)=>state);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataTobeDeleted, setDataTobeDeleted] = useState([]);
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      filteredValue:[searchText],
      onFilter:(value,record)=>{
        return String(record.name).toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.email).toLowerCase()
                .includes(value.toLowerCase()) ||
                String(record.role).toLowerCase()
                .includes(value.toLowerCase());
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render:(text,record) => (
        <>
        <EditOutlined
          onClick={() => {
            onEditUser(record);
          }}

        />
        <DeleteOutlined
         onClick={() => {
          onDeleteUser(record);
        }}
        style={{ color: "red", marginLeft: 12 }}/>
      </>
      )
    }

  ];

  const onDeleteUser = (record)=>{
    console.log(record);
    dispatch({type:'DELETE_USERS',payload:record.id});
  }
  const onEditUser = (record)=>{
    console.log(record);
    setEditing(true);
    setUserEdit({...record})
  }
  const resetEditng =()=>{
    setEditing(false);
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys,record) => {
      setSelectedRowKeys(selectedKeys);
      console.log(record);
      setDataTobeDeleted(record.map(row=> row.id));
      console.log(dataTobeDeleted);
    },
    onselect:(record)=>{
      console.log(record.id);
    },
    // onChange:(order)=>{
    //   console.log(order.id);
    // }
  };
  const handleDeleteAll = () => {

    dispatch({type:'DELETE_MANY_USERS',payload:dataTobeDeleted});
    setSelectedRowKeys([]);
  };
  return (
    <div>
      <Input.Search enterButton placeholder='Search by name,email or role' 
      style={{marginBottom:'10px',marginTop:'10px'}}
      onSearch={(value)=>{
        searchText(value);
      }}
      onChange={(e)=>{
        setSearchText(e.target.value);
      }}/>

        <Table
          dataSource={userData}
          columns={columns}
          rowKey='id'
          // rowKey={record => record.id}
          pagination={true}
          pageSize={10}
          rowSelection={rowSelection}
          total={userData.length}
        />
        <Modal
          title='Edit User'
          open={editing}
          okText='Save'
          onCancel={()=>{
            resetEditng();
          }}
          onOk={()=>{
            dispatch({ type: 'UPDATE_USERS', payload: userEdit });
            resetEditng();
          }}
          >
            <Input
            value={userEdit?.name}
            onChange={(e)=>{
              setUserEdit((user)=>{ return {...user,name:e.target.value} });
            }}/>
               <Input
            value={userEdit?.email}
            onChange={(e)=>{
              setUserEdit((user)=>{ return {...user,email:e.target.value} });
            }}/>
               <Input
            value={userEdit?.role}
            onChange={(e)=>{
              setUserEdit((user)=>{ return {...user,role:e.target.value} });
            }}/>
          </Modal>
        <Button type="primary" danger onClick={handleDeleteAll}>Delete</Button>

    </div>
  )
}

export default UserList