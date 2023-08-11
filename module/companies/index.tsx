/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useEffect, useState} from "react";
import "./index.scss";
import {ICompanyBody, getAllCompany} from "@app/api/ApiCompany";
import {useQuery} from "react-query";
import {Image, Input, Table} from "antd";
import {BiPlus, BiSearch, BiSolidUserDetail} from "react-icons/bi";
import {ModalCreateCompany} from "@app/components/Layout/Sidebar/ModalCreateCompany";
import {ColumnsType} from "antd/es/table";
import {AiOutlineDelete} from "react-icons/ai";
import Link from "next/link";

export function Companies() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Số lượng hàng trên mỗi trang

  const [toggleModal, setToggleModal] = useState(false);

  const {data, refetch} = useQuery<ICompanyBody[]>(
    ["companies"],
    getAllCompany
  );
  const companies: ICompanyBody[] = data ?? [];
  const [listCompany, setListCompany] = useState<ICompanyBody[]>(companies);

  useEffect(() => {
    setListCompany(companies);
  }, [companies]);

  const columns: ColumnsType<ICompanyBody> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => (
        <div>{listCompany.indexOf(record) + 1}</div>
      ),
    },
    {
      title: "",
      dataIndex: "photoPath",
      key: "photoPath",
      align: "center",
      render: (_, record, index) => {
        return (
          <div>
            <Image
              preview={false}
              src={record.photoPath || "/img/avatar/avatar.jpg"}
              width={70}
              height={70}
              style={{border: "2px solid white"}}
              fallback="/img/avatar/avatar.jpg"
              className="rounded-full"
              alt="avatar"
            />
          </div>
        );
      },
    },
    {
      title: "Tên công ty",
      dataIndex: "displayName",
      key: "displayName",
      align: "center",
      render: (_, record, index) => <div>{record.displayName}</div>,
    },
    {
      title: "Số lượng nhân viên",
      dataIndex: "memberSize",
      key: "memberSize",
      align: "center",
      render: (_, record) => {
        let displayValue = "";
        switch (record.memberSize) {
          case "LT50":
            displayValue = "Nhỏ hơn 50 nhân sự";
            break;
          case "LT100":
            displayValue = "Từ 50 đến 100 nhân sự";
            break;
          case "GT100":
            displayValue = "Lớn hơn 100 nhân sự";
            break;
          default:
            displayValue = "Không xác định";
        }
        return <div>{displayValue}</div>;
      },
    },
    {
      title: "Website công ty",
      dataIndex: "website",
      key: "website",
      align: "center",
      render: (_, record, index) => (
        <Link href={record.website || ""}>{record.website}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (_, record, index) => (
        <Link href={`mailto:${record.contactEmail}` || ""}>
          {record.contactEmail}
        </Link>
      ),
    },
    {
      title: "",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => (
        <div className="button">
          <div className="detail-button">
            <button>
              <BiSolidUserDetail
                style={{width: "25px", height: "25px", color: "white"}}
              />
            </button>
          </div>
          <div className="divide-line" />
          <div className="delete-button">
            <button>
              <AiOutlineDelete
                style={{width: "20px", height: "20px", color: "white"}}
              />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handlePaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  const paginationConfig = {
    pageSize, // Số lượng hàng trên mỗi trang
    current: currentPage,
    total: data?.length, // Tổng số hàng
    onChange: (page: number) => {
      refetch(); // Cập nhật lại dữ liệu khi chuyển trang
      handlePaginationChange(page);
    },
    // showTotal: (total:any, range:any) => `Hiển thị ${range[0]}-${range[1]} trên ${total} hàng`,
  };

  return (
    <div className="company-container">
      <div className="topsite">
        <p>List Company</p>
        <div className="right-top-site">
          <Input
            placeholder="Search"
            prefix={
              <BiSearch
                className="site-form-item-icon"
                style={{width: "20px", height: "20px"}}
              />
            }
          />
          <button onClick={() => setToggleModal(true)}>
            {toggleModal && (
              <ModalCreateCompany
                isModalVisible
                setToggleModal={setToggleModal}
              />
            )}
            <BiPlus style={{width: "25px", height: "25px"}} />
            Create company
          </button>
        </div>
      </div>
      <div className="bottomsite">
        <Table
          columns={columns}
          dataSource={listCompany}
          bordered
          sticky
          className="hover-pointer mt-4"
          pagination={paginationConfig}
          // onRow={onRow}
        />
      </div>
    </div>
  );
}
