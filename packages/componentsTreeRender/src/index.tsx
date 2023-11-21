import { FC } from 'react'
interface Props {
  componentsMap: any;
  schema: any[]
}
export const ComponentsTreeRender: FC = ({ componentsMap, schema }) => {
  return (
    <div>
      {schema.map()}
    </div>
  )
}
export default ComponentsTreeRender
