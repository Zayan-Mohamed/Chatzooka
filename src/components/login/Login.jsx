import { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const { email, password, username } = formData;
    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (username !== undefined && !username.trim()) {
      newErrors.username = 'Username is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = Object.fromEntries(new FormData(e.target));
    if (!validate(formData)) {
      setLoading(false);
      return;
    }

    const { username, email, password } = formData;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imageURL = await upload(avatar.file);

      await setDoc(doc(db, 'users', res.user.uid), {
        username,
        email,
        avatar: imageURL,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, 'userchats', res.user.uid), {
        chats: [],
      });

      toast.success('Account Created! You can now login.');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = Object.fromEntries(new FormData(e.target));
    if (!validate(formData)) {
      setLoading(false);
      return;
    }

    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          {errors.email && <p className="error">{errors.email}</p>}
          <input type="password" placeholder="Password" name="password" />
          {errors.password && <p className="error">{errors.password}</p>}
          <button disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || './avatar.png'} alt="" />
            Upload image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          {errors.username && <p className="error">{errors.username}</p>}
          <input type="text" placeholder="Email" name="email" />
          {errors.email && <p className="error">{errors.email}</p>}
          <input type="password" placeholder="Password" name="password" />
          {errors.password && <p className="error">{errors.password}</p>}
          <button disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
