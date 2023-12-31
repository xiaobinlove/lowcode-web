import { Input as AInput, InputProps } from 'antd'
import { FC } from 'react'
interface Props extends InputProps {
  fixed?: boolean
}
export const Input: FC<Props> = (props) => {
  return (
    <>
      <AInput {...props} />
    </>
  )
}
export default Input
