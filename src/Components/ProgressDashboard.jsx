import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function ProgressDashboard() {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(
      `https://habit-tracker-sarver-1.vercel.app/my-habits?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHabits(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  const formatDate = useCallback((d) => d.toISOString().split("T")[0], []);

  const lastNDays = useCallback(
    (n) => {
      const days = [];
      const today = new Date();
      for (let i = n - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        days.push(formatDate(date));
      }
      return days;
    },
    [formatDate]
  );

  const { weeklyProgress, streakGrowth } = useMemo(() => {
    if (!habits.length) return { weeklyProgress: [], streakGrowth: [] };

    const weekDates = lastNDays(7);
    const monthDates = lastNDays(30);

    const weekly = Object.fromEntries(weekDates.map((d) => [d, 0]));
    const totalHabits = habits.length || 1;

    for (const habit of habits) {
      for (const d of habit.completionHistory || []) {
        if (weekly[d] !== undefined) weekly[d] += 1;
      }
    }

    const weeklyProgress = weekDates.map((d) => ({
      date: d.slice(5),
      progress: Math.round((weekly[d] / totalHabits) * 100),
    }));

    const streakGrowth = monthDates.map((date) => ({
      date: date.slice(5),
      avgStreak: Math.round(
        habits.reduce((sum, h) => sum + (h.currentStreak || 0), 0) /
          (habits.length || 1)
      ),
    }));

    return { weeklyProgress, streakGrowth };
  }, [habits, lastNDays]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 pt-22 pb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Progress Analytics Dashboard
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Visualize your weekly progress and streak growth trends
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-green-400 rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            Weekly Progress (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="progress" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-green-400 rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            Streak Growth (Last 30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={streakGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgStreak"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
