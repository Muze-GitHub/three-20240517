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
  const moreItem = 1 //列表上下预留的 item 数量
  const ArrayNumber = 100 //数据数量

  const GetScrollIndex = () => {
    const container = containerRef.current
    if (!container) return

    const scrollTop = containerRef.current!.scrollTop
    let startIndex = Math.floor(scrollTop / itemAllHeight) - moreItem
    if (startIndex < 0) startIndex = 0
    const containerHeight = container!.clientHeight
    const endIndex =
      Math.floor((scrollTop + containerHeight) / itemAllHeight) + moreItem
    setScrollOptions({ startIndex, endIndex })
    console.log({ startIndex, endIndex })
  }

  useEffect(() => {
    GetScrollIndex()
  }, [])

  return (
    <div className="text-center h-screen overflow-hidden">
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
      <div className=" p-7 border-solid border-white border-[1px] m-[20px]">
        <p className="text-[32px]">useVirtualList</p>
        <div
          id="container"
          className=" w-[80%] h-[200px] overflow-auto m-auto "
          ref={containerRef}
          onScroll={GetScrollIndex}
        >
          <div style={{ height: itemAllHeight * scrollOptions.startIndex }} />
          {new Array(ArrayNumber).fill('').map((_, index) => {
            if (
              index >= scrollOptions.startIndex &&
              index <= scrollOptions.endIndex
            )
              return (
                <div
                  key={index}
                  id={`item-${index}`}
                  className=" w-full border-[1px] border-solid flex  justify-center items-center"
                  style={{ height: itemHeight, marginBottom: itemMarginBottom }}
                >
                  index {index}
                </div>
              )
            return null
          })}
          <div
            style={{
              height: itemAllHeight * (ArrayNumber - scrollOptions.endIndex)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Hooks
