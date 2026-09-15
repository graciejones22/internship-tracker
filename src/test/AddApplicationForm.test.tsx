import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AddApplicationForm from '../components/AddApplicationForm';

describe('AddApplicationForm', () => {
  it('adds a new internship application when the form is submitted', async () => {
    const user = userEvent.setup();
    const onAddApplication = vi.fn();
    const onCancel = vi.fn();

    render(
      <AddApplicationForm
        onAddApplication={onAddApplication}
        onCancel={onCancel}
      />
    );

    await user.type(screen.getByLabelText(/company/i), 'Epic');
    await user.type(
      screen.getByLabelText(/position/i),
      'Software Developer Intern'
    );
    await user.type(screen.getByLabelText(/location/i), 'Madison, WI');

    await user.click(screen.getByRole('button', { name: /add application/i }));

    expect(onAddApplication).toHaveBeenCalledTimes(1);

    expect(onAddApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        company: 'Epic',
        position: 'Software Developer Intern',
        location: 'Madison, WI',
        status: 'Interested',
      })
    );
  });

    it('edits an existing internship application', async () => {
    const user = userEvent.setup();
    const onAddApplication = vi.fn();
    const onCancel = vi.fn();

    const existingApplication = {
      id: 123,
      company: 'Microsoft',
      position: 'Software Engineering Intern',
      location: 'Redmond, WA',
      dateApplied: '2026-09-01',
      deadline: '2026-10-01',
      status: 'Interested' as const,
      jobUrl: 'https://www.microsoft.com',
      notes: 'Original notes',
    };

    render(
      <AddApplicationForm
        onAddApplication={onAddApplication}
        onCancel={onCancel}
        existingApplication={existingApplication}
      />
    );

    expect(
      screen.getByRole('heading', { name: /edit application/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/company/i)).toHaveValue('Microsoft');
    expect(
      screen.getByLabelText(/position/i)
    ).toHaveValue('Software Engineering Intern');

    await user.clear(screen.getByLabelText(/company/i));
    await user.type(screen.getByLabelText(/company/i), 'Google');

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(onAddApplication).toHaveBeenCalledTimes(1);

    expect(onAddApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 123,
        company: 'Google',
        position: 'Software Engineering Intern',
        location: 'Redmond, WA',
        status: 'Interested',
      })
    );
  });

    it('does not submit when required fields are empty', async () => {
    const user = userEvent.setup();
    const onAddApplication = vi.fn();
    const onCancel = vi.fn();

    render(
      <AddApplicationForm
        onAddApplication={onAddApplication}
        onCancel={onCancel}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /add application/i })
    );

    expect(onAddApplication).not.toHaveBeenCalled();
  });

    it('updates the application status when a different status is selected', async () => {
    const user = userEvent.setup();
    const onAddApplication = vi.fn();
    const onCancel = vi.fn();

    render(
      <AddApplicationForm
        onAddApplication={onAddApplication}
        onCancel={onCancel}
      />
    );

    await user.type(screen.getByLabelText(/company/i), 'Google');
    await user.type(
      screen.getByLabelText(/position/i),
      'Software Engineering Intern'
    );

    await user.selectOptions(
      screen.getByLabelText(/status/i),
      'Applied'
    );

    await user.click(
      screen.getByRole('button', { name: /add application/i })
    );

    expect(onAddApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        company: 'Google',
        position: 'Software Engineering Intern',
        status: 'Applied',
      })
    );
  });
    it('calls onCancel when the Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onAddApplication = vi.fn();
    const onCancel = vi.fn();

    render(
      <AddApplicationForm
        onAddApplication={onAddApplication}
        onCancel={onCancel}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /cancel/i })
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});