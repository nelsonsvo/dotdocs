import React, { ReactElement } from "react";
import MainBody from "../components/MainBody";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  return (
    <div>
      <MainBody src="unnamed.jpeg">
        <h1>test 123</h1>
      </MainBody>
    </div>
  );
}
