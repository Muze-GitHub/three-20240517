# 3D 看房 - three.js

- 路由 [/panorama]
- 介绍：基于 three.js 的全景图实现的 3D 效果，可用作 VR 看房。
- 实现逻辑：通过创建一个球体模型，并将全景图（专业设备拍摄，图片的最左边和最右边是连起来的）贴在球体上，通过 scale(x,x,-x) 设置 z 轴 为负数，这样子就可以将贴图贴在球体的内壁，将相机处于球体的正中心，这样就实现基础的 3D 看房效果。
  ![效果图](https://fms.res.meizu.com/dms/2024/05/29/d82293ab-e28e-4776-9fa7-8d5b08f86cb4.jpg)

## vue 源码链接[https://github.com/ljnMeow/360-house-viewing]

## 项目预览链接[https://ljnmeow.github.io/360-house-viewing/dist/]

## 切割图片为立方体纹理[https://matheowis.github.io/HDRI-to-CubeMap/]

# 协同文档 - yjs

- 路由 [/yjs]
- 介绍：基于 yjs 实现的协同文档, 项目跑起来后，打开两个浏览器（如谷歌和 Safari），在一个浏览器输入内容的时候，另一个浏览器也会实时输入这些内容,达到同时拼写的效果。
- 实现逻辑: yjs 是基于 CRDT 算法实现的协同功能，在 CRDT 算法中，每个用户对数据的修改都会被记录下来，并在其他用户的客户端进行合并，以实现数据的一致性。CRDT 算法的优点在于它可以适用于大规模的分布式系统，并且不需要中心化的服务器进行协同调度。但是，CRDT 算法在处理复杂操作时可能会存在合并冲突的问题，需要设计复杂的合并函数来解决。
- 配置平台:需要获取 appId 和 token[https://cloud.tiptap.dev/apps]
  ![效果图](https://fms.res.meizu.com/dms/2024/05/29/c76e89b2-d850-48e3-a05b-e52ae9a9d162.jpg)

## WebSocket + OT 算法实现简易版 协同文档

- 路由 [/websocket]
- 介绍：基于 WebSocket + OT 算法实现的简易版 协同文档，项目跑起来后，打开两个浏览器（如谷歌和 Safari），在一个浏览器输入内容的时候，另一个浏览器也会实时输入这些内容,达到同时拼写的效果。
- 实现逻辑：首先，客户端和服务器需要通过 websocket 建立连接，然后客户端的操作行为会通过一定的转换发送给服务器，例如 Slate.js 的 JSON 模型，通过 insert_text、remove_text 等等操作来完成对操作行为的描述。服务器在一定的休止时间或者接收到足够多的操作以后，当发生并发冲突的时候（例如同一时间接收到两个冲突的操作行为），就会经过 OT ( Operation Transform ) 算法对服务器本地的文档进行转换，然后向客户端广播不同的操作行为，这个操作行为每个客户端不一定一致的，有冲突的操作行为会通过 OT 算法进行冲突的解决，客户端接收到服务器广播的操作命令以后，就会执行这些命令来更新本地的文档以保持文档的一致性。

## 伪 3D 模型 汽车 - 图片模型

-- 路由 [/car]
-- 介绍: 利用 30 多张多角度多平面图，在鼠标位移的情况下更换图片的显示，实现 3D 效果。
-- 参考链接 [https://m.dongchedi.com/auto/series/6187/images-wg]
-- 实现逻辑: 首先将所有图片定位到同一个位置，只显示第一张图片，并设置两个变量 currentIndex = 0 和 carPositionX = 0 ，其他的 opacity 设置为 0 ，利用 touchStart 和 touchMove 事件，记录初始的位置 clientX 和 移动后的 clientX ，如果两个相减大于设定的阈值，那就是向右移动，将 currentIndex 加一，如果 currentIndex 超出图片数量，则 currentIndex = 0。
