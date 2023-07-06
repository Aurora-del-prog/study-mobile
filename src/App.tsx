import { useMutation } from '@apollo/client'
import { UPDATE } from './graphql/demo'
import { Button, Form, Input, ImageUploader } from 'antd-mobile'
import { useUploadOSS } from './hooks/useUploadOSS'

import styles from './App.module.less';
import classNames from 'classnames';


const App = () => {
  //处理图片上传,后端通过key返回合适的签名和策略等，前端拿到数据用fetch实现上传图片或者文件，然后OSS放回对应url进行展示
  const uploadHandler = useUploadOSS()

  const [update] = useMutation(UPDATE)
  const onClickHandler = (v: any) => {
    update(
      {
        variables: {
          id: 'cb71e40d-9f15-40ef-a137-1acaa38831f4',
          params: {
            ...v,
          },
        },
      },
    );
  };
  return (
    <div className={styles.container }>
        <Form
          className={classNames(styles.form, styles.formPadding)}
          layout="horizontal"
          onFinish={onClickHandler}
          footer={(
            <Button block type="submit" color="primary" size="large">
              提交
            </Button>
        )}
        >
        <Form.Item
          name="name"
          label="姓名"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="描述"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="头像"
        >
          {/* 上传后悔返回一个url，显示对应的头像 */}
          <ImageUploader upload={uploadHandler} />
        </Form.Item>
      </Form> 
    </div>
  )
}

export default App
