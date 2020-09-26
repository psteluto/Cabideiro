import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {InputNumber} from "antd";

const InputNumberStyle = styled(InputNumber)`
  width: 100%;
`;

const MoneyInput = ({value, onChange}) => {
  const locale = "pt-BR"
  const currencyFormatter = (value) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: 'BRL'
    }).format(value);
  };

  const currencyParser = val => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0";
      }
      console.log(val)
      if (val.includes(',')) {
        if (val.split(',').length > 2) {
          val = val.split(",").join("")
          val = val.replace(/(\d\d)$$/, ",$1");
        }
      } else {
        val = val.replace(/(\d\d)$$/, ",$1");
        console.log('new', val)
      }

      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
      var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
      //  => 1232.21 €

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <InputNumberStyle
      min={0}
      formatter={currencyFormatter}
      parser={currencyParser}
      onChange={onChange}
      value={value}
      placeholder="R$"
    />
  );
}

MoneyInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default MoneyInput;