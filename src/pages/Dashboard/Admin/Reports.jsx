import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:5000/reports");

      const data = await response.json();

      if (response.ok) {
        setReports(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

 return (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
      Admin Dashboard
    </p>

    <h1 className="mt-3 text-3xl font-bold">
      Reports
    </h1>

    <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#F7F6F2]">
            <tr>
              <th className="px-6 py-4 text-left">Reporter</th>
              <th className="px-6 py-4 text-left">Campaign</th>
              <th className="px-6 py-4 text-left">Reason</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center"
                >
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {report.reporter_name}
                  </td>

                  <td className="px-6 py-4">
                    {report.campaign_title}
                  </td>

                  <td className="px-6 py-4">
                    {report.reason}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      report.report_date
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button className="rounded bg-yellow-500 px-3 py-2 text-white">
                      Suspend
                    </button>

                    <button className="rounded bg-red-500 px-3 py-2 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </motion.section>
);
};

export default Reports;