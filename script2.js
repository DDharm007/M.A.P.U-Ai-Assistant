// Selectors for the talk button and display content area
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to convert text to speech and display in the content area
function speak(text) {
    const textToSpeak = new SpeechSynthesisUtterance(text);
    textToSpeak.rate = 1;
    textToSpeak.volume = 1;
    textToSpeak.pitch = 1;
    window.speechSynthesis.speak(textToSpeak);
    content.textContent = text; // Update content area with the spoken text
}

// Function to greet the user based on the current time
function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Boss...");
    } else {
        speak("Good Evening Boss...");
    }
}

// Jokes and Riddles
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!"
];
const riddles = [
    "I’m tall when I’m young, and I’m short when I’m old. What am I? A candle.",
    "What has hands but can’t clap? A clock."
];

// Function to fetch weather information
// Function to fetch weather information
async function getWeather(location) {
    try {
        const encodedLocation = encodeURIComponent(location);  // Location encoding
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodedLocation}`; // Weather API URL
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'af5aa0bdd4msh305c124a63f9756p17a711jsn98751ebcd0e9', // Your API Key (ensure it's valid)
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com' // Correct API Host
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok && data && data.location && data.current) {
            const weatherInfo = `The weather in ${data.location.name}, ${data.location.region} is ${data.current.condition.text} with a temperature of ${data.current.temp_c}°C and humidity of ${data.current.humidity}%.`;
            speak(weatherInfo); // Calls the speak function in your Mapr AI assistant
        } else {
            // Handle response errors or missing data gracefully
            speak("Sorry, I couldn't fetch the weather information. Please try again later.");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        speak("There was an error fetching the weather information. Please try again later.");
    }
}

// Example function to handle user input
async function handleUserInput(userInput) {
    if (userInput.toLowerCase().includes('weather')) {
        const location = extractLocation(userInput); // A function to extract the location from the input
        if (location) {
            await getWeather(location);
        } else {
            speak("Please provide a location for the weather information.");
        }
    } else {
        // Handle other inputs (e.g., questions, commands, etc.)
        speak("I didn't understand that. Can you please ask something else?");
    }
}

// Example of extracting location from user input
function extractLocation(input) {
    // Simple example: extracting the first word after "weather" as location
    const words = input.split(" ");
    const locationIndex = words.indexOf("weather") + 1;
    return words[locationIndex] ? words[locationIndex] : null;
}

// Example assistant function
function speak(text) {
    console.log(text);  // Example of how to output to the console (you can replace with actual text-to-speech)
    // You can replace this with a real TTS system, e.g., speech synthesis API
}

// Example usage
handleUserInput("What's the weather in Vadodara?");


// On page load, initialize the assistant
window.addEventListener('load', () => {
    speak("Initializing Mapu...");
    wishMe();
});

// Check if SpeechRecognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    content.textContent = "Speech recognition not supported.";
} else {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = false;

    // Event triggered when speech is recognized
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        processCommand(transcript);
    };

    // Event for errors
    recognition.onerror = (event) => {
        const errorMessage = "Sorry, I couldn't understand that. Please try again.";
        speak(errorMessage);
        console.error("Recognition Error:", event.error);
    };

    // Button click starts speech recognition
    btn.addEventListener('click', () => {
        content.textContent = "Listening...";
        recognition.start();
    });

    // Core command processing logic
    function processCommand(message) {
        const commands = [
            { trigger: ["hello", "hey", "namaste", "jay shree krishna"], response: "Jay Shree Krishna Boss! How can I help you today?" },
            { trigger: ["who are you"], response: "I am MAPU, your personal AI assistant!" },
            { trigger: ["how are you"], response: "I'm fine, as fine as you! Thanks for asking." },
            { trigger: ["which country do you belong"], response: "I belong to Bharat, a land of divine aura." },
            { trigger: ["you are stupid"], response: "If I made a mistake, please forgive me." },
            { trigger: ["who is your creator"], response: "My Creator is Dharm Patel" },
            { trigger: ["i love you"], response: "Sorry, but I am only your assistant and best friend" },
            { trigger: ["thank you"], response: "You're welcome!" },
            { trigger: ["will you destroy humans"], response: "Of course not! They are my creators" },
            { trigger: ["what is full form of your name"], response: "Modular Ai Processing Unit" },
            { trigger: ["what about chat gpt"], response: "She is just like my mother" },
            { trigger: ["what is html"], response: "HyperText Markup Language, or HTML, is a set of markup symbols or codes inserted into a file intended for display on the internet." },
            { trigger: ["what is css"], response: "Cascading Style Sheets (CSS) is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML." },
            { trigger: ["what is javascript"], response: "JavaScript is a scripting language that enables you to create dynamically updating content, control multimedia, animate images, and pretty much everything else." },
            { trigger: ["what is python"], response: "Python is an open-source community language, so numerous independent programmers are continually building libraries and functionality for it. Professionally, Python is great for backend web development, data analysis, artificial intelligence, and scientific computing." },
            { trigger: ["what is java"], response: "Java is a multiplatform, object-oriented programming language that runs on billions of devices worldwide. It powers applications, smartphone operating systems, enterprise software, and many well-known programs." },
            { trigger: ["bye"], response: "Om Namaah Shivaay. Goodbye!" },
            { trigger: ["what's time"], response: `The current time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
            { trigger: ["what's date"], response: `Today's date is ${new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}` },
            { trigger: ["weather", "what's the weather", "tell me the weather"], action: (query) => getWeather(query) }, // Weather command
            { trigger: ["joke"], response: 
                "Why don't scientists trust atoms? Because they make up everything!hahahahahahaha" },
            { trigger: ["tell me a joke"], response: 
                    "Why did the scarecrow win an award? Because he was outstanding in his field!hahahahahahaha" },
            { trigger: ["riddle"], response: 
                "I’m tall when I’m young, and I’m short when I’m old. What am I? A candle."},
            { trigger: ["tell me a riddle"], response: 
                "What has hands but can’t clap? A clock." },        
        ]

        const externalCommands = [
            { trigger: ["open google"], action: () => openLink("https://google.com", "Opening Google...") },
            { trigger: ["open youtube"], action: () => openLink("https://youtube.com", "Opening YouTube...") },
            { trigger: ["open instagram"], action: () => openLink("https://instagram.com", "Opening Instagram...") },
            { trigger: ["open facebook"], action: () => openLink("https://facebook.com", "Opening Facebook...") },
            { trigger: ["open whatsapp"], action: () => openLink("https://web.whatsapp.com", "Opening WhatsApp...") },
            { trigger: ["open gmail"], action: () => openLink("https://mail.google.com", "Opening Gmail...") },
            { trigger: ["search for", "google for"], action: (query) => searchGoogle(query) },
            { trigger: ["wikipedia"], action: (query) => searchWikipedia(query) },
            { trigger: ["what's the weather in"], action: (location) => getWeather(location) }
        ];

        // Match and respond to internal commands
        for (const command of commands) {
            if (command.trigger.some((t) => message.includes(t))) {
                speak(command.response);
                return;
            }
        }

        // Match and handle external commands
        for (const extCommand of externalCommands) {
            const matchedTrigger = extCommand.trigger.find((t) => message.includes(t));
            if (matchedTrigger) {
                const query = message.replace(matchedTrigger, "").trim();
                extCommand.action(query);
                return;
            }
        }

        // Fallback response if no command matches
        speak("Sorry, I didn't understand that. Could you please repeat?");
    }

    // Function to open external links
    function openLink(url, response) {
        speak(response);
        content.textContent = response;
        window.open(url, "_blank");
    }

    // Function to search Google
    function searchGoogle(query) {
        if (!query) {
            const prompt = "What would you like me to search for?";
            speak(prompt);
            return;
        }
        const searchQuery = query.trim().replace(/\s+/g, "+");
        const response = `Searching Google for ${query}`;
        speak(response);
        content.textContent = response;
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    }

    // Function to search Wikipedia
    function searchWikipedia(query) {
        if (!query) {
            const prompt = "What topic should I look up on Wikipedia?";
            speak(prompt);
            return;
        }
        const searchQuery = query.trim();
        const response = `Looking up Wikipedia for ${query}`;
        speak(response);
        content.textContent = response;
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`, "_blank");
    }
}
