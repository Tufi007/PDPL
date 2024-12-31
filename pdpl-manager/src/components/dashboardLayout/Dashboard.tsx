import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFetchConsentDashboardQuery } from '../../services/dashboard/dashboardApi';

const Dashboard = () => {
  const { data, error, isLoading } = useFetchConsentDashboardQuery();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const { forms, responses, trends, formPerformance } = data || {};
  const trendData = Object.entries(trends || {}).map(([date, values]) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    ...values
  }));

  return (
    <div className="space-y-4 p-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-500">Active Consents</h2>
          <div className="text-3xl font-bold text-blue-600 mt-2">{forms?.activeForms || 0}</div>
          <p className="text-sm text-gray-500">
            {responses?.totalResponses && forms?.activeForms ? 
              `+${((responses.totalResponses / forms.activeForms) * 100).toFixed(2)}% from last month` : 
              'No data'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-500">Data Collection Points</h2>
          <div className="text-3xl font-bold text-blue-600 mt-2">{responses?.totalResponses || 0}</div>
          <p className="text-sm text-gray-500">Active collectors</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-sm font-medium text-gray-500">Forms Pending Review</h2>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {formPerformance?.filter(form => !form.totalResponses).length || 0}
          </div>
          <p className="text-sm text-gray-500">Requires attention</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Acceptance Trends</h2>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#2563eb" name="Total Responses" />
              <Line type="monotone" dataKey="accepted" stroke="#16a34a" name="Accepted" />
              <Line type="monotone" dataKey="acceptanceRate" stroke="#dc2626" name="Acceptance Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Form Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formPerformance?.map((form) => (
            <div key={`${form.name}-${form.version}`} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <h4 className="text-lg font-semibold">{form.name}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Version: {form.version}</p>
                <p className="text-sm text-gray-600">Total Responses: {form.totalResponses}</p>
                <p className="text-sm text-gray-600">Acceptance Rate: {form.acceptanceRate?.toFixed(2)}%</p>
                {form.active && <p className="text-sm text-green-600">Status: Active</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;