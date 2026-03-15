import { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Ticket {
  id: string;
  customer: string;
  subject: string;
  status: "Open" | "Pending" | "Resolved";
  date: string;
}

export default function Support() {
  const [tickets] = useState<Ticket[]>([
    {
      id: "TKT1001",
      customer: "Rahul Sharma",
      subject: "Order not delivered",
      status: "Open",
      date: "12 Mar 2026",
    },
    {
      id: "TKT1002",
      customer: "Amit Singh",
      subject: "Payment issue",
      status: "Pending",
      date: "11 Mar 2026",
    },
    {
      id: "TKT1003",
      customer: "Sohan Kumar",
      subject: "Wrong product received",
      status: "Resolved",
      date: "10 Mar 2026",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Support Tickets</h1>

          <input
            type="text"
            placeholder="Search tickets..."
            className="border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            All Tickets
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Open
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Pending
          </button>

          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Resolved
          </button>
        </div>

        {/* Tickets Table */}
        <div className="bg-white shadow rounded-xl overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-t">

                  <td className="p-3 font-medium">{ticket.id}</td>

                  <td className="p-3">{ticket.customer}</td>

                  <td className="p-3">{ticket.subject}</td>

                  <td className="p-3">{ticket.date}</td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-600"
                          : ticket.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td className="p-3 flex gap-2">

                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                      View
                    </button>

                    <button className="bg-green-600 text-white px-3 py-1 rounded">
                      Reply
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 gap-2">

          <button className="px-3 py-1 border rounded">
            Prev
          </button>

          <button className="px-3 py-1 border rounded bg-blue-600 text-white">
            1
          </button>

          <button className="px-3 py-1 border rounded">
            2
          </button>

          <button className="px-3 py-1 border rounded">
            Next
          </button>

        </div>

      </div>
    </div>
  );
}