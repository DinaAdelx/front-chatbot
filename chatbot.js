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

  // Generate chatbot response
  const response = getVariableFromPython();

  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});
});

async function getVariableFromPython() {
 try {
        const response = await fetch('/get-variable');
        const data = await response.json();
        const variableValue = data.value;
        // Return the variable value as a string
        return variableValue;
    } catch (error) {
        console.error('Error:', error);
        // Return an empty string or handle the error as needed
        return 'oops';
    }
}

// Generate chatbot response function
/*function generateResponse(input) {
    // Add chatbot logic here
    const responses = [
      "Hello, how can I help you today? 😊" +input,
      "I'm sorry, I didn't understand your question. Could you please rephrase it? 😕" +input,
      "I'm here to assist you with any questions or concerns you may have. 📩"+input,
      "I'm sorry, I'm not able to browse the internet or access external information. Is there anything else I can help with? 💻" +input,
      "What would you like to know? 🤔" +input,
      "I'm sorry, I'm not programmed to handle offensive or inappropriate language. Please refrain from using such language in our conversation. 🚫"+input,
      "I'm here to assist you with any questions or problems you may have. How can I help you today? 🚀"+input,
      "Is there anything specific you'd like to talk about? 💬"+input,
      "I'm happy to help with any questions or concerns you may have. Just let me know how I can assist you. 😊"+input,
      "I'm here to assist you with any questions or problems you may have. What can I help you with today? 🤗"+input,
      "Is there anything specific you'd like to ask or talk about? I'm here to help with any questions or concerns you may have. 💬"+input,
      "I'm here to assist you with any questions or problems you may have. How can I help you today? 💡"+input,
    ];
    
    // Return a random response
    return responses[Math.floor(Math.random() * responses.length)];
  }*/
  
  
