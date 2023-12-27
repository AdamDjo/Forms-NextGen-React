import { Button } from "$/components/ui/button";
import { Form } from "$/components/ui/form";
import { Input } from "$/components/ui/input";
import { Label } from "$/components/ui/label";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldError } from "$/components/ui/field-error";

import { Code } from "$/components/ui/code";
import { toast } from "$/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().trim().min(3, "too short").max(20, "too large"),
  password: z
    .string()
    .min(8, "too short")
    .regex(/[0-9]/, "Must contain a number"),
  email: z.string().email("Invalid email"),
});

type FormSchema = z.infer<typeof formSchema>;

const BasicForm = () => {
  const form = useForm<FormSchema>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });
  const { register } = form;

  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2 bg-background">
      <Form
        onSubmit={form.handleSubmit((data) => {
          toast({
            title: "success",
            description: <Code object={data}></Code>,
          });
        })}
      >
        <Label>
          Username
          <Input
            {...register("username", { required: true })}
            placeholder="username"
          ></Input>
          <FieldError
            message={form.formState.errors.username?.message}
          ></FieldError>
        </Label>
        <Label>
          Password
          <Input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
          <FieldError
            message={form.formState.errors.password?.message}
          ></FieldError>
        </Label>
        <Label>
          email
          <Input
            {...register("email", { required: true })}
            placeholder="example@mail.com"
            type="email"
          />
          <FieldError
            message={form.formState.errors.email?.message}
          ></FieldError>
        </Label>
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BasicForm;
