import "./index.scss";
import {Input, Row} from "antd";
import {ChangeEvent, useCallback} from "react";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {CSSProperties} from "@emotion/serialize";

interface TextInputProps {
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  handleBlur?: (e: string | ChangeEvent<any>) => void;
  name: string;
  style: string;
}

export function TextInput({
  label,
  handleChange,
  placeholder,
  value,
  handleBlur,
  name,
  type = "text",
  style,
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
          allowClear={true}
          style={inputStyle}
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
          allowClear={true}
          style={inputStyle}
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
        />
      )}
    </Row>
  );
}
