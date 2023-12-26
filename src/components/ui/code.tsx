import React from "react";

type Props = {
  object: object;
};

export const Code: React.FC<Props> = ({ object }) => (
  <pre className="w-[340px]rounded-md mt-2 bg-neutral-800 p-4">
    <code className="text-white">{JSON.stringify(object, null, 2)}</code>
  </pre>
);
