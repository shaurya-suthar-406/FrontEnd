import React, { Component } from "react";

class UserListClass extends React.Component {
  state = {
    users: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) =>
        this.setState({ users: data, loading: false })
      )
      .catch((err) =>
        this.setState({ error: err.message, loading: false })
      );
  }

  render() {
    const { users, loading, error } = this.state;

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div style={{padding: 20}}>
        <h2>User List (API)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
      </div>
    );
  }
}

export default UserListClass;
