import { useState } from 'react'

type CounterActions = {
  inc: () => void
  dec: () => void
  set: (number?: number) => void
  reset: (number?: number) => void
}

const useCounter = (
  initValue: number,
  { min, max }: { min: number; max: number }
): [number, CounterActions] => {
  const [count, setCount] = useState(initValue)

  const inc = (): void => {
    if (count < max) setCount(count + 1)
  }

  const dec = (): void => {
    if (count > min) setCount(count - 1)
  }

  const set = (number: number = initValue): void => {
    setCount(number)
  }

  const reset = (number: number = initValue): void => {
    setCount(number)
  }

  const actions: CounterActions = { inc, dec, set, reset }

  return [count, actions]
}

export default useCounter
