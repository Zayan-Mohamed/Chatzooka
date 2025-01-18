# Chatzooka

Chatzooka is a modern and feature-rich chat application built with the MERN stack and Vite. It is designed for seamless real-time communication with an intuitive user interface and dynamic functionalities.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **User Authentication**: Secure login and user management.
- **Real-Time Messaging**: Instant communication with support for multiple users.
- **Chat List Management**: View and manage your chat lists and participants.
- **Notifications**: Stay updated with message notifications.
- **Responsive Design**: Optimized for various screen sizes.
- **Modular Codebase**: Clean and well-structured components.

---

## Project Structure

```
Zayan-Mohamed-Chatzooka/
├── README.md
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.cjs
├── .prettierignore
├── .prettierrc
├── public/
│   └── site.webmanifest
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── chat/
    │   │   ├── Chat.jsx
    │   │   └── chat.css
    │   ├── detail/
    │   │   ├── Detail.jsx
    │   │   └── detail.css
    │   ├── list/
    │   │   ├── List.jsx
    │   │   ├── list.css
    │   │   ├── chatList/
    │   │   │   ├── ChatList.jsx
    │   │   │   ├── chatlist.css
    │   │   │   └── addUser/
    │   │   │       ├── AddUser.jsx
    │   │   │       └── adduser.css
    │   │   └── userinfo/
    │   │       ├── Userinfo.jsx
    │   │       └── userinfo.css
    │   ├── login/
    │   │   ├── Login.jsx
    │   │   └── login.css
    │   ├── notification/
    │   │   └── Notification.jsx
    │   └── store/
    │       ├── chatStore.js
    │       └── userStore.js
    └── lib/
        ├── firebase.js
        └── upload.js
```

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Zayan-Mohamed-Chatzooka.git
   cd Zayan-Mohamed-Chatzooka
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Add your configuration details in `src/lib/firebase.js`.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Usage
- **Login**: Use your credentials to log in.
- **Chat**: Start or continue conversations with other users.
- **Manage Chats**: View, add, or remove chat participants.
- **Receive Notifications**: Get updates on incoming messages.

---

## Technologies Used
- **Frontend**: React, Vite, CSS
- **Backend**: Firebase (for authentication and real-time database)
- **State Management**: Custom stores (chatStore.js, userStore.js)
- **Build Tool**: Vite
- **Linting and Formatting**: ESLint, Prettier

---

## Contributing
Contributions are welcome! If you’d like to contribute, please:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.


