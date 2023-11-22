import { useState, createElement } from 'react';
import { Schema } from '@lowcode/render-tree'
import { mockSchema } from '@/mock/file'
import * as componentsMap from '@lowcode/materials'
import { DndContext, DragStartEvent, DragEndEvent, UniqueIdentifier, DragOverlay } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { SortableItem } from '@/components/SortableItem'
import { ItemOverlay } from '@/components/ItemOverlay';
import './index.less'
export const Canvas = () => {
  const [schema, setSchema] = useState<Schema[]>(mockSchema.chilren[0].children)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const items = schema.map(item => item.UUID)
  const activeIndex = activeId ? items.indexOf(activeId as string) : -1
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
  }
  const handleDragCancel = () => {
    setActiveId(null)
  }
  const handleDragEnd = ({ over }: DragEndEvent) => {
    // 移动位置
    if (over) {
      const overIndex = items.indexOf(over.id as string)
      if (overIndex !== activeIndex) {
        setSchema((schema) => arrayMove(schema, activeIndex, overIndex))
      }
    }
    setActiveId(null);
  }
  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items}>
          <div className='lc-canvas-content'>
            {schema.map(item => {
              return (
                <SortableItem id={item.UUID} activeIndex={activeIndex} >
                  {createElement(componentsMap[item.componentName], { ...item.props })}
                </SortableItem>
              )
            })}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <ItemOverlay title={schema.find(item => item.UUID === activeId)?.title} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div >
  )
}