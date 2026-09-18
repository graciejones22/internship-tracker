import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ApplicationCard from '../components/ApplicationCard';
import type { Application } from '../types/Application';

describe('ApplicationCard', () => {
  const application: Application = {
    id: 1,
    company: 'Google',
    position: 'Software Engineering Intern',
    location: 'Mountain View, CA',
    dateApplied: '2026-09-01',
    deadline: '2026-10-01',
    status: 'Applied',
    jobUrl: 'https://google.com',
    notes: 'Summer internship',
  };

  it('displays the application information', () => {
    render(
      <ApplicationCard
        application={application}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    expect(screen.getByRole('heading', { name: 'Google' })).toBeInTheDocument();
    expect(
      screen.getByText('Software Engineering Intern')
    ).toBeInTheDocument();
    expect(screen.getByText(/Mountain View, CA/)).toBeInTheDocument();
    expect(
      screen.getByText('Applied', { selector: '.status-badge' })
    ).toBeInTheDocument();
    expect(screen.getByText('2026-09-01')).toBeInTheDocument();
    expect(screen.getByText('2026-10-01')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Job' })).toHaveAttribute(
      'href',
      'https://google.com'
    );
  });

  it('calls onEdit with the application when Edit is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ApplicationCard
        application={application}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(application);
  });

  it('calls onDelete with the application id when Delete is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <ApplicationCard
        application={application}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});