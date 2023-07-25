import "./index.scss";
import {Formik} from "formik";
import {Form, Image, notification} from "antd";
import {TextInput} from "@app/components/TextInput";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {useMutation} from "react-query";
import ApiUser, {ILoginBody} from "@app/api/ApiUser";
import {useDispatch} from "react-redux";
import {loginUser} from "@app/redux/slices/UserSlice";
import {IAccountInfo} from "@app/types";
import {BsFacebook, BsApple} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import {useState} from "react";
import {validateSignIn} from "@app/validate/user";

interface SignInProps {
  changeTab: (tab: string) => void;
}

export function SignIn({changeTab}: SignInProps): JSX.Element {
  const [errors, setErrors] = useState({
    userValidate: {
      message: "",
      style: "LightGrey",
    },
    passwordValidate: {
      message: "",
      style: "LightGrey",
    },
  });
  const dispatch = useDispatch();
  const loginMutation = useMutation(ApiUser.login);
  console.log(errors);
  const handleLogin = (
    values: ILoginBody,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    if (values.username && values.password) {
      loginMutation.mutate(
        {username: values.username, password: values.password},
        {
          onSuccess: (res: IAccountInfo) => {
            dispatch(loginUser({...res}));
            localStorage.setItem("role", res.role?.id?.toString() || "0");
            setSubmitting(true);
            window.location.replace("/");
          },
          onError: (error) => {
            setSubmitting(false);
            setErrors({
              ...errors,
              passwordValidate: {
                ...errors.passwordValidate,
                message: "*Mật khẩu và tài khoản không chính xác",
              },
            });
          },
        }
      );
    } else {
      console.log("abcd");
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{username: "", password: ""}}
      validate={(values) => validateSignIn(values, [errors, setErrors])}
      validateOnChange={true}
      onSubmit={handleLogin}
    >
      {({values, handleChange, isSubmitting, handleSubmit}): JSX.Element => (
        <div className="container-sign-in">
          <Form onFinish={handleSubmit} className="container-sign-in">
            <div style={{color: "red"}}>
              <TextInput
                label="Tài khoản"
                placeholder="Nhập tài khoản"
                value={values.username}
                handleChange={handleChange}
                name="username"
                style={errors.userValidate.style}
              />
            </div>
            <div className="validate">{errors.userValidate.message}</div>
            <div>
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
            <div className="flex justify-end">
              <span
                role="button"
                tabIndex={0}
                className="forgot-pass pt-20"
                onClick={(): void => changeTab("forgotPassword")}
              >
                Recover Password ?
              </span>
            </div>

            <ButtonSubmit
              label="Sign In"
              isSubmitting={isSubmitting}
              classRow="pt-20"
            />
          </Form>
          <div className="line">
            <div className="line-l"></div>
            <p>Or continue with</p>
            <div className="line-l"></div>
          </div>
          <div className="auth-form">
            <div className="google-auth">
              <FcGoogle className="icon" />
            </div>
            <div className="apple-auth">
              <BsApple className="icon" />
            </div>
            <div className="facebook-auth">
              <BsFacebook className="icon" />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
