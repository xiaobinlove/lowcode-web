import { Form as AForm, FormProps } from 'antd'
import { FC } from 'react'
interface Props extends FormProps {
}
export const Form: FC<any> = (props) => {
  const { children, col, style, ...res } = props
  const myStyle = { ...style, gridTemplateColumns: `repeat(${col}) 1rf` }
  return (
    <>
      <AForm {...res} className='materials-form' style={myStyle}>
        {children}
      </AForm>
    </>
  )
}
export default Form
