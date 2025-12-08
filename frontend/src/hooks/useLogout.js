import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending, error } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // Clear authUser immediately
      queryClient.setQueryData(["authUser"], null);

      // Also invalidate to refetch fresh (null) state
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Navigate to login page
      navigate("/login");
    },
  });

  return { logoutMutation, isPending, error };
};

export default useLogout;
