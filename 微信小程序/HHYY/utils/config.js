var fileHost = "https://huahaoyueyuan.oss-cn-beijing.aliyuncs.com";//阿里云oss地址
var config = {
  uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
  AccessKeySecret: '8gBqRccLNgu0TsDwQDIW2C7R5N4jWA',        // AccessKeySecret 去你的阿里云上控制台上找
  OSSAccessKeyId: 'LTAIOanADrOQejGk',         // AccessKeyId 去你的阿里云上控制台上找
  timeout: 80000, //这个是上传文件时Policy的失效时间
};
module.exports = config
