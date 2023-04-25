import React, { useState } from "react";
import { IChoiceListProps } from "./types/choice-list.types";
import { ICON_VISIBLE } from "./constants/choice-list.constants";

export const ChoiceList = ({
  theme,
  options = [],
  onChangeItem,
  defaultSelected = [],
  maxCount,
  showItemIndex = false,
}: IChoiceListProps): React.ReactElement => {
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultSelected);
  const handleClickItem = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const key = event.currentTarget.dataset.key as string;
    const hasItem = selectedItems.find((item) => {
      return key === item;
    });
    if (selectedItems.length >= maxCount && !hasItem) {
      // 일단 토스트 lib 제거
      // toast.warning(`최대 ${maxCount}개까직 선택 가능합니다.`);
      return;
    }
    setSelectedItems((prev) => {
      const _prev = hasItem
        ? prev.filter((item) => item !== key)
        : [...prev, key];

      onChangeItem(_prev);
      return _prev;
    });
  };

  const handleClickItemIcon = (
    event: React.MouseEvent<HTMLDivElement>,
    callback
  ) => {
    event.stopPropagation();
    const key = event.currentTarget.dataset.key;
    callback && callback(key);
  };
  const isSelected = (key) => {
    return selectedItems.findIndex((itemKey) => itemKey === key) !== -1;
  };

  return (
    <div className="choice-list-container">
      {options.map((option, index) => {
        return (
          <div
            className={`choice-list-item-container ${
              selectedItems.find((item) => {
                return item === option.key;
              })
                ? "selected"
                : ""
            } ${theme}`}
            key={index}
          >
            <div
              className={`choice-list-item`}
              onClick={handleClickItem}
              data-key={option.key}
            >
              {option.text}
            </div>
            {option?.icon && (
              <div
                className="choice-list-item-icon"
                data-key={option.key}
                style={{
                  display: `${
                    option.iconVisible === ICON_VISIBLE.ALWAYS
                      ? "block"
                      : isSelected(option.key)
                      ? "block"
                      : "none"
                  }`,
                }}
                onClick={(event) => {
                  handleClickItemIcon(event, option.onClickIcon);
                }}
              >
                'icon'
                {/* <Icon iconName={option.icon} id={option.key} /> */}
              </div>
            )}
            {showItemIndex && (
              <div
                style={{ display: isSelected(option.key) ? "block" : "none" }}
                className="choice-list-item-index"
              >
                {selectedItems.findIndex(
                  (selectedItem) => selectedItem === option.key
                ) + 1}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
