import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import { Users, UserPlus, Heart } from "lucide-react";

const FriendsPage = () => {
  const { data: friends, isLoading, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Users className="size-8 text-primary" />
            <h1 className="text-3xl font-bold">My Friends</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card bg-base-200 animate-pulse">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar size-12 bg-base-300 rounded-full"></div>
                    <div className="h-4 bg-base-300 rounded w-24"></div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="h-3 bg-base-300 rounded w-full"></div>
                    <div className="h-3 bg-base-300 rounded w-3/4"></div>
                  </div>
                  <div className="h-8 bg-base-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-error text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Friends</h2>
          <p className="text-base-content/70">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="size-8 text-primary" />
            <h1 className="text-3xl font-bold">My Friends</h1>
            <div className="badge badge-primary badge-lg">
              {friends?.length || 0}
            </div>
          </div>
        </div>

        {!friends || friends.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <Heart className="size-16 text-base-content/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Friends Yet</h2>
              <p className="text-base-content/70 max-w-md mx-auto">
                Start connecting with language learners! Go to the home page to discover and add new friends.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary gap-2">
                <UserPlus className="size-4" />
                Find Friends
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;