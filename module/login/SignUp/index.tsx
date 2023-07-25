import "./index.scss";
import {Formik} from "formik";
import {Form, Image, notification} from "antd";
import {TextInput} from "@app/components/TextInput";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useMutation} from "react-query";
import ApiUser, {IRegisterBody} from "@app/api/ApiUser";
import {useDispatch} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {IAccountInfo} from "@app/types";
import {useContext, useState} from "react";
import {validateSignUp} from "@app/validate/user";
import {DataContext} from "..";

interface SignUpProps {
  changeTab: (tab: string) => void;
}
export function SignUp({changeTab}: SignUpProps): JSX.Element {
  const dispatch = useDispatch();
  const registerMutation = useMutation(ApiUser.register);
  const sendOtpMutation = useMutation(ApiUser.sendOtp);
  const {
    emailAddress,
    setEmailAddress,
    username,
    setUsername,
    password,
    setPassword,
  } = useContext(DataContext);

  const [errors, setErrors] = useState({
    emailValidate: {
      message: "",
      style: "lightGrey",
    },
    userValidate: {
      message: "",
      style: "lightGrey",
    },
    passwordValidate: {
      message: "",
      style: "lightGrey",
    },
    confirmPasswordValidate: {
      message: "",
      style: "lightGrey",
    },
  });
  const handleRegister = (
    values: IRegisterBody,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    // console.log(values);
    if (values.username && values.password && values.email) {
      registerMutation.mutate(
        {
          username: values.username,
          password: values.password,
          email: values.email,
        },
        {
          onSuccess: (res: IAccountInfo) => {
            changeTab("verifyOtp");
            setEmailAddress(values.email);
            setUsername(values.username);
            setPassword(values.password);
            sendOtpMutation.mutate(
              {email: values.email},
              {
                onSuccess: () => {
                  console.log("success");
                },
                onError: (error) => {
                  console.log(error);
                  setSubmitting(false);
                },
              }
            );
          },
          onError: (error) => {
            console.log("err1");
            setSubmitting(false);
          },
        }
      );
    } else {
      setSubmitting(false);
    }
  };
  // console.log(errors);
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validate={(values) => {
        validateSignUp(values, [errors, setErrors]);
      }}
      validateOnChange={true}
      onSubmit={handleRegister}
    >
      {({values, handleChange, isSubmitting, handleSubmit}): JSX.Element => (
        <div className="container-sign-up">
          <Form onFinish={handleSubmit} className="container-sign-up">
            <div>
              <TextInput
                label="email"
                placeholder="Nhập email"
                value={values.email}
                handleChange={handleChange}
                name="email"
                type="text"
                style={errors.emailValidate.style}
              />
              <div className="validate">{errors.emailValidate.message}</div>
            </div>
            <div className="pt-20">
              <TextInput
                label="Tài khoản"
                placeholder="Nhập tên tài khoản"
                value={values.username}
                handleChange={handleChange}
                name="username"
                type="text"
                style={errors.userValidate.style}
              />
            </div>
            <div className="validate">{errors.userValidate.message}</div>
            <div className="pt-20">
              <TextInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={values.password}
                handleChange={handleChange}
                name="password"
                type="password"
                style={errors.passwordValidate.style}
              />
            </div>
            <div className="validate">{errors.passwordValidate.message}</div>
            <div className="pt-20">
              <TextInput
                label="Mật khẩu"
                placeholder="Nhập lại mật khẩu"
                value={values.confirmPassword}
                handleChange={handleChange}
                name="confirmPassword"
                type="password"
                style={errors.confirmPasswordValidate.style}
              />
            </div>
            <div className="validate">
              {errors.confirmPasswordValidate.message}
            </div>

            <ButtonSubmit
              label="Sign Up"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
          <button onClick={() => changeTab("verifyOtp")}>submit</button>
        </div>
      )}
    </Formik>
  );
}
