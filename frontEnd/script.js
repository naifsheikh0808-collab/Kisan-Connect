// =========================================================
// Kisan Saathi — Beginner-Friendly JavaScript
// =========================================================

// Wait until the entire HTML document is fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // ---------------------------------------------------------
  // 1. MOBILE SIDEBAR NAVIGATION (DRAWER TOGGLE)
  // ---------------------------------------------------------
  // Select the mobile hamburger button, the sidebar, and the background overlay
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  // Function to open the mobile sidebar
  function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
  }

  // Function to close the mobile sidebar
  function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  }

  // Event listener: clicking hamburger opens sidebar on mobile
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openSidebar);
  }

  // Event listener: clicking dark backdrop closes sidebar
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // ---------------------------------------------------------
  // 2. TAB SWITCHING (SIDEBAR & MOBILE BOTTOM NAV)
  // ---------------------------------------------------------
  // Select all desktop navigation links and mobile bottom navigation links
  const desktopNavLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-bottom-nav .mobile-nav-item");

  // Function to activate a specific tab by its data-tab name
  function setActiveTab(tabName) {
    // Update desktop sidebar items
    desktopNavLinks.forEach(function (link) {
      if (link.getAttribute("data-tab") === tabName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update mobile bottom nav items
    mobileNavLinks.forEach(function (item) {
      if (item.getAttribute("data-tab") === tabName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Close the mobile sidebar after selecting an item
    closeSidebar();
  }

  // Add click listeners to desktop sidebar navigation links
  desktopNavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const tabName = link.getAttribute("data-tab");
      if (tabName) {
        event.preventDefault();
        setActiveTab(tabName);
      }
    });
  });

  // Add click listeners to mobile bottom navigation links
  mobileNavLinks.forEach(function (item) {
    item.addEventListener("click", function (event) {
      const tabName = item.getAttribute("data-tab");
      if (tabName) {
        event.preventDefault();
        setActiveTab(tabName);
      }
    });
  });

  // ---------------------------------------------------------
  // 3. MODAL DIALOGS (BOOK NEW SLOT & VIEW GATE PASS)
  // ---------------------------------------------------------
  // Select Modal 1: Book New Slot elements
  const bookSlotModal = document.getElementById("book-slot-modal");
  const btnBookSlot = document.getElementById("btn-book-slot");
  const closeBookModal = document.getElementById("close-book-modal");
  const cancelBookModal = document.getElementById("cancel-book-modal");

  // Select Modal 2: View Slot Details elements
  const slotDetailsModal = document.getElementById("slot-details-modal");
  const viewSlotBtn = document.getElementById("view-slot-btn");
  const closeDetailsModal = document.getElementById("close-details-modal");
  const btnMyBookings = document.getElementById("btn-my-bookings");

  // Generic helper function to open any modal
  function showModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove("hidden");
    }
  }

  // Generic helper function to hide any modal
  function hideModal(modalElement) {
    if (modalElement) {
      modalElement.classList.add("hidden");
    }
  }

  // Open "Book New Slot" modal when clicking the Quick Action button
  if (btnBookSlot) {
    btnBookSlot.addEventListener("click", function () {
      showModal(bookSlotModal);
    });
  }

  // Close "Book New Slot" modal when clicking 'X' or 'Cancel'
  if (closeBookModal) {
    closeBookModal.addEventListener("click", function () {
      hideModal(bookSlotModal);
    });
  }
  if (cancelBookModal) {
    cancelBookModal.addEventListener("click", function () {
      hideModal(bookSlotModal);
    });
  }

  // Open "View Slot Details" gate pass when clicking 'View Details' or 'My Bookings'
  if (viewSlotBtn) {
    viewSlotBtn.addEventListener("click", function () {
      showModal(slotDetailsModal);
    });
  }
  if (btnMyBookings) {
    btnMyBookings.addEventListener("click", function () {
      showModal(slotDetailsModal);
    });
  }

  // Close "View Slot Details" modal
  if (closeDetailsModal) {
    closeDetailsModal.addEventListener("click", function () {
      hideModal(slotDetailsModal);
    });
  }

  // Close modals when clicking on the dark backdrop outside the modal box
  window.addEventListener("click", function (event) {
    if (event.target === bookSlotModal) {
      hideModal(bookSlotModal);
    }
    if (event.target === slotDetailsModal) {
      hideModal(slotDetailsModal);
    }
  });

  // Close modals when pressing the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideModal(bookSlotModal);
      hideModal(slotDetailsModal);
    }
  });

  // ---------------------------------------------------------
  // 4. FORM VALIDATION & DYNAMIC DASHBOARD UPDATE
  // ---------------------------------------------------------
  // Select form elements inside the booking modal
  const slotBookingForm = document.getElementById("slot-booking-form");
  const grainTypeInput = document.getElementById("grain-type");
  const grainQtyInput = document.getElementById("grain-quantity");
  const mandiCenterInput = document.getElementById("mandi-center");
  const slotDateInput = document.getElementById("slot-date");
  const bookingAlert = document.getElementById("booking-alert");

  // Dashboard preview fields to update dynamically
  const slotGrainDisplay = document.getElementById("slot-grain");
  const slotQtyDisplay = document.getElementById("slot-qty");
  const slotCenterDisplay = document.getElementById("slot-center");

  // Handle Form Submission with Validation
  if (slotBookingForm) {
    slotBookingForm.addEventListener("submit", function (event) {
      // Prevent browser page from refreshing on form submit
      event.preventDefault();

      // Read values from form inputs
      const quantityValue = grainQtyInput.value.trim();
      const dateValue = slotDateInput.value.trim();

      // Rule 1: Quantity must be greater than 0
      const parsedQuantity = parseFloat(quantityValue);
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        showBookingError("Please enter a valid harvest quantity in quintals (e.g. 10).");
        grainQtyInput.focus();
        return;
      }

      // Rule 2: Preferred Date must not be empty
      if (!dateValue) {
        showBookingError("Please select a preferred procurement date.");
        slotDateInput.focus();
        return;
      }

      // If validation succeeds:
      const selectedGrain = grainTypeInput.value;
      const selectedCenter = mandiCenterInput.value;

      // Update the live dashboard card with the newly booked slot information
      if (slotGrainDisplay) slotGrainDisplay.textContent = selectedGrain;
      if (slotQtyDisplay) slotQtyDisplay.textContent = parsedQuantity + " Quintals";
      if (slotCenterDisplay) slotCenterDisplay.textContent = selectedCenter;

      // Show success alert in the modal
      bookingAlert.textContent = "✓ Slot booked successfully for " + selectedGrain + "!";
      bookingAlert.className = "form-alert success";

      // Reset the form fields
      slotBookingForm.reset();

      // Automatically close the modal after 1.5 seconds so user can see success
      setTimeout(function () {
        hideModal(bookSlotModal);
        bookingAlert.className = "form-alert hidden";
      }, 1500);
    });
  }

  // Helper function to display booking validation errors
  function showBookingError(errorMessage) {
    bookingAlert.textContent = errorMessage;
    bookingAlert.className = "form-alert error";
  }

  // ---------------------------------------------------------
  // 5. LIVE QUEUE REFRESH INTERACTION
  // ---------------------------------------------------------
  // Button to simulate queue advancement
  const refreshQueueBtn = document.getElementById("refresh-queue-btn");
  if (refreshQueueBtn) {
    refreshQueueBtn.addEventListener("click", function () {
      // Add brief visual rotation feedback
      refreshQueueBtn.textContent = "⏳ Updating...";
      refreshQueueBtn.disabled = true;

      setTimeout(function () {
        refreshQueueBtn.textContent = "🔄 Update";
        refreshQueueBtn.disabled = false;
        alert("Queue Refreshed! Current Token #23 is approaching weighbridge scale #2.");
      }, 600);
    });
  }

  // ---------------------------------------------------------
  // 6. HEADER NOTIFICATION & QUICK ACTION INTERACTIONS
  // ---------------------------------------------------------
  // Notification Bell Button
  const notifBtn = document.getElementById("notif-btn");
  if (notifBtn) {
    notifBtn.addEventListener("click", function () {
      alert("🔔 Notifications:\n1. Mandi MSP for Wheat updated to ₹2,425/quintal.\n2. Token #23 is active for weighing.\n3. Direct DBT payment of ₹8,450 credited to your bank account.");
    });
  }

  // Farmer Profile Pill
  const profilePill = document.getElementById("profile-pill");
  if (profilePill) {
    profilePill.addEventListener("click", function () {
      alert("👤 Farmer Profile:\nName: Rameshwar Patel\nKisan ID: MP-IND-88219\nDistrict: Sehore, Madhya Pradesh\nPrimary Crop: Sharbati Wheat");
    });
  }

  // Payments Quick Action Button
  const btnPayments = document.getElementById("btn-payments");
  if (btnPayments) {
    btnPayments.addEventListener("click", function () {
      alert("💳 Payments Summary:\nTotal Season Earnings: ₹8,450\nPending Settlement: ₹0 (All payments settled via DBT to SBI A/c ...4812)");
    });
  }

  // Help & Support Quick Action Button
  const btnSupport = document.getElementById("btn-support");
  if (btnSupport) {
    btnSupport.addEventListener("click", function () {
      alert("🎧 Kisan Helpline:\nToll-Free 24x7 Support: 1800-180-1551\nWhatsApp Kisan Advisory: +91 98765-43210\nLanguages: Hindi, English, and regional dialects.");
    });
  }

  // Print Gate Pass button
  const printPassBtn = document.getElementById("print-pass-btn");
  if (printPassBtn) {
    printPassBtn.addEventListener("click", function () {
      alert("🖨️ Mandi Gate Pass #KS-2025-9842 has been generated! You can show this screen directly to the Mandi security guard.");
    });
  }

  // ---------------------------------------------------------
  // 7. BANNER ASSET INTERACTIVE ALERTS
  // ---------------------------------------------------------
  const treeCard = document.querySelector(".cluster-tree-card");
  if (treeCard) {
    treeCard.addEventListener("click", function () {
      alert("🌳 Agroforestry Advisory:\nNative farm trees act as natural windbreaks, reduce soil evaporation by 22%, and protect field crops!");
    });
  }

  const tractorCard = document.querySelector(".cluster-tractor-card");
  if (tractorCard) {
    tractorCard.addEventListener("click", function () {
      alert("🚜 Farm Machinery Status:\nRed Orchard Tractor is scheduled for next field maintenance on 28 May 2025.");
    });
  }

});

