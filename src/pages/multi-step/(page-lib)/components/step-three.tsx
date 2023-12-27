import React from "react";
import { MultiStepFormSchema, StepThreeSchema, stepThreeSchema } from "../lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "$/components/ui/form";
import { Label } from "$/components/ui/label";
import { Input } from "$/components/ui/input";
import { FieldError } from "$/components/ui/field-error";
import { Button } from "$/components/ui/button";
import { useToast } from "$/components/ui/use-toast";
import { Code } from "$/components/ui/code";
import { Steps } from "../lib";

type Props = {
  formValues: MultiStepFormSchema;
  setFormValues: React.Dispatch<React.SetStateAction<MultiStepFormSchema>>;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
};
const StepThree: React.FC<Props> = ({ formValues, setFormValues, setStep }) => {
  const toast = useToast();

  const form = useForm<StepThreeSchema>({
    defaultValues: {
      password: formValues.stepThree.password,
      confirmPassword: formValues.stepThree.confirmPassword,
    },
    mode: "onSubmit",
    resolver: zodResolver(stepThreeSchema),
  });
  function handleSubmit(data: StepThreeSchema): void {
    const newData = {
      ...formValues,
      stepThree: {
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    } satisfies MultiStepFormSchema;
    setFormValues(newData);
    toast.toast({
      title: "Success",
      description: <Code object={newData} />,
    });
  }
  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <Label>
        Password
        <Input
          required
          placeholder="password"
          type="password"
          {...form.register("password")}
        ></Input>
        <FieldError
          message={form.formState.errors.password?.message}
        ></FieldError>
      </Label>
      <Label>
        Confirm Password
        <Input
          required
          placeholder="confirm password"
          type="password"
          {...form.register("confirmPassword")}
        ></Input>
        <FieldError
          message={form.formState.errors.confirmPassword?.message}
        ></FieldError>
      </Label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setStep(2);
          }}
        >
          Back
        </Button>
        <Button type="submit">Submit </Button>
      </div>
    </Form>
  );
};
export default StepThree;
