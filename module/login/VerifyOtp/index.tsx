/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useContext, useState} from "react";
import {Form} from "antd";
import Link from "next/link";
import ApiUser, {IVerifyBody} from "@app/api/ApiUser";
import {useMutation} from "react-query";
import {IAccountInfo} from "@app/types";
import {loginUser} from "@app/redux/slices/UserSlice";
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import {TextInput} from "@app/components/TextInput";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import "./index.scss";
import {DataContext} from "..";

interface IContext {
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

interface VerifyOtpProps {
  changeTab: (tab: string) => void;
}
export function VerifyOtp({changeTab}: VerifyOtpProps): JSX.Element {
  const VerifyMutation = useMutation(ApiUser.verify);
  const sendOtpMutation = useMutation(ApiUser.sendOtp);
  const loginMutation = useMutation(ApiUser.login);
  const [otpValidate, setOtpValidate] = useState({
    message: "",
    style: "lightGrey",
  });
  const dispatch = useDispatch();
  const {
    emailAddress,
    setEmailAddress,
    username,
    setUsername,
    password,
    setPassword,
  }: IContext = useContext(DataContext);
  // setEmailAddress("vietvodoi123454@gmail.com")

  const handleVerify = (
    values: IVerifyBody,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    console.log("verify", emailAddress);
    if (values.otp && emailAddress) {
      VerifyMutation.mutate(
        {email: emailAddress, otp: values.otp},
        {
          onSuccess: (res: IAccountInfo) => {
            console.log("được rồi nhưng chưa đăng nhập");
            loginMutation.mutate(
              {username: username, password: password},
              {
                onSuccess: (res: IAccountInfo) => {
                  dispatch(loginUser({...res}));
                  localStorage.setItem("role", res.role?.id?.toString() || "0");
                  setSubmitting(true);
                  window.location.replace("/");
                },
                onError: (error) => {
                  changeTab("forgotPassword");
                  setSubmitting(false);
                },
              }
            );
          },
          onError: (error) => {
            setOtpValidate({
              message: "Mã OTP không chính xác",
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
  const handleResendOtp = () => {
    console.log(emailAddress);
    sendOtpMutation.mutate(
      {email: emailAddress},
      {
        onSuccess: () => {
          console.log("success");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <Formik
      initialValues={{otp: "", email: emailAddress as string}}
      validate={(values) => {
        const regex = /^[0-9]{4,4}$/g;
        if (!values.otp) {
          return setOtpValidate({
            message: "Vui lòng nhập mã OTP",
            style: "red",
          });
        }
        if (!regex.test(values.otp)) {
          return setOtpValidate({
            message: "Mã OTP là các số nguyên có 4 ký tự",
            style: "red",
          });
        } else {
          return setOtpValidate({
            message: "",
            style: "lightGrey",
          });
        }
      }}
      validateOnChange
      onSubmit={handleVerify}
      enableReinitialize
    >
      {({values, handleChange, isSubmitting, handleSubmit}): JSX.Element => (
        <div className="containerVerify">
          <p className="lable">
            Please enter the One-Time Password to verify your account
          </p>
          <p className="lableDescription">
            A One-Time Password has been send to Email:{" "}
            <Link href={`mailto:${emailAddress}`}>
              <a>{emailAddress}</a>
            </Link>
          </p>
          <Form onFinish={handleSubmit} className="container-verify">
            <div className="pt-20">
              <TextInput
                placeholder=""
                value={values.otp}
                handleChange={handleChange}
                name="otp"
                type="OTP"
                style={otpValidate.style}
              />
            </div>
            <ButtonSubmit
              label="Verify"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
          <div className="validate">{otpValidate.message}</div>
          <div className="resendOTP">
            <a onClick={handleResendOtp}>Resend One-Time password</a>
          </div>
        </div>
      )}
    </Formik>
  );
}
