import React, { useMemo } from "react";
import { isEqual } from "lodash";
import { Cell } from "./cell";
interface IParagraphProps {
  item: any[];
  columns: any[];
  colDefs: any[];
  hideContainerBorder?: boolean;
}
export const Paragraph = React.memo(
  ({
    item,
    columns = [],
    colDefs = [],
    hideContainerBorder = false,
  }: IParagraphProps): React.ReactElement => {
    const getRow = (item, gap = "5%", itemColumn) => {
      if (!item) return <></>;

      return (
        <>
          <div style={{ gap: gap, display: "flex", width: "100%" }}>
            {itemColumn.map((column, _index) => {
              if (column?.itemColumn) {
                return (
                  <Paragraph
                    key={_index}
                    item={item[column.key]}
                    columns={[column]}
                    colDefs={colDefs}
                    hideContainerBorder={true}
                  />
                );
              }

              const defs = colDefs.find((def) => {
                return def.key === column.key;
              });
              if (!defs) return <React.Fragment key={_index}></React.Fragment>;
              const style = defs?.style || {};

              const text = defs?.formatter
                ? defs.formatter(item[column.key])
                : item[column.key];

              return <Cell key={_index} text={text} style={style} />;
            })}
          </div>
        </>
      );
    };

    const Children = useMemo(() => {
      return columns.map((column, index) => {
        return (
          <React.Fragment key={index}>
            {getRow(item, "2%", column.itemColumn)}
          </React.Fragment>
        );
      });
    }, [columns, item, colDefs]);

    if (!item) return <></>;

    return (
      <>
        <div
          className="paragraph-container"
          style={hideContainerBorder ? { borderWidth: 0 } : {}}
        >
          {Children}
        </div>
      </>
    );
  },
  (prev, next) => {
    return isEqual(prev, next);
  }
);
