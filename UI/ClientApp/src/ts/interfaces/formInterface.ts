export interface basicInputInterface {
  name: string;
  value?: any;
  onChange?: Function;
  label?: string;
  placeholder?: string;
  size?: string;
  width?: string;
  disabled?: boolean;
  onKeyUp?: Function;
  onBlur?: Function;
  options?: any[];
  error?: any;
  className?: string;
}

export interface otherInputInterface extends basicInputInterface {
  minValue?: string;
  maxValue?: string;
  type?: string;
  autoFocus?: boolean;
  innerLabel?: string;
}

export interface reactSelectInterface extends basicInputInterface {
  isArray?: boolean;
  isArrayKeys?: boolean;
  isAbove?: boolean;
  multiple?: boolean;
  loading?: boolean;
  loadingType?: string;
}

export interface wholeFormInterface
  extends reactSelectInterface,
    otherInputInterface {
  formName: "textinput" | "reactselect";
  alignment?: string;
  validators?: any;
}
