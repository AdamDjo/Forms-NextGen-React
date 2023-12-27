import { z } from "zod";
import StepThree from "./components/step-three";
import StepTwo from "./components/step-two";
import StepOne from "./components/step-one";
//step one type
export const stepOneSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
});
export type StepOneSchema = z.infer<typeof stepOneSchema>;
//step two type
export const stepTwoSchema = z.object({
  email: z.string().email(),
});
export type StepTwoSchema = z.infer<typeof stepTwoSchema>;

//steptwo three

export const stepThreeSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
export type StepThreeSchema = z.infer<typeof stepThreeSchema>;

//form step

export const multiStepFormSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
});
export type MultiStepFormSchema = z.infer<typeof multiStepFormSchema>;
//steps

export const components = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
} as const;
export type Steps = keyof typeof components;
