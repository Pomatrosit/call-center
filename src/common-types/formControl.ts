export interface ISelectOption {
  value: number;
  title: string;
}

export interface IFormControl {
  value: string;
  isError: boolean;
  errorMessage: string | null;
  selectOptions?: ISelectOption[];
}
