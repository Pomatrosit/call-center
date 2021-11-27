import Auth from "../pages/Auth"
import Index from "../pages/Index"
import CreateBid from "../pages/CreateBid"

export const privateRoutes = [
  { id: 1, title: "Список заявок", path: "/", Component: Index },
  { id: 2, title: "Создание заявки", path: "/createbid", Component: CreateBid },
]

export const publicRoutes = [
  { id: 1, title: "Авторизация", path: "/auth", Component: Auth },
]
