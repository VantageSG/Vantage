import { connect } from "react-redux";
import Users from "../components/userprofiles/Users";
import { fetchUsers, setUser } from "../redux/actions/userActions";

const mapStateToProps = state => ({
  data: state.userReducer
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
