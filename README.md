# 🛒 Ubiquitous Interactive Shopping Assistant

A mobile web application that reimagines the supermarket shopping experience for elderly users. This project was developed as part of the "Sistemas Interactivos y Ubicuos" course at UC3M.

Designed and implemented by **Sonsoles Molina**, **Anna García**, and **Gonzalo García**.

---

## 💡 Project Overview

In busy supermarkets, elderly customers often face physical and technological barriers when shopping. Our goal was to design and prototype a system that replaces the traditional cart with an intuitive, accessible application that leverages ubiquitous computing.

The final prototype includes:
- A **mobile client interface** for the user (elderly shopper)
- A **store assistant interface** for support
- A **server backend** to manage state and communication
- Interaction using **QR codes, voice commands, NFC**, and **motion gestures**

---

## 🚀 Core Features

### ✅ Basic Ubiquitous Interactions:
- **Add products**: Scan a QR code from the product page or search within the “Products” tab.
- **Remove products**: Swipe left in "My List" to remove entirely, or use the `–` button to decrement one unit.
- **Mark as Favorite**: Shake the phone on the product page to mark an item.
- **Sort Favorites**: Long-press and drag items to reorder within "Favorites".
- **Pay**:
  - *Cash*: Prompts a notification and alerts the store assistant.
  - *Card (NFC)*: Use any NFC-enabled card (e.g. transit pass) to simulate payment with haptic feedback.

### 🆕 Additional Interactions:
- **Voice Search**: Try saying “pera”, “plátano”, or “leche” to locate products by aisle.
- **Request Assistance**:
  - Customers press the assistance button.
  - The assistant interface receives a notification with location and sound alert.
  - When accepted, the customer receives a popup and vibration. The assistant can mark the request as completed.

---

## 🧪 Technical Stack

- **Frontend**: HTML, CSS, JS (responsive mobile design)
- **Backend**: Node.js + Socket.IO (real-time communication)
- **Hardware**: NFC simulation, QR scanner, mobile sensors (shake detection, speech recognition)
- **Platform**: Developed and tested on [Replit](https://replit.com/@GONZALOGARCIA6/Compra2)

---

## 🧓 Accessibility-First Design

The UI is tailored for older adults:
- Large buttons, clear icons, bold fonts
- Minimal cognitive load
- Multimodal interaction (voice, touch, motion, vision)
- Accessible shopping, even when hands are busy or vision is limited

---

## 📸 Prototype Highlights

The interface supports:
- Creating and managing a shopping list
- Navigating to products with aisle guidance
- Scanning QR for info and easy addition
- Integrated in-app payment and checkout
- Real-time support requests from store personnel

---

## 🔗 Live Demo

🧪 [Try the prototype on Replit](https://replit.com/@GONZALOGARCIA6/Compra2)

> ⚠️ Some features require two browser windows (client + assistant) and an NFC-capable device or emulator.

---

## 📄 License

For academic and educational use only. UC3M.

