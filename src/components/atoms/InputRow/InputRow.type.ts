export interface Props {
  message: string; // Text behind input field
  maxSize?: number; // maximum size of text
  leadMessage?: string; // Text infront of input field
  value?: string;
  [options: string]: any;
}
