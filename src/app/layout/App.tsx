import { useState } from "react"
import Header from "./Header"
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? "dark" : "light"
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  })
  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
