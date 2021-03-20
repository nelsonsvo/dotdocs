import React, { Component } from "react";

interface Props {
  src?: string;
}
interface State {}

export default class MainBody extends Component<Props, State> {
  render() {
    return (
      <div>
        <main
          className="bg-gray-700 h-screen w-screen absolute bg-cover bg-no-repeat bg-center bg-fixed mx-auto overflow-hidden"
          style={{
            backgroundImage: `url(${this.props.src})`,
            paddingLeft: "255px",
          }}
        >
          {this.props.children}
        </main>
      </div>
    );
  }
}
