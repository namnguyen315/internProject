import React, {useEffect, useState} from "react";
import {Menu, Modal} from "antd";
import Image from "next/image";
import {ArrowLeftOutlined} from "@ant-design/icons";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import RouteList from "../../../routes/RouteList";
import {loginUser, logoutUser} from "@app/redux/slices/UserSlice";
import Icon from "@app/components/Icon/Icon";
import {IRootState, persistor} from "@app/redux/store";
import {CheckPermissionEvent} from "@app/check_event/CheckPermissionEvent";
import {toggleMenu} from "@app/redux/slices/MenuSlice";
import {IUserLogin} from "@app/types";
import ApiUser from "@app/api/ApiUser";
import {useQuery} from "react-query";
import {queryKeys} from "@app/utils/constants/react-query";
import {ModalCreateCompany} from "./ModalCreateCompany";
import {ICompanyBody, getAllCompany} from "@app/api/ApiCompany";

const RenderMenu = React.memo(() => {
  const router = useRouter();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(closeMenu());
  //   }, 50);
  //   const ele = document.querySelector(".sidebar .ant-menu-item-selected");
  //   if (ele) {
  //     ele.scrollIntoView({block: "center", inline: "nearest"});
  //   }
  // }, [router]);

  return (
    <Menu
      mode="inline"
      theme="light"
      defaultSelectedKeys={[router.pathname]}
      defaultOpenKeys={["/" + router.pathname.split("/")[1]]}
    >
      {RouteList.map(({path, name, icon, iconLib, children, role}) => {
        // if (role?.includes(userRole ?? IAccountRole.ANONYMOUS)) {
        //   return null;
        // }
        if (CheckPermissionEvent(role)) {
          if (children) {
            return (
              <Menu.SubMenu
                key={path}
                title={name}
                icon={
                  !!icon ? (
                    <Icon icon={icon as string} size={15} color="#fff" />
                  ) : (
                    iconLib
                  )
                }
              >
                {children.map((child) => {
                  if (CheckPermissionEvent(child.role)) {
                    return (
                      <Menu.Item
                        key={path + child.path}
                        onClick={(): void => {
                          router.push(path + child.path);
                        }}
                        className="sidebar-item"
                      >
                        {child.name}
                      </Menu.Item>
                    );
                  }
                  return <> </>;
                })}
              </Menu.SubMenu>
            );
          }

          return (
            <Menu.Item
              key={path}
              className="sidebar-item"
              onClick={(): void => {
                router.push(path);
              }}
            >
              <span className="icon">
                {!!icon ? (
                  <Icon icon={icon as string} size={40} color="#fff" />
                ) : (
                  iconLib
                )}
              </span>
              <span className="title">{name}</span>
            </Menu.Item>
          );
        }
        return <> </>;
      })}
    </Menu>
  );
});
RenderMenu.displayName = "RenderMenu";

/**
 *
 */
export default function Sidebar(): JSX.Element {
  const [toggleModal, setToggleModal] = useState(false);
  const user = useSelector((state: IRootState) => state.user);
  const router = useRouter();
  const {data, isLoading, error} = useQuery<ICompanyBody[]>(
    ["companies"],
    getAllCompany
  );
  const companies: ICompanyBody[] = data ?? [];
  const [message, setMessage] = useState("");
  const getMeData = (): Promise<IUserLogin> => {
    return ApiUser.getMe();
  };

  useEffect(() => {
    !!companies.length
      ? setMessage("Bạn có muốn tạo thêm không gian làm việc hiệu quả!")
      : setMessage("Bạn chưa có không gian làm việc");
  }, [companies]);

  const dataUser = useQuery(queryKeys.GET_DATA_USER_IN_USE, getMeData);
  useEffect(() => {
    dataUser.refetch().then((data) => {
      dispatch(loginUser({...user, user: data?.data}));
    });
  }, [toggleModal]);
  const isOpen = useSelector((state: IRootState) => state.menu.isOpen);
  const dispatch = useDispatch();
  // const handleLogout = (): void => {
  //   Modal.confirm({
  //     title: "Đăng xuất",
  //     content: "Bạn có chắc chắn muốn đăng xuất?",
  //     onOk: () => {
  //       persistor
  //         .purge()
  //         .then(() => {
  //           dispatch(logoutUser());
  //           window.location.reload();
  //         })
  //         .catch(() => {
  //           // eslint-disable-next-line no-alert
  //           window.alert(
  //             "Trình duyệt bị lỗi. Xóa Cookie trình duyệt và thử lại"
  //           );
  //         });
  //     },
  //   });
  // };

  return (
    <>
      {/* Sidebar overlay. Only work with screen < 768px */}

      {/* <div */}

      {/*  role="presentation" */}

      {/*  className={classNames("sidebar-overlay", {open: isOpen})} */}

      {/*  onClick={(): void => { */}

      {/*    dispatch(toggleMenu()); */}

      {/*  }} */}

      {/* /> */}

      {/* Sidebar */}

      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <div className={classNames("sidebar", {open: isOpen})}>
        <RenderMenu />
        {/* <div
          className="sidebar-item cursor-pointer"
          role="presentation"
          onClick={handleLogout}
        >
          <ArrowLeftOutlined />
          {!isOpen && <span>Đăng xuất</span>}
        </div> */}

        <div className="workspace-container">
          <svg
            width="129"
            height="128"
            viewBox="0 0 129 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M68.2687 127.178C61.7408 126.088 57.0575 121.694 52.9279 117.818C50.7163 115.744 48.6249 113.782 46.39 112.375C41.3397 109.196 36.8366 107.988 32.4802 106.821C25.4386 104.936 18.1568 102.985 10.3213 93.1277C2.43237 83.2007 -0.526371 73.7507 1.27823 64.2374C3.04614 54.9075 9.3439 46.8418 14.631 40.8609C18.08 36.9549 20.4917 32.1215 23.0402 27.0045C25.2584 22.5547 27.55 17.9548 30.6589 13.7819C38.6345 3.08438 46.4 -0.754992 56.6238 0.952875C60.5666 1.61 64.6195 3.02767 68.9091 4.52872C72.7018 5.85299 76.6212 7.22395 81.0143 8.30137C81.4379 8.40478 81.8883 8.49818 82.3486 8.5749C84.5835 8.9485 86.9385 8.9585 89.4269 8.97185C92.0854 8.98519 94.8307 8.99854 97.6227 9.46553C100.965 10.0226 103.84 11.1601 106.405 12.938C114.338 18.4318 115.065 24.7062 115.769 30.7705C116.056 33.2423 116.352 35.7941 117.143 38.4459C118.154 41.8283 119.975 44.9472 121.903 48.2528C124.852 53.303 127.901 58.5267 128.204 65.0947C128.788 77.7369 120.489 84.7585 114.198 88.9414C112.18 90.2857 110.192 91.3431 108.27 92.3672C104.274 94.4953 100.825 96.3333 98.56 100.039C97.8829 101.147 97.5226 103.045 97.1757 104.879C96.7587 107.081 96.3251 109.359 95.261 111.407C91.4116 118.826 82.9924 126.641 72.8619 127.388C71.3008 127.495 69.7564 127.425 68.2687 127.178Z"
              stroke="url(#paint0_linear_2157_5920)"
              stroke-miterlimit="10"
              stroke-dasharray="25 25"
            ></path>
            <path
              d="M12.9331 91.0529C24.7581 105.93 34.3182 100.83 48.1679 109.549C56.0601 114.516 61.5173 124.867 72.6184 124.053C80.9676 123.439 88.5596 117.075 92.3023 109.863C94.0502 106.494 93.81 101.414 95.7147 98.2947C99.6474 91.8601 106.139 90.289 112.353 86.1594C119.515 81.3961 125.336 75.2818 124.872 65.2447C124.422 55.4545 116.666 48.5163 113.944 39.3966C111.095 29.8498 114.158 22.3646 104.504 15.6732C96.8255 10.3528 88.1994 13.495 80.2171 11.537C59.8127 6.53678 48.6649 -4.79786 33.3308 15.7733C26.9163 24.3793 24.0176 35.2703 17.1261 43.0658C4.87744 56.9322 -2.75459 71.3157 12.9331 91.0529Z"
              fill="url(#paint1_linear_2157_5920)"
            ></path>
            <path
              d="M91.3484 26.5001H68.5649C65.4241 26.5001 62.7424 29.3083 62.7424 32.4492V51.4354C62.7424 54.5763 65.4241 57.1313 68.5649 57.1313H91.3484C94.4893 57.1313 97.1709 54.5763 97.1709 51.4354V32.4492C97.1709 29.3083 94.4893 26.5001 91.3484 26.5001ZM74.2608 47.6382C74.2608 48.6876 73.4116 49.5368 72.3622 49.5368C71.3127 49.5368 70.4635 48.6876 70.4635 47.6382V43.8409C70.4635 42.7915 71.3127 41.9423 72.3622 41.9423C73.4116 41.9423 74.2608 42.7915 74.2608 43.8409V47.6382ZM81.8553 47.6382C81.8553 48.6876 81.0061 49.5368 79.9567 49.5368C78.9072 49.5368 78.058 48.6876 78.058 47.6382V40.0437C78.058 38.9942 78.9072 38.145 79.9567 38.145C81.0061 38.145 81.8553 38.9942 81.8553 40.0437V47.6382ZM89.4498 47.6382C89.4498 48.6876 88.6006 49.5368 87.5512 49.5368C86.5017 49.5368 85.6526 48.6876 85.6526 47.6382V36.2464C85.6526 35.197 86.5017 34.3478 87.5512 34.3478C88.6006 34.3478 89.4498 35.197 89.4498 36.2464V47.6382Z"
              fill="white"
            ></path>
            <path
              d="M47.5534 38.145C43.3649 38.145 39.9589 41.551 39.9589 45.7395C39.9589 49.928 43.3649 53.334 47.5534 53.334C51.7419 53.334 55.1479 49.928 55.1479 45.7395C55.1479 41.551 51.7419 38.145 47.5534 38.145Z"
              fill="white"
            ></path>
            <path
              d="M54.2136 54.9395C52.3359 56.303 50.0465 57.1313 47.5534 57.1313C45.0602 57.1313 42.7709 56.303 40.8931 54.9395C36.5013 57.1031 33.2699 61.2757 32.528 66.2905C32.4246 66.9886 32.7252 67.6194 33.2149 68.0388C34.9119 63.876 38.9903 60.9285 43.7561 60.9285C48.428 60.9285 52.4432 63.7603 54.1986 67.793C55.4751 64.8605 57.9636 62.6081 61.0162 61.5745C59.5123 58.7094 57.1288 56.3755 54.2136 54.9395Z"
              fill="white"
            ></path>
            <path
              d="M43.7561 64.7258C39.5676 64.7258 36.1616 68.1318 36.1616 72.3203C36.1616 76.5088 39.5676 79.9149 43.7561 79.9149C47.9446 79.9149 51.3507 76.5088 51.3507 72.3203C51.3507 68.1318 47.9446 64.7258 43.7561 64.7258Z"
              fill="white"
            ></path>
            <path
              d="M64.641 64.7258C60.4525 64.7258 57.0465 68.1318 57.0465 72.3203C57.0465 76.5088 60.4525 79.9149 64.641 79.9149C68.8295 79.9149 72.3621 76.5088 72.3621 72.3203C72.3621 68.1318 68.8295 64.7258 64.641 64.7258Z"
              fill="white"
            ></path>
            <path
              d="M85.6525 64.7258C81.464 64.7258 78.058 68.1318 78.058 72.3203C78.058 76.5088 81.464 79.9149 85.6525 79.9149C89.841 79.9149 93.3736 76.5088 93.3736 72.3203C93.3736 68.1318 89.841 64.7258 85.6525 64.7258Z"
              fill="white"
            ></path>
            <path
              d="M49.452 87.5094C49.452 85.2117 49.9962 83.0509 50.9228 81.1024C48.959 82.7081 46.485 83.7121 43.7562 83.7121C40.4025 83.7121 37.4138 82.2285 35.3273 79.9149C33.5056 81.9349 32.3644 84.5812 32.3644 87.5094V89.408C32.3644 90.4574 33.2136 91.3066 34.263 91.3066H49.8018C49.589 90.7098 49.452 90.0768 49.452 89.408V87.5094Z"
              fill="white"
            ></path>
            <path
              d="M73.1965 79.9149C71.1099 82.2285 67.9947 83.7121 64.641 83.7121C61.2874 83.7121 58.2987 82.2285 56.2121 79.9149C54.3905 81.9349 53.2493 84.5812 53.2493 87.5094V89.408C53.2493 90.4574 54.0985 91.3066 55.1479 91.3066H74.2608C75.3102 91.3066 76.1594 90.4574 76.1594 89.408V87.5094C76.1594 84.5812 75.0182 81.9349 73.1965 79.9149Z"
              fill="white"
            ></path>
            <path
              d="M94.208 79.9149C92.1214 82.2285 89.0061 83.7121 85.6525 83.7121C82.9237 83.7121 80.4497 82.7081 78.4858 81.1024C79.4125 83.0509 79.9566 85.2117 79.9566 87.5094V89.408C79.9566 90.0768 79.8197 90.7098 79.6069 91.3066H95.2722C96.3217 91.3066 97.1709 90.4574 97.1709 89.408V87.5094C97.1709 84.5812 96.0297 81.9349 94.208 79.9149Z"
              fill="white"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_2157_5920"
                x1="29.5774"
                y1="11.5785"
                x2="101.046"
                y2="111.677"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3965FF"></stop>
                <stop offset="1" stop-color="#6AFFF4"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_2157_5920"
                x1="31.977"
                y1="14.9416"
                x2="99.5532"
                y2="109.588"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8C79FF"></stop>
                <stop offset="1" stop-color="#59F4E9"></stop>
              </linearGradient>
            </defs>
          </svg>
          <p>{message}</p>
          <button
            className="botton-create-workspace"
            onClick={() => setToggleModal(true)}
          >
            {toggleModal && (
              <ModalCreateCompany
                isModalVisible
                setToggleModal={setToggleModal}
              />
            )}
            Tạo ngay nào
          </button>
        </div>
        <div className="icon-workspace" onClick={() => setToggleModal(true)}>
          {toggleModal && (
            <ModalCreateCompany
              isModalVisible
              setToggleModal={setToggleModal}
            />
          )}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75 10.5H10.75V5.5H12V10.5H17V11.75H12V16.75H10.75V11.75H5.75V10.5ZM4.5 0.5H18.25C19.2446 0.5 20.1984 0.895088 20.9017 1.59835C21.6049 2.30161 22 3.25544 22 4.25V18C22 18.9946 21.6049 19.9484 20.9017 20.6517C20.1984 21.3549 19.2446 21.75 18.25 21.75H4.5C3.50544 21.75 2.55161 21.3549 1.84835 20.6517C1.14509 19.9484 0.75 18.9946 0.75 18V4.25C0.75 3.25544 1.14509 2.30161 1.84835 1.59835C2.55161 0.895088 3.50544 0.5 4.5 0.5ZM4.5 1.75C3.83696 1.75 3.20107 2.01339 2.73223 2.48223C2.26339 2.95107 2 3.58696 2 4.25V18C2 18.663 2.26339 19.2989 2.73223 19.7678C3.20107 20.2366 3.83696 20.5 4.5 20.5H18.25C18.913 20.5 19.5489 20.2366 20.0178 19.7678C20.4866 19.2989 20.75 18.663 20.75 18V4.25C20.75 3.58696 20.4866 2.95107 20.0178 2.48223C19.5489 2.01339 18.913 1.75 18.25 1.75H4.5Z"
              fill="#0070FF"
            ></path>
          </svg>
        </div>

        <div
          className="arrowButtonContainer"
          onClick={(): void => {
            dispatch(toggleMenu());
          }}
        >
          <div className={classNames({open: isOpen})}>
            <Icon icon="ArrowLeft2" size={23} color="darkgray" />
          </div>
          <div className={classNames({open: !isOpen})}>
            <Icon icon="ArrowRight2" size={23} color="darkgray" />
          </div>
        </div>
      </div>
    </>
  );
}
