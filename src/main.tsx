import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/layout/App.tsx"
import "normalize.css"
import { ConfigProvider } from "antd"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#2e58ff",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
