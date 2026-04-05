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

  const colorPalette = [
    "#2563eb", // blue
    "#14b8a6", // teal
    "#f59e0b", // amber
    "#8b5cf6", // purple
    "#ef4444", // red
    "#22c55e", // green
    "#ec4899", // pink
    "#f97316", // orange
    "#06b6d4", // cyan
    "#84cc16", // lime
  ];

  const borderPalette = [
    "#1d4ed8",
    "#0f766e",
    "#d97706",
    "#7c3aed",
    "#dc2626",
    "#16a34a",
    "#db2777",
    "#ea580c",
    "#0891b2",
    "#65a30d",
  ];

  const backgroundColors = labels.map((_, index) => colorPalette[index % colorPalette.length]);
  const borderColors = labels.map((_, index) => borderPalette[index % borderPalette.length]);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Category Count",
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 14,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Transactions by Category",
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#334155",
          font: {
            size: 14,
            weight: "600",
          },
          padding: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#334155",
          font: {
            size: 14,
            weight: "600",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#475569",
          font: {
            size: 13,
            weight: "600",
          },
        },
        grid: {
          color: "rgba(148, 163, 184, 0.15)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#475569",
          font: {
            size: 13,
          },
          stepSize: 1,
        },
        grid: {
          color: "rgba(148, 163, 184, 0.18)",
        },
      },
    },
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

        <div style={{ maxWidth: "420px", margin: "30px auto" }}>
          <h4>Pie Chart</h4>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div style={{ maxWidth: "700px", margin: "30px auto" }}>
          <h4>Bar Chart</h4>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;