/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {Image, Modal, Select, Upload, notification} from "antd";
import {useFormik} from "formik";
import React, {useState, useEffect} from "react";
import "./ModalCreateCompany.scss";
import Icon from "@app/components/Icon/Icon";
import {TextInput} from "@app/components/TextInput";
import {validateCreateWorkspace} from "@app/validate/user";
import {ICreateCompanies, createCompany} from "../../../api/ApiCompany";
import {useMutation, useQueryClient} from "react-query";

interface ModalChangePassword {
  setToggleModal: (value: boolean) => void;
  isModalVisible: boolean;
}

export function ModalCreateCompany({
  setToggleModal,
  isModalVisible,
}: ModalChangePassword): JSX.Element {
  const [image, setImage] = useState("/img/avatar/avatar.jpg");
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState({
    displayName: {
      message: "",
      style: "lightGray",
    },
    contactEmail: {
      message: "",
      style: "lightGray",
    },
    website: {
      message: "",
      style: "lightGray",
    },
  });
  const data = new FormData();
  const queryClient = useQueryClient();
  const handleSubmit = (values: ICreateCompanies): void => {
    // company.mutate(data, {
    //   onSuccess: () => {
    //     window.location.replace("/companies")
    //     console.log("succes");
    //   },
    //   onError: (err) => {
    //     console.log(err);
    //   },
    // });
    // console.log("vào hàm submit");
  };
  const formik = useFormik({
    initialValues: {
      displayName: "",
      contactEmail: "",
      website: "",
      memberSize: "LT50",
      photoFile: "/img/avatar/avatar.jpg",
      description: "",
    },
    validate: (values) => {
      validateCreateWorkspace(values, [errors, setErrors]);
    },
    onSubmit: handleSubmit,
    validateOnChange: true,
  });
  const companyMutation = useMutation(createCompany, {
    onSuccess: () => {
      // Cập nhật lại dữ liệu trong Companies sau khi gửi dữ liệu thành công
      queryClient.invalidateQueries("companies");
      console.log("success");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    setToggleModal(active);
  }, [active]);

  const handleSelectChange = (value: string) => {
    formik.values.memberSize = value;
  };
  const customRequest = ({file, onSuccess, onError}: any) => {
    data.append("photoFile", file);
    formik.values.photoFile = file;
    setImage(URL.createObjectURL(file));
  };
  const handleOk = () => {
    data.append("photoFile", formik.values.photoFile);
    data.append("memberSize", formik.values.memberSize);
    data.append("website", formik.values.website);
    data.append("contactEmail", formik.values.contactEmail);
    data.append("displayName", formik.values.displayName);
    data.append("description", formik.values.description);

    if (!!data.get("displayName") && !!data.get("memberSize")) {
      companyMutation.mutate(data, {
        onSuccess: () => {
          setActive(!active);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    } else {
      notification.error({
        message: "Vui lòng nhập đầy đủ tên và quy mô làm việc",
        duration: 3,
      });
    }
  };
  const handleCancel = () => {
    setActive(!active);
  };

  return (
    <div className="abc">
      <Modal
        visible={isModalVisible}
        onOk={(): void => {
          handleOk();
        }}
        onCancel={handleCancel}
        okText="Tạo không gian làm việc"
        cancelText="Huỷ"
        className="w-70x"
      >
        <div className="top-site">
          <div className="avata">
            <Image
              preview={false}
              src={image}
              width={200}
              height={200}
              style={{border: "2px solid white"}}
              fallback="/img/avatar/avatar.jpg"
              className="rounded-full"
              alt="avatar"
            />
            <Upload
              customRequest={customRequest}
              showUploadList={false}
              accept="image/*"
            >
              <div className="icon">
                <Icon icon="Camera" size={25} color="#000" className="mr-2" />
              </div>
            </Upload>
          </div>
        </div>
        <div className="bottom-site">
          <p className="title">Hãy xây dựng một không gian làm việc mới</p>
          <p className="sub-title">
            Tăng năng suất công việc một cách tối đa nhất giúp mọi người dễ dàng
            truy cập cùng nhau.
          </p>
          <div className="container-form-input">
            <div className="container-input">
              <div className="lable">
                Tên không gian làm việc
                <b
                  style={{
                    color: "#ff6c44",
                    fontWeight: 400,
                    paddingLeft: "4px",
                  }}
                >
                  *
                </b>
              </div>
              <TextInput
                placeholder="Nhập tên không gian làm việc"
                value={formik.values.displayName}
                handleChange={formik.handleChange}
                name="displayName"
                type="text"
                style={errors.displayName.style}
              />
              <p className="desc-input">Đây là tên công ty của bạn</p>
              <div className="validate">{errors.displayName.message}</div>
            </div>
            <div className="container-input">
              <div className="lable">Website</div>
              <TextInput
                placeholder="Nhập website"
                value={formik.values.website}
                handleChange={formik.handleChange}
                name="website"
                type="text"
                style={errors.website.style}
              />
              <div className="validate">{errors.website.message}</div>
            </div>
            <div className="container-input">
              <div className="lable">Email</div>
              <TextInput
                placeholder="Nhập email"
                value={formik.values.contactEmail}
                handleChange={formik.handleChange}
                name="contactEmail"
                type="text"
                style={errors.contactEmail.style}
              />
              <div className="validate">{errors.contactEmail.message}</div>
            </div>
            <div className="container-input">
              <div className="lable">
                Quy mô làm việc
                <b
                  style={{
                    color: "#ff6c44",
                    fontWeight: 400,
                    paddingLeft: "4px",
                  }}
                >
                  *
                </b>
              </div>
              <Select
                defaultValue="LT50"
                onChange={handleSelectChange}
                options={[
                  {value: "LT50", label: "Nhỏ hơn 50 nhân sự"},
                  {value: "LT100", label: "Từ 50 đến 100 nhân sự"},
                  {value: "GT100", label: "Lớn hơn 100 nhân sự"},
                ]}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
