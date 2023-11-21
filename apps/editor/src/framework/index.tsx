import { Header } from "./Header"
import { Left } from "./Left"
import { Right } from "./Right"
import { Canvas } from "./Canvas"
import './index.less'
export const Framework = () => {
  return (
    <div className="framework">
      <Header />
      <div className="framework__main">
        <Left />
        <Canvas />
        <Right />
      </div>

    </div>
  )
}