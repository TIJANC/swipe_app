class StartScreen {
    constructor() {
        // Initialize StartScreen
        this.mainLayout = document.createElement('div');
        this.mainLayout.className = 'main-layout';

        // Title label
        this.titleLabel = document.createElement('label');
        this.titleLabel.textContent = "Swipe task";
        this.titleLabel.style.fontSize = '36px';
        this.titleLabel.style.textAlign = 'center';

        // Name label
        this.nameLabel = document.createElement('label');
        this.nameLabel.textContent = "T. Cvetković";
        this.nameLabel.style.fontSize = '24px';
        this.nameLabel.style.textAlign = 'center';

        // University label
        this.universityLabel = document.createElement('label');
        this.universityLabel.textContent = "Università di Firenze";
        this.universityLabel.style.fontSize = '24px';
        this.universityLabel.style.textAlign = 'center';

        // Start button
        this.startButton = document.createElement('button');
        this.startButton.textContent = 'Start';
        this.startButton.style.fontSize = '24px';
        this.startButton.style.width = '50%';
        this.startButton.style.height = '30%';
        this.startButton.addEventListener('click', this.showInstructions.bind(this));

        // Add image
        const image = document.createElement("img");
        image.src = "Duck.jpg";
        image.style.width = '60%';

        // Append elements to main layout
        this.mainLayout.appendChild(this.titleLabel);
        this.mainLayout.appendChild(document.createElement('br')); // Add line break
        this.mainLayout.appendChild(this.nameLabel);
        this.mainLayout.appendChild(document.createElement('br')); // Add line break
        this.mainLayout.appendChild(this.universityLabel);
        this.mainLayout.appendChild(document.createElement('br')); // Add line break
        this.mainLayout.appendChild(this.startButton);
        this.mainLayout.appendChild(document.createElement('br'));
        this.mainLayout.appendChild(image);
    }

    showInstructions() {
        // console time when instructions are displayed
        const currentTime = Date.now();
        console.log("Instructions Opened:", currentTime);

        // Instructions text
        const instructionsText = "Here are the instructions for the task.";

        // Display confirm dialog with instructions
        const confirmed = confirm(instructionsText);

        // Check if user confirmed
        if (confirmed) {
            // Log time for closed instructions
            const currentTime = Date.now();
            console.log("Instructions Closed:", currentTime);
            //console.time('Instructions Closed')
            this.insertInfo();
        } else {
            // User canceled
            console.log("User canceled");
        }
    }

    insertInfo() {
        // Default popup text
        const popupText = "Enter your name:";
    
        // Display confirm dialog with input field
        const enteredInfo = prompt(popupText);
    
        // Check if user entered some information
        if (enteredInfo !== null) {
            // User clicked "OK" and entered info
            console.log("Name:", enteredInfo);
    
            // Start trials
            this.clearLayout();
            this.displayCircle(enteredInfo);
        } else {
            // User clicked "Cancel" or closed the dialog
            console.log("User canceled or did not enter any info.");
        }
    }

    displayCircle(enteredInfo) {
        const circle = document.createElement('div');
        circle.classList.add('vanishing-circle'); // Add a class for the CSS animation
        document.body.appendChild(circle);
    
        // Timer for the circle to disappear
        setTimeout(() => {
            document.body.removeChild(circle);
            this.clearLayout(); // Clear the layout after the circle disappears
            this.startTrials(enteredInfo);
        }, 2000); // Adjust the time as needed
    }
    

    startTrials(enteredInfo) {
        try {
            // Get existing usernames from local storage
            let userNameData = localStorage.getItem('userNames');
            let existingUserNames = [];
            
            if (userNameData) {
                existingUserNames = JSON.parse(userNameData);
            }
    
            console.log(existingUserNames);
            console.log(enteredInfo);
    
            if (existingUserNames.includes(enteredInfo)) {
                // Remove the start screen from the DOM
                document.getElementById('app').removeChild(this.mainLayout);
    
                // Build the quiz screen
                const quizScreen2 = new QuizScreen2(enteredInfo);
                document.getElementById('app').appendChild(quizScreen2.quizLayout);
            } else {
                // Remove the start screen from the DOM
                document.getElementById('app').removeChild(this.mainLayout);
    
                // Build the quiz screen
                const quizScreen = new QuizScreen(enteredInfo);
                document.getElementById('app').appendChild(quizScreen.quizLayout);
            }
    
            // Add the new username to the array
            existingUserNames.push(enteredInfo);
    
            // Save updated usernames array to local storage
            localStorage.setItem('userNames', JSON.stringify(existingUserNames));
        } catch (error) {
            console.error("Error in startTrials:", error);
        }
    }

    clearLayout() {
    // Remove all child elements from the main layout
    while (this.mainLayout.firstChild) {
        this.mainLayout.removeChild(this.mainLayout.firstChild);
        }
    }
}

class QuizScreen {
    constructor(userName) {
        // Initialize QuizScreen
        this.quizLayout = document.createElement('div');
        this.quizLayout.className = 'quiz-layout';

        this.userName = userName
        //this.downloadLink.style.display = 'none'; // Hide the download link initially
        //document.body.appendChild(this.downloadLink); // Append the download link to the body

        // Words array
        this.words = [
            { word: "Babbo", color: "green" },
            { word: "Pazza", color: "red" },
            { word: "Padre", color: "green" },
            { word: "Bambina", color: "red" },
            { word: "Signore", color: "green" },
            { word: "Mamma", color: "green" },
            { word: "Vecchio", color: "red" },
            { word: "Ragazzo", color: "red" },
            { word: "Madre", color: "green" },
            { word: "Ragazza", color: "red" },
            { word: "Pazzo", color: "red" },
            { word: "Uomo", color: "green" },
            { word: "Vecchia", color: "red" },
            { word: "Donna", color: "green" },
            { word: "Signora", color: "green" },
            { word: "Bambino", color: "red" },
            { word: "Signora", color: "green" },
            { word: "Bambina", color: "red" },
            { word: "Vecchia", color: "red" },
            { word: "Madre", color: "green" },
            { word: "Mamma", color: "green" },
            { word: "Pazzo", color: "red" },
            { word: "Ragazzo", color: "red" },
            { word: "Vecchio", color: "red" }
        ];

        // Array to store time logs
        this.timeLogs = [];

        // Flag to indicate whether input is blocked
        this.inputBlocked = false;

        // Label for displaying word
        this.label = document.createElement('label');
        this.label.textContent = 'Lavora in ospedale';
        this.label.style.fontSize = '35px';
        this.label.style.marginBottom = '20vh'; // Set spacing to 1 fifth of the screen height

        // Response buttons
        this.responseButton1 = document.createElement('button');
        this.responseButton1.textContent = 'SI';
        this.responseButton1.style.fontSize = '32px'; // Increase font size
        this.responseButton1.style.width = '30vw'; // Set width to 40% of the screen width
        this.responseButton1.style.height = '15vh'; // Set height to 15% of the screen height
        this.responseButton1.style.marginRight = '15vw'; // Add margin to the right

        this.responseButton2 = document.createElement('button');
        this.responseButton2.textContent = 'NO';
        this.responseButton2.style.fontSize = '32px'; // Increase font size
        this.responseButton2.style.width = '30vw'; // Set width to 40% of the screen width
        this.responseButton2.style.height = '15vh'; // Set height to 15% of the screen height
        this.responseButton2.style.marginLeft = '15vw'; // Add margin to the left


        // Label for displaying word from words array
        this.parola = document.createElement('label');
        this.parola.textContent = '';
        this.parola.className = 'parola'; // Add the 'parola' class
        this.parola.style.fontSize = '24px';

        // Append elements to layout
        this.responseLayout = document.createElement('div');
        this.responseLayout.className = 'response-layout';
        this.responseLayout.appendChild(this.responseButton1);
        this.responseLayout.appendChild(this.parola);
        this.responseLayout.appendChild(this.responseButton2);

        // Create a container for centering
        this.centerContainer = document.createElement('div');
        this.centerContainer.className = 'center-container';
        this.centerContainer.appendChild(this.label);
        this.centerContainer.appendChild(this.responseLayout);

        // Append center container to quiz layout
        this.quizLayout.appendChild(this.centerContainer);

        // Set initial value for touch event
        this.initial = 0;

        // Shuffle and display words
        this.shuffleAndDisplayWords();

        // Attach touch event listeners
        document.addEventListener("touchstart", this.handleTouchStart.bind(this));
        document.addEventListener("touchend", this.handleTouchEnd.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    shuffleAndDisplayWords() {
        // Shuffle words array
        //this.words.sort(() => Math.random() - 0.5); for random sort

        // Display next word
        this.displayNextWord();
    }

    displayNextWord() {
        // Display next word from words array
        if (this.words.length > 0) {
            const wordObj = this.words.shift();
            this.parola.textContent = wordObj.word;
            this.parola.style.color = wordObj.color; // Set color based on word object's color property

            const wordAppear = Date.now();
            this.timeLogs.push({ event: 'Word Display', time: wordAppear}); // Append timestamp to timeLogs array

        } else {
            // If all words have been displayed, transition to results screen
            this.transitionToResultsScreen();
            this.saveTimeLogsToServer();

        }
    }

    saveTimeLogsToServer() {
        // Prepare data for server
        if (this.timeLogs.length > 0) {
            this.timeLogs[0].userName = this.userName;
        }
    
        // Prepare data for server
        const data = {
            userName: this.userName,
            timeLogs: this.timeLogs
        };

        localStorage.setItem('timeLogs', JSON.stringify(this.timeLogs));

        fetch('https://docs.google.com/forms/d/1bzylKUY9pjIj8uYItKhSAdrNP15wKw_S9j56Jrys8J4/formResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'entry.911947471': JSON.stringify(this.timeLogs) 
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Form submitted successfully');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
    }


    transitionToResultsScreen() {
        // Remove any elements or widgets from the current screen
        while (this.quizLayout.firstChild) {
            this.quizLayout.removeChild(this.quizLayout.firstChild);
        }
    
        // Instantiate and display the results screen class
        const resultsScreen = new ResultsScreen();
        resultsScreen.display();
    
        // Delay for a brief moment before plotting the results
        setTimeout(() => {
            resultsScreen.plotResponseIntervals();
        }, 100);
    }

    handleTouchStart(event) {
        this.initial = event.touches[0].clientX;
    }

    handleTouchEnd(event) {
        const delta = event.changedTouches[0].clientX - this.initial;
        if (delta > 2) {
            this.animateLabel("right");
        } else if (delta < -2) {
            this.animateLabel("left");
        }
}

    handleKeyDown(event) {
        if (event.key === "ArrowRight") {
            this.animateLabel("right");
        } else if (event.key === "ArrowLeft") {
            this.animateLabel("left");
        }
    }

    animateLabel(direction) {
        const responseTime = Date.now();

        this.timeLogs.push({ event: 'Response', time: responseTime, direction: direction }); // Append timestamp and direction to timeLogs array
        // Check if input is blocked
        if (this.inputBlocked) {
            return; // Exit the function if input is blocked
        }
        
        // Set inputBlocked flag to true
        this.inputBlocked = true;

        // Add swipe animation class
        this.parola.classList.add("swipe");

        let finalX, initialX, keyframes;
        if (direction === "right") {
            finalX = "50%";
            initialX = "0%";
            keyframes = `move-words-left-${Date.now()}`; // Dynamically generate unique animation name
        } else if (direction === "left") {
            finalX = "-50%";
            initialX = "0%";
            keyframes = `move-words-right-${Date.now()}`; // Dynamically generate unique animation name
        } 

        // Define dynamic keyframes
        const dynamicKeyframes = `@keyframes ${keyframes} {
        0% { left: ${initialX}; }
        100% { left: ${finalX}; }
        }`;

        // Create a style element to dynamically add keyframes
        const style = document.createElement('style');
        style.textContent = dynamicKeyframes;
        document.head.appendChild(style);

        this.parola.style.animation = `${keyframes} 0.5s linear forwards`;

        // Apply initial position
        this.parola.style.left = initialX;
        
        // Wait for the animation to complete
        setTimeout(() => {
            // Remove swipe class after animation completes
            this.parola.classList.remove("swipe");

            // Remove transition and reset position
            this.parola.style.transition = "";
            this.parola.style.left = "";

            setTimeout(() => {
                this.inputBlocked = false;
            }, 201);

            // Display next word
            this.displayNextWord();
        }, 200); // Wait for the duration of the animation
    }
}

class QuizScreen2 {
    constructor(userName) {
        // Initialize QuizScreen
        this.quizLayout = document.createElement('div');
        this.quizLayout.className = 'quiz-layout2';

        this.userName = userName
        //this.downloadLink.style.display = 'none'; // Hide the download link initially
        //document.body.appendChild(this.downloadLink); // Append the download link to the body

        // Words array
        this.words = [
            { word: "Uomo", color: "green" },
            { word: "Padre", color: "green" },
            { word: "Bambino", color: "red" },
            { word: "Signore", color: "green" },
            { word: "Babbo", color: "green" },
            { word: "Donna", color: "green" },
            { word: "Pazza", color: "red" },
            { word: "Ragazza", color: "red" },
            { word: "Vecchia", color: "red" },
            { word: "Donna", color: "green" },
            { word: "Signora", color: "green" },
            { word: "Ragazzo", color: "red" },
            { word: "Madre", color: "green" },
            { word: "Bambina", color: "red" },
            { word: "Babbo", color: "green" },
            { word: "Bambino", color: "red" },
            { word: "Ragazza", color: "red" },
            { word: "Pazzo", color: "red" },
            { word: "Mamma", color: "green" },
            { word: "Uomo", color: "green" },
            { word: "Signore", color: "green" },
            { word: "Padre", color: "green" },
            { word: "Pazza", color: "red" },
            { word: "Vecchio", color: "red" }
        ];

        // Array to store time logs
        this.timeLogs = [];

        // Flag to indicate whether input is blocked
        this.inputBlocked = false;

        // Label for displaying word
        this.label = document.createElement('label');
        this.label.textContent = 'La tua salute ci dipende';
        this.label.style.fontSize = '35px';
        this.label.style.marginBottom = '20vh'; // Set spacing to 1 fifth of the screen height

        // Response buttons
        this.responseButton1 = document.createElement('button');
        this.responseButton1.textContent = 'SI';
        this.responseButton1.style.fontSize = '32px'; // Increase font size
        this.responseButton1.style.width = '30vw'; // Set width to 40% of the screen width
        this.responseButton1.style.height = '15vh'; // Set height to 15% of the screen height
        this.responseButton1.style.marginRight = '15vw'; // Add margin to the right

        this.responseButton2 = document.createElement('button');
        this.responseButton2.textContent = 'NO';
        this.responseButton2.style.fontSize = '32px'; // Increase font size
        this.responseButton2.style.width = '30vw'; // Set width to 40% of the screen width
        this.responseButton2.style.height = '15vh'; // Set height to 15% of the screen height
        this.responseButton2.style.marginLeft = '15vw'; // Add margin to the left


        // Label for displaying word from words array
        this.parola = document.createElement('label');
        this.parola.textContent = '';
        this.parola.className = 'parola'; // Add the 'parola' class
        this.parola.style.fontSize = '24px';

        // Append elements to layout
        this.responseLayout = document.createElement('div');
        this.responseLayout.className = 'response-layout';
        this.responseLayout.appendChild(this.responseButton1);
        this.responseLayout.appendChild(this.parola);
        this.responseLayout.appendChild(this.responseButton2);

        // Create a container for centering
        this.centerContainer = document.createElement('div');
        this.centerContainer.className = 'center-container';
        this.centerContainer.appendChild(this.label);
        this.centerContainer.appendChild(this.responseLayout);

        // Append center container to quiz layout
        this.quizLayout.appendChild(this.centerContainer);

        // Set initial value for touch event
        this.initial = 0;

        // Shuffle and display words
        this.shuffleAndDisplayWords();

        // Attach touch event listeners
        document.addEventListener("touchstart", this.handleTouchStart.bind(this));
        document.addEventListener("touchend", this.handleTouchEnd.bind(this));
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    shuffleAndDisplayWords() {
        // Shuffle words array
        //this.words.sort(() => Math.random() - 0.5); for random sort

        // Display next word
        this.displayNextWord();
    }

    displayNextWord() {
        // Display next word from words array
        if (this.words.length > 0) {
            const wordObj = this.words.shift();
            this.parola.textContent = wordObj.word;
            this.parola.style.color = wordObj.color; // Set color based on word object's color property

            const wordAppear = Date.now();
            this.timeLogs.push({ event: 'Word Display', time: wordAppear}); // Append timestamp to timeLogs array

        } else {
            // If all words have been displayed, transition to results screen
            this.transitionToResultsScreen();
            this.saveTimeLogsToServer();

        }
    }

    saveTimeLogsToServer() {
        // Prepare data for server
        if (this.timeLogs.length > 0) {
            this.timeLogs[0].userName = this.userName;
        }
    
        // Prepare data for server
        const data = {
            userName: this.userName,
            timeLogs: this.timeLogs
        };

        let existingTimeLogs = JSON.parse(localStorage.getItem('timeLogs')) || [];

        // Append new time logs to the existing time logs
        existingTimeLogs = existingTimeLogs.concat(this.timeLogs);

        // Save updated time logs to local storage
        localStorage.setItem('timeLogs', JSON.stringify(existingTimeLogs));

        fetch('https://docs.google.com/forms/d/1bzylKUY9pjIj8uYItKhSAdrNP15wKw_S9j56Jrys8J4/formResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'entry.911947471': JSON.stringify(this.timeLogs) 
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Form submitted successfully');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
    }


    transitionToResultsScreen() {
        // Remove any elements or widgets from the current screen
        while (this.quizLayout.firstChild) {
            this.quizLayout.removeChild(this.quizLayout.firstChild);
        }
    
        // Instantiate and display the results screen class
        const resultsScreen = new ResultsScreen();
        resultsScreen.display();
    
        // Delay for a brief moment before plotting the results
        setTimeout(() => {
            resultsScreen.plotResponseIntervals();
        }, 100);
    }

    handleTouchStart(event) {
        this.initial = event.touches[0].clientX;
    }

    handleTouchEnd(event) {
        const delta = event.changedTouches[0].clientX - this.initial;
        if (delta > 2) {
            this.animateLabel("right");
        } else if (delta < -2) {
            this.animateLabel("left");
        }
}

    handleKeyDown(event) {
        if (event.key === "ArrowRight") {
            this.animateLabel("right");
        } else if (event.key === "ArrowLeft") {
            this.animateLabel("left");
        }
    }

    animateLabel(direction) {
        const responseTime = Date.now();
        
        this.timeLogs.push({ event: 'Response', time: responseTime, direction: direction }); // Append timestamp and direction to timeLogs array
        // Check if input is blocked
        if (this.inputBlocked) {
            return; // Exit the function if input is blocked
        }
        
        // Set inputBlocked flag to true
        this.inputBlocked = true;

        // Add swipe animation class
        this.parola.classList.add("swipe");

        let finalX, initialX, keyframes;
        if (direction === "right") {
            finalX = "50%";
            initialX = "0%";
            keyframes = `move-words-left-${Date.now()}`; // Dynamically generate unique animation name
        } else if (direction === "left") {
            finalX = "-50%";
            initialX = "0%";
            keyframes = `move-words-right-${Date.now()}`; // Dynamically generate unique animation name
        } 

        // Define dynamic keyframes
        const dynamicKeyframes = `@keyframes ${keyframes} {
        0% { left: ${initialX}; }
        100% { left: ${finalX}; }
        }`;

        // Create a style element to dynamically add keyframes
        const style = document.createElement('style');
        style.textContent = dynamicKeyframes;
        document.head.appendChild(style);

        this.parola.style.animation = `${keyframes} 0.5s linear forwards`;

        // Apply initial position
        this.parola.style.left = initialX;
        
        // Wait for the animation to complete
        setTimeout(() => {
            // Remove swipe class after animation completes
            this.parola.classList.remove("swipe");

            // Remove transition and reset position
            this.parola.style.transition = "";
            this.parola.style.left = "";

            setTimeout(() => {
                this.inputBlocked = false;
            }, 201);

            // Display next word
            this.displayNextWord();
        }, 200); // Wait for the duration of the animation
    }
}

class ResultsScreen {
    constructor() {
        // Initialize ResultsScreen
        this.resultsLayout = document.createElement('div');
        this.resultsLayout.className = 'results-layout';

        this.label = document.createElement('label');
        this.label.textContent = 'Grazie della collaborazione!';
        this.label.style.fontSize = '45px';
        this.label.style.marginBottom = '20vh';

        // Create a container for centering
        this.centerContainerRes = document.createElement('div');
        this.centerContainerRes.className = 'center-container-res';
        this.centerContainerRes.appendChild(this.label);

        // Create a canvas element for the chart
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'responseTimeChart';
        this.canvas.width = 800; // Increase width for better visibility
        this.canvas.height = 400; // Increase height for better visibility
        this.centerContainerRes.appendChild(this.canvas);

        // Append centerContainerRes to resultsLayout
        this.resultsLayout.appendChild(this.centerContainerRes);
    }

    // Method to plot word display - response time intervals
    plotResponseIntervals() {
        // Get the existing chart instance
        const existingChart = Chart.getChart(this.canvas);
    
        // Destroy the existing chart if it exists
        if (existingChart) {
            existingChart.destroy();
        }
    
        // Get time logs from localStorage
        const timeLogs = JSON.parse(localStorage.getItem('timeLogs')) || [];
        const points = [];
    
        // Calculate word display - response time intervals
        for (let i = 0; i < timeLogs.length - 1; i++) {
            if (timeLogs[i].event === 'Word Display' && timeLogs[i + 1].event === 'Response') {
                const responseInterval = timeLogs[i + 1].time - timeLogs[i].time;
                points.push({ trial: points.length + 1, interval: responseInterval });
            }
        }
    
        // Prepare data for plotting
        let labels = points.map(point => point.trial);
        const data = points.map(point => point.interval);
    
        // Label every seventh trial number as "NewTask"
        labels = labels.map((label, index) => (index + 1) % 25 === 0 ? 'NewTask' : label);
    
        const config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Word Display - Response Time (ms)',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Trial Number'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Response Interval (ms)'
                        }
                    }
                }
            }
        };
    
        // Get canvas context and draw the chart
        const ctx = this.canvas.getContext('2d');
        new Chart(ctx, config);
    }

    // Method to display the results screen
    display() {
        document.getElementById('app').appendChild(this.resultsLayout);
        this.plotResponseIntervals();
    }
}

        class QuizApp {
            constructor() {
                // Initialize QuizApp
                this.appContainer = document.getElementById('app');
                this.startScreen = new StartScreen();
                this.currentScreen = this.startScreen;

                // Append start screen to app container
                this.appContainer.appendChild(this.currentScreen.mainLayout);
            }
        }

        // Initialize QuizApp
        const quizApp = new QuizApp();