import React from "react";

type Props = {
  message: string | null | undefined;
};
export const FieldError: React.FC<Props> = ({ message = null }) => {
  if (message == null) return null;
  return <p className="text-sm text-destructive">{message}</p>;
};
