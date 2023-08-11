import React, {useEffect, useState} from "react";
import {MenuOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState, persistor} from "@app/redux/store";
import {loginUser, logoutUser} from "@app/redux/slices/UserSlice";
import {toggleMenu} from "@app/redux/slices/MenuSlice";
import {useQuery} from "react-query";
import {IUserLogin} from "@app/types";
import ApiUser from "@app/api/ApiUser";
import {Dropdown, Image, Input, Menu, Modal} from "antd";
import Icon from "@app/components/Icon/Icon";
import {queryKeys} from "@app/utils/constants/react-query";
import {useRouter} from "next/router";
import {ModalChangePassword} from "@app/components/Layout/Navbar/ModalChangePassword";
import "./Navbar.scss";
import Link from "next/link";
import {
  BiSolidGrid,
  BiSolidBell,
  BiSearch,
  BiSolidDownArrow,
} from "react-icons/bi";
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
    <Menu>
      <Menu.Item key="0" onClick={() => setToggleModal(true)}>
        {toggleModal && (
          <ModalChangePassword isModalVisible setToggleModal={setToggleModal} />
        )}
        <div>
          {/* <Icon icon="BlockUser" size={20} color="#000" className="mr-2" /> */}
          Đổi mật khẩu
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href="/profile-account">
          <div>
            {/* <Icon icon="User" size={20} color="#000" className="mr-2" /> */}
            Thông tin tài khoản
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Link href="/">
          <div>
            {/* <Icon icon="User" size={20} color="#000" className="mr-2" /> */}
            Đánh giá
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href="/">
          <div>
            {/* <Icon icon="User" size={20} color="#000" className="mr-2" /> */}
            Liên hệ hỗ trợ
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link href="/">
          <div>
            {/* <Icon icon="User" size={20} color="#000" className="mr-2" /> */}
            Điều khoản dịch vụ
          </div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" onClick={handleLogout}>
        <div>
          {/* <Icon icon="SignOut" size={20} color="#000" className="mr-2" /> */}
          Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="navbar">
      {/* <div className="flex items-center">
        <MenuOutlined
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        />
      </div> */}
      <div className="logo-container">
        <Image src="/img/logo_detail.png" width={100} height={50} alt="logo" />
      </div>
      <Input
        placeholder="Search"
        prefix={
          <BiSearch
            className="site-form-item-icon"
            style={{width: "20px", height: "20px"}}
          />
        }
        suffix={<BiSolidDownArrow />}
      />
      <div className="notifications">
        <BiSolidBell />
      </div>
      <div className="setting">
        <BiSolidGrid />
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
