/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "./index.scss";
import {ModalCustom} from "@app/components/ModalCustom";
import React from "react";
import {defaultValidateMessages, layout} from "@app/validate/user";
import {Form, Input} from "antd";

interface ModalInfoProps {
  isModalVisible: boolean;
  handleConfirmChangePass: (newPassword: string) => void;
  handleCancelChangePass: () => void;
}

export function ModalChangePass(props: ModalInfoProps): JSX.Element {
  const {isModalVisible, handleConfirmChangePass, handleCancelChangePass} =
    props;
  const [form] = Form.useForm();
  const onFinish = (fieldsValue: {
    newPassword: string;
    confirmPassword: string;
  }): void => {
    console.log(fieldsValue);
    handleConfirmChangePass(fieldsValue.newPassword);
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-info modal-change-password">
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={defaultValidateMessages}
        >
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {required: true, message: "Mật khẩu không được để trống!"},
              {min: 5},
              {max: 30},
              {
                pattern:
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{5,30}/,
                message:
                  "Mật khẩu phải chứa ký tự in thường, ký tự in hoa và ký tự đặc biệt!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Mật khẩu xác nhận không được để trống!",
              },
              ({getFieldValue}) => ({
                validator(_, value): Promise<void> {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không giống mật khẩu mới!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible={isModalVisible}
      handleOk={(): void => {
        form.submit();
      }}
      handleCancel={(): void => {
        handleCancelChangePass();
        form.resetFields();
      }}
      title="Đổi mật khẩu"
      content={renderContent()}
    />
  );
}
