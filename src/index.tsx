import ReactDOM from "react-dom"
import "./styles/global.scss"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./store/store"
import Layout from "./components/Layout/Layout"

ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
  document.getElementById("root")
)
