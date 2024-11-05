document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("userInput");
    const output = document.getElementById("output");
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;

    function scrollSection(deltaY) {
        if (deltaY > 0) {
            currentSection = Math.min(sections.length - 1, currentSection + 1);
        } else {
            currentSection = Math.max(0, currentSection - 1);
        }
        sections[currentSection].scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('wheel', function(event) {
        event.preventDefault();
        scrollSection(event.deltaY);
    });

    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !event.ctrlKey) {
            const input = userInput.value;
            handleInput(input);
            userInput.value = "";
        } else if (event.key === "Enter" && event.ctrlKey) {
            clearTerminal();
        }
    });

    function handleInput(input) {
        let response = "";
        switch (input.toLowerCase()) {
            case "give me my academy records":
                response = "Displaying your academy records...\nThese are your records:\n- Course 1: Passed\n- Course 2: Passed\n- Course 3: In Progress";
                break;
            case "more details on my master":
                response = "Displaying more details on your master...\nHere are the details:\n- Master Course 1: Passed\n- Master Course 2: Passed";
                break;
            case "bingo":
                break;
            default:
                response = "Command not recognized.";
                break;
        }

        // Print the user input and the response with typing effect
        const commandLine = document.createElement('div');
        commandLine.classList.add('command');
        commandLine.textContent = `$ ${input}`;
        output.appendChild(commandLine);
        typeWriter(response, output);

        // Scroll down with expansion of the terminal
        const content = document.querySelector('.content');
        content.scrollIntoView({ behavior: 'smooth' });
    }

    function clearTerminal() {
        output.innerHTML = "";
    }

    function typeWriter(text, element) {
        let i = 0;
        const typingEffect = document.createElement('div');
        typingEffect.classList.add('typing');
        element.appendChild(typingEffect);

        function type() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    typingEffect.innerHTML += '<br>';
                } else {
                    typingEffect.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(type, 10); // Delay between each character
            } else {
                typingEffect.classList.remove('typing');
            }
        }
        type();
    }
});
