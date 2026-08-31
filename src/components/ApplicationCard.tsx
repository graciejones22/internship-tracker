import type { Application } from '../types/Application';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: number) => void;
  onEdit: (application: Application) => void;
}

function ApplicationCard({
  application,
  onDelete,
  onEdit,
}: ApplicationCardProps) {
  return (
    <div className="application-card">
      <div className="application-card-main">
        <div>
          <h3>{application.company}</h3>
          <p className="application-position">
            {application.position}
          </p>

          {application.location && (
            <p className="application-location">
              📍 {application.location}
            </p>
          )}
        </div>

        <span className={`status-badge status-${application.status.toLowerCase()}`}>
          {application.status}
        </span>
      </div>

      <div className="application-details">
        {application.dateApplied && (
          <div>
            <span className="detail-label">Applied</span>
            <span>{application.dateApplied}</span>
          </div>
        )}

        {application.deadline && (
          <div>
            <span className="detail-label">Deadline</span>
            <span>{application.deadline}</span>
          </div>
        )}
      </div>

      <div className="application-actions">
        {application.jobUrl && (
          <a
            href={application.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-job-button"
          >
            View Job
          </a>
        )}

        <button
         type="button"
          className="edit-button"
          onClick={() => onEdit(application)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(application.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;