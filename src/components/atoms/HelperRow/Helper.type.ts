export interface Props {
  autocomplete?: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  value?: string;
}
