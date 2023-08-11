/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.scss";
import React, {useState} from "react";
import {Formik} from "formik";
import {Form, notification} from "antd";
import {TextInput} from "@app/components/TextInput";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useMutation} from "react-query";
import ApiUser, {ISetPassword} from "@app/api/ApiUser";
import {validateNewPassWord} from "@app/validate/user";
import Icon from "@app/components/Icon/Icon";

interface SignInProps {
  changeTab: (tab: string) => void;
  data: string;
}

export function NewPassword({changeTab, data}: SignInProps): JSX.Element {
  const [errors, setErrors] = useState({
    passWord: {
      message: "",
      style: "lightGrey",
    },
    confirmPassWord: {
      message: "",
      style: "lightGrey",
    },
    otp: {
      message: "",
      style: "lightGrey",
    },
  });
  const setPassword = useMutation(ApiUser.setPassword);
  const handleSetPassword = (
    values: ISetPassword,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    const regex = /^[0-9]{4,4}$/g;
    if (
      values.newPassword &&
      regex.test(values.otp) &&
      values.newPassword === values.confirmPass
    ) {
      setPassword.mutate(
        {
          email: data,
          newPassword: values.newPassword,
          confirmPass: values.confirmPass,
          otp: values.otp,
        },
        {
          onSuccess: () => {
            changeTab("signIn");
            setSubmitting(false);
            notification.success({
              duration: 1,
              message: "Đổi mật khẩu thành công!",
            });
          },
          onError: (error: any) => {
            if (error.errorCode.includes("OTP_FAIL")) {
              setSubmitting(false);
              return setErrors({
                ...errors,
                otp: {
                  message: "Mã OTP không chính xác",
                  style: "red",
                },
              });
            }
          },
        }
      );
    } else {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{newPassword: "", confirmPass: "", otp: "", email: data}}
      validate={(values) => {
        validateNewPassWord(values, [errors, setErrors]);
        // if (!values.newPassword || !values.confirmPass || !values.otp) {
        //   notification.error({
        //     message:
        //       "Mật khẩu mới, Xác nhận mật khẩu, OTP không được để trống!",
        //   });
        //   return;
        // }
        // if (values.newPassword !== values.confirmPass) {
        //   notification.error({
        //     message: "Mật khẩu mới và Xác nhận mật khẩu không trùng nhau!",
        //   });
        //   return;
        // }
        // const regex = /^[0-9]{4,4}$/g;
        // if (!regex.test(values.otp)) {
        //   notification.error({
        //     message: "OTP phải là số nguyên 4 ký tự!",
        //   });
        // }
      }}
      validateOnChange
      onSubmit={handleSetPassword}
    >
      {({values, handleChange, isSubmitting, handleSubmit}): JSX.Element => (
        <div className="container-change-password">
          <div className="header-wrapper">
            <button
              type="button"
              className="btn-back-page"
              onClick={(): void => changeTab("forgotPassword")}
            >
              <Icon
                icon="ArrowLeft2"
                size={20}
                color="rgb(68, 97, 242)"
                className="mr-2"
              />
            </button>
            <div className="change-password-text">NHẬP MẬT KHẨU MỚI</div>
          </div>
          <Form onFinish={handleSubmit} className="form">
            <TextInput
              placeholder="Nhập mật khẩu mới"
              value={values.newPassword}
              handleChange={handleChange}
              name="newPassword"
              type="password"
              style={errors.passWord.style}
            />
            <div className="validate">{errors.passWord.message}</div>
            <TextInput
              placeholder="Xác nhận mật khẩu"
              value={values.confirmPass}
              handleChange={handleChange}
              name="confirmPass"
              type="password"
              style={errors.confirmPassWord.style}
            />
            <div className="validate">{errors.confirmPassWord.message}</div>
            <TextInput
              placeholder="Nhập OTP"
              value={values.otp}
              handleChange={handleChange}
              name="otp"
              style={errors.otp.style}
            />
            <div className="validate">{errors.otp.message}</div>
            <ButtonSubmit
              label="Xác nhận"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
}
