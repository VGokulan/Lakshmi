import Layout from "../Layout";

// Announcements.js
const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "Collection Delay",
      message: "Garbage collection delayed by 2 hours.",
    },
    {
      id: 2,
      title: "Festival Notice",
      message: "Increased collections during festival week.",
    },
  ];

  return (
    <Layout>
      <div className="h-full bg-yellow-50 p-6 rounded-3xl">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Announcements
        </h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 bg-white rounded-md shadow-md"
            >
              <h3 className="text-lg font-bold text-green-600">
                {announcement.title}
              </h3>
              <p className="text-gray-700">{announcement.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Announcements;
