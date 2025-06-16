'use client'
import React, { useEffect, useRef, useState } from 'react'
import EditTemplate from '@/app/upload-manager/edit/page'
import {
  Button,
  Form,
  Layout,
  Nav,
  Collapse,
  Avatar,
  Select,
  Space,
  Toast,
  Notification,
  Typography,
  Tabs,
  TabPane,
} from '@douyinfe/semi-ui'
import { registerMediaQuery, responsiveMap } from '@/app/lib/utils'
import { IconPlusCircle, IconStar, IconGlobe } from '@douyinfe/semi-icons'
import useSWR from 'swr'
import { fetcher, put } from '@/app/lib/api-streamer'
import useSWRMutation from 'swr/mutation'
import { FormApi } from '@douyinfe/semi-ui/lib/es/form'
import { useBiliUsers } from '../lib/use-streamers'
import styles from '../styles/dashboard.module.scss'

// 注册各平台组件
import plugins from '../ui/plugins'
import Global from '../ui/plugins/global'
import Developer from '../ui/plugins/developer'


const Dashboard: React.FC = () => {
  const { Header, Content } = Layout
  const { data: entity, error, isLoading } = useSWR('/v1/configuration', fetcher)
  const { trigger } = useSWRMutation('/v1/configuration', put)
  const formRef = useRef<FormApi>()
  // const [formKey, setFormKey] = useState(0); // 初始化一个key
  // 触发表单重新挂载
  // const remountForm = () => {
  //     setFormKey((prevKey) => prevKey + 1); // 更新key的值
  // };

  // const [labelPosition, setLabelPosition] = useState<
  //     "top" | "left" | "inset"
  // >("inset");
  // useEffect(() => {
  //     const unRegister = registerMediaQuery(responsiveMap.lg, {
  //         match: () => {
  //             setLabelPosition("left");
  //         },
  //         unmatch: () => {
  //             setLabelPosition("top");
  //         },
  //     });
  //     return () => unRegister();
  // }, []);

  // useEffect(() => {
  //     remountForm();
  // }, [entity]);

  const { biliUsers } = useBiliUsers()

  if (isLoading) {
    return <>Loading</>
  }
  if (error) {
    return <> error {JSON.stringify(error)}</>
  }

  const list = biliUsers?.map(item => {
    return {
      value: item.value,
      label: (
        <>
          <Avatar size="extra-small" src={item.face} />
          <span style={{ marginLeft: 8 }}>{item.name}</span>
        </>
      ),
    }
  })
  // const handleSelectChange = (value) => {
  //         let text = value === 'male' ? 'Hi male' : 'Hi female!';
  //         formRef.current?.setValue('Note', text);
  //     };

  return (
    <>
      <Header
        style={{
          backgroundColor: 'var(--semi-color-bg-1)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          // height: '56px', // 如果Nav组件自身没有固定高度，可以在这里强制，但通常Nav mode="horizontal"有默认高度
          // borderBottom: '1px solid var(--semi-color-border)', // 统一底部边框样式
        }}
      >
        <Nav
          header={
            <>
              <div
                style={{
                  backgroundColor: '#6b6c75ff',
                  borderRadius: 'var(--semi-border-radius-large)',
                  color: 'var(--semi-color-bg-0)',
                  display: 'flex',
                  // justifyContent: 'center',
                  padding: '6px',
                }}
              >
                <IconStar size="large" />
              </div>
              <h4 style={{ marginLeft: '12px' }}>空间配置</h4>
            </>
          }
          footer={
            <Button
              onClick={() => {
                formRef.current?.submitForm()
              }}
              icon={<IconPlusCircle />}
              theme="solid"
              style={{ marginRight: 10 }}
            >
              保存
            </Button>
          }
          mode="horizontal"
          // style={{ height: '100%' }} // 确保Nav填满Header的高度
          // className={styles.pageHeaderNav} // 可以添加自定义类名以便更精确控制
        ></Nav>
      </Header>
      <Content>
        <main className={styles.rootConfigPanel}>
          <div className={styles.main}>
            <div className={styles.content}>
              <Form
                className={styles.form}
                // key={formKey}
                initValues={entity}
                onSubmit={async values => {
                  try {
                    await trigger(values)
                    Toast.success('保存成功')
                  } catch (e: any) {
                    // error handling
                    Notification.error({
                      title: '保存失败',
                      content: <Typography style={{ maxWidth: 450 }}>{e.message}</Typography>,
                      // theme: 'light',
                      // duration: 0,
                      style: { width: 'min-content' },
                    })
                    throw e
                  }
                }}
                getFormApi={formApi => (formRef.current = formApi)}
              >
                <Tabs
                  type="line"
                  contentStyle={{
                    maxWidth: 965,
                    // marginLeft: 'auto',
                    // marginRight: 'auto',
                    margin: '10px auto 0 auto',
                  }}
                >
                  <TabPane tab="全局设置" itemKey="1">
                    {/* 全局设置 */}
                    <Global />
                  </TabPane>
                  <TabPane tab="各平台下载" itemKey="2">
                    {/* 各平台下载 */}
                    <div className={styles.framePlatformConfig}>
                      <div className={styles.frameInside}>
                        <div className={styles.group}>
                          <div className={styles.buttonOnlyIconSecond}>
                            <div
                              className={styles.lineStory}
                              style={{
                                color: 'var(--semi-color-bg-0)',
                                display: 'flex',
                              }}
                            >
                              <IconGlobe size="small" />
                            </div>
                          </div>
                        </div>
                        <p className={styles.meegoSharedWebSettin}>各平台下载设置</p>
                      </div>
                      <Collapse keepDOM style={{ width: '100%' }}>
                        {Object.entries(plugins)
                          .filter(([key]) => key !== 'Cookie')
                          .map(([key, Plugin]) => (
                            <Plugin entity={entity} list={list} />
                          ))}
                        <plugins.Cookie entity={entity} list={list} />
                      </Collapse>
                    </div>
                  </TabPane>
                  <TabPane tab="开发者选项" itemKey="3">
                    {/* 开发者选项 */}
                    <Developer />
                  </TabPane>
                </Tabs>
                <Space />
                <Space style={{ height: '160px' }} />
              </Form>
            </div>
          </div>
        </main>
      </Content>
    </>
  )
}

export default Dashboard
