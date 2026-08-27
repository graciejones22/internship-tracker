import { useState } from 'react';
import type { Application, ApplicationStatus } from '../types/Application';

interface AddApplicationFormProps {
  onAddApplication: (application: Application) => void;
  onCancel: () => void;
}

function AddApplicationForm({
  onAddApplication,
  onCancel,
}: AddApplicationFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] =
    useState<ApplicationStatus>('Interested');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newApplication: Application = {
      id: Date.now(),
      company,
      position,
      location,
      dateApplied,
      deadline,
      status,
      jobUrl,
      notes,
    };

    onAddApplication(newApplication);
  }

  return (
    <div className="form-overlay">
      <div className="application-form-container">
        <div className="form-header">
          <div>
            <h2>Add Application</h2>
            <p>Enter the details for your internship application.</p>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <label>
            Company *
            <input
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
          </label>

          <label>
            Position *
            <input
              type="text"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              required
            />
          </label>

          <label>
            Location
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Hudson, WI or Remote"
            />
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ApplicationStatus)
              }
            >
              <option value="Interested">Interested</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label>
            Date Applied
            <input
              type="date"
              value={dateApplied}
              onChange={(event) => setDateApplied(event.target.value)}
            />
          </label>

          <label>
            Application Deadline
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
            />
          </label>

          <label className="full-width">
            Job Posting URL
            <input
              type="url"
              value={jobUrl}
              onChange={(event) => setJobUrl(event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="full-width">
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
            />
          </label>

          <div className="form-actions full-width">
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button type="submit" className="add-button">
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddApplicationForm;