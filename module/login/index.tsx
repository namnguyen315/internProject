import "./index.scss";
import React, {createContext, useState} from "react";
import {NewPassword} from "@app/module/login/NewPassword";
import {ForgotPassword} from "@app/module/login/ForgotPassword";
import {SignIn} from "@app/module/login/SignIn";
import {SignUp} from "@app/module/login/SignUp";
import Link from "next/link";
import {Select} from "antd";
import {VerifyOtp} from "@app/module/login/VerifyOtp";
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface IContext {
  emailAddress: string;
  setEmailAddress: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const DEFAULT_DATA_CONTEXT: IContext = {
  emailAddress: "",
  setEmailAddress: () => {},
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {},
};

export const DataContext = createContext(DEFAULT_DATA_CONTEXT);

export function Login(): JSX.Element {
  const [styleSignIn, setStyleSignIn] = useState("actived");
  const [styleSignUp, setStyleSignUp] = useState("inactive");
  const [data, setData] = useState("");
  const [tab, setTab] = useState("signIn");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickBtnSignIn = (value: string) => {
    setTab(value);
    value === "signIn" ? setStyleSignIn("actived") : setStyleSignIn("inactive");
    value === "signUp" ? setStyleSignUp("actived") : setStyleSignUp("inactive");
  };
  const tabList = {
    signIn: {
      component: SignIn,
    },
    signUp: {
      component: SignUp,
    },
    forgotPassword: {
      component: ForgotPassword,
    },
    newPassword: {
      component: NewPassword,
    },
    verifyOtp: {
      component: VerifyOtp,
    },
  };
  const menuList = [
    {title: "Home", url: "/Home"},
    {title: "About", url: "/About"},
    {title: "Blog", url: "/Blog"},
    {title: "Pages", url: "/Pages"},
    {title: "Contact", url: "/Contact"},
  ];
  return (
    <div className="container-login">
      <div className="top-site">
        <div className="main-menu">
          <ul>
            {menuList.map((menu) => (
              <li>
                <Link href={menu.url}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="language">
          <Select
            defaultValue="English"
            style={{width: "100%", height: "16px", backgroundColor: "#f6f6f6"}}
            onChange={handleChange}
            options={[
              {label: "English", value: "English"},
              {label: "Tiếng Việt", value: "Tiếng Việt"},
            ]}
          />
        </div>
        <div
          className="signIn"
          onClick={() => {
            handleClickBtnSignIn("signIn");
          }}
        >
          <div className={styleSignIn}></div>
          <p>Sign In</p>
        </div>
        <div
          className="register"
          onClick={() => {
            handleClickBtnSignIn("signUp");
          }}
        >
          <div className={styleSignUp}></div>
          <p>Register</p>
        </div>
      </div>
      <div className="bottom-site">
        <div className="background">
          <div className="text">
            <h1>
              Sign In to
              <br />
              Recharge Direct
            </h1>
            <p>
              if you don’t an account
              <br />
              you can{" "}
              <a onClick={() => handleClickBtnSignIn("signUp")}>
                Register here!
              </a>
            </p>
          </div>
          <div className="ellipse1"></div>
          <div className="ellipse2"></div>
        </div>
        <div className="picture"></div>
        <div className="form-container">
          <div className="form">
            <DataContext.Provider
              value={{
                emailAddress,
                setEmailAddress,
                username,
                setUsername,
                password,
                setPassword,
              }}
            >
              {React.createElement(
                tabList[tab as keyof typeof tabList].component,
                {
                  changeTab: setTab,
                  setData: setData,
                  data: data,
                }
              )}
            </DataContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
