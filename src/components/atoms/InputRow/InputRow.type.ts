export interface Props {
  message: string; // Text behind input field
  editable?: boolean;
  maxSize?: number; // maximum size of text
  leadMessage?: string; // Text infront of input field
  onPress?: () => void;
  value?: string;
  [options: string]: any; // options of TextInput component
}
