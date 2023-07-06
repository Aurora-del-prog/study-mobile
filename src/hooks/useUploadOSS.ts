import { useQuery } from '@apollo/client';
import { GET_OSS_INFO } from '../graphql/oss';

export const useUploadOSS = () => {
  // 使用 useQuery 钩子获取 OSS 信息
  const { data: d } = useQuery(GET_OSS_INFO);

  // 上传处理函数
  const uploadHandler = async (file: File) => {
    const formData = new FormData();
    const data = d.getOSSInfo;

    // 获取文件后缀名
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    const key = `images/${filename}`;

    // 将相关参数添加到 formData
    formData.append('key', key);
    formData.append('policy', data.policy);
    formData.append('OSSAccessKeyId', data.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', data.signature);
    formData.append('file', file);

    // 发起上传请求
    const res = await fetch(data.host, {
      method: 'POST',
      body: formData,
    });

    // 返回上传成功后的 URL
    return { url: res.url + key };
  };

  return uploadHandler;
};