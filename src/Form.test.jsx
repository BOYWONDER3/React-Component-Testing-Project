import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RefForm as Form } from "./StateForm";
import userEvent from "@testing-library/user-event";

describe("Form component", () => {
  it("should call the onSubmit when the form is valid with the correct data", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@webdevsimplified.com";
    const password = "Password123";

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument();
    expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith({ email, password });
  });

  it("it should show the email error when the mail is invalid", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@test.com";
    const password = "Password123";

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(screen.getByTestId("email-error-msg")).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalledOnce();
  });

  it("it should show the password error when the password is invalid", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@webdevsimplified.com";
    const password = "123";

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(screen.getByTestId("password-error-msg")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalledOnce();
  });

  it("should update the error message while typing after the first submit", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@webdevsimplified.com";
    const password = "123";

    const passwordInput = screen.getByLabelText("Password");

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(passwordInput, "1234");
    await user.click(screen.getByText("Submit"));

    const passWordErrorMsg = screen.getByTestId("password-error-msg");
    expect(passWordErrorMsg).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalledOnce();

    await user.clear(passwordInput);
    await user.type(passwordInput, "Password1234");
    expect(passWordErrorMsg).not.toBeInTheDocument();
  });
});
