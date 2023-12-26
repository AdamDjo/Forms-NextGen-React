import { cn } from "$/utils/cn";
import React from "react";

type Props = React.ComponentPropsWithRef<"form">;

export const Form = React.forwardRef<HTMLFormElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <form
        ref={ref}
        {...rest}
        className={cn("flex w-full flex-col gap-2", className)}
      ></form>
    );
  },
);
Form.displayName = "Form";
