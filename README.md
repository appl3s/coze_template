# Coze Typescipt template

本项目创建了一个Coze Typescript的模板，可以方便快速的开始Coze插件研发和打包，自带混淆功能

## 快速开始

### 依赖安装

```bash
npm install
```

### 编译

```bash
npm run build
```

### 粘贴到Coze

```ts
// Coze生成的代码
import { Args } from '@/runtime';
import { Input, Output } from "@/typings/hello/hello";

export async function handler({ input, logger }: Args<Input>): Promise<Output> {
  return {
    // 完成函数调用
    meta: await impl(), // 因为eval返回的是函数本身，所以这里可以直接传入对象
  };
};

// 粘贴生成的ts代码
import { gunzipSync } from 'zlib';
let impl: any;
(async ()=>{
    impl = await eval(gunzipSync(Buffer.from('H4sIAAAAAAACE41UyW7bMBD9FeckMbZRcacq6BDAyNIlBZq2KOAaBcUldiJIgWxnqaF/L0nLsgPERQ+SZqh5M28eOYztulKrRV3Fv5NngjiEauQsrbGRCGweZTNwLkpSjXjuLCgS4QNwWqSC5T0oBtnTfFGa+ORkOgObVfOyw5KCitTk4wfZLM1VtYr7fLGvA8A794UkIcNx8lyY8BHQgtP4bYToEKfucZmH7gML5FGI4xSA4dsw42EuiJjCI308JNqcjjsHCbfMmCt7hGnaJYAewmQASU1DMvcYZyDiyh+BF1vaSGOPFx5SKOGT4NBKcRTJu4YxJnu2WCiXAjPFjuFM0lX0IMW2ClFud91zHoiwY4LZDg4tdZVSnIQEBdTHAKoTiOEgEfbxLAmUPVcetMYFyBY23p+LPN8ft6Ix8j4z5dIM+iM2jR7Wy3k0iw9WlvOFXbklALJWyZWa+58QWcUV2Pw3sm0DjEky8nJQCI2jScPxwMLbfmMILyB24XL5UqnBbloGVdwPB0xJWuBXw8GSxMh8E03O5PmX6H00N2VZ/3JaPdVNGQ0jHbWZqqtlXZppn8FrKMGWbkjw6peBYOZI9wS6cqEFyxkko2DRtLA9M0wltDLvunQj2pjVuumx+eHsQ51oC30SyrHVOAi5Xcx7axyHGtrrpOywGwZEKAXZ7qqwSnCT99WnPXh2UH4blbWjf7Vx0G3t5O7QVdY6L3slROiuv3CY1Jjn0wglGE7+3FffdTSKEEvh51t1f/bVOVCk7ON1bS/vnINpKtz9c2Oby5uV87ebNopEwgkTZrKeSOlcmiDdfLDntcdDQh7MxU9TOqesb907JZDR64v1nb7yARQjwRmx9tP8x7dolnUs95L3/fSMs/Zwf7Yb1v4F/nhHF6AFAAA=', 'base64')).toString('utf-8'));
})();
```

1. 参考`main_hello.ts`

## 开发

只需要新建`main_`开头的`ts`文件，则会在执行`npm run build`的时候自动在dist文件夹生成编译后的ts结果

