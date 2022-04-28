import Auth from "../pages/Auth";
import Index from "../pages/Index";
import CreateBid from "../pages/CreateBid";
import CallHistory from "../pages/CallHistory";

export const PRIVATE_ROUTES = [
  { id: 1, title: "Список заявок", path: "/", Component: Index },
  { id: 2, title: "Создание заявки", path: "/createbid", Component: CreateBid },
  {
    id: 3,
    title: "История звонков",
    path: "/callhistory",
    Component: CallHistory,
  },
];

export const PUBLIC_ROUTES = [
  { id: 1, title: "Авторизация", path: "/auth", Component: Auth },
];
