import NameEventConstant from "@app/check_event/NameEventConstant";
import {FcTodoList} from "react-icons/fc";

export interface IRoute {
  path: string;
  name: string;
  role?: string;
  icon?: string;
  iconLib?: JSX.Element;
  isSidebar?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
}

const routes: IRoute[] = [
  // {
  //   path: Config.PATHNAME.LOGIN,
  //   name: "Auth",
  //   isAuth: true,
  // },
  // {
  //   path: "/approve-news",
  //   name: "sidebar.approve_new",
  //   role: ["admin"],
  //   icon: "usd_coin_usdc",
  //   isPrivate: true,
  //   isSidebar: true,
  // },
  {
    path: "/",
    name: "Quản lý tài khoản",
    role: NameEventConstant.PERMISSION_USER_KEY.LIST_ALL_USER,
    isPrivate: true,
    icon: "Users",
    isSidebar: true,
  },
  {
    path: "/manager-salary",
    name: "Quản lý bảng lương",
    role: NameEventConstant.PERMISSION_SALARY_MANAGER_KEY.LIST_ALL_SALARY,
    isPrivate: true,
    icon: "Payroll",
    isSidebar: true,
  },
  // {
  //   path: "/salary",
  //   name: "Bảng lương cá nhân",
  //   icon: "Payroll",
  //   isPrivate: true,
  //   isSidebar: true,
  // },
  {
    path: "/",
    name: "Trang chủ",
    iconLib: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.4 6.65H5.15V17.15H6.65V6.65H12.35V17.6H13.85V6.65H17.6V5.15H1.4V6.65ZM3.2 1.25H15.8C16.877 1.25 17.75 2.12304 17.75 3.2V15.8C17.75 16.877 16.877 17.75 15.8 17.75H3.2C2.12304 17.75 1.25 16.877 1.25 15.8V3.2C1.25 2.12304 2.12304 1.25 3.2 1.25Z"
          stroke="#459BFF"
          strokeWidth="1.5"
        />
      </svg>
    ),
    isPrivate: true,
    isSidebar: true,
  },
  {
    path: "/company-goal",
    name: "Mục tiêu công ty",
    iconLib: (
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 20.09C16.2442 20.09 20.09 16.2442 20.09 11.5C20.09 6.75591 16.2442 2.91003 11.5 2.91003C6.75591 2.91003 2.91003 6.75591 2.91003 11.5C2.91003 16.2442 6.75591 20.09 11.5 20.09Z"
          stroke="#E1A0FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M11.5 14.36C13.0795 14.36 14.36 13.0795 14.36 11.5C14.36 9.92048 13.0795 8.64001 11.5 8.64001C9.92048 8.64001 8.64001 9.92048 8.64001 11.5C8.64001 13.0795 9.92048 14.36 11.5 14.36Z"
          stroke="#E1A0FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M11.5 4.82V1"
          stroke="#E1A0FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M11.5 22.0001V18.1801"
          stroke="#E1A0FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M4.82 11.5H1"
          stroke="#E1A0FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M22.0001 11.5H18.1801"
          stroke="#E1A0FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    ),
    isPrivate: true,
    isSidebar: true,
  },
  {
    path: "/my-goal",
    name: "Mục tiêu cá nhân",
    iconLib: (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 19.5C15.4706 19.5 19.5 15.4706 19.5 10.5C19.5 5.52944 15.4706 1.5 10.5 1.5C5.52944 1.5 1.5 5.52944 1.5 10.5C1.5 15.4706 5.52944 19.5 10.5 19.5Z"
          stroke="#FFD336"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M10.4999 11.5C11.0522 11.5 11.4999 11.0523 11.4999 10.5C11.4999 9.94772 11.0522 9.5 10.4999 9.5C9.94765 9.5 9.49993 9.94772 9.49993 10.5C9.49993 11.0523 9.94765 11.5 10.4999 11.5Z"
          stroke="#FFD336"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
        <path
          d="M10.5001 15.5C13.2615 15.5 15.5001 13.2614 15.5001 10.5C15.5001 7.73858 13.2615 5.5 10.5001 5.5C7.73865 5.5 5.50007 7.73858 5.50007 10.5C5.50007 13.2614 7.73865 15.5 10.5001 15.5Z"
          stroke="#FFD336"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="square"
        />
      </svg>
    ),
    isPrivate: true,
    isSidebar: true,
  },
  {
    path: "/daily-task",
    name: "Lịch làm việc",
    iconLib: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.3626 17.8627H3.16259C2.00279 17.8627 1.0626 16.9225 1.0626 15.7627L1.06268 3.16273C1.06269 2.00294 2.00289 1.06274 3.16268 1.06274H12.6129C13.7727 1.06274 14.7129 2.00295 14.7129 3.16274V7.36274M4.73793 5.26274H11.0379M4.73793 8.41274H11.0379M4.73793 11.5627H7.88793M10.5128 14.9674L14.9675 10.5126L17.9374 13.4825L13.4826 17.9372H10.5128V14.9674Z"
          stroke="#FFB992"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    isPrivate: true,
    isSidebar: true,
  },
  {
    path: "/companies",
    name: "Company",
    iconLib: <FcTodoList style={{width: "25px", height: "25px"}} />,
    isPrivate: true,
    isSidebar: true,
  },
];

export default routes;
