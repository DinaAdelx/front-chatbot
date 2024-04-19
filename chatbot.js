// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  // Function to handle the response
  async function handleResponse() {
    try {
      const response = await fetch('/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: input }) // Include the "question" field in the request body
      });
      const responseData = await response.text();
      // Handle the response from the server
      // Add chatbot response to conversation
      const responseMessage = document.createElement('div');
      responseMessage.classList.add('chatbot-message','chatbot');
      responseMessage.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${responseData}</p>`;
      conversation.appendChild(responseMessage);
      responseMessage.scrollIntoView({behavior: "smooth"});
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Call the function to handle the response
  handleResponse();
});
