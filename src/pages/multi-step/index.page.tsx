import { NextPage } from "next";
import { useState } from "react";
import { MultiStepFormSchema, Steps, components } from "./(page-lib)/lib";

const MultiStepFormPage: NextPage = () => {
  const [formValues, setFormValues] = useState<MultiStepFormSchema>({
    stepOne: {
      firstName: "",
      lastName: "",
    },
    stepTwo: {
      email: "",
    },
    stepThree: {
      password: "",
      confirmPassword: "",
    },
  });
  const [step, setStep] = useState<Steps>(1);
  const CurrentComponent = components[step];
  return (
    <div className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2 bg-background">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">Multi Step Form</h1>
        <span className="text-muted-foreground">
          ( Step{step} of {Object.keys(components).length} )
        </span>
      </div>
      {
        <CurrentComponent
          formValues={formValues}
          setFormValues={setFormValues}
          setStep={setStep}
        ></CurrentComponent>
      }
    </div>
  );
};

export default MultiStepFormPage;
