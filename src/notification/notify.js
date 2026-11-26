import { toast } from "react-toastify";

const configureToast = {
  position: "bottom-right",
  autoClose: 2200,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "light",
};

export const notify = (text) => toast.success(text, configureToast);
export const notifyInfo = (text) =>
  toast.info(text, { ...configureToast, position: "top-right" });
export const notifyError = (text) => toast.error(text, configureToast);
