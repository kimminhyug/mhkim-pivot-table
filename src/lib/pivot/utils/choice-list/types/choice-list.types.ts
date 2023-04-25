import { ICON_VISIBLE } from "../constants/choice-list.constants";
export interface IChoiceListOption {
  key: string;
  text: string;
  icon?: string;
  onClickIcon?: (key: string) => void;
  iconVisible?: typeof ICON_VISIBLE[keyof typeof ICON_VISIBLE];
}
export interface IChoiceListProps {
  options: IChoiceListOption[];
  theme: "light" | "dark";
  defaultSelected: string[];
  maxCount: number;
  showItemIndex?: boolean;
  onChangeItem: (list: string[]) => void;
}
