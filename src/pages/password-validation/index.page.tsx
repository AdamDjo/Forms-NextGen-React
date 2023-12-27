import { Button } from "$/components/ui/button";
import { Code } from "$/components/ui/code";
import { Form } from "$/components/ui/form";
import { Input } from "$/components/ui/input";
import { Label } from "$/components/ui/label";
import { useToast } from "$/components/ui/use-toast";
import { cn } from "$/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, XIcon } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const atLeastOneLowerCaseLetter = z
  .string()
  .regex(/[a-z]/)
  .describe("At least one lowercase letter");
const atLeastOneUpperCaseLetter = z
  .string()
  .regex(/[A-Z]/)
  .describe("At least one uppercase letter");
const atLeastOneNumber = z
  .string()
  .regex(/[0-9]/)
  .describe("at least one number");
const atLeastOneSpecialCharacter = z
  .string()
  .regex(/[^a-zA-Z0-9]/)
  .describe("at least one special character");
const atLeastEightCharacters = z
  .string()
  .min(8)
  .describe("at least 8 characters");

const validations = [
  atLeastOneLowerCaseLetter,
  atLeastOneUpperCaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  atLeastEightCharacters,
];

const formSchema = z.object({
  password: z
    .string()
    .pipe(atLeastOneLowerCaseLetter)
    .pipe(atLeastEightCharacters)
    .pipe(atLeastOneNumber)
    .pipe(atLeastOneSpecialCharacter)
    .pipe(atLeastOneUpperCaseLetter),
});

type FormSchema = z.infer<typeof formSchema>;

const PasswordValidation: NextPage = () => {
  const toast = useToast();
  const form = useForm<FormSchema>({ resolver: zodResolver(formSchema) });

  function handleSubmit(data: FormSchema): void {
    toast.toast({
      title: "succes",
      description: <Code object={data}></Code>,
    });
  }

  return (
    <div className=" container  flex h-screen max-w-sm flex-col  justify-center">
      <div className="text-center">
        <Button asChild>
          <Link href="/">back</Link>
        </Button>
      </div>
      <hr className=" my-5"></hr>
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <Controller
          render={({ field }) => {
            return (
              <React.Fragment>
                <Label>
                  Password
                  <Input
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                  ></Input>
                </Label>
                <div className="flex flex-col gap-1">
                  {validations.map((schema) => {
                    const isValid = schema.safeParse(field.value).success;
                    return (
                      <div
                        key={schema.description}
                        className={cn("flex items-center gap-1.5", {
                          "text-green-500": isValid,
                          "text-destructive": !isValid,
                        })}
                      >
                        {isValid ? (
                          <CheckIcon className="h-5 w-5"></CheckIcon>
                        ) : (
                          <XIcon className="h-5 w-5"></XIcon>
                        )}
                        {schema.description}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          }}
          name="password"
          control={form.control}
        ></Controller>
        <Button type="submit" disabled={!form.formState.isValid}>
          submit
        </Button>
      </Form>
    </div>
  );
};
export default PasswordValidation;
