'use client'
import Image from 'next/image'
import { article } from './article'
import { useEffect, useRef, useState } from 'react'

const WaterFall = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [data, setData] = useState<any>([])

  const gap = 10
  const cardWidth = 250

  const FetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(article)
      }, 1000)
    })
  }

  const getData = async () => {
    let articleData: any = await FetchData()
    const imageUrl =
      'https://sns-webpic-qc.xhscdn.com/202407031547/bbfbfb7531ed4e13f7bc7dfe1ed75ab1/1040g008314k3uaasmi5g5ov0ta6pgt96mfptef0!nc_n_webp_mw_1'
    const imageUrl2 =
      'https://sns-webpic-qc.xhscdn.com/202407031605/d41ba85e9ac44746bb43a315b2ca88c6/1040g008314iss5ksmk504a3574o29ehsde58g68!nc_n_webp_mw_1'
    articleData.forEach((item: any, index: number) => {
      item.note_card.cover.url_default = index % 2 === 0 ? imageUrl : imageUrl2
    })
    console.log(articleData)
    setData(articleData)
  }

  const ScrollFn = () => {
    console.log(window.scrollY)
  }

  //计算布局函数
  const calculatePositions = () => {
    if (!containerRef.current) return
    // 获取瀑布流容器
    const container = containerRef.current
    // 获取子元素数组HTMLCollection，这是一个伪数组，无法直接通过 forEach，所以要先转为常规数组
    const { children } = container
    let col = Math.min(Math.floor(window.innerWidth / (cardWidth + gap)), 5)
    // 高度数组
    const columnHeight = new Array(col).fill(0)
    Array.from(children).forEach((child) => {
      const childHeight = child.clientHeight
      // 找到高度最小的列 并 获取下标
      const minCol = Math.min(...columnHeight)
      const colum = columnHeight.indexOf(minCol)
      // 距离左边的距离 =  卡片的宽度 * 列数 + gap * 列数。注：这个列是下标，从 0 开始
      const left = (cardWidth + gap) * colum
      // 距离顶部的高度 = 卡片的高度 + gap
      const top = columnHeight[colum] + gap
      child.style.position = 'absolute'
      child.style.transform = `translate(${left}px,${top}px)`
      // 给数组填充回高度数据
      columnHeight[colum] += childHeight + gap
    })
    //填充容器高度，让瀑布流可以居中
    container.style.height = `${Math.max(...columnHeight)}px`
    container.style.width = `${cardWidth * col + gap * (col - 1)}px`
  }

  useEffect(() => {
    getData()
    calculatePositions()

    window.addEventListener('resize', calculatePositions)
    window.document.addEventListener('scroll', ScrollFn)
    return () => {
      window.removeEventListener('resize', calculatePositions)
    }
  }, [])

  return (
    <div ref={containerRef} className=" m-auto" style={{}}>
      {data.map((item: any, index: number) => {
        const { url_default, width, height } = item.note_card.cover
        const { avatar, nickname } = item.note_card.user
        const { display_title } = item.note_card
        return (
          <div
            key={index}
            className="  duration-300"
            style={{ width: `${cardWidth}px` }}
          >
            <Image
              src={url_default}
              alt="cover"
              width={width}
              height={height}
              className=" max-h-[340px] rounded-[10px]  w-full object-cover mb-[5px]"
              onLoad={calculatePositions}
            />
            <p>{display_title}</p>
            <div className="flex items-center">
              <Image
                src={avatar}
                height={30}
                width={30}
                alt="avatar"
                className=" rounded-full mr-[5px]"
              />
              <span>{nickname}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WaterFall
