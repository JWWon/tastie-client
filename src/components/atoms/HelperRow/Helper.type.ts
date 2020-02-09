export interface AutoCompleteInterface {
  name: string;
  isDefault?: boolean;
  [option: string]: any;
}

export type SelectAutocomplete = (value: AutoCompleteInterface) => void;

export interface Props {
  autocomplete?: {
    data: AutoCompleteInterface[];
    onSelect: SelectAutocomplete;
  };
  placeholder?: string;
  value?: string;
}
