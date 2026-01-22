import React, { Component, useState, useEffect } from 'react';
import UserListClass from "./UserListClass";
import { useSelector, useDispatch, Provider } from 'react-redux';
import { increment, decrement } from './counterSlice';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from './pages/Contact';
import UsersTable from './components/UsersTable';
import { store } from './redux/store';
import Counter3 from './Counter3';


class WelcomeMessage extends Component {
  render() {
    return (
      <div className="welcome-container" style={{paddingLeft: 20}}>
        <h1>Welcome to React!</h1>
      </div>
    );
  }
}

function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function UserCard(props) {
  return (
    <div style={cardStyle}>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Location: {props.location}</p>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{padding: 20}}>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

function ClickButton() {
  const [text, setText] = useState("Not Clicked");

  const handleClick = () => {
    setText("Clicked!");
  }

  return(
    <div style={{padding: 20}}>
      <p>{text}</p>
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  )
}

function DynamicInput() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{padding: 20}}>
      <h2>Dynamic Input Form :</h2>
      <form>
        <label>
          Enter something:{" "}
          <input type="text" value={inputValue} onChange={handleChange} placeholder="Type Here..." />
        </label>
      </form>
      <p>Current Value: {inputValue}</p>
    </div>
  )
}

function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div style={{padding: 20}}>
      <h2>Login Toggle :</h2>
      {isLoggedIn ? (
        <>
          <p>Welcome, User!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please Log In</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  )
}

function VoteEligibility() {
  const [age, setAge] = useState("")

  const handleChange = (event) => {
    setAge(event.target.value)
  }
  const isEligible = age >= 18
  
  return (
    <div style={{padding: 20}}>
      <h2>Check Voting Eligibility :</h2>
      <label>
        Enter your age : {" "}
        <input type="number" value={age} onChange={handleChange} placeholder="Enter age" />
      </label>
      <p>
        {age
          ? isEligible
            ? "You are eligible to vote."
            : "You are not eligible to vote."
          : "Please enter your age."}
      </p>
    </div>
  )
}

function FruitList() {
  const fruits = ["Apple", "Banana", "Orange", "Mango", "Strawberry"];

  return(
    <div style={{padding: 20}}>
      <h2>Fruit List :</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

function UserList() {
  const users = [
    {id: 1, name: "Alice", email: "alice@example.com"},
    {id: 2, name: "Bob", email: "bob@example.com"},
    {id: 3, name: "Charlie", email: "charlie@example.com"},
  ];

  return (
    <div style={{padding: 20}}>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
    }
  };

  return (
    <div style={{padding: 20}}>
      <h2>User Form with Validation</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}

class LoggerComponent extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("LoggerComponent updated")
  }
  componentWillUnmount() {
    console.log("LoggerComponent will unmount")
  }

  render() {
    return(
      <div>
        <h2>Logger Component</h2>
        <p>Open the console to see lifecycle logs.</p>
      </div>
    )
  }
}

function Counter2() {
  const [count, setCount] = useState(0);

  return (
    <div style={{padding: 20}}>
      <h2>Counter : {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

function Count() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{padding: 20}}>
      <h2>Counter with useSelector and useDispatch :</h2>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}




function App() {
  const description =
    "JSX allows us to write HTML-like code inside JavaScript, making UI components easier to build and visualise.";

  return (
    <>
    <Provider store={store}>
      <div style={{padding: 20}} className="App">
        <h1>Hello, React!</h1>
      </div>

      <div style={{ padding: 20 }}>
        <h1>Welcome to JSX</h1>
        <p>{description}</p>
      </div>

      <div className="App1" style={{ padding: 20 }}>
        <Greeting name="Shaurya" />
        <Greeting name="Developer" />
      </div>

      <div style={{padding: 20}}>
        <UserCard name="Shaurya" age={16} location="India" />
        <UserCard name="Alex" age={15} location="USA" />
      </div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>

      <WelcomeMessage />
      <Counter />
      <ClickButton />
      <DynamicInput />
      <LoginToggle />
      <VoteEligibility />
      <FruitList />
      <UserList />
      <UserForm />
      <UserListClass />
      <LoggerComponent />
      <Counter2 />
      <Users />
      <Count />
      <UsersTable />
      <Counter3 />
    </Provider>
    </>
  )
}

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  width: "250px",
  margin: "10px",
}

export default App;
export { WelcomeMessage };
