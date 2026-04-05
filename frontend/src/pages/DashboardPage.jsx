import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchDashboard = () => {
    let url = `${API_URL}/dashboard/summary`;

    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setSummary(data))
      .catch((error) => console.error("Dashboard fetch error:", error));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleExportCSV = () => {
    window.open(`${API_URL}/transactions/export/csv`, "_blank");
  };

  if (!summary) {
    return (
      <div className="upload-box">
        <h2>Dashboard</h2>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const labels = summary.category_summary.map((item) => item.category);
  const counts = summary.category_summary.map((item) => item.count);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Category Count",
        data: counts,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Transactions by Category",
        data: counts,
      },
    ],
  };

  return (
    <div className="upload-box">
      <h2>Dashboard</h2>

      <div className="result-box">
        <h3>Filter by Date</h3>

        <div style={{ marginBottom: "20px" }}>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginRight: "15px" }}
          />

          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button
            className="primary-btn"
            style={{ marginTop: "15px" }}
            onClick={fetchDashboard}
          >
            Apply Filter
          </button>
        </div>

        <button className="primary-btn" onClick={handleExportCSV}>
          Export CSV
        </button>

        <h3>Summary</h3>
        <p>
          <strong>Total Transactions:</strong> {summary.total_transactions}
        </p>

        <h4>Category Summary</h4>
        <table className="preview-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {summary.category_summary.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ maxWidth: "400px", margin: "30px auto" }}>
          <h4>Pie Chart</h4>
          <Pie data={pieData} />
        </div>

        <div style={{ maxWidth: "600px", margin: "30px auto" }}>
          <h4>Bar Chart</h4>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;