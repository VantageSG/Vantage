import { connect } from "react-redux";
import Users from "../components/userprofiles/Users";
import fetchUsers from "../redux/actions/userActions";

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    } // pass the call as a function in props to component
  };
};
// take state give it to react component as props

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
