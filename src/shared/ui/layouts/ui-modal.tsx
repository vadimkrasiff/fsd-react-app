import { ModalOwnProps, Modal as MUIModal, Typography } from "@mui/material";
import { ReactNode } from "react";

export function UIModal({
  title,
  children,
  footer,
  style,
  ...props
}: {
  title?: ReactNode | string;
  footer?: ReactNode;
  style?: React.CSSProperties;
} & ModalOwnProps) {
  return (
    <MUIModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="p-10 w-full flex flex-col items-center"
      {...props}
    >
      <div
        style={{ backgroundColor: "#fff", borderRadius: 5, ...style }}
        className="p-5 w-full flex flex-col justify-center gap-3"
      >
        <Typography variant="h6">{title}</Typography>
        {children}
        {footer && (
          <div className="w-full flex justify-end gap-3">{footer}</div>
        )}
      </div>
    </MUIModal>
  );
}
