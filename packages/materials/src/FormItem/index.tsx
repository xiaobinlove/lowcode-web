import { FC, ReactNode } from 'react'
import './index.less'
interface FormItemProps {
  title: string
  children: ReactNode
}
export const FormItem: FC<FormItemProps> = ({ children, title }) => {
  return (
    <div className="lc-form-item">
      <div className="lc-form-item__label">{title}</div>
      {children}
    </div>
  )
}
export default FormItem
