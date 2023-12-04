import { FC, ReactNode } from 'react'
import './index.less'
import { ContainerPlaceholder } from '../ContainerPlaceholder'
interface Props {
  children: ReactNode
}
export const FormContainer: FC<Props> = (props) => {
  const { children, ...res } = props
  return (
    <div {...res} className="lc-form-container">
      {!children ? <ContainerPlaceholder /> : children}
    </div>
  )
}
