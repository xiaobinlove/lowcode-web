import { current, produce } from "immer";
import { Schema } from "@lowcode/render-tree";
import { Position } from "./store/schema";
import { layoutContainers } from "./const";
// 定义插入节点的函数
export type InsertNode = (params: {
  tree: Schema;
  overId: string;
  newNode: Schema;
  position: Position;
}) => Schema;

type MoveNode = (params: {
  tree: Schema;
  movedId: string;
  overId: string;
  position: Position | null;
}) => Schema;
export const insertNode: InsertNode = ({ tree, overId, newNode, position }) => {
  return produce(tree, (draft) => {
    // 找到父节点
    const {
      parent: overParent,
      index: overIndex,
      node: overNode,
    } = findParentNode(draft, overId);
    // 如果找不到父节点，抛出异常或进行其他操作
    if (!overParent || !overNode) {
      return;
    }
    // const overNode = overParent.children[overIndex];
    // 在父节点的children数组中插入新节点
    if (layoutContainers.includes(overNode.componentName)) {
      const method = position === Position.After ? "push" : "unshift";
      overNode.children[method](newNode);
    } else {
      const insertIndex =
        position === Position.After ? overIndex + 1 : overIndex;
      overParent.children.splice(insertIndex, 0, newNode);
    }
  });
};
// 定义移动节点的函数
export const moveNode: MoveNode = ({ tree, movedId, overId, position }) => {
  return produce(tree, (draft: Schema) => {
    // 找到要移动的节点
    const { parent: movedParent, index: movedIndex } = findParentNode(
      draft,
      movedId
    );
    if (!movedParent) {
      return;
    }
    // 删除
    const movedNode = movedParent.children.splice(movedIndex, 1)[0];
    // 找到新的父节点
    const {
      parent: overParent,
      index: overIndex,
      node: overNode,
    } = findParentNode(draft, overId);

    if (!overParent || !overNode) {
      return;
    }
    // 插入
    if (layoutContainers.includes(overNode.componentName)) {
      const method = position === Position.After ? "push" : "unshift";
      overNode.children[method](movedNode);
    } else {
      const insertIndex =
        position === Position.After ? overIndex + 1 : overIndex;
      overParent.children.splice(insertIndex, 0, movedNode);
    }
  });
};

// 辅助函数：根据节点ID查找父节点和自己所在chilren中的位置下标
export function findParentNode(
  root: Schema,
  uuid: string
): { parent: Schema | null; index: number; node: Schema | null } {
  if (root.UUID === uuid) {
    return { parent: null, index: -1, node: null };
  }

  for (let i = 0; i < root.children.length; i++) {
    const child = root.children[i];
    if (child.UUID === uuid) {
      return { parent: root, index: i, node: root.children[i] };
    }

    const result = findParentNode(child, uuid);
    if (result.parent) {
      return result;
    }
  }

  return { parent: null, index: -1, node: null };
}
// 固定到底部
export function fixdBottom(params: { tree: Schema; id: string }): Schema {
  const { tree, id } = params;
  return produce(tree, (draft) => {
    const { node } = findParentNode(draft, id);
    if (node) {
      node.props.fixed = true;
    }
  });
}
export function generateUUID(): string {
  let uuid = "";
  const characters = "0123456789abcdef";

  for (let i = 0; i < 32; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    const character = characters.charAt(randomNumber);
    uuid += character;

    if (i === 7 || i === 11 || i === 15 || i === 19) {
      uuid += "-";
    }
  }

  return uuid;
}

export function setUUID(schema: Schema): Schema {
  // 生成一个UUID并赋值给当前节点
  schema.UUID = generateUUID();
  if (schema.componentName === "Input") {
    schema.props.placeholder = schema.UUID;
  }

  // 递归设置子节点的UUID
  if (schema.children && schema.children.length > 0) {
    schema.children.forEach((child: Schema) => {
      setUUID(child);
    });
  }
  return JSON.parse(JSON.stringify(schema));
}
