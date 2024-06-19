'use client'
import useCounter from '@/hooks/useCounter'

const Hooks = () => {
  const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 })
  return (
    <div className="text-center h-screen">
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
    </div>
  )
}

export default Hooks
