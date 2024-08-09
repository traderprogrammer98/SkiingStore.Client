import { useEffect, useState } from "react"
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
import agent from "../api/agent"
import { useStoreContext } from "../context/StoreContext"
import { useCookies } from "react-cookie"
import LoadingComponent from "./LoadingComponent"

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
  const { setBasket } = useStoreContext()
  const [loading, setLoading] = useState(true)
  const [cookies] = useCookies(["buyerId"])
  useEffect(() => {
    const buyerId = cookies["buyerId"]
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [setBasket])
  if (loading) return <LoadingComponent />
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
