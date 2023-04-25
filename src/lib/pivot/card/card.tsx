import React, { useCallback, useEffect, useState } from "react";
import { Paragraph } from "../paragraph/paragraph";
import { IPivotCardProps } from "./types/card";
import { defaultSort } from "../utils/sort/sort";

export const PivotCard = ({
  groupKey = "",
  selectedColumns = [],
  items = [],
  collapseKeys = [],
  collapseIndex = 0,
  marginLeft = 0,
  colDefs = [],
  theme,
}: IPivotCardProps): React.ReactElement => {
  const [_columns, setColumns] = useState([]);
  const [_items, setItems] = useState(items);
  const [clickStatus, setClickStatus] = useState({
    open: "click",
    close: "",
  });
  const [sort, setSort] = useState({ key: null, order: null, userSort: null });
  const [collapseStatus, setCollapseStatus] = useState<{
    [key: string]: string;
  }>({});
  // 하위에 그룹이 남았을 경우
  const isObjectTotal =
    collapseStatus[groupKey] === "none" && !Array.isArray(_items);
  // 하위에 그룹이 없어 array(데이터)만 남은 경우
  const isArrayTotal =
    collapseStatus[groupKey] === "none" && Array.isArray(_items);
  useEffect(() => {
    setItems(
      sort?.key
        ? sort.userSort
          ? sort.userSort(
              colDefs.find((colDef) => colDef.key === sort.key),
              items,
              sort.order
            )
          : Array.isArray(items)
          ? [
              ...defaultSort({
                data: items,
                key: sort.key,
                order: sort.order,
              }),
            ]
          : items
        : items
    );
  }, [items]);

  useEffect(() => {
    if (collapseKeys.length <= 0) return;
    if (_items.length <= 0) return;

    const isArray = Array.isArray(_items);

    Object.values(collapseStatus).length <= 0 &&
      setCollapseStatus(() => {
        const result = {};
        result[groupKey] = "block";

        return result;
      });

    if (!isArray) return;

    const columnsInfo = collapseKeys.map((key, index) => {
      const dataKeys = Object.keys(_items[0]).filter((itemKey) => {
        return (
          itemKey !== key &&
          collapseKeys.findIndex((_key) => _key === itemKey) === -1
        );
      });
      const sortValue = defaultSort({
        data: colDefs.filter((colDef) =>
          dataKeys.find((dataKey) => colDef.key === dataKey)
        ),
        key: "order",
        order: "asc",
      }).map((data) => data.key);

      const isFirst = index === 0;
      return {
        key: key,
        text: key,
        isCollapse: true,
        itemColumn: isFirst
          ? sortValue
              .map((dataKey) => {
                return { key: dataKey, text: dataKey };
              })
              .filter((colDef) =>
                selectedColumns.find(
                  (selectedColumn) => selectedColumn === colDef.key
                )
              )
          : [],
      };
    });

    setColumns(columnsInfo);
  }, [collapseKeys, selectedColumns, _items]);

  const getSum = (colDef): string => {
    const result: number = _items.reduce(
      (a: number, b: { [key: string]: string | number }) => {
        return a + Number(b[colDef.key]);
      },
      0
    );

    const isNotNumber = isNaN(result);
    return colDef?.total
      ? (colDef.total(colDef, _items) as string)
      : isNotNumber
      ? "X"
      : result.toString();
  };

  const getHeader = (item, gap = "2%", itemColumns = []) => {
    if (!item) return <></>;
    const _itemColumns = itemColumns.filter((itemColumn) => {
      return selectedColumns.find((selectedColumn) => {
        return selectedColumn === itemColumn.key;
      });
    });
    return (
      <div style={{ gap: gap, display: "flex", width: "100%" }}>
        {_itemColumns.map((column, index) => {
          if (column?.itemColumn) {
            return <></>;
          }

          const defs = colDefs.find((def) => {
            return def.key === column.key;
          });
          if (!defs) return <></>;

          const columnHeader = defs?.text || column.text;

          return (
            <div
              key={index}
              className="pivot-list-cell-header"
              data-key={defs.key}
              style={defs?.style || {}}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                const key = event.currentTarget.dataset.key;
                const order = event.currentTarget.dataset["order"];
                if (!order) {
                  event.currentTarget.dataset["order"] = "desc";
                } else {
                  event.currentTarget.dataset["order"] =
                    order === "asc" ? "desc" : "asc";
                }

                setItems(
                  defs.sort
                    ? defs.sort(
                        defs,
                        items,
                        event.currentTarget.dataset["order"] as "asc" | "desc"
                      )
                    : defaultSort({
                        data: _items,
                        key: key,
                        order: event.currentTarget.dataset["order"] as
                          | "asc"
                          | "desc",
                      })
                );
                setSort({
                  key: key,
                  order: event.currentTarget.dataset["order"],
                  userSort: defs.sort ? defs.sort : null,
                });
              }}
            >
              {columnHeader}
            </div>
          );
        })}
      </div>
    );
  };

  const getContents = useCallback(() => {
    if (collapseKeys.length === 0) return <></>;
    const isArray = Array.isArray(_items);

    return isArray
      ? _items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {index === 0 && getHeader(item, "2%", _columns?.[0]?.itemColumn)}
              <Paragraph
                item={item}
                columns={_columns}
                hideContainerBorder={true}
                colDefs={colDefs.filter((colDef) => {
                  return selectedColumns.find(
                    (selectedColumn) => selectedColumn === colDef.key
                  );
                })}
              />
            </React.Fragment>
          );
        })
      : Object.keys(_items).map((groupKey, index) => {
          return (
            <PivotCard
              key={index}
              theme={theme}
              groupKey={groupKey}
              collapseIndex={marginLeft / 5 + 1}
              selectedColumns={selectedColumns}
              items={_items[groupKey]}
              collapseKeys={collapseKeys}
              marginLeft={Number(marginLeft) + 5}
              colDefs={colDefs}
            />
          );
        });
  }, [_columns, selectedColumns, _items]);
  const handleClickCollapseKey = (event) => {
    event.stopPropagation();
    const isNone = collapseStatus[groupKey] === "none";

    setClickStatus((_clickStatus) => {
      isNone
        ? ((_clickStatus.open = "click"), (_clickStatus.close = ""))
        : ((_clickStatus.open = ""), (_clickStatus.close = "click"));
      return _clickStatus;
    });
    setCollapseStatus((prev) => {
      const _prev = { ...prev };

      _prev[groupKey] = _prev[groupKey] === "block" ? "none" : "block";
      return _prev;
    });
  };
  const findColDef = (findKey: string) => {
    return colDefs.find((colDef) => colDef.key === findKey);
  };
  const GroupHeader = () => {
    const groupColDef = findColDef(collapseKeys[collapseIndex]);

    return groupColDef?.formatter
      ? (groupColDef.formatter(groupKey) as string)
      : groupKey;
  };
  return (
    <div
      style={{ marginLeft: `${marginLeft}%` }}
      className={`card-container ${theme}`}
    >
      <div>
        <div className="card-title" onClick={handleClickCollapseKey}>
          <div
            style={{ position: "absolute", display: "inline-block" }}
            className={`card-animation open ${clickStatus.open}`}
          />
          <div
            style={{ position: "absolute", display: "inline-block" }}
            className={`card-animation close ${clickStatus.close}`}
          />

          <span style={{ minWidth: 135, marginLeft: 17 }}>{GroupHeader()}</span>
          {isObjectTotal && (
            <div style={{ display: "flex", gap: "2%", width: "100%" }}>
              {Object.keys(items).map((key, index) => {
                return (
                  <div key={index}>
                    <span>{key}:</span>{" "}
                    <span>
                      {" "}
                      {items[key]?.length ||
                        Object.keys(items[key]).length}{" "}
                      count
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {isArrayTotal && (
            <div style={{ display: "flex", gap: "5%" }}>
              {colDefs
                .filter((colDef) => colDef.showTotal)
                .map((colDef, index) => {
                  return (
                    <div key={index} className="flex-container gap-3">
                      <span>{getSum(colDef)}</span>
                      <span>{colDef.key}</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div
          className="content-container"
          style={{ overflow: "scroll", display: collapseStatus[groupKey] }}
        >
          {getContents()}
        </div>
      </div>
    </div>
  );
};
