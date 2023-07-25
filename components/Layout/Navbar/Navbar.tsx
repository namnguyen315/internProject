import React, {useEffect, useState} from "react";
import {MenuOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState, persistor} from "@app/redux/store";
import {loginUser, logoutUser} from "@app/redux/slices/UserSlice";
import {toggleMenu} from "@app/redux/slices/MenuSlice";
import {useQuery} from "react-query";
import {IUserLogin} from "@app/types";
import ApiUser from "@app/api/ApiUser";
import {Dropdown, Image, Menu, Modal} from "antd";
import Icon from "@app/components/Icon/Icon";
import {queryKeys} from "@app/utils/constants/react-query";
import {useRouter} from "next/router";
import {ModalChangePassword} from "@app/components/Layout/Navbar/ModalChangePassword";
import "./Navbar.scss";
import Link from "next/link";
/**
 *
 */
export default function Navbar(): JSX.Element {
  const [toggleModal, setToggleModal] = useState(false);
  const user = useSelector((state: IRootState) => state.user);
  const router = useRouter();

  const dispatch = useDispatch();

  const getMeData = (): Promise<IUserLogin> => {
    return ApiUser.getMe();
  };

  const dataUser = useQuery(queryKeys.GET_DATA_USER_IN_USE, getMeData);

  useEffect(() => {
    dataUser.refetch().then((data) => {
      dispatch(loginUser({...user, user: data?.data}));
    });
  }, [toggleModal]);

  // const handleModal= ():void =>{
  //   setIsModalOpen(true)
  // }

  const handleLogout = (): void => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Bạn có chắc chắn?",
      onOk: () => {
        persistor
          .purge()
          .then(() => {
            dispatch(logoutUser());
          })
          .catch(() => {
            // eslint-disable-next-line no-alert
            window.alert(
              "Trình duyệt bị lỗi. Xóa Cookie trình duyệt và thử lại"
            );
          });
        router.push("/");
      },
    });
  };
  /**
   *
   * @returns {*}
   */
  const renderDropdown = (): JSX.Element => (
    <>
      <div className="inforUser">
        <Image
          src={dataUser?.data?.avatar || "/img/avatar/avatar.jpg"}
          preview={false}
          width={30}
          height={30}
          fallback="/img/avatar/avatar.jpg"
          className="rounded-full"
          alt="avatar"
        />
        <p>{dataUser?.data?.email}</p>
      </div>
      <Menu>
        <Menu.Item key="0" onClick={() => setToggleModal(true)}>
          {toggleModal && (
            <ModalChangePassword
              isModalVisible
              setToggleModal={setToggleModal}
            />
          )}
          <div>
            <Icon icon="BlockUser" size={20} color="#000" className="mr-2" />
            Đổi mật khẩu
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1" onClick={handleLogout}>
          <div>
            <Icon icon="SignOut" size={20} color="#000" className="mr-2" />
            Đăng xuất
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" onClick={handleLogout}>
          <Link href="/updateUser">
            <div>
              <Icon icon="User" size={20} color="#000" className="mr-2" />
              Cập nhật tài khoản
            </div>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );

  return (
    <div className="navbar flex items-center justify-between">
      <div className="flex items-center">
        <MenuOutlined
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        />
      </div>
      <div className="group-user-info">
        <Dropdown overlay={renderDropdown()} trigger={["click"]}>
          <div className="cursor-pointer flex items-center">
            <Image
              src={dataUser?.data?.avatar || "/img/avatar/avatar.jpg"}
              preview={false}
              width={30}
              height={30}
              fallback="/img/avatar/avatar.jpg"
              className="rounded-full"
              alt="avatar"
            />
            <span className="ml-2 hidden md:flex">
              {dataUser?.data?.fullName}
            </span>
            <Icon icon="ArrowDown" size={20} color="#000" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
