'use client'
import useCounter from '@/hooks/useCounter'
import { useEffect, useRef, useState } from 'react'

const Hooks = () => {
  const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 })
  //虚拟列表参数
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollOptions, setScrollOptions] = useState({
    startIndex: 0,
    endIndex: 0
  })
  const itemHeight = 60 //一个item的高度
  const itemMarginBottom = 10 //一个item的margin-bottom
  const itemAllHeight = itemHeight + itemMarginBottom
  const moreItem = 0 //列表上下预留的 item 数量
  const ArrayNumber = 100 //数据数量

  // const ArrayHeight = new Array(ArrayNumber).fill('')
  //如果是不定高的情况下，利用一个数组对象存储高度数据，每个对象有两个 key,分别是 item 的高度 height 和距离上面的距离
  // const ArrayHeight = [{height:60,top:0},{height:61,top:60},{height:39,top:121}]
  const ArrayHeight = [
    { height: 60, top: 0 },
    { height: 61, top: 0 },
    { height: 39, top: 0 },
    { height: 49, top: 0 },
    { height: 59, top: 0 },
    { height: 69, top: 0 },
    { height: 69, top: 0 },
    { height: 69, top: 0 },
    { height: 60, top: 0 },
    { height: 69, top: 0 },
    { height: 69, top: 0 },
    { height: 69, top: 0 }
  ]
  for (let index = 1; index < ArrayHeight.length; index++) {
    ArrayHeight[index].top =
      ArrayHeight[index - 1].top + ArrayHeight[index - 1].height
  }

  const GetScrollIndex = () => {
    const container = containerRef.current
    if (!container) return

    const scrollTop = containerRef.current!.scrollTop
    const containerHeight = container!.clientHeight
    // 1. 定高的情况
    // let startIndex = Math.floor(scrollTop / itemAllHeight) - moreItem
    // if (startIndex < 0) startIndex = 0
    // const endIndex =
    //   Math.floor((scrollTop + containerHeight) / itemAllHeight) + moreItem
    // 2. 不定高的情况
    let startIndex =
      ArrayHeight.findIndex((i) => i.top >= scrollTop) - 1 - moreItem
    if (startIndex < 0) startIndex = 0
    let endIndex =
      ArrayHeight.findIndex((i) => i.top >= scrollTop + containerHeight) +
      moreItem
    if (endIndex === -1) endIndex = ArrayHeight.length - 1
    setScrollOptions({ startIndex, endIndex })
  }

  useEffect(() => {
    GetScrollIndex()
  }, [])

  return (
    <div className="text-center h-screen overflow-hidden">
      {/* useCounter */}
      <div className=" p-7 border-solid border-white border-[1px] m-[20px]">
        <p className="text-[32px]">useCounter</p>
        <p className="text-[32px]">{count}</p>
        <button
          className=" border-solid border-white  border-[1px] mr-2 p-1"
          onClick={inc}
        >
          inc
        </button>
        <button
          className=" border-solid border-white  border-[1px] mr-2 p-1"
          onClick={dec}
        >
          dec
        </button>
        <button
          className=" border-solid border-white  border-[1px] mr-2 p-1"
          onClick={() => set(100)}
        >
          set
        </button>
        <button
          className=" border-solid border-white  border-[1px] mr-2 p-1"
          onClick={() => reset(6)}
        >
          reset
        </button>
      </div>
      {/* useVirtualList */}
      <div className=" p-7 border-solid border-white border-[1px] m-[20px]">
        <p className="text-[32px]">useVirtualList</p>
        <div
          id="container"
          className=" w-[80%] h-[200px] overflow-auto m-auto "
          ref={containerRef}
          onScroll={GetScrollIndex}
        >
          {/* <div style={{ height: itemAllHeight * scrollOptions.startIndex }} /> */}
          <div style={{ height: ArrayHeight[scrollOptions.startIndex].top }} />
          {ArrayHeight.map((item, index) => {
            if (
              index >= scrollOptions.startIndex &&
              index <= scrollOptions.endIndex
            )
              return (
                <div
                  key={index}
                  id={`item-${index}`}
                  className=" w-full border-[1px] border-solid flex  justify-center items-center"
                  // style={{ height: itemHeight, marginBottom: itemMarginBottom }}
                  style={{ height: item.height }}
                >
                  index {index}
                </div>
              )
            return null
          })}
          <div
            style={{
              height:
                ArrayHeight[ArrayHeight.length - 1].top -
                ArrayHeight[scrollOptions.endIndex].top
            }}
          />
          {/* <div
            style={{
              height: itemAllHeight * (ArrayNumber - scrollOptions.endIndex)
            }}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Hooks
