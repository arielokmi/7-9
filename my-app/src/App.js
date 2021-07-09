import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react'
import { useGithubUser } from './useGithubUser';

const users = ['ariel', 'shahar', 'adi', 'asaf']
function App() {
  const [value ,setValue] = useState('');
  const [data, setData] = useState();
  const inputRef = useRef();

  // a hook that accepts username and return it if its verified on the local storage
  const gitHubUser = useGithubUser(value);

  // set to the local storgae a list of github users
  useEffect(() => {
    users.forEach(user => localStorage.setItem(user, 'exist'))
  }, []);

  // once the githubuser returns a VERIFIED user get his data
  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`https://api.github.com/users/${gitHubUser}/repos`);
      const data = await res.json();
      setData(data)
    }
    if (gitHubUser) {
      getUserData();
    }
  }, [gitHubUser])

  // submit on the form and set the value
 function submit(e){
   e.preventDefault();
  const { value } = inputRef.current;
  setValue(value);
 } 
  return (
    <div className="App">
    <form onSubmit={submit}>
        <input ref={inputRef} type="text" />
        <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default App;
