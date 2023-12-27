import React from "react";
import {
  MultiStepFormSchema,
  StepOneSchema,
  stepOneSchema,
  Steps,
} from "../lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "$/components/ui/form";
import { Label } from "$/components/ui/label";
import { Input } from "$/components/ui/input";
import { FieldError } from "$/components/ui/field-error";
import { Button } from "$/components/ui/button";

type Props = {
  formValues: MultiStepFormSchema;
  setFormValues: React.Dispatch<React.SetStateAction<MultiStepFormSchema>>;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};
const StepOne: React.FC<Props> = ({ formValues, setFormValues, setStep }) => {
  const form = useForm<StepOneSchema>({
    defaultValues: {
      firstName: formValues.stepOne.firstName,
      lastName: formValues.stepOne.lastName,
    },
    mode: "onSubmit",
    resolver: zodResolver(stepOneSchema),
  });
  function handleSubmit(data: StepOneSchema): void {
    setFormValues({
      ...formValues,
      stepOne: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
    setStep(2);
  }
  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Label>
        FirstName
        <Input
          required
          placeholder="FirstName"
          {...form.register("firstName")}
        ></Input>
        <FieldError
          message={form.formState.errors.firstName?.message}
        ></FieldError>
      </Label>

      <Label>
        LastName
        <Input
          required
          placeholder="LastName"
          {...form.register("lastName")}
        ></Input>
        <FieldError
          message={form.formState.errors.firstName?.message}
        ></FieldError>
      </Label>
      <Button type="submit">Next </Button>
    </Form>
  );
};
export default StepOne;
