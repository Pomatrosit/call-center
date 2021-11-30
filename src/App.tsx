import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants/router"
import { useAppSelector } from "./hooks/useAppSelector"
import Layout from "./components/Layout/Layout"

const App = () => {
  const { auth } = useAppSelector((state) => state.auth)

  return (
    <div className='App'>
      <Router>
        {auth ? (
          <Layout>
            <Routes>
              {PRIVATE_ROUTES.map((item) => (
                <Route
                  key={item.id}
                  path={item.path}
                  element={<item.Component />}
                />
              ))}
            </Routes>
          </Layout>
        ) : (
          <Routes>
            {PUBLIC_ROUTES.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={<item.Component />}
              />
            ))}
          </Routes>
        )}
      </Router>
    </div>
  )
}

export default App
