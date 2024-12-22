import { auth, db } from '../../lib/firebase';
import './detail.css';
import { useChatStore } from '../store/chatStore';
import { useUserStore } from '../store/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Detail = () => {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();
  const [error, setError] = useState('');

  const handleBlock = async () => {
    if (!user?.id) {
      setError('Invalid user.');
      return;
    }

    const userDocRef = doc(db, 'users', currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to update block status. Please try again.');
    }
  };

  const handleDownload = (url, name = 'download') => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || './avatar.png'} alt="User Avatar" />
        <h2>{user?.username || 'Unknown User'}</h2>
        <p>{user?.bio || 'No additional information available.'}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="Toggle" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="Toggle" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="Toggle" />
          </div>
          <div className="photos">
            {user?.img?.length ? (
              user.img.map((photo, index) => (
                <div className="photoItem" key={index}>
                  <div className="photoDetails">
                    {/* Use photo.url to ensure correct URL */}
                    <img
                      src={photo.url}
                      alt={photo.name || 'Shared Image'}
                      onError={(e) => (e.target.src = './placeholder.png')} // Fallback for broken images
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                    <span>{photo.name || 'Unnamed Photo'}</span>
                  </div>
                  <img
                    src="./download.png"
                    alt="Download"
                    className="DownloadIcon"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDownload(photo.url)}
                  />
                </div>
              ))
            ) : (
              <p>No shared photos available.</p>
            )}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="Toggle" />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? 'You are Blocked!'
            : isReceiverBlocked
              ? 'Unblock User'
              : 'Block User'}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
