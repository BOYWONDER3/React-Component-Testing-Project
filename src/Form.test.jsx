import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { stateForm as Form } from './StateForm'

describe('Form Component', () => {
    it('should call the onSubmit when the form is valid with the correct data', async() => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        render(<Form onSubmit = {onSubmit} />)
        const email = 'test@webdevsimplified.com'
        const password = 'Password123'

        await user.type(screen.getByLabelText('Email'), email)
        await user.type(screen.getByLabelText('Password'), password)
        await user.click(screen.getByText('submit'))

        expect(onSubmit).toHaveBeenCalledOnce()
        expect(onSubmit).toHaveBeenCalledWith({ email, password })

    })
})