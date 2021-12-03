export interface INotification {
  id: number;
  variant: "primary" | "success" | "warning" | "danger";
  text: string;
  autoHideDuration: number | null;
}
