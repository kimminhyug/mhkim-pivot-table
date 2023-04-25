import { bit, packet } from "./constants/unitConverter";

const fixNumber = (value: number, fixValue: number) => {
  const isInteger = Number.isInteger(value);
  return isInteger ? value.toFixed(0) : value.toFixed(fixValue);
};

export const convertDataToUnit = (value: number): string => {
  if (value === null || value === undefined) return "0";
  let _value: number | string = Number(value);

  const digit = 2;

  if (_value < 1000) {
    _value = fixNumber(_value, digit);
  } else if (_value >= 1000 && _value < Math.pow(1000, 2)) {
    _value = fixNumber(_value / 1000, digit) + "K";
  } else if (_value >= Math.pow(1000, 2) && _value < Math.pow(1000, 3)) {
    _value = fixNumber(_value / Math.pow(1000, 2), digit) + "M";
  } else if (_value >= Math.pow(1000, 3) && _value < Math.pow(1000, 4)) {
    _value = fixNumber(_value / Math.pow(1000, 3), digit) + "G";
  } else if (_value >= Math.pow(1000, 4)) {
    _value = fixNumber(_value / Math.pow(1000, 4), digit) + "T";
  }

  return _value as string;
};
const getConversionTable = (type) => {
  if (type === "bps") {
    return bit;
  } else {
    return packet;
  }
};
export class UnitConverter {
  private conversionTable: { default: number; K: number; M: number; G: number };
  originValue: string | number;
  constructor(value: string, type: string) {
    this.originValue = value;
    this.conversionTable = getConversionTable(type);
    this.toOrigin = this.toOrigin.bind(this);
  }

  toOrigin = () => {
    if (!this.originValue) return this.originValue;
    const notNumberReg = new RegExp(/(?![0-9])\w+/);
    const numberReg = new RegExp(/([0-9])/);
    const result = notNumberReg.exec(this.originValue.toString());
    //unit 없으면 단위 변환 되지 않았으므로, 그대로 리턴
    if (!result || result.length <= 0) {
      return this.originValue;
    } else {
      const data = numberReg.exec(this.originValue.toString()) || [];
      const unit = result[0].toUpperCase();
      const mathConstant =
        this.conversionTable?.[unit] || this.conversionTable.default;
      return Number(data[0] || 0) * mathConstant;
    }
  };

  toConversion = () => {
    if (!this.originValue) return this.originValue;
    return convertDataToUnit(Number(this.originValue));
  };

  setValue = (_value: string | number): UnitConverter => {
    this.originValue = _value;
    return this;
  };
}
