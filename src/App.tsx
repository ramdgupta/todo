import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

// TypeScript interface for Greeting
interface GreetingProps {
  name: string;
}

// Creating the ThemeContext with a default value of 'light'
const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => {}
});

function App() {
  // The value for the ThemeContext
  // State to manage theme (light or dark)
  const [theme, setTheme] = useState<string>('light');

  // Toggle function to switch between themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Uncomment any of the components below to render them */}
      {/* <Counter /> */}
      {/* <GreetingFunction name="Shyam" /> */}
      {/* <GreetingClass name="Ram" /> */}
      {/* <CounterClass /> */}
      {/* <CounterFunc /> */}
      {/* <CounterWithItem /> */}
      <ToolBar />
    </ThemeContext.Provider>
  );
}

// Greeting function component
function GreetingFunction(props: GreetingProps) {
  return <h1>Hello, {props.name}</h1>;
}

// Greeting class component
class GreetingClass extends React.Component<GreetingProps> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Counter component using state in a functional way
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Class component for Counter
class CounterClass extends React.Component {
  state = { count: 0 };

  componentDidMount(): void {
    console.log('component mount');
  }

  componentDidUpdate(): void {
    console.log('component did update');
  }

  componentWillUnmount(): void {
    console.log('component will unmount');
  }

  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Functional Counter with useEffect
function CounterFunc() {
  const [count, setCount] = useState(0);
  const increment = (): void => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log('func component is mounted');
    return () => {
      console.log('func component will unmount');
    };
  }, []);

  return (
    <>
      <div>Function Counter: {count}</div>
      <button onClick={increment}>Increase</button>
    </>
  );
}

// Items props interface
interface ItemsProps {
  items: string[];
  onItemClick: (item: string, index: number) => void;
}

// Child component for item list
const ItemList: React.FC<ItemsProps> = React.memo(({ items, onItemClick }) => {
  console.log('Item List render');
  return (
    <ul>
      {items.map((item: string, index: number) => (
        <li key={index} onClick={() => onItemClick(item, index)}>
          {item}
        </li>
      ))}
    </ul>
  );
});

// Parent component
const CounterWithItem = () => {
  const [count, setCount] = useState(0);
  const items = useMemo(() => ['item1', 'item2', 'item3'], []);
  const handleItemClick = useCallback((item: string) => {
    console.log(`You clicked ${item}`);
  }, []);

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <ItemList items={items} onItemClick={handleItemClick} />
    </>
  );
};

// Toolbar component to include ThemeButton and ToggleButton
function ToolBar() {
  return (
    <>
      <ThemeButton />
      <ToggleThemeButton />
    </>
  );
}

// ThemeButton component that consumes ThemeContext
function ThemeButton() {
  const { theme } = React.useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}

// ToggleThemeButton component that consumes ThemeContext
function ToggleThemeButton() {
  const { toggleTheme } = React.useContext(ThemeContext);
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}

// Pormise
 fetchData = () => {
    return new Promise((resolve,reject)=>{
      setTimeout(()=> resolve('Recive Data'),1000)
    })
}

fetchData.then(data=>console.log(data))

export default App;
