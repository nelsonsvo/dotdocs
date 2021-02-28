import React, { ReactElement } from "react";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  return (
    <div>
      <main>
        <h1 className="text-red-500">DASHBOARD!!!!</h1>
      </main>
    </div>
  );
}
