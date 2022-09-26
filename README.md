<!-- PROJECT LOGO -->
<div align="center">
  <img src="https://icons-for-free.com/download-icon-send+icon-1320185654900887696_512.png" alt="Logo" width="50" >
  <h1>Wessenger (Web Messenger)</h1>
  <p>
    <a href="https://messenger-web-b98e6.web.app/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details align="right">
  <summary>Table of Contents</summary>
    <div><a href="#About-The-Project">About The Project</a></div>
    <div><a href="#Built-With">Built With</a></div>
    <div><a href="#Getting-Started">Getting Started</a></div>
    <div><a href="#Main-Features">Main Features</a></div>
    <div><a href="#Commit-Convention">Commit Convention</a></div>
</details>

## About The Project

> It is a web messenger that allows users to enter the chat room if you select a user (avatar). My team **CRUD (create, read, update, delete)** chat messages **using Redux and have them managed in the firebase database**.

**_[📝 Read More in my blog](https://devjoylee.github.io/about-redux/)_**

### Team Members

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LEEHYUNHO2001" style="color: #f1f1f1">
        <img src="https://avatars.githubusercontent.com/LEEHYUNHO2001" width="100px;" alt=""  /><br />
        <sub><b>Hyunho Lee (Leader)</b></sub>
      </a><br />
    </td>
    <td align="center">
      <a href="https://github.com/devjoylee" style="color: #f1f1f1">
        <img src="https://avatars.githubusercontent.com/devjoylee" width="100px;" alt="" /><br />
        <sub><b>Joy Lee</b></sub>
      </a><br />
    </td>
    <td align="center">
      <a href="https://github.com/hoonjoo-park" style="color: #f1f1f1">
        <img src="https://avatars.githubusercontent.com/hoonjoo-park" width="100px;" alt="" /><br />
        <sub><b>Hoonju Park</b></sub>
      </a><br />
    </td>
    <td align="center">
      <a href="https://github.com/Yoon-CH" style="color: #f1f1f1">
        <img src="https://avatars.githubusercontent.com/Yoon-CH" width="100px;" alt="" /><br />
        <sub><b>Changhyun Yoon</b></sub>
      </a><br />
    </td>
  </tr>
</table>

| Member         | Role                                                      |
| -------------- | --------------------------------------------------------- |
| Hyunho Lee     | Create firebase database and depolyment. Editing messages |
| Joy Lee        | Updating and Creating messages                            |
| Hoonju Park    | Replying messages                                         |
| Changhyun Yoon | Deleting messages                                         |

<br>

### CRA Folder Structure

```markdown
src
├─components
│ ├─auth
│ └─chat
├─constants
├─pages
├─redux
│ ├─actions
│ └─reducers
├─server
├─styles
├─types
└─utils
```

- Production Period : 2022.02.07 - 2022.02.12

<br/>

## Built With

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>&nbsp;&nbsp;<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;&nbsp;<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>&nbsp;&nbsp;<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=storybook&logoColor=white"/>

<br/>

## Getting Started

You are able to start the app by typing the following commands in the command line:

```bash
git clone https://github.com/devjoylee/wessenger.git
npm install
npm start
```

<br/>

## Main Features

### 1. Creating Messages

- Create a **Redux action** `UPDATE_CONTENT` so that the message detail (like text, date, user id..) is **updated to the Redux state** when a message is sent.
- Update firebase Database by the util function `updateContentData` when a message is sent.
- Implemented **multi lines in the input component** by handling height and scrollHeight.
- **Scroll down smoothly** using a `scrollIntoView` method when a message is sent
- Sort messages **by date sent.**
- Code Preview

```tsx
// redux/actions/updateContent.ts
export const updateContent = (content: Content[]) => ({
  type: UPDATE_CONTENT,
  payload: content,
});
```

```tsx
// components/chat/ChatForm.tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // make message data as an object
  const newContent = {
    uuid: uuidv4().slice(-10),
    text: text,
    date: new Date().getTime(),
    userId: currentUser.userId,
  };

  const updatedContent = [...content, newContent];

  if (text) {
    dispatch(updateContent(updatedContent)); // update the redux state
    updateContentData(newContent); // update the firebase db
    setToBottom(true); // Scroll to bottom
    setText(''); // clear input area
  }
};
```

```tsx
// components/chat/ChatList.tsx
export const ChatList = ({ toBottom }: ChatListProps) => {
  const {
    content: { content },
  } = useSelector((state: RootState) => state);
  const chatListRef = useRef<HTMLUListElement>(null);

  // scroll down to bottom smoothly when a message is sent
  useEffect(() => {
    if (chatListRef.current) {
      const chat = chatListRef.current.children;
      if (toBottom) {
        chat[chat.length - 1].scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // sort by date sent
  content.sort((a: Content, b: Content) => a.date - b.date);

  return (
    <ListContainer ref={chatListRef}>
      {content.map((content: Content, i: number) => {
        return <ChatMessage key={`message-${i}`} message={content} />;
      })}
    </ListContainer>
  );
};
```

<br>

### 2. Fetching Messages

- Create util functions `getUserData` ,`getContentData` in order to fetch data from Firebase.
- Code Preview

```tsx
// redux/actions/getUsers.ts
export const getUsers = (users: User[]) => ({
  type: GET_USERS,
  payload: users,
});
```

```tsx
// App.tsx
const dispatch = useDispatch();
useEffect(() => {
  const userFetch = async () => {
    const response = await getUserData('users');
    dispatch(getUsers(response));
    return;
  };
  const contentFetch = async () => {
    const response = await getContentData();
    dispatch(getContent(response));
  };
  userFetch();
  contentFetch();
}, [dispatch]);
```

<br>

### 3. Editing Messeges

- When you click edit button, it will show a text input for editing the message.
- Create a **Redux action** `UPDATE_CONTENT` so that the edited message is **updated to the Redux state** when a message is updated.
- Update firebase Database by the util function `editContentData` when a message is sent.
- Code Preview

```tsx
// redux/actions/editContent.ts
export const editContent = (content: Content[]) => ({
  type: EDIT_CONTENT,
  payload: content,
});
```

```tsx
// components/chat/ChatMessage.tsx
const handleEdit = async () => {
  setEdit(!edit);
  const newContent = await editContentData(message, text);
  const editContents = [
    ...newContent,
    {
      uuid: message.uuid,
      text: text,
      date: message.date,
      userId: message.userId,
    },
  ];
  dispatch(editContent(editContents));
};
```

<br>

### 4. Deleting Messages

- Create a **Redux action** `REMOVE_CONTENT` so that the message is **deleted from the Redux state** when the delete button is clicked.
- Update firebase Database by the util function `removeContentData` when a button is clicked.
- Code Preview

```tsx
// redux/actions/removeContent.ts
export const removeContent = (content: Content[]) => ({
  type: REMOVE_CONTENT,
  payload: content,
});
```

```tsx
// components/chat/ChatMessage.tsx
const handleRemove = () => {
  if (window.confirm(showRemoveText() + 'Are you sure to delete this??')) {
    const newContents = content.filter(
      (data: Content) => data.uuid !== message.uuid
    );
    dispatch(removeContent(newContents));
    removeContentData(newContents);
  }
};
```

<br>

### 5. Replying Messages

- Update state called `replyObj` and save in `setReplyContent` action when you reply to a specific text.
- Code Preview

```tsx
// redux/actions/setReplyContent.ts
export const setReplyContent = (replyObj: ReplyUser | null) => ({
  type: SET_REPLY_CONTENT,
  payload: replyObj,
});
```

```tsx
// components/chat/ChatMessage.tsx
const handleReply = () => {
  const replyObj = { content: message, userName: user.userName };
  dispatch(setReplyContent(replyObj));
};
```

<br>

## Commit Convention

The commit message is written with the GITMOJI icons in order to make commit messages more intuitive.

| Gitmoji | Meaning                     |
| ------- | --------------------------- |
| 🎉      | Init or begin a project.    |
| 🚚      | Move or rename resources    |
| ✨      | Introduce new features      |
| 💄      | Add the UI and style files  |
| ♻️      | Refactor code               |
| 📝      | Add or update documentation |
| ➕      | Add a dependency            |
| 🐛      | Fix a bug                   |
| 🚀      | Deploy stuff                |

REFERENCE : Gitmoji (http://gitmoji.dev/)

<br/>

<p align="right">(<a href="#top">back to top</a>)</p>
