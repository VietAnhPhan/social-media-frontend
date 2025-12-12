import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Notifications from "./components/Notification/Notifications";

describe("Notifications component", () => {
  it("render UI", () => {
    const { container } = render(<Notifications />);
    expect(container).toMatchSnapshot();
  });
});
