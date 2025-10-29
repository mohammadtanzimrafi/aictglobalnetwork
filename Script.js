// Script.js

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initMobileMenu();
  initHeroSlider();
  initSpeedTest();
  initPaymentModal();
  initWhatsAppForm();
  initSmoothScroll();
  initScrollEffects();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        nav.style.display = "none";
      }
    });
  });
}

// Hero Slider
function initHeroSlider() {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!sliderTrack || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Function to update slider position
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Event listeners for buttons
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);
}
// Speed Test Functionality
const startTestBtn = document.getElementById("startTest");
const resetTestBtn = document.getElementById("resetTest");
const speedValue = document.getElementById("speedValue");
const downloadBar = document.getElementById("downloadBar");
const uploadBar = document.getElementById("uploadBar");
const pingBar = document.getElementById("pingBar");
const downloadText = document.getElementById("downloadText");
const uploadText = document.getElementById("uploadText");
const pingText = document.getElementById("pingText");
const speedCircle = document.querySelector(".speed-circle");

let testInProgress = false;

if (startTestBtn) {
  startTestBtn.addEventListener("click", startSpeedTest);
}
if (resetTestBtn) {
  resetTestBtn.addEventListener("click", resetSpeedTest);
}

function startSpeedTest() {
  if (testInProgress) return;

  testInProgress = true;
  startTestBtn.disabled = true;
  startTestBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> টেস্ট চলছে...';

  // Reset values
  resetSpeedTest();

  // Simulate speed test with random values (in a real app, this would use actual speed test APIs)
  simulateDownloadTest();
}

function simulateDownloadTest() {
  let downloadSpeed = 0;
  const targetDownload = 45 + Math.random() * 55; // Random between 45-100 Mbps

  const downloadInterval = setInterval(() => {
    downloadSpeed += Math.random() * 5;

    if (downloadSpeed >= targetDownload) {
      downloadSpeed = targetDownload;
      clearInterval(downloadInterval);
      downloadText.textContent = downloadSpeed.toFixed(1) + " Mbps";
      downloadBar.style.width = (downloadSpeed / 100) * 100 + "%";

      // Start upload test after download completes
      setTimeout(simulateUploadTest, 500);
    } else {
      downloadText.textContent = downloadSpeed.toFixed(1) + " Mbps";
      downloadBar.style.width = (downloadSpeed / 100) * 100 + "%";
      updateSpeedCircle(downloadSpeed);
    }
  }, 50);
}

function simulateUploadTest() {
  let uploadSpeed = 0;
  const targetUpload = 15 + Math.random() * 35; // Random between 15-50 Mbps

  const uploadInterval = setInterval(() => {
    uploadSpeed += Math.random() * 3;

    if (uploadSpeed >= targetUpload) {
      uploadSpeed = targetUpload;
      clearInterval(uploadInterval);
      uploadText.textContent = uploadSpeed.toFixed(1) + " Mbps";
      uploadBar.style.width = (uploadSpeed / 50) * 100 + "%";

      // Start ping test after upload completes
      setTimeout(simulatePingTest, 500);
    } else {
      uploadText.textContent = uploadSpeed.toFixed(1) + " Mbps";
      uploadBar.style.width = (uploadSpeed / 50) * 100 + "%";
    }
  }, 50);
}

function simulatePingTest() {
  let ping = 100;
  const targetPing = 10 + Math.random() * 40; // Random between 10-50 ms

  const pingInterval = setInterval(() => {
    ping -= Math.random() * 10;

    if (ping <= targetPing) {
      ping = targetPing;
      clearInterval(pingInterval);
      pingText.textContent = ping.toFixed(0) + " ms";
      pingBar.style.width = ((100 - ping) / 100) * 100 + "%";

      // Test complete
      testComplete();
    } else {
      pingText.textContent = ping.toFixed(0) + " ms";
      pingBar.style.width = ((100 - ping) / 100) * 100 + "%";
    }
  }, 30);
}

function updateSpeedCircle(speed) {
  speedValue.textContent = speed.toFixed(1);
  const percentage = (speed / 100) * 100;
  speedCircle.style.background = `conic-gradient(var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%)`;
}

function testComplete() {
  testInProgress = false;
  startTestBtn.disabled = false;
  startTestBtn.innerHTML = '<i class="fas fa-play"></i> টেস্ট শুরু করুন';

  // Show completion message
  setTimeout(() => {
    alert(
      "স্পিড টেস্ট সম্পন্ন হয়েছে! আপনার ইন্টারনেট স্পিড: " +
        speedValue.textContent +
        " Mbps"
    );
  }, 500);
}

function resetSpeedTest() {
  speedValue.textContent = "0";
  downloadBar.style.width = "0%";
  uploadBar.style.width = "0%";
  pingBar.style.width = "0%";
  downloadText.textContent = "0 Mbps";
  uploadText.textContent = "0 Mbps";
  pingText.textContent = "0 ms";
  speedCircle.style.background =
    "conic-gradient(var(--primary-color) 0%, var(--border-color) 0%)";
}
// Payment Modal Functionality
const modal = document.getElementById("paymentModal");
const paymentBtns = document.querySelectorAll(".payment-btn");
const closeBtn = document.querySelector(".close");
const selectedPackage = document.getElementById("selectedPackage");
const selectedPrice = document.getElementById("selectedPrice");
const confirmPaymentBtn = document.getElementById("confirmPayment");

// Open modal when payment button is clicked
paymentBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const packageName = btn.getAttribute("data-package");
    const packagePrice = btn.getAttribute("data-price");

    selectedPackage.textContent = packageName;
    selectedPrice.textContent = packagePrice;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Close modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Prevent body scroll when modal is open
if (modal) {
  modal.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  modal.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
}

// Payment confirmation
if (confirmPaymentBtn) {
  confirmPaymentBtn.addEventListener("click", () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const transactionId = document.getElementById("transactionId").value;
    const paymentMethod = document.querySelector(
      'input[name="paymentMethod"]:checked'
    ).value;

    // Basic validation
    if (!phoneNumber || !transactionId) {
      alert("দয়া করে সমস্ত তথ্য প্রদান করুন");
      return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      alert("দয়া করে সঠিক মোবাইল নম্বর দিন");
      return;
    }

    // Send payment info to WhatsApp immediately
    try {
      const packageName = selectedPackage ? selectedPackage.textContent : "";
      const packagePriceVal = selectedPrice ? selectedPrice.textContent : "";

      // Payment method names in Bengali
      const paymentMethods = {
        bkash: "বিকাশ",
        nagad: "নগদ",
        rocket: "রকেট",
      };

      const paymentMethodText = paymentMethods[paymentMethod] || paymentMethod;

      const whatsappMessage =
        `🎯 *AICT Global Network - নতুন পেমেন্ট রিকোয়েস্ট* 🎯\n\n` +
        `📦 *প্যাকেজ:* ${packageName}\n` +
        `💰 *মাসিক বিল:* ৳${packagePriceVal}\n` +
        `💳 *পেমেন্ট মেথড:* ${paymentMethodText}\n` +
        `📞 *গ্রাহকের মোবাইল:* ${phoneNumber}\n` +
        `🔢 *ট্রানজেকশন আইডি:* ${transactionId}\n\n` +
        `🔄 *স্ট্যাটাস:* পেমেন্ট ভেরিফিকেশন পেন্ডিং\n\n` +
        `🔗 *লিংক:* ${window.location.href}`;

      const whatsappURL = `https://wa.me/8801990020074?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Show loading state briefly
      confirmPaymentBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> WhatsApp খোলা হচ্ছে...';
      confirmPaymentBtn.disabled = true;

      setTimeout(() => {
        // Open WhatsApp directly
        window.open(whatsappURL, "_blank");

        // Show success message
        alert(
          "পেমেন্ট রিকোয়েস্ট সাবমিট হয়েছে! দয়া করে WhatsApp এ মেসেজ সেন্ড করুন এবং আমাদের টিম এর সাথে যোগাযোগ করুন।"
        );

        // Close modal and reset
        modal.style.display = "none";
        document.body.style.overflow = "auto";

        // Reset form
        confirmPaymentBtn.innerHTML =
          '<i class="fas fa-lock"></i> পেমেন্ট নিশ্চিত করুন';
        confirmPaymentBtn.disabled = false;
        document.getElementById("phoneNumber").value = "";
        document.getElementById("transactionId").value = "";
      }, 1000);
    } catch (err) {
      console.error("WhatsApp open failed:", err);
      alert(
        "ত্রুটি হয়েছে! দয়া করে ম্যানুয়ালি WhatsApp এ মেসেজ পাঠান: +8801990020074"
      );

      // Reset button state
      confirmPaymentBtn.innerHTML =
        '<i class="fas fa-lock"></i> পেমেন্ট নিশ্চিত করুন';
      confirmPaymentBtn.disabled = false;
    }
  });
}
// Add real-time validation for payment form
const paymentPhoneNumber = document.getElementById("phoneNumber");
if (paymentPhoneNumber) {
  paymentPhoneNumber.addEventListener("blur", function () {
    if (this.value && !validatePhoneNumber(this.value)) {
      this.style.borderColor = "red";
    } else {
      this.style.borderColor = "";
    }
  });
}

// WhatsApp Message Form Functionality
function initWhatsAppForm() {
  const whatsappForm = document.getElementById("whatsappForm");
  const formSubmitBtn = whatsappForm?.querySelector(".form-submit");

  if (whatsappForm && formSubmitBtn) {
    // Create success message element
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML =
      '<i class="fas fa-check-circle"></i> মেসেজ সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।';
    successMessage.style.display = "none";
    whatsappForm.parentNode.insertBefore(
      successMessage,
      whatsappForm.nextSibling
    );

    whatsappForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const userName = document.getElementById("userName").value.trim();
      const userAddress = document.getElementById("userAddress").value.trim();
      const userPhone = document.getElementById("userPhone").value.trim();
      const serviceType = document.getElementById("serviceType").value;

      // Validate required fields
      if (!userName || !userAddress) {
        showNotification("দয়া করে আপনার নাম এবং ঠিকানা দিন", "error");
        return;
      }

      // Show loading state
      formSubmitBtn.classList.add("loading");
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';

      // Create WhatsApp message
      const message = createWhatsAppMessage(
        userName,
        userAddress,
        userPhone,
        serviceType
      );

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp number
      const whatsappNumber = "8801990020074";

      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in new tab after a short delay to show loading state
      setTimeout(() => {
        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Show success message
        successMessage.style.display = "block";
        successMessage.classList.add("show");

        // Reset form and button
        setTimeout(() => {
          whatsappForm.reset();
          formSubmitBtn.classList.remove("loading");
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML =
            '<i class="fab fa-whatsapp"></i> WhatsApp-এ মেসেজ পাঠান';

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.classList.remove("show");
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 500);
          }, 5000);
        }, 1000);
      }, 1500);
    });
  }
}

function createWhatsAppMessage(name, address, phone, serviceType) {
  let message = `🎯 *AICT Global Network - সার্ভিস এনকোয়ারি* 🎯\n\n`;
  message += `👤 *গ্রাহকের নাম:* ${name}\n`;
  message += `📍 *ঠিকানা:* ${address}\n`;

  if (phone) {
    message += `📞 *মোবাইল নম্বর:* ${phone}\n`;
  }

  if (serviceType) {
    const serviceTypes = {
      home: "হোম ইন্টারনেট",
      business: "বিজনেস ইন্টারনেট",
      corporate: "কর্পোরেট ইন্টারনেট",
    };
    message += `💼 *সার্ভিস টাইপ:* ${
      serviceTypes[serviceType] || serviceType
    }\n`;
  }

  message += `\n📋 *অনুরোধ:* আমার এলাকায় AICT Global Network এর সার্ভিস উপলব্ধ কিনা এবং প্যাকেজ ডিটেইলস জানতে চাই।\n\n`;
  message += `⏰ *প্রতিক্রিয়া আশা:* যত দ্রুত সম্ভব\n`;
  message += `🔗 *লিংক:* ${window.location.href}`;

  return message;
}

// Form validation for phone number
function initPhoneValidation() {
  const userPhoneInput = document.getElementById("userPhone");
  if (userPhoneInput) {
    userPhoneInput.addEventListener("input", function (e) {
      const value = e.target.value.replace(/\D/g, "");
      e.target.value = value;
    });

    // Auto-format phone number
    userPhoneInput.addEventListener("blur", function (e) {
      const value = e.target.value;
      if (value && !validatePhoneNumber(value)) {
        this.style.borderColor = "red";
        showNotification("দয়া করে সঠিক মোবাইল নম্বর দিন", "error");
      } else {
        this.style.borderColor = "";
      }
    });
  }
}

function validatePhoneNumber(phone) {
  const phoneRegex = /^01[3-9]\d{8}$/;
  return phoneRegex.test(phone);
}

// Notification System (if not already exists)
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${
        type === "success"
          ? "check-circle"
          : type === "error"
          ? "exclamation-circle"
          : "info-circle"
      }"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
    font-weight: 500;
  `;

  // Add close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", function () {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);

  // Add CSS for animations if not exists
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        width: 20px;
        height: 20px;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
      }

      /* Success Message Styles */
      .success-message {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid #10b981;
        color: #10b981;
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        margin-top: 1rem;
        transition: all 0.5s ease;
        opacity: 0;
        transform: translateY(-10px);
      }

      .success-message.show {
        opacity: 1;
        transform: translateY(0);
      }

      .success-message i {
        margin-right: 0.5rem;
      }

      /* Loading state */
      .form-submit.loading {
        pointer-events: none;
        opacity: 0.7;
      }

      .fa-spin {
        animation: fa-spin 1s linear infinite;
      }

      @keyframes fa-spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initWhatsAppForm();
  initPhoneValidation();
});
// Smooth Scroll for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll Effects
function initScrollEffects() {
  // Header shadow on scroll
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      header.style.background = "var(--light-color)";
      header.style.backdropFilter = "none";
    }
  });

  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll(
    ".feature-card, .package-card, .testimonial-card, .contact-card"
  );

  const fadeInOnScroll = function () {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state
  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Check on load and scroll
  window.addEventListener("load", fadeInOnScroll);
  window.addEventListener("scroll", fadeInOnScroll);
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${
        type === "success"
          ? "check-circle"
          : type === "error"
          ? "exclamation-circle"
          : "info-circle"
      }"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
    font-weight: 500;
  `;

  // Add close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", function () {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);

  // Add CSS for animations
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        width: 20px;
        height: 20px;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
      }
    `;
    document.head.appendChild(style);
  }
}

// Package Alignment Fix
function fixPackageAlignment() {
  const packagesGrid = document.querySelector(".packages-grid");
  if (packagesGrid) {
    // Ensure all package cards have the same height
    const packageCards = document.querySelectorAll(".package-card");
    let maxHeight = 0;

    // Reset heights first
    packageCards.forEach((card) => {
      card.style.height = "auto";
    });

    // Find the maximum height
    packageCards.forEach((card) => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
      }
    });

    // Set all cards to the same height
    packageCards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }
}

// Call the alignment fix on load and resize
window.addEventListener("load", fixPackageAlignment);
window.addEventListener("resize", fixPackageAlignment);
