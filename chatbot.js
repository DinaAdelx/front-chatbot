// Get input field and conversation container elements
const inputField = document.getElementById('questionInput');
const conversation = document.getElementById('conversation');

// Add event listener to input field for keypress (Enter key)
inputField.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    submitQuestion();
  }
});

// Function to submit the question to the backend
async function submitQuestion() {
  // Get the question entered by the user
  const question = inputField.value.trim();

  if (question === '') {
    // If question is empty, do nothing
    return;
  }

  // Send the question to the backend
  try {
    const response = await fetch('/submit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question })
    });
    const responseData = await response.text();
    appendMessage(question, 'user');
    appendMessage(responseData, 'chatbot');
  } catch (error) {
    console.error('Error:', error);
    appendMessage('Error occurred. Please try again.', 'chatbot');
  }

  // Clear the input field
  inputField.value = '';
}

// Function to append a message to the conversation
function appendMessage(message, sender) {
  // Create a new message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);

  // Create a paragraph element for the message text
  const textElement = document.createElement('p');
  textElement.textContent = message;

  // Append the text element to the message element
  messageElement.appendChild(textElement);

  // Append the message element to the conversation container
  conversation.appendChild(messageElement);

  // Scroll to the bottom of the conversation container
  conversation.scrollTop = conversation.scrollHeight;
}
