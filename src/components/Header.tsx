import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLogoutMutation } from "../slices/userApi";
import { Link, useNavigate } from "react-router-dom";
import { clearUserInfo } from "../slices/auth";
import { LogOut, UserPlus, LogIn } from "lucide-react";

function Header() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout(userInfo);
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <header className="bg-gray-400 shadow-md">
      <nav className="flex justify-between items-center px-8 py-4 text-gray-50">
      
        <Link to="/order" className="text-2xl font-extrabold tracking-wide">
          TradeX
        </Link>

      
        <div className="flex gap-6 items-center">
          {userInfo ? (
            <>
              <Link
                to={`/${userInfo._id}/history`}
                className="hover:underline text-lg transition"
              >
                History
              </Link>
              <Link
                to="/order/create"
                className="hover:underline text-lg transition"
              >
                Order
              </Link>
              <button
                type="button"
                onClick={logoutHandler}
                disabled={isLoading}
                className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 disabled:opacity-50 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                <UserPlus size={18} /> Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
