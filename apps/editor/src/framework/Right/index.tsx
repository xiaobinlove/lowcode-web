import "./index.less";
import { Button } from "antd";
import { useSchemaStore } from "@/store/schema";
export const Right = () => {
  const { fixdBottom, schema } = useSchemaStore();
  return (
    <div className="lc-right">
      <Button
        type="primary"
        onClick={() => {
          fixdBottom(schema.children[0].children[0].UUID);
        }}
      >
        第一个定位到底部
      </Button>
      right
    </div>
  );
};
