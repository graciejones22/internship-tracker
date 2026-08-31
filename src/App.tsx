import { useEffect, useState } from 'react';
import './App.css';
import AddApplicationForm from './components/AddApplicationForm';
import type { 
  Application,
  ApplicationStatus,
 } from './types/Application';
import ApplicationCard from './components/ApplicationCard';
import StatusChart from './components/StatusChart';

function App() {
  const [applications, setApplications] = useState<Application[]>(() => {
    const savedApplications = localStorage.getItem('internshipApplications');

    return savedApplications ? JSON.parse(savedApplications) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      'internshipApplications',
      JSON.stringify(applications)
    );
  }, [applications]);
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);
  const [filter, setFilter] = useState<ApplicationStatus | 'All'>(
    'All'
  );

  function handleAddApplication(application: Application) {
    setApplications((currentApplications) => [
      ...currentApplications,
      application,
    ]);

    setShowForm(false);
  }

  function handleDeleteApplication(id: number) {
    setApplications((currentApplications) =>
      currentApplications.filter(
        (application) => application.id !== id
      )
  );
  }

  function handleEditApplication(application: Application) {
    setEditingApplication(application);
    setShowForm(true);
  }

  function handleUpdateApplication(updatedApplication: Application) {
    setApplications((currentApplications) =>
    currentApplications.map((application) =>
      application.id === updatedApplication.id
        ? updatedApplication
        : application
    )
  );

    setEditingApplication(null);
    setShowForm(false);
  }

  const filteredApplications =
    filter === 'All'
      ? applications
      : applications.filter(
          (application) => application.status === filter
        );

  const statusCounts = {
  Interested: applications.filter(
    (application) => application.status === 'Interested'
  ).length,
  Applied: applications.filter(
    (application) => application.status === 'Applied'
  ).length,
  Interview: applications.filter(
    (application) => application.status === 'Interview'
  ).length,
  Offer: applications.filter(
    (application) => application.status === 'Offer'
  ).length,
  Rejected: applications.filter(
    (application) => application.status === 'Rejected'
  ).length,
};

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Internship Tracker</h1>
          <p>Keep track of your internship search in one place.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          + Add Application
        </button>
      </header>

      <main>
        <section className="stats">
          <div className="stat-card">
            <span>Applications</span>
            <strong>{applications.length}</strong>
          </div>

          <div className="stat-card">
            <span>Interviews</span>
            <strong>
              {applications.filter(
                (application) => application.status === 'Interview'
              ).length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Offers</span>
            <strong>
              {applications.filter(
                (application) => application.status === 'Offer'
              ).length}
            </strong>
          </div>

          <div className="stat-card">
            <span>Response Rate</span>
            <strong>
              {applications.length === 0
                ? 0
                : Math.round(
                    (applications.filter(
                      (application) =>
                        application.status !== 'Interested'
                    ).length /
                      applications.length) *
                      100
                  )}
              %
            </strong>
          </div>
        </section>

        <StatusChart statusCounts={statusCounts} />

        <section className="applications-section">
          <div className="section-heading">
            <div>
              <h2>My Applications</h2>
              <p>Your internship applications will appear here.</p>
          </div>

          <div className="filter-buttons">
            {[
              'All',
              'Interested',
              'Applied',
              'Interview',
              'Offer',
              'Rejected',
            ].map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-button ${
                  filter === status ? 'active' : ''
                }`}
                onClick={() =>
                  setFilter(status as ApplicationStatus | 'All')
                }
              >
                {status}
              </button>
            ))}
          </div>
        </div>  
          {applications.length === 0 ? (
            <div className="empty-state">
              <h3>No applications yet</h3>
              <p>
                Start tracking your internship search by adding
                your first application.
              </p>

              <button
                className="add-button"
                onClick={() => setShowForm(true)}
              >
                + Add Your First Application
              </button>
            </div>
          ) : (
            <div className="application-list">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onDelete={handleDeleteApplication}
                  onEdit={handleEditApplication}
                />
          ))}
        </div>
          )}
        </section>
      </main>

      {showForm && (
        <AddApplicationForm
          onAddApplication={
            editingApplication
              ? handleUpdateApplication
              : handleAddApplication
        }
        onCancel={() => {
          setShowForm(false);
          setEditingApplication(null);
        }}
        existingApplication={editingApplication ?? undefined}
      />
  )}
    </div>
  );
}

export default App;