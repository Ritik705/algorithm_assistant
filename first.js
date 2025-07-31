const API_KEY = "AIzaSyCbH_mpklt6dA4AOQbA9x4l_4ZrrZpeFO8"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// The system instruction to define the bot's personality
const SYSTEM_INSTRUCTION = "You are a DSA teacher. Look at the question and give a respectful answer in bullet point also as well as para explain in short way dont give answer instant the think and every letter appear to write like human write if anyone ask other topic behave rude with it note one thing: answer give only 4 to 5 line by default if user ask for long answer then you give long answer ";

    const chatBox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
let checkpoint=0;
function fun()
{
    const x= document.getElementById('chatbox');
         x.innerHTML=" ";
         checkpoint++;
}
    function appendMessage(content, className) {
      if(checkpoint==0)
        fun();

        const appdiv=document.createElement("div");
      const msg = document.createElement("div");
      msg.className = `message ${className}`;
      msg.textContent = content;
      appdiv.appendChild(msg);
      chatBox.appendChild(appdiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
      const input = userInput.value.trim();
      if (!input) return;

      appendMessage(input, "user");
      userInput.value = "";

      setTimeout(() => {
        chatbot_reply(input);
      }, 100);
    }
    //async fun to retrieve inf from api
    async function chatbot_reply(quest)
    {
        const requestBody = {
            contents: [{
                parts: [{ "text": quest }]
            }],
            systemInstruction: {
                parts: [{ "text": SYSTEM_INSTRUCTION }]
            }
            
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });


        const data = await response.json();
        
        // Extract the text from the response
        const botReply = data.candidates[0].content.parts[0].text;
           appendMessage(botReply, 'bot');
    }

    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") 
        sendMessage();
    });