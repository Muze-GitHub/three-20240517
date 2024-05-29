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
- 介绍：基于 yjs 实现的协同文档。
- 实现逻辑: yjs 是基于 CRDT 算法实现的协同功能，在 CRDT 算法中，每个用户对数据的修改都会被记录下来，并在其他用户的客户端进行合并，以实现数据的一致性。CRDT 算法的优点在于它可以适用于大规模的分布式系统，并且不需要中心化的服务器进行协同调度。但是，CRDT 算法在处理复杂操作时可能会存在合并冲突的问题，需要设计复杂的合并函数来解决。
