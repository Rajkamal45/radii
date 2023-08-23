document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll(".fade-in");

    function fadeInElements() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight - 100) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", fadeInElements);

    // Scroll-to-Top Button
    const scrollToTopButton = document.querySelector("#scroll-to-top");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = "1";
        } else {
            scrollToTopButton.style.opacity = "0";
        }
    });

    scrollToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
const images = document.querySelectorAll(".image-grid img");

    images.forEach(image => {
        image.addEventListener("click", function() {
            const overlay = document.createElement("div");
            overlay.className = "overlay";

            const enlargedImage = document.createElement("img");
            enlargedImage.src = this.src;
            enlargedImage.className = "enlarged-image";

            overlay.appendChild(enlargedImage);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", function() {
                document.body.removeChild(overlay);
            });
        });
    
    const slider = document.querySelector(".slider");
    let isPaused = false;

    slider.addEventListener("mouseenter", function() {
        isPaused = true;
    });

    slider.addEventListener("mouseleave", function() {
        isPaused = false;
    });

    function updateSlider() {
        if (!isPaused) {
            const currentTranslate = parseFloat(getComputedStyle(slider).transform.split(",")[4]);
            slider.style.transform = `translateX(${currentTranslate - 33.33}%)`;
        }
        setTimeout(updateSlider, 5000); // Slide every 5 seconds
    }

    setTimeout(updateSlider, 5000);
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, idx) => {
            slide.style.transform = `translateX(${(idx - index) * 33.33}%)`;
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000); // Auto slide every 5 seconds

    // Add event listeners for next and previous buttons if needed
    // You can also add arrow keys navigation

    showSlide(currentSlide);
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        });
    });
    
    const fadeElements = document.querySelectorAll(".fade-in");

    function fadeInElements() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight - 100) {
                gsap.to(element, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
            }
        });
    }

    window.addEventListener("scroll", fadeInElements);

    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector('textarea');
    const submitButton = document.querySelector('button[type="submit"]');

    function handleSubmit(event) {
        event.preventDefault();
    
        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;
    
        const formData = {
            name: name,
            email: email,
            message: message
        };
    
        // Send the form data to the server
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result); // Log the server response
    
            // Clear the form fields
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
    
            // Fetch and display updated data from the server
            fetchDataAndDisplay();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    }
    
    // Function to fetch and display data from the server
    function fetchDataAndDisplay() {
        fetch('/display-data')
            .then(response => response.json())
            .then(data => {
                // Clear existing data
                dataList.innerHTML = '';
    
                // Display fetched data
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${item.name}: ${item.email} - ${item.message}`;
                    dataList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    
    // Call fetchDataAndDisplay() when the page loads
    fetchDataAndDisplay();
    

    // Add a submit event listener to the form
    contactForm.addEventListener('submit', handleSubmit);

    // ... More of your existing code ...

    const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '979385@Qwe',
    database: 'site'
});

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    const query = 'INSERT INTO form_data (name, email, message) VALUES (?, ?, ?)';
    connection.query(query, [name, email, message], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error inserting data' });
        } else {
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});

const port = 3000; // Set your desired port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

});

