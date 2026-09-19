import api from '../api/axios';

const mockDashboardData = {
  summary: [
    { label: 'Active Clients', value: '128', meta: '+12 this month', tone: 'amber' },
    { label: 'Active Orders', value: '42', meta: '9 need approval', tone: 'default' },
    { label: 'Pending Scripts', value: '18', meta: '5 urgent', tone: 'amber' },
    { label: 'Upcoming Shoots', value: '07', meta: '3 this week', tone: 'default' },
    { label: 'Videos In Production', value: '14', meta: '2 behind schedule', tone: 'default' },
    { label: 'Videos Pending Approval', value: '09', meta: '4 from clients', tone: 'amber' },
    { label: 'Videos Under Revision', value: '05', meta: '2 due today', tone: 'default' },
    { label: 'Videos Delivered', value: '63', meta: '+7 this month', tone: 'default' },
    { label: 'Receivables', value: '$48.2K', meta: 'from 21 clients', tone: 'amber' },
    { label: 'Monthly Revenue', value: '$189.4K', meta: '+18.4% vs last month', tone: 'default' },
  ],
  todaysShoots: [
    { id: 1, title: 'Northwind Brand Reel', time: '09:30 AM', location: 'Studio A', status: 'Confirmed' },
    { id: 2, title: 'Bluewave Lifestyle Campaign', time: '12:00 PM', location: 'Riverside', status: 'Pending Crew' },
    { id: 3, title: 'Prime Media Product Launch', time: '04:00 PM', location: 'Warehouse 3', status: 'Confirmed' },
  ],
  urgentTasks: [
    { id: 1, title: 'Finalize script revisions for Northwind', owner: 'Content Team', priority: 'urgent' },
    { id: 2, title: 'Approve new client onboarding assets', owner: 'Ops', priority: 'pending' },
    { id: 3, title: 'Confirm delivery timeline for Prime Media', owner: 'Production', priority: 'in_progress' },
  ],
  pendingApprovals: [
    { id: 1, client: 'Northwind Labs', project: 'Brand Launch Reel', due: 'Today', status: 'pending' },
    { id: 2, client: 'Solstice Studio', project: 'Campaign Review', due: 'Tomorrow', status: 'urgent' },
    { id: 3, client: 'Prime Media', project: 'Product Cutdown', due: 'Today', status: 'pending' },
  ],
  recentActivity: [
    { title: 'New client added: Solstice Studio', time: '12 minutes ago' },
    { title: 'Script approved for Brand Launch Reel', time: '1 hour ago' },
    { title: 'Shoot scheduled for Riverside campaign', time: '2 hours ago' },
    { title: 'Shipping invoice synced for Northwind', time: 'Today' },
  ],
};

const safeRequest = async (endpoint, fallback) => {
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (error) {
    return fallback;
  }
};

export const fetchDashboardData = async () => {
  const [summary, todaysShoots, urgentTasks, pendingApprovals, recentActivity] = await Promise.all([
    safeRequest('/dashboard/summary', mockDashboardData.summary),
    safeRequest('/dashboard/todays-shoots', mockDashboardData.todaysShoots),
    safeRequest('/dashboard/urgent-tasks', mockDashboardData.urgentTasks),
    safeRequest('/dashboard/pending-approvals', mockDashboardData.pendingApprovals),
    safeRequest('/dashboard/recent-activity', mockDashboardData.recentActivity),
  ]);

  return {
    summary,
    todaysShoots,
    urgentTasks,
    pendingApprovals,
    recentActivity,
  };
};

export default fetchDashboardData;
