import './addUser.css';
import { db } from '../../../../lib/firebase';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { useUserStore } from '../../../store/userStore';

const AddUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setUser(null);

    const formData = new FormData(e.target);
    const username = formData.get('username').trim();

    if (!username) {
      setError('Please enter a username.');
      return;
    }

    try {
      setLoading(true);
      const userRef = collection(db, 'users');
      const q = query(userRef, where('username', '==', username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError('An error occurred while searching for the user.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!user?.id) {
      setError('Invalid user selected.');
      return;
    }

    try {
      const chatRef = collection(db, 'chats');
      const userChatsRef = collection(db, 'userchats');

      // Check if chat already exists
      const currentUserChatsDoc = await getDoc(
        doc(userChatsRef, currentUser.id)
      );
      const currentUserChats = currentUserChatsDoc.exists()
        ? currentUserChatsDoc.data().chats
        : [];
      const existingChat = currentUserChats.find(
        (chat) => chat.receiverId === user.id
      );

      if (existingChat) {
        setError('Chat with this user already exists.');
        return;
      }

      // Create new chat
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const chatData = {
        chatId: newChatRef.id,
        lastMessage: '',
        receiverId: user.id,
        updatedAt: Date.now(),
      };

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion(chatData),
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          ...chatData,
          receiverId: currentUser.id,
        }),
      });

      setError('User successfully added to your chats!');
    } catch (err) {
      setError('An error occurred while adding the user.');
      console.error(err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || './avatar.png'} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
