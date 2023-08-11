import "./index.scss";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {IRootState, persistor} from "@app/redux/store";
import {IUserLogin} from "@app/types";
import ApiUser, {IUpdateProfileBody} from "@app/api/ApiUser";
import {useMutation, useQuery} from "react-query";
import {queryKeys} from "@app/utils/constants/react-query";
import {loginUser, logoutUser} from "@app/redux/slices/UserSlice";
import {Form, Image, Modal, Upload, notification} from "antd";
import Icon from "@app/components/Icon/Icon";
import {Formik, useFormik} from "formik";
import {ButtonSubmit} from "@app/components/ButtonSubmit";
import {TextInput} from "@app/components/TextInput";

export default function ProfileAccount() {
  const [toggleModal, setToggleModal] = useState(false);
  const user = useSelector((state: IRootState) => state.user);
  const router = useRouter();
  const updateData = useMutation(ApiUser.updateMe);
  const updateAvatar = useMutation(ApiUser.updateAvatar);
  const [profileValidate, setProfileValidate] = useState({
    fullName: {
      message: "",
      style: "lightGrey",
    },
    phoneNumber: {
      message: "",
      style: "lightGrey",
    },
  });

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

  // const [imageUrl, setImageUrl] = useState(user.user?.avatar || "/img/avatar/avatar.jpg");
  const [image, setImage] = useState({});

  const handleSubmit = (
    values: IUpdateProfileBody,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}
  ): void => {
    const hasChanges =
      values.fullName !== user?.user?.fullName ||
      values.phoneNumber !== user?.user?.profile?.phone ||
      formik.values.avatar !== user?.user?.avatar;

    if (!hasChanges) {
      setSubmitting(false);
      return;
    }

    if (formik.values.avatar !== user?.user?.avatar) {
      console.log(formik.values.avatar);
      console.log(user.user?.avatar);
      updateAvatar.mutate(image, {
        onSuccess: () => {
          if (
            values.fullName !== user?.user?.fullName ||
            values.phoneNumber !== user?.user?.profile?.phone
          ) {
            updateData.mutate(
              {fullName: values.fullName, profile: {phone: values.phoneNumber}},
              {
                onSuccess: () => {
                  setSubmitting(true);
                  window.location.replace("/");
                },
                onError: (error) => {
                  console.log("lỗi 1");
                  setSubmitting(false);
                },
              }
            );
          } else {
            setSubmitting(true);
            window.location.replace("/");
          }
        },
        onError: (err) => {
          console.log("lỗi 2");
          setSubmitting(false);
        },
      });
    } else {
      updateData.mutate(
        {fullName: values.fullName, profile: {phone: values.phoneNumber}},
        {
          onSuccess: () => {
            setSubmitting(true);
            window.location.replace("/");
          },
          onError: (error) => {
            notification.error({
              message: "Có lỗi xảy ra. Hãy thử lại!",
              duration: 3,
            });
            setSubmitting(false);
          },
        }
      );
    }
  };
  const handleCancel = () => {
    formik.resetForm(); // Đặt lại giá trị của form về trạng thái ban đầu
    formik.values.avatar = user.user?.avatar || "/img/avatar/avatar.jpg";
  };
  const handleDeleteAccount = (): void => {
    Modal.confirm({
      title: "Xóa tài khoản",
      content: "Bạn có chắc chắn?",
      onOk: () => {
        ApiUser.deleteMe();
        persistor
          .purge()
          .then(() => {
            dispatch(logoutUser());
          })
          .catch(() => {
            window.alert(
              "Trình duyệt bị lỗi. Xóa Cookie trình duyệt và thử lại"
            );
          });
        router.push("/");
      },
    });
  };

  const customRequest = ({file, onSuccess, onError}: any) => {
    const formData = new FormData();
    formData.append("photoFile", file);
    formik.values.avatar = URL.createObjectURL(file);
    setImage(formData);
  };

  const formik = useFormik({
    initialValues: {
      fullName: user.user?.fullName || "",
      phoneNumber: user.user?.profile?.phone || "",
      username: user.user?.username || "",
      email: user.user?.email || "",
      avatar: user.user?.avatar,
    },
    validate: (values) => {
      // ... logic validate của bạn (nếu có) ...
    },
    onSubmit: handleSubmit,
    validateOnChange: true,
  });
  return (
    <div className="profile-container">
      <div className="header">Thông tin tài khoản</div>
      <div className="form">
        <form onSubmit={formik.handleSubmit}>
          <div className="topSite">
            <div className="avata">
              <Image
                preview={false}
                src={
                  !!formik.values.avatar
                    ? formik.values.avatar
                    : "/img/avatar/avatar.jpg"
                }
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
          <div className="bottomSite">
            <div className="container-form-input">
              <div className="fullNameContainer">
                <div className="lable">Họ và tên</div>
                <TextInput
                  placeholder=""
                  value={formik.values.fullName}
                  handleChange={formik.handleChange}
                  name="fullName"
                  type="text"
                  style={profileValidate.fullName.style}
                  disable={false}
                />
                {/* <div className="validate">{profileValidate.fullName.message}</div> */}
              </div>
              <div>
                <div className="lable">Tên tài khoản</div>
                <TextInput
                  placeholder={formik.values.username}
                  value={formik.values.username}
                  handleChange={formik.handleChange}
                  name="text"
                  type="text"
                  style={"lightGrey"}
                  disable={true}
                />
              </div>
              <div>
                <div className="lable">Email</div>
                <TextInput
                  placeholder={formik.values.email}
                  value={formik.values.email}
                  handleChange={formik.handleChange}
                  name="text"
                  type="text"
                  style={"lightGrey"}
                  disable={true}
                />
              </div>
              <div className="phoneContainer">
                <div className="lable">Số điện thoại</div>
                <TextInput
                  placeholder=""
                  value={formik.values.phoneNumber}
                  handleChange={formik.handleChange}
                  name="phoneNumber"
                  type="text"
                  style={"lightGrey"}
                  disable={false}
                />
              </div>
              <div>
                <div className="lable">Phòng ban</div>
                <TextInput
                  placeholder="Chưa có phòng ban"
                  value={""}
                  handleChange={formik.handleChange}
                  name="text"
                  type="text"
                  style={"lightGrey"}
                  disable={true}
                />
              </div>
              <div>
                <div className="lable">Chức vụ</div>
                <TextInput
                  placeholder="Chưa có chức vụ"
                  value={""}
                  handleChange={formik.handleChange}
                  name="text"
                  type="text"
                  style={"lightGrey"}
                  disable={true}
                />
              </div>
              <div className="button-handle">
                <div className="delete-button " onClick={handleDeleteAccount}>
                  Xóa tài khoản
                </div>
                <div className="cancel-button" onClick={handleCancel}>
                  Hủy
                </div>
                <ButtonSubmit
                  label="Lưu thông tin"
                  isSubmitting={formik.isSubmitting}
                  classRow="pt-20"
                />
              </div>
            </div>
          </div>
        </form>
        <div style={{height: "20px"}}></div>
      </div>
    </div>
  );
}
