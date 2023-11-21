import { Input, InputProps } from 'antd'
import { FC } from 'react'
interface Props extends InputProps {

}
export const PasswordInput: FC<Props> = (props) => {
  return (
    <>
      <Input type='password' {...props} />
    </>
  )
}
export default PasswordInput
