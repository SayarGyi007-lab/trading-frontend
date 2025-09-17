import bgImage from "../../assets/ec1.jpg"; 
import { useGetAllMatchingsQuery } from "../../slices/matchApi";

const AllMatchings= () => {
  const { data, error, isLoading } = useGetAllMatchingsQuery();

  if (isLoading) return <p className="text-center text-white mt-10">Loading matchings...</p>;
  if (error) return <p className="text-center text-white mt-10">Failed to load matchings.</p>;

  const matchings = data?.matchings || [];

  return (
    <div
      className="w-full min-h-screen relative bg-cover bg-center px-4 py-12"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">All Matchings</h1>

        {matchings.length === 0 ? (
          <p className="text-gray-200 text-center">No matchings found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchings.map((match) => (
              <div
                key={match.matching_id}
                className="bg-blue-200 backdrop-blur-sm shadow-lg rounded-xl p-5 border border-purple-300 hover:shadow-2xl transition-shadow"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {match.product?.name}
                </h2>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Price:</span> ${match.price}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Volume:</span> {match.volume} {match.unit}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Seller:</span> {match.seller?.name}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Buyer:</span> {match.buyer?.name}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(match.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMatchings;
