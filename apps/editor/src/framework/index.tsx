import { Header } from "./Header";
import { Left } from "./Left";
import { Right } from "./Right";
import Canvas from "./Canvas";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  MeasuringConfiguration,
  MeasuringStrategy,
  DragMoveEvent,
} from "@dnd-kit/core";
import { Schema } from "@lowcode/render-tree";
import { useSchemaStore, Position } from "@/store/schema";
import { ItemOverlay } from "@/components/ItemOverlay";
import "./index.less";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { setUUID } from "@/utils";
import { layoutContainers } from "@/const";
import { useState, useCallback, useRef, CSSProperties } from "react";
const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const Framework = () => {
  const [activeItem, setActiveItem] = useState<Schema | null>(null);
  const mouseEvent = useRef<MouseEvent | null>(null);
  const [lineStyle, setLineStyle] = useState<CSSProperties>({});
  const { activeId, setActiveId, insertNode, setPosition, moveNode } =
    useSchemaStore();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const sensors = useSensors(mouseSensor);
  const handleDragMove = ({ over }: DragMoveEvent) => {
    console.log(over, "over111");

    if (over?.rect) {
      const componentName = over.data.current.data.componentName as string;
      const lineStyle = {
        width: over.rect.width + "px",
        left: over.rect.left + "px",
        top: over.rect.top + "px",
      };
      // 布局容器元素 插入位置计算
      // 1. 找出鼠标  离容器中的所有元素中最近的一个元素，插入到后面
      if (layoutContainers.includes(componentName)) {
        setPosition(Position.After);
        lineStyle.top = over.rect.top + over.rect.height + "px";
        setLineStyle(lineStyle);
        return;
      }
      // 非布局容器元素
      const containerRect = over.rect;
      const mouseY = mouseEvent.current!.clientY - containerRect.top;
      const containerHeight = containerRect.height;
      if (mouseY < containerHeight / 2) {
        setPosition(Position.Before);
        // 拖拽位置在容器的上半部分
        // console.log("拖拽位置在容器的上半部分");
      } else {
        setPosition(Position.After);
        // 拖拽位置在容器的下半部分
        // console.log("拖拽位置在容器的下半部分");
        lineStyle.top = over.rect.top + over.rect.height + "px";
      }
      setLineStyle(lineStyle);
    }
  };
  const setMouseEvent = useCallback((event: MouseEvent) => {
    mouseEvent.current = event;
  }, []);
  const reset = () => {
    setActiveId(null);
    setActiveItem(null);
    setPosition(null);
    window.removeEventListener("mousemove", setMouseEvent);
    setLineStyle({
      display: "none",
    });
  };
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
    setActiveItem(active.data.current as Schema);
    window.addEventListener("mousemove", setMouseEvent);
  };
  const handleDragCancel = () => {
    reset();
  };
  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    console.log(active, "active");
    // 移动位置
    if (over) {
      // 左侧组件拖入画布
      if (active.data.current?.type === "left") {
        insertNode({
          newNode: setUUID(active.data.current?.data),
          overId: over.id as string,
        });
        reset();
        return;
      }
      if (over.id !== activeId) {
        moveNode({ movedId: activeId as string, overId: over.id as string });
      }
    }
    reset();
  };
  return (
    <div className="framework">
      <Header />
      <DndContext
        measuring={measuring}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onDragCancel={handleDragCancel}
        modifiers={[snapCenterToCursor]}
        // collisionDetection={closestCenter}
      >
        <div className="framework__main">
          <Left />
          <Canvas />
          {createPortal(
            <ItemOverlay
              isDragging={Boolean(activeId)}
              title={activeItem?.title ?? ""}
            />,
            document.body
          )}
          <Right />
          <div className="lc-canvas-line" style={lineStyle}></div>
        </div>
      </DndContext>
    </div>
  );
};
