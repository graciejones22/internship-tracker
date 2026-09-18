import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the empty state when there are no applications', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'No applications yet' })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Start tracking your internship search by adding your first application/i
      )
    ).toBeInTheDocument();
  });

  it('adds an application through the form', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /add your first application/i })
    );

    await user.type(
      screen.getByLabelText(/company/i),
      'Google'
    );

    await user.type(
      screen.getByLabelText(/position/i),
      'Software Engineering Intern'
    );

    await user.type(
      screen.getByLabelText(/location/i),
      'Mountain View, CA'
    );

    await user.click(
      screen.getByRole('button', { name: 'Add Application' })
    );

    expect(
      screen.getByRole('heading', { name: 'Google' })
    ).toBeInTheDocument();

    expect(
      screen.getByText('Software Engineering Intern')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Mountain View, CA/)
    ).toBeInTheDocument();

    expect(
      screen.getByText('1', { selector: 'strong' })
    ).toBeInTheDocument();
  });

  it('filters applications when searching by company or position', async () => {
    const user = userEvent.setup();

    const applications = [
    {
        id: 1,
        company: 'Google',
        position: 'Software Engineering Intern',
        location: 'Mountain View, CA',
        dateApplied: '2026-09-01',
        deadline: '2026-10-01',
        status: 'Applied',
        jobUrl: 'https://google.com',
        notes: 'Summer internship',
    },
    {
        id: 2,
        company: 'Microsoft',
        position: 'Data Science Intern',
        location: 'Redmond, WA',
        dateApplied: '2026-09-05',
        deadline: '2026-10-05',
        status: 'Interested',
        jobUrl: 'https://microsoft.com',
        notes: 'Data internship',
    },
    ];

    localStorage.setItem(
    'internshipApplications',
    JSON.stringify(applications)
    );

    render(<App />);

    expect(screen.getByRole('heading', { name: 'Google' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Microsoft' })).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(
        'Search company or position...'
    );

    await user.type(searchInput, 'Google');

    expect(screen.getByRole('heading', { name: 'Google' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Microsoft' })
    ).not.toBeInTheDocument();

    });

    it('filters applications by status', async () => {
      const user = userEvent.setup();


      const applications = [
        {
        id: 1,
        company: 'Google',
        position: 'Software Engineering Intern',
        location: 'Mountain View, CA',
        dateApplied: '2026-09-01',
        deadline: '2026-10-01',
        status: 'Applied',
        jobUrl: 'https://google.com',
        notes: 'Summer internship',
    },
    {
        id: 2,
        company: 'Microsoft',
        position: 'Data Science Intern',
        location: 'Redmond, WA',
        dateApplied: '2026-09-05',
        deadline: '2026-10-05',
        status: 'Interview',
        jobUrl: 'https://microsoft.com',
        notes: 'Data internship',
    },
    ];

    localStorage.setItem(
    'internshipApplications',
    JSON.stringify(applications)
    );

        render(<App />);

    expect(screen.getByRole('heading', { name: 'Google' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Microsoft' })).toBeInTheDocument();

    await user.click(
    screen.getByRole('button', { name: 'Interview' })
    );

    expect(
    screen.queryByRole('heading', { name: 'Google' })
    ).not.toBeInTheDocument();

    expect(
    screen.getByRole('heading', { name: 'Microsoft' })
    ).toBeInTheDocument();


    });

    it('sorts applications by company name', async () => {
      const user = userEvent.setup();

      const applications = [
        {
          id: 1,
          company: 'Microsoft',
          position: 'Software Engineering Intern',
          location: 'Redmond, WA',
          dateApplied: '2026-09-05',
          deadline: '2026-10-05',
          status: 'Applied',
          jobUrl: 'https://microsoft.com',
          notes: '',
        },
        {
          id: 2,
          company: 'Google',
          position: 'Software Engineering Intern',
          location: 'Mountain View, CA',
          dateApplied: '2026-09-01',
          deadline: '2026-10-01',
          status: 'Applied',
          jobUrl: 'https://google.com',
          notes: '',
        },
      ];

      localStorage.setItem( 
        'internshipApplications',
        JSON.stringify(applications)
      );

      render(<App />);

      const sortSelect = screen.getByLabelText('Sort by:');

      await user.selectOptions(sortSelect, 'company');

      const headings = screen.getAllByRole('heading', { level: 3 });

      expect(headings[0]).toHaveTextContent('Google');
      expect(headings[1]).toHaveTextContent('Microsoft');
    });

    it('deletes an application', async () => {
      const user = userEvent.setup();

      const applications = [
        {
          id: 1,
          company: 'Google',
          position: 'Software Engineering Intern',
          location: 'Mountain View, CA',
          dateApplied: '2026-09-01',
          deadline: '2026-10-01',
          status: 'Applied',
          jobUrl: 'https://google.com',
          notes: '',
        },
        {
          id: 2,
          company: 'Microsoft',
          position: 'Data Science Intern',
          location: 'Redmond, WA',
          dateApplied: '2026-09-05',
          deadline: '2026-10-05',
          status: 'Interview',
          jobUrl: 'https://microsoft.com',
          notes: '',
        },
    ];

      localStorage.setItem(
        'internshipApplications',
        JSON.stringify(applications)
      );

      render(<App />);

      expect(
        screen.getByRole('heading', { name: 'Google' })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('heading', { name: 'Microsoft' })
      ).toBeInTheDocument();

    const googleHeading = screen.getByRole('heading', { name: 'Google' });

    const googleCard = googleHeading.closest(
      '.application-card'
    ) as HTMLElement;

    await user.click(
      within(googleCard).getByRole('button', { name: /delete/i })
    );

      expect(
        screen.queryByRole('heading', { name: 'Google' })
      ).not.toBeInTheDocument();

      expect(
        screen.getByRole('heading', { name: 'Microsoft' })
      ).toBeInTheDocument();
    });
});