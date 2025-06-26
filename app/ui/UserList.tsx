import React, { useRef, useState } from 'react'
import {
  requestDelete,
  sendRequest,
  User,
} from '../lib/api-streamer'
import {
  Button,
  Form,
  List,
  Modal,
  Notification,
  Row,
  SideSheet,
  Toast,
  Typography,
} from '@douyinfe/semi-ui'
import AvatarCard from './AvatarCard'
import { IconPlusCircle } from '@douyinfe/semi-icons'
import { FormApi } from '@douyinfe/semi-ui/lib/es/form'
import useSWRMutation from 'swr/mutation'
import { useBiliUsers } from '../lib/use-streamers'
import { useWindowSize } from 'react-use';

type UserListProps = {
  onCancel?: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void
  visible?: boolean
  children?: React.ReactNode
}
const UserList: React.FC<UserListProps> = ({ onCancel, visible }) => {
  const { trigger } = useSWRMutation('/v1/users', sendRequest<User>)
  const { trigger: deleteUser } = useSWRMutation('/v1/users', requestDelete)
  const { biliUsers: list } = useBiliUsers()
  const [modalVisible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { width } = useWindowSize()
  const showDialog = () => {
    setVisible(true)
  }

  const addUser = async (value: any) => {
    setConfirmLoading(true)
    try {
      const ret = await fetcher(`/bili/space/myinfo?user=${value}`, undefined)
      if (ret.code) {
        throw new Error(ret.message)
      }
      await trigger({
        id: 0,
        name: value,
        value: value,
        platform: 'bilibili-cookies',
      })
      setVisible(false)
      Toast.success('创建成功')
    } catch (e: any) {
      let messageObj = e.message
      try {
        messageObj = JSON.parse(messageObj).error
      } catch (e: any) {
        console.log(e)
      }
      return Notification.error({
        title: '创建失败',
        content: (
          <Typography.Paragraph style={{ maxWidth: 450 }}>{messageObj}</Typography.Paragraph>
        ),
        // theme: 'light',
        // duration: 0,
        style: { width: 'min-content' },
      })
    } finally {
      setConfirmLoading(false)
    }
  }
  const handleOk = async () => {
    let values = await api.current?.validate()
    await addUser(values?.value)
  }
  const handleCancel = () => {
    setVisible(false)
    console.log('Cancel button clicked')
  }
  const handleAfterClose = () => {
    console.log('After Close callback executed')
  }
  const updateList = async (id: number) => {
    try {
      await deleteUser(id)
      Toast.success('删除成功')
    } catch (e: any) {
      Notification.error({
        title: '删除失败',
        content: <Typography.Paragraph style={{ maxWidth: 450 }}>{e.message}</Typography.Paragraph>,
        // theme: 'light',
        // duration: 0,
        style: { width: 'min-content' },
      })
    }
  }
  const api = useRef<FormApi>()
  return (
    <SideSheet
      title={<Typography.Title heading={4}>用户管理</Typography.Title>}
      visible={visible}
      width={Math.min(448, width ?? Number.MIN_VALUE)}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={showDialog}
            icon={<IconPlusCircle size="large" />}
            style={{ marginRight: 4, backgroundColor: 'rgba(var(--semi-indigo-0), 1)' }}
          >
            新增
          </Button>
        </div>
      }
      headerStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
      bodyStyle={{ borderBottom: '1px solid var(--semi-color-border)' }}
      onCancel={onCancel}
    >
      <List
        className="component-list-demo-booklist"
        dataSource={list}
        split={false}
        size="small"
        style={{ flexBasis: '100%', flexShrink: 0 }}
        renderItem={
          item => (
            <AvatarCard
              url={item.face}
              abbr={item.name}
              label={item.name}
              value={item.value}
              onRemove={async () => await updateList(item.id)}
            />
          )
          // <div style={{ margin: 4 }} className='list-item'>
          //     <Button type='danger' theme='borderless' icon={<IconMinusCircle />} onClick={() => updateList(item)} style={{ marginRight: 4 }} />
          //     {item}
          // </div>
        }
      />

      <Modal
        title="添加 Bilibili 账号"
        visible={modalVisible}
        onOk={handleOk}
        style={{ width: 'min(600px, 90vw)' }}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
        confirmLoading={confirmLoading}
        bodyStyle={{
          overflow: 'auto',
          maxHeight: 'calc(100vh - 320px)',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Typography.Title heading={5}>通过 Cookie 文件添加</Typography.Title>
        <Form getFormApi={formApi => (api.current = formApi)}>
          <Form.Input
            field="value"
            label="Cookie 文件路径"
            trigger="blur"
            placeholder="例如: cookies.json 或 data/123456.json"
            rules={[{ required: true, message: '必须填写 Cookie 文件路径' }]}
          />
        </Form>
        <div style={{ marginTop: 24 }}>
          <Typography.Title heading={5}>如何获取 Cookie 文件？</Typography.Title>
          <Typography.Paragraph>
            由于 Bilibili 登录接口变动频繁，内置的扫码登录功能已移除。
            推荐使用官方维护的命令行工具 <Typography.Text strong>biliup-rs</Typography.Text> 来进行登录和获取 Cookie 文件。
          </Typography.Paragraph>
          <Button theme="light" type="secondary" onClick={() => window.open('https://biliup.github.io/biliup-rs/', '_blank')}>
            查看 biliup-rs 官方文档
          </Button>
        </div>
      </Modal>
    </SideSheet>
  )
}

export default UserList
