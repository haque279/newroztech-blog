import axios from 'axios';
import './App.css';
import CommentsContextProvider from './contexts/CommentsContext';
import MenuBar from './MenuBar';

axios.defaults.headers = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer 0b81ab6e5a13ea42037d20b64458875505b6dd0e1b46a07d4720b689c3415901',
};

function App() {
  return (
    <div>
      <CommentsContextProvider>
        <MenuBar />
      </CommentsContextProvider>
    </div>
  );
}

export default App;
