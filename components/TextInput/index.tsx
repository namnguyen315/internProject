/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.scss";
import {Input, Row} from "antd";
import {ChangeEvent, useCallback} from "react";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

interface TextInputProps {
  type?: string;
  placeholder: string;
  value: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  handleBlur?: (e: string | ChangeEvent<any>) => void;
  name: string;
  style: string;
  disable?: boolean;
}

export function TextInput({
  handleChange,
  placeholder,
  value,
  handleBlur,
  name,
  type = "text",
  style,
  disable,
}: TextInputProps): JSX.Element {
  const renderPasswordIcon = useCallback(
    (visible: boolean): React.ReactNode =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
    []
  );
  const inputStyle = {
    borderWidth: "1px",
    borderColor: style,
  };

  return (
    <Row className="input-container">
      {type === "email" && (
        <Input
          type="email"
          name={name}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          allowClear
          style={inputStyle}
          disabled={disable}
        />
      )}
      {type === "text" && (
        <Input
          type="text"
          name={name}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          allowClear
          style={inputStyle}
          disabled={disable}
        />
      )}
      {type === "password" && (
        <Input.Password
          type="password"
          name={name}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          iconRender={renderPasswordIcon}
          style={inputStyle}
          disabled={disable}
        />
      )}
      {type === "OTP" && (
        <Input
          type="text"
          name={name}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          style={inputStyle}
          disabled={disable}
        />
      )}
    </Row>
  );
}
