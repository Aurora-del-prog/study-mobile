import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './service/apollo.ts'
import { ConfigProvider } from "antd-mobile";
import zhCn from 'antd-mobile/es/locales/zh-CN'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCn}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </ConfigProvider>
)
