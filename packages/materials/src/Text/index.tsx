import { Typography } from 'antd'
import { FC } from 'react'

export const Text: FC<any> = (props) => {
  return (
    <>
      <Typography.Text {...props} />
    </>
  )
}
export default Text
