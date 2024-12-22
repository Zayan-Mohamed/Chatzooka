import Detail from './components/detail/Detail';
import Chat from './components/chat/Chat';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { useUserStore } from './components/store/userStore';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useChatStore } from './components/store/chatStore';

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore(); // Call the hook
  const { chatId } = useChatStore(); // Call the hook

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
