import {message} from "antd";
export const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} không được để trống!",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: "Email không đúng định dạng!",
    // eslint-disable-next-line no-template-curly-in-string
    number: "${label} không đúng định dạng!",
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: "${label} must be between ${min} and ${max}",
  },
};

// eslint-disable-next-line no-template-curly-in-string
const typeTemplate = "${label} không đúng định dạng!";

export const defaultValidateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  default: "Validation error on field '${label}'",
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} không được để trống!",
  // eslint-disable-next-line no-template-curly-in-string
  enum: "${label} phải thuộc [${enum}]",
  // eslint-disable-next-line no-template-curly-in-string
  whitespace: "${label} không được trống",
  date: {
    // eslint-disable-next-line no-template-curly-in-string
    format: "${label} is invalid for format date",
    // eslint-disable-next-line no-template-curly-in-string
    parse: "${label} could not be parsed as date",
    // eslint-disable-next-line no-template-curly-in-string
    invalid: "${label} is invalid date",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    len: "${label} không có độ dài bằng ${len} kí tự",
    // eslint-disable-next-line no-template-curly-in-string
    min: "${label} phải lớn hơn ${min} kí tự",
    // eslint-disable-next-line no-template-curly-in-string
    max: "${label} phải nhỏ hơn ${max} kí tự",
    // eslint-disable-next-line no-template-curly-in-string
    range: "${label} phải có độ dài từ ${min} đến ${max} kí tự",
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    len: "${label} must equal ${len}",
    // eslint-disable-next-line no-template-curly-in-string
    min: "${label} phải lớn hơn ${min}",
    // eslint-disable-next-line no-template-curly-in-string
    max: "${label} phải nhỏ hơn ${max}",
    // eslint-disable-next-line no-template-curly-in-string
    range: "'${label}' phải từ ${min} đến ${max}",
  },
  array: {
    // eslint-disable-next-line no-template-curly-in-string
    len: "${label} must be exactly ${len} in length",
    // eslint-disable-next-line no-template-curly-in-string
    min: "${label} cannot be less than ${min} in length",
    // eslint-disable-next-line no-template-curly-in-string
    max: "${label} cannot be greater than ${max} in length",
    // eslint-disable-next-line no-template-curly-in-string
    range: "${label} must be between ${min} and ${max} in length",
  },
  pattern: {
    // eslint-disable-next-line no-template-curly-in-string
    mismatch: "${label} does not match pattern ${pattern}",
  },
};

export const layout = {
  labelCol: {span: 9},
  wrapperCol: {span: 15},
};

export const validateSignIn = (
  values: {username: string; password: string},
  [errors, setErrors]: any
): any => {
  console.log("test", values);
  if (!values.username && !values.password) {
    return setErrors({
      userValidate: {
        message: "",
        style: "red",
      },
      passwordValidate: {
        message: "Tài khoản và mật khẩu không được để trống",
        style: "red",
      },
    });
  }
  if (!values.username) {
    return setErrors({
      userValidate: {
        message: "Tài khoản không được để trống",
        style: "red",
      },
      passwordValidate: {
        message: "",
        style: "lightGrey",
      },
    });
  }
  if (!values.password) {
    return setErrors({
      userValidate: {
        message: "",
        style: "lightGrey",
      },
      passwordValidate: {
        message: "Mật khẩu không được để trống",
        style: "red",
      },
    });
  } else {
    setErrors({
      userValidate: {
        message: "",
        style: "lightGrey",
      },
      passwordValidate: {
        message: "",
        style: "lightGrey",
      },
    });
  }
};

export const validateSignUp = (
  values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  },
  [errors, setErrors]: any
) => {
  let newErrors = {...errors};

  // Validate email
  newErrors = {
    ...newErrors,
    emailValidate: !!values.email
      ? /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)
        ? {message: "", style: "lightGrey"}
        : {message: "Email không hợp lệ", style: "red"}
      : {message: "Email Không được để trống", style: "red"},
  };

  // Validate username
  newErrors = {
    ...newErrors,
    userValidate: !!values.username
      ? /^[A-Za-z0-9_]+$/.test(values.username)
        ? {message: "", style: "lightGrey"}
        : {
            message: "Tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới",
            style: "red",
          }
      : {message: "Tài khoản không được để trống", style: "red"},
  };

  // Validate password
  newErrors = {
    ...newErrors,
    passwordValidate: !!values.password
      ? values.password.length >= 6
        ? {message: "", style: "lightGrey"}
        : {message: "Mật khẩu phải chứa ít nhất 6 ký tự", style: "red"}
      : {message: "Password không được để trống", style: "red"},
  };

  // Validate confirmPassword
  newErrors = {
    ...newErrors,
    confirmPasswordValidate: !!values.confirmPassword
      ? values.confirmPassword === values.password
        ? {message: "", style: "lightGrey"}
        : {
            message: "Confirm password không trùng khớp với mật khẩu",
            style: "red",
          }
      : {message: "Confirm không được để trống", style: "red"},
  };

  setErrors(newErrors);
};

export const validateNewPassWord = (
  values: {
    email: string;
    otp: string;
    newPassword: string;
    confirmPass: string;
  },
  [errors, setErrors]: any
) => {
  let newErrors = {...errors};
  // Validate password
  newErrors = {
    ...newErrors,
    passWord: !!values.newPassword
      ? values.newPassword.length >= 6
        ? {message: "", style: "lightGrey"}
        : {message: "Mật khẩu phải chứa ít nhất 6 ký tự", style: "red"}
      : {message: "Password không được để trống", style: "red"},
  };

  // Validate confirmPassword
  newErrors = {
    ...newErrors,
    confirmPassWord: !!values.confirmPass
      ? values.confirmPass === values.newPassword
        ? {message: "", style: "lightGrey"}
        : {
            message: "Confirm password không trùng khớp với mật khẩu",
            style: "red",
          }
      : {message: "Confirm không được để trống", style: "red"},
  };
  const regex = /^[0-9]{4,4}$/g;
  newErrors = {
    ...newErrors,
    otp: !!values.otp
      ? regex.test(values.otp)
        ? {message: "", style: "lightGrey"}
        : {message: "Mã OTP là các số nguyên có 4 ký tự", style: "red"}
      : {message: "Vui lòng nhập mã OTP", style: "red"},
  };
  setErrors(newErrors);
};

export const validateCreateWorkspace = (
  values: {
    displayName: string;
    contactEmail: string;
    website: string;
    memberSize: string;
    photoFile: any;
  },
  [errors, setError]: any
) => {
  let newErrors = {...errors};

  // validate displayName

  newErrors = {
    ...newErrors,
    displayName: !!values.displayName
      ? {message: "", style: "lightGrey"}
      : {message: "Tên không gian làm việc không được để trống", style: "red"},
  };

  // validate website
  const urlPattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)*$/;
  newErrors = {
    ...newErrors,
    website: !!values.website
      ? urlPattern.test(values.website)
        ? {message: "", style: "lightGrey"}
        : {message: "Website không đúng định dạng", style: "red"}
      : {message: "", style: "lightGrey"},
  };

  //validate email
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  newErrors = {
    ...newErrors,
    contactEmail: !!values.contactEmail
      ? regex.test(values.contactEmail)
        ? {message: "", style: "lightGrey"}
        : {message: "Email không hợp lệ", style: "red"}
      : {message: "", style: "lightGrey"},
  };
  setError(newErrors);
};
