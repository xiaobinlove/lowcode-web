import { Draggable } from "@/components/Draggable";
import "./index.less";
interface Component {
  category: string;
  componentName: string;
  title: string;
  icon?: string;
}
const components: Component[] = [
  {
    componentName: "Input",
    title: "输入框",
    category: "表单元素",
  },
];
const treeBy = (list: Component[], key: string) => {
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
const list = treeBy(components, "category");
export const Left = () => {
  return (
    <div className="component-description__list">
      {list.map((item: any) => {
        return (
          <div className="component-description__item" key={item.category}>
            <div className="component-description__item-header">
              {item.category}
            </div>
            <div className="component-description__item-content">
              {item.list.map((item2: any) => {
                return (
                  <Draggable
                    data={{ type: "left" }}
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
