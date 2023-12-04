import { Draggable } from "@/components/Draggable";
import { Schema } from "@lowcode/render-tree";
import "./index.less";
interface LeftComponent {
  category: string;
  componentName: string;
  title: string;
  icon?: string;
}
const layoutData: Schema = {
  UUID: "asfs33dafdddfddgasdfasdfgs3ed3dfffd213",
  componentName: "LayoutArea",
  title: "布局容器",
  props: {
    itemwidth: "3:3:3",
    name: "LayoutArea_zbi",
    rowgap: 0,
    colgap: 0,
  },
  children: [
    {
      UUID: "as44fsdafdddfddggasdfs3dded3dfffd213",
      componentName: "LayoutItem",
      title: "布局",
      props: {
        name: "LayoutItem_1jr",
      },
      children: [],
    },
    {
      UUID: "asfsdafddd4fddggs3ddfdasdfs333ded3dfffd213",
      componentName: "LayoutItem",
      title: "布局",
      props: {
        name: "LayoutItem_ajp",
      },
      children: [],
    },
    {
      UUID: "asfsdafdddfddggs3ddfdasdfsded3dfffd213",
      componentName: "LayoutItem",
      title: "布局",
      props: {
        name: "LayoutItem_ajp",
      },
      children: [],
    },
  ],
};
const InputData: Schema = {
  UUID: `输入框1${String(new Date().getTime())}`,
  componentName: "Input",
  title: "输入框",
  children: [],
  props: {
    label: "测试输入框",
    name: "Input_msa",
    placeholder: `请输入${String(new Date().getTime())}`,
  },
};
const treeBy = (list: LeftComponent[], key: string) => {
  const resList: any[] = [];
  const obj: { [key: string]: object[] } = {};
  list.forEach((item: any) => {
    if (!obj[item[key]]) {
      obj[item[key]] = [item];
      resList.push({
        category: item[key],
        list: obj[item[key]],
      });
    } else {
      obj[item[key]].push(item);
    }
  });
  return resList;
};
export const initDataMap: Record<string, Schema> = {
  LayoutArea: layoutData,
  Input: InputData,
};
export const Left = () => {
  const components: LeftComponent[] = [
    {
      componentName: "Input",
      title: "输入框",
      category: "表单元素",
    },
    {
      componentName: "LayoutArea",
      title: "布局容器",
      category: "表单元素",
    },
  ];
  const list = treeBy(components, "category");
  return (
    <div className="component-description__list">
      {list.map((item: any) => {
        return (
          <div className="component-description__item" key={item.category}>
            <div className="component-description__item-header">
              {item.category}
            </div>
            <div className="component-description__item-content">
              {item.list.map((item2: Component) => {
                return (
                  <Draggable
                    data={{
                      type: "left",
                      data: initDataMap[item2.componentName],
                    }}
                    id={item2.componentName}
                    key={item2.componentName}
                  >
                    <div className="component-description__item-nippet">
                      {item2.componentName}
                    </div>
                  </Draggable>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
