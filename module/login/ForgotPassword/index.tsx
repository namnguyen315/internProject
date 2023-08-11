import "./index.scss";
import React, {useState} from "react";
import {Formik} from "formik";
import {Form, notification} from "antd";
import {TextInput} from "@app/components/TextInput";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useMutation} from "react-query";
import ApiUser, {IForgotPassword} from "@app/api/ApiUser";

import {LeftOutlined} from "@ant-design/icons";
import Icon from "@app/components/Icon/Icon";

interface SignInProps {
  changeTab: (tab: string) => void;
  setData: (data: string) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  data: string;
}

export function ForgotPassword({changeTab, setData}: SignInProps): JSX.Element {
  const forgotPassMutation = useMutation(ApiUser.forgotPassword);

  const [validateEmail, setValidateEmail] = useState({
    message: "",
    style: "lightGrey",
  });

  const handleForgotPassword = (
    values: IForgotPassword,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (regex.test(values.email)) {
      forgotPassMutation.mutate(
        {
          email: values.email,
        },
        {
          onSuccess: () => {
            setData(values.email);
            changeTab("newPassword");
            setSubmitting(false);
          },
          onError: (error) => {
            setValidateEmail({
              message: "Oops! Không tìm thấy email của bạn trong hệ thống.",
              style: "red",
            });
            setSubmitting(false);
          },
        }
      );
    } else {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{email: ""}}
      validate={(values) => {
        if (!values.email) {
          return setValidateEmail({
            message: "Vui lòng nhập Email",
            style: "red",
          });
        }
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!regex.test(values.email)) {
          return setValidateEmail({
            message: "Vui lòng nhập email đúng định dạng",
            style: "red",
          });
        } else {
          return setValidateEmail({
            message: "",
            style: "lightGrey",
          });
        }
      }}
      validateOnChange={true}
      onSubmit={handleForgotPassword}
    >
      {({values, handleChange, isSubmitting, handleSubmit}): JSX.Element => (
        <div className="containerForgotPassword">
          <div className="header-wrapper">
            <button
              type="button"
              className="btn-back-page"
              onClick={(): void => changeTab("signIn")}
            >
              <Icon
                icon="ArrowLeft2"
                size={20}
                color="rgb(68, 97, 242)"
                className="mr-2"
              />
            </button>
            <div className="forgotText">QUÊN MẬT KHẨU</div>
          </div>
          <Form onFinish={handleSubmit} className="form">
            <TextInput
              placeholder="Nhập email"
              value={values.email}
              handleChange={handleChange}
              name="email"
              style={validateEmail.style}
            />
            <div className="validate">{validateEmail.message}</div>
            <ButtonSubmit
              label="Xác nhận"
              isSubmitting={isSubmitting}
              classRow=""
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
