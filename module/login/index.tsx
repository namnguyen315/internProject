import "./index.scss";
import React, { useState } from "react";
import { NewPassword } from "@app/module/login/NewPassword";
import { ForgotPassword } from "@app/module/login/ForgotPassword";
import { SignIn } from "@app/module/login/SignIn";
import { SignUp } from "@app/module/login/SignUp";
import Link from "next/link"
import { Select } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
}


export function Login(): JSX.Element {
  const [data, setData] = useState("");

  const [tab, setTab] = useState("signIn");

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
  };
  const menuList = [
    { title: "Home", url: "/" },
    { title: "About", url: "/About" },
    { title: "Blog", url: "/Blog" },
    { title: "Pages", url: "/Pages" },
    { title: "Contact", url: "/Contact" },
  ]
  return (
    <div className="container-login">
      <div className="top-site">
        <div className="main-menu">
          <ul>
            {menuList.map((menu) =>
              <li><Link href={menu.url}>{menu.title}</Link></li>
            )}
          </ul>
        </div>
        <div className="language">
          <Select
            defaultValue="English"
            style={{ width: "100%", height: "16px" }}
            onChange={handleChange}
            options={[
              { label: "English", value: "English" },
              { label: "Tiếng Việt", value: "Tiếng Việt" }
            ]}
          />
        </div>
        <div className="signIn">
          Sign In
          <div className="actived"></div>
        </div>
        <div className="register">
          Register
          <div className="inactive"></div>
        </div>
      </div>
      <div className="bottom-site">
        <div className="background">
          <div className="text">
            <h1>
              Sign In to
              Recharge Direct
            </h1>
            <p>
              if you don’t an account
              you can Register here!
            </p>
          </div>
          <div className="ellipse1"></div>
          <div className="ellipse2"></div>
        </div>
        <div className="picture"></div>
        <div className="form-container">
          <div className="form">
            {React.createElement(tabList[tab as keyof typeof tabList].component, {
              changeTab: setTab,
              setData: setData,
              data: data,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
