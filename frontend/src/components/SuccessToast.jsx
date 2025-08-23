import { Slide, toast } from "react-toastify";

export const SuccessToast = (successMsg) => {
  toast.success(successMsg, {
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

export default SuccessToast;
