import { Slide, toast } from "react-toastify";

export const ErrorToast = (errorMsg) => {
  toast.error(errorMsg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
  });
};

export default ErrorToast;
