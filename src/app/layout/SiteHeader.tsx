import { Layout, Typography } from "antd"
import React from "react"
const { Header } = Layout
const SiteLayout = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Typography.Title level={1} style={{ color: "white" }}>
        Re-Store
      </Typography.Title>
    </Header>
  )
}

export default SiteLayout
