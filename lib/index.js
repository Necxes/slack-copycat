const batch = 1017; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/";
const url = `${baseUrl}${batch}/messages`;

// Your turn to code!
const messageContent = document.getElementById('messageInput');
const messageList = document.getElementById('chat-messages');
// const name = document.getElementById('your-name');
// const sendButton = document.querySelector('#comment-form .btn-primary');
// const refreshButton = document.getElementById('refresh');

// 1. Sending a Message
// 1.1. Create an Object with name and message
const createMessageObject = (messageInput) => {
  const messageObject = {
    author: 'Patrick',
    content: messageInput.value
  };
  return messageObject;
};

// 1.2. Send that Object to API
const sendMessage = (event) => {
  event.preventDefault();
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createMessageObject(messageContent))
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      messageContent.value = "";
    });
};

// 2. Showing and Refreshing the Chat
// 2.1. Displaying all current messages
const listItemBuilder = (content, time, author) => {
  // Example: A sample message (posted 10 minutes ago) by John
  const date = new Date();
  const timePosted = new Date(time);
  const minutesAgo = Math.round((date.getTime() - timePosted.getTime()) / 60000);
  const message = `<div class="chat-message-container ${minutesAgo === 0 ? 'new-message' : ''}">
                    <img src="https://kitt.lewagon.com/placeholder/users/papillard" alt="">
                    <div class="chat-message">
                      <p><b>${author}</b> <span class="time-stamp">${minutesAgo > 0 ? minutesAgo + ' minutes ago' : 'just now'}</span></p>
                      <p>${content}</a></p>
                    </div>
                  </div>`;
  return message;
};

const displayMessages = (event) => {
  // event.preventDefault();
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const messages = data.messages;
      messageList.innerHTML = '';
      messages.forEach((message) => {
        messageList.insertAdjacentHTML('beforeend', listItemBuilder(message.content, message.created_at, message.author));
      });
    });
};

displayMessages();
document.querySelector('form').addEventListener('submit', sendMessage);


document.addEventListener("DOMContentLoaded", () => {
  setInterval(displayMessages, 1000); // Every 1 second, the `refresh` function is called.
});
