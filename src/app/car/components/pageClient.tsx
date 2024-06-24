'use client'
import { useEffect, useState } from 'react'
import Background from '/public/car/bg.png'
import Image from 'next/image'

const Car = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [carPositionX, setCarPositionX] = useState<number>(0)
  const CarImagesLength = 35
  const Displacement = 3 //位移量，大于这个阈值才开始动

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }, [])

  const throttle = (fn: any, delay: number) => {
    let timer: any = null
    return function (...args: any) {
      const now = new Date().getTime()
      if (now - timer > delay) {
        fn(...args)
        timer = now
      }
    }
  }

  const GetCarPosition = (e: any) => {
    const { clientX } = e.touches[0]
    setCarPositionX(clientX)
  }

  const CarMoveFn = (e: any) => {
    const leftPosition = e.touches[0].clientX
    if (leftPosition - carPositionX >= Displacement) {
      let current = currentIndex + 1
      if (current > CarImagesLength - 1) {
        current = 1
      }
      setCurrentIndex(current)
    } else if (leftPosition - carPositionX < -Displacement) {
      let current = currentIndex - 1
      if (current < 1) {
        current = CarImagesLength - 1
      }
      setCurrentIndex(current)
    }
    setCarPositionX(leftPosition)
  }

  const ThrottleCarMover = throttle(CarMoveFn, 500)

  return (
    <div className=" w-screen relative bg-white min-h-screen">
      <Image
        src={Background}
        alt=""
        width={249}
        height={249}
        className=" w-full   h-[226px] absolute left-0 top-0 right-0 bottom-0 object-cover z-[1]"
      />
      {/* 车图片容器 */}
      <div
        className=" w-full h-[226px] relative"
        onTouchMove={ThrottleCarMover}
        onTouchStart={GetCarPosition}
      >
        {new Array(CarImagesLength).fill('').map((item: any, index: number) => (
          <div
            key={index}
            className="absolute w-full h-full top-[50%] translate-y-[-50%] left-1/2 translate-x-[-50%] z-[10]"
            style={{ opacity: currentIndex === index ? '' : '0' }}
          >
            <Image
              src={`/car/${index + 1}.webp`}
              alt=""
              width={2490}
              height={2490}
              className=" w-full h-full object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Car
