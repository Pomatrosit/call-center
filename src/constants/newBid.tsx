type names = "phone" | "firstName" | "lastName" | "middleName";

interface INewBidsFormControl {
  label: string;
  name: names;
  type: string;
}

export const NEW_BIDS_FORM_CONTROLS: INewBidsFormControl[] = [
  {
    label: "Телефон",
    name: "phone",
    type: "text",
  },
  {
    label: "Имя",
    name: "firstName",
    type: "text",
  },
  {
    label: "Фамилия",
    name: "lastName",
    type: "text",
  },
  {
    label: "Отчество",
    name: "middleName",
    type: "text",
  },
];
