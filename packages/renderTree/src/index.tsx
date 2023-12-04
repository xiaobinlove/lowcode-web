import {
  FC,
  createElement,
  ReactNode,
  ComponentClass,
  FunctionComponent
} from 'react'
export interface Schema {
  UUID: string
  componentName: string
  title: string
  pageName?: string
  props: any
  children: Schema[]
}
interface Props {
  componentsMap: any
  schema: Schema[]
}
export const RenderTree: FC<Props> = ({ componentsMap, schema }) => {
  return (
    <>
      {schema[0].children?.map((item) => {
        return createElement(componentsMap[item.componentName], {
          key: item.UUID,
          ...item.props
        })
      })}
    </>
  )
}

export default RenderTree
