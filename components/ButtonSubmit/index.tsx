import "./index.scss";
import {Button, Row} from "antd";

interface ButtonSubmitProps {
  isSubmitting?: boolean;
  label: string;
  classRow?: string;
}

export function ButtonSubmit({
  isSubmitting,
  label,
  classRow,
}: ButtonSubmitProps): JSX.Element {
  return (
    <Row className={`button-container ${classRow}`}>
      <Button
        className="button"
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        style={{backgroundColor: "#4461F2"}}
      >
        {label}
      </Button>
    </Row>
  );
}
