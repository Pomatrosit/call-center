import AddBidIcon from "../components/Icons/AddBidIcon";
import BidListIcon from "../components/Icons/BidListIcon";
import StatisticsIcon from "../components/Icons/StatisticsIcon";

export const MAIN_NAVIGATION_ITEMS = [
  { id: 1, title: "Список заявок", path: "/", Icon: BidListIcon },
  { id: 2, title: "Создание заявки", path: "/createbid", Icon: AddBidIcon },
  { id: 3, title: "Статистика", path: "/statistics", Icon: StatisticsIcon },
];
