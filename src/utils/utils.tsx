import type { SweetAlertIcon } from "sweetalert2";
import Swal from "sweetalert2";
import { projectconstants } from "../services/constants";

export type SwalType = "success" | "error" | "warning" | "info" | "question";



export function showSwal(
  type: SwalType,
  title?: string,
  text?: string | string[],
  showCancelButton = false,
  confirmText = "OK",
  cancelText = "CANCEL",
  onConfirm?: () => void,
  onCancel?: () => void,
  confirmButtonColor?: string,
  cancelButtonColor?: string,
  imageUrl?: string,
  imageWidth?: number,
  imageHeight?: number,
  imageAlt?: string,

) {
  const isArrayText = Array.isArray(text);

  const htmlContent = isArrayText
    ? `
      <ul style="text-align:center; margin:0; max-height:200px; overflow-y:auto;">
  ${text.map((item) => `<li>${item}</li>`).join("")}
</ul
    `
    : undefined;

  Swal.fire({
    icon: imageUrl ? undefined : (type as SweetAlertIcon),
    title,

    // 🔹 Use text OR html based on input
    text: !isArrayText ? text : undefined,
    html: isArrayText ? htmlContent : undefined,

    showCancelButton,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,

    imageUrl,
    imageWidth,
    imageHeight,
    imageAlt,
    allowOutsideClick: false,

    confirmButtonColor:
      confirmButtonColor ||
      (type === "error" ? "#d33" : "#0d6efd"),

    cancelButtonColor: cancelButtonColor || "#6E7881",

    customClass: {
      confirmButton: type === "error" ? "btn btn-danger" : "btn btn-primary",
      cancelButton: "btn btn-secondary rounded",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) onConfirm();
    else if (result.isDismissed && onCancel) onCancel();
  });
}





export function utilLog(message: any, title?: any) {
  if (projectconstants.showlog) {
    console.log({ title })
    console.log({ message })
  }
}


export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};