import { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

export default function AddHabit() {
  const { user } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [habitData, setHabitData] = useState({
    title: "",
    description: "",
    category: "",
    reminderTime: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = import.meta.env.VITE_IMGBB_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data?.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitData.title || !habitData.category || !habitData.reminderTime) {
      toast.error("Please fill required fields!");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (habitData.image) {
        imageUrl = await uploadToImgBB(habitData.image);
      }

      const newHabit = {
        title: habitData.title,
        description: habitData.description,
        category: habitData.category,
        reminderTime: habitData.reminderTime,
        image: imageUrl || "",
        userEmail: user?.email,
        userName: user?.displayName,
        createdAt: new Date(),
      };

      const res = await fetch(
        "https://habit-tracker-sarver-1.vercel.app/habits",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newHabit),
        }
      );

      if (res.ok) {
        toast.success("Habit added successfully!");
        setHabitData({
          title: "",
          description: "",
          category: "",
          reminderTime: "",
          image: null,
        });
      } else {
        toast.error("Failed to add habit. Try again.");
      }
    } catch (error) {
      toast.error("Error adding habit!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-3 md:mx-auto  mt-24 mb-5 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-green-500 text-center">
        Add a New Habit
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Habit Title</label>
          <input
            type="text"
            name="title"
            value={habitData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter habit title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={habitData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter habit description"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={habitData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select category</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            value={habitData.reminderTime}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setHabitData({ ...habitData, image: e.target.files[0] })
            }
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Adding Habit..." : "Add Habit"}
        </button>
      </form>
    </section>
  );
}
