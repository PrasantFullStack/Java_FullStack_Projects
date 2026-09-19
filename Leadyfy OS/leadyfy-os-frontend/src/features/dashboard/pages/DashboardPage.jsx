import { useEffect, useState } from 'react';
import ActivityFeed from '../../../components/dashboard/ActivityFeed';
import EmptyState from '../../../components/dashboard/EmptyState';
import LoadingSpinner from '../../../components/dashboard/LoadingSpinner';
import SectionCard from '../../../components/dashboard/SectionCard';
import StatCard from '../../../components/dashboard/StatCard';
import StatusBadge from '../../../components/dashboard/StatusBadge';
import { fetchDashboardData } from '../../../services/dashboardService';

function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      const dashboardData = await fetchDashboardData();

      if (isMounted) {
        setData(dashboardData);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !data) {
    return <LoadingSpinner label="Loading dashboard metrics..." />;
  }

  return (
    <div>
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
        <div>
          <p className="section-kicker mb-1">Overview</p>
          <h2 className="page-title mb-0">Executive Dashboard</h2>
        </div>
        <button className="btn btn-amber">Export Report</button>
      </div>

      <div className="row g-3 mb-4">
        {data.summary.map((stat) => (
          <div key={stat.label} className="col-12 col-sm-6 col-xl-3">
            <StatCard
              label={stat.label}
              value={stat.value}
              meta={stat.meta}
              tone={stat.tone === 'amber' ? 'amber' : 'default'}
            />
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <SectionCard title="Today's Shoots" subtitle="Production" action={<button className="btn btn-link btn-link-amber">View Schedule</button>}>
            {data.todaysShoots?.length ? (
              <div className="list-stack">
                {data.todaysShoots.map((shoot) => (
                  <div key={shoot.id} className="list-row">
                    <div>
                      <div className="list-title">{shoot.title}</div>
                      <div className="list-meta">{shoot.time} · {shoot.location}</div>
                    </div>
                    <StatusBadge label={shoot.status} tone={shoot.status === 'Confirmed' ? 'approved' : 'pending'} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No shoots scheduled" message="No shoot activities are scheduled for today." />
            )}
          </SectionCard>
        </div>

        <div className="col-12 col-xl-4">
          <SectionCard title="Recent Activity" subtitle="Updates" action={<button className="btn btn-link btn-link-amber">All</button>}>
            <ActivityFeed items={data.recentActivity || []} />
          </SectionCard>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-xl-6">
          <SectionCard title="Urgent Tasks" subtitle="Action needed" action={<button className="btn btn-link btn-link-amber">Manage</button>}>
            {data.urgentTasks?.length ? (
              <div className="list-stack">
                {data.urgentTasks.map((task) => (
                  <div key={task.id} className="list-row list-row-compact">
                    <div>
                      <div className="list-title">{task.title}</div>
                      <div className="list-meta">{task.owner}</div>
                    </div>
                    <StatusBadge label={task.priority === 'urgent' ? 'Urgent' : task.priority === 'pending' ? 'Pending' : 'In Progress'} tone={task.priority === 'urgent' ? 'urgent' : task.priority === 'pending' ? 'pending' : 'in_progress'} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No urgent tasks" message="Everything is moving as expected." />
            )}
          </SectionCard>
        </div>

        <div className="col-12 col-xl-6">
          <SectionCard title="Pending Client Approvals" subtitle="Approval queue" action={<button className="btn btn-link btn-link-amber">Review all</button>}>
            {data.pendingApprovals?.length ? (
              <div className="list-stack">
                {data.pendingApprovals.map((item) => (
                  <div key={`${item.client}-${item.project}`} className="list-row list-row-compact">
                    <div>
                      <div className="list-title">{item.project}</div>
                      <div className="list-meta">{item.client} · due {item.due}</div>
                    </div>
                    <StatusBadge label={item.status === 'urgent' ? 'Urgent' : 'Pending'} tone={item.status === 'urgent' ? 'urgent' : 'pending'} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No pending approvals" message="Client approvals are up to date." />
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
