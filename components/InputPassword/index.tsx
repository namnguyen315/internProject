/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.scss";
import {Col, Input, Row} from "antd";
import {ChangeEvent} from "react";

interface TextInputProps {
  type?: string;
  label: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  handleBlur: (e: string | ChangeEvent<any>) => void;
  name: string;
}

export function InputPassword(props: TextInputProps): JSX.Element {
  const {label, handleChange, handleBlur, name, type} = props;

  return (
    <Row className="input-container password-label">
      <Col span={10}>
        <div className="label-container ">
          <div className="require-label">*</div>
          <div className="input-label">{label}</div>
        </div>
      </Col>

      <Col span={1} />
      <Col span={13}>
        {type === "password" && (
          <Input
            type="password"
            name={name}
            className="input"
            // placeholder={placeholder}
            //   value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </Col>
    </Row>
  );
}
