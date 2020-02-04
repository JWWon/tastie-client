export interface AutoCompleteInterface {
  name: string;
}

export interface Props {
  autocomplete?: AutoCompleteInterface[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  value?: string;
}
