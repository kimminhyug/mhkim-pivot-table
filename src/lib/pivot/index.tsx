import React, { useEffect, useCallback, useState } from "react";
import { PivotCard } from "./card/card";

import { groupBy, Dictionary, merge } from "lodash";

import { IPivotProps } from "./types/pivot.types";
import { defaultSort } from "./utils/sort/sort";
import { ChoiceList } from "./utils/choice-list/choice-list";
import {
  IChoiceListOption,
  IChoiceListProps,
} from "./utils/choice-list/types/choice-list.types";

export const Pivot = <T extends object>({
  pivotItem = [],
  groupKeys = [],
  defaultSelectedColumns = [],
  defaultGroupKeys = [],
  colDefs = [],
  showConfig = false,
  maxGroupCount = 2,
  theme = "light",
  onChangeSelectedColumns,
  onChangeGroupColumns,
}: IPivotProps<T>): React.ReactElement => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    defaultSelectedColumns
  );
  const [pivotIndex, setPivotIndex] = useState(0);
  const [pivotDropdownOptions, setPivotDropdownOptions] = useState<
    { key: string; text: string }[]
  >([]);
  //COLLAPSE KEY LIST
  const [choiceListOptions, setChoiceListOptions] = useState<
    IChoiceListOption[]
  >([]);
  //COLLAPSE ITEM LIST
  const [collapseItemOptions, setCollapseItemOptions] = useState([]);
  const [selectedPivotKey, setSelectedPivotKey] = useState<string>();
  const [groupData, setGroupData] = useState({});
  //선택한 값
  const [collapseKeys, setCollapseKeys] = useState(defaultGroupKeys);

  const handleChangeCollapseList = (list) => {
    if (!list) return;
    onChangeGroupColumns && onChangeGroupColumns(list);
    setCollapseKeys(list);
  };

  useEffect(() => {
    setPivotDropdownOptions(
      defaultGroupKeys.map((key) => {
        return { key: key, text: key };
      })
    );
    if (selectedColumns.length <= 0) {
      const columnKeys = colDefs.map((colDef) => colDef.key);

      setSelectedColumns(columnKeys);
    }

    if (choiceListOptions.length <= 0) {
      const filteredColumns = colDefs.filter((colDef) => {
        return groupKeys.find((groupKey) => colDef.key === groupKey);
      });

      const columnsInfo = defaultSort({
        data: filteredColumns,
        key: "text",
        order: "desc",
      }).map((column) => {
        return {
          key: column.key,
          text: column?.text || column.key,
          // icon: 'Edit',
          // onClickIcon: handleClickIcon,
          // iconVisible: ICON_VISIBLE.SELECTED,
        };
      });

      setChoiceListOptions(columnsInfo);
    }
  }, []);

  useEffect(() => {
    if (pivotDropdownOptions.length > 0 && !selectedPivotKey) {
      setSelectedPivotKey(pivotDropdownOptions[0].key);
    }
  }, [pivotDropdownOptions]);

  useEffect(() => {
    if (!selectedPivotKey) return;
    setPivotIndex(
      pivotDropdownOptions.findIndex((options) => {
        return options.key === selectedPivotKey;
      })
    );
  }, [selectedPivotKey]);

  const currentGroupItem = (currentItem, groupKey) => {
    const keys = Object.keys(currentItem);
    const result = {};
    keys.forEach((key: string) => {
      const item = currentItem[key];
      result[key] = Array.isArray(item)
        ? groupBy(item, groupKey)
        : currentGroupItem(item, groupKey);
    });
    return result;
  };

  const setGroupBys = (items, groupKeys) => {
    let result = [];
    let currentResult = items;
    groupKeys.forEach((groupKey) => {
      currentResult = currentGroupItem(currentResult, groupKey);
      result = currentResult;
    });
    return result as Dictionary<any>;
  };

  const flushSelectedGroupKey = (data): Dictionary<any[]> => {
    if (collapseKeys.length <= 0) return {};
    const readyItem = groupBy(data, collapseKeys[0]);
    const result =
      collapseKeys.length === 1
        ? readyItem
        : setGroupBys(
            readyItem,
            [...collapseKeys].splice(1, collapseKeys.length)
          );

    return result as Dictionary<any[]>;
  };

  useEffect(() => {
    if (collapseKeys.length <= 0) {
      setGroupData([]);
      return;
    }

    setGroupData(flushSelectedGroupKey(pivotItem));
  }, [collapseKeys, pivotItem]);

  const handleChangeSelectedColumns = (
    ev?: React.FormEvent<HTMLInputElement>
    // isChecked?: boolean
  ) => {
    const name = (ev?.currentTarget as HTMLInputElement).name;
    if (!name) return;
    const isChecked = ev?.currentTarget.checked;
    setSelectedColumns((prev) => {
      const _prev = isChecked
        ? [...prev, name]
        : prev.filter((selectedColumn) => selectedColumn !== name);
      onChangeSelectedColumns && onChangeSelectedColumns(_prev);
      return _prev;
    });
  };

  const getColumns = useCallback(() => {
    if (colDefs.length <= 0) return <></>;
    const filteredColDefs = colDefs.filter((colDef) => {
      return !collapseKeys.find((collapseKey) => {
        return collapseKey === colDef.key;
      });
    });
    return filteredColDefs.map((colDef, index) => {
      return (
        <>
          <span>{colDef.text}</span>
          <input
            key={index}
            type="checkbox"
            name={colDef.key}
            onChange={handleChangeSelectedColumns}
            checked={isSelectedColumn(colDef)}
          />
        </>
        // <Checkbox
        //   key={index}
        //   name={colDef.key}
        //   label={colDef.text}
        //   onChange={handleChangeSelectedColumns}
        //   checked={isSelectedColumn(colDef)}
        // />
      );
    });
  }, [colDefs, selectedColumns, collapseKeys]);

  const isSelectedColumn = (colDef) => {
    return (
      selectedColumns.findIndex(
        (selectedColumn) => selectedColumn === colDef.key
      ) !== -1
    );
  };

  const getPivotCard = () => {
    if (collapseKeys.length === 0 || Array.isArray(groupData)) return <></>;

    return Object.keys(groupData).map((groupKey, index) => {
      return (
        <PivotCard
          key={index}
          theme={theme}
          groupKey={groupKey}
          selectedColumns={selectedColumns}
          items={groupData[groupKey]}
          collapseKeys={collapseKeys}
          colDefs={colDefs}
        />
      );
    });
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div className={`pivot-contents ${theme}`}>{getPivotCard()}</div>
      {showConfig && (
        <div
          style={{
            minWidth: 260,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <div
            className={`pivot-config-box vertical-flex ${theme}`}
            style={{
              height: "20%",
              width: "100%",
              maxHeight: "150px",
              minHeight: "150px",
            }}
          >
            <div className="pivot-config-box-title">
                pivot.columns
            </div>
            <div className="pivot-column-list">{getColumns()}</div>
          </div>

          <div
            className={`pivot-config-box vertical-flex ${theme}`}
            style={{
              height: "20%",
              width: "100%",
              maxHeight: "300px",
              minHeight: "300px",
            }}
          >
            <div className="pivot-config-box-title">
              pivot.group
            </div>
            <ChoiceList
              options={choiceListOptions}
              theme={theme}
              defaultSelected={defaultGroupKeys}
              onChangeItem={handleChangeCollapseList}
              showItemIndex={true}
              maxCount={maxGroupCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};
