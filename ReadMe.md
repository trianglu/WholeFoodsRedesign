# **WholeFoodsRedesign**

WholeFoodsRedesign is a front-end web application built with HTML, CSS, and JavaScript that simulates a modernized Whole Foods shopping experience. The app allows users to check simulated live stock availability and manage personalized shopping lists. Users can add products to lists, adjust quantities, and prepare orders directly within the interface.

## **Features**

### **List Management**

* Create new shopping lists
* Delete existing lists
* Add products directly into any list
* Quantity controls for every item (+ / –)
* Automatic deletion confirmation when quantity falls to zero

### **Product Interaction**

* Live (simulated) stock visibility
* Product search with real-time text highlighting
* Product filtering by category
* Smooth animations for quantity increase
* Red flash animation for quantity decrease

### **Pop-ups & UI Components**

* List-selection popup when adding an item
* Remove-item confirmation popup
* Responsive card-based product layout

### **Local Storage Integration**

* All lists and quantities persist across sessions
* Fully client-side, no backend required

## **Technology Stack**

| Layer        | Tools                       |
| ------------ | --------------------------- |
| Frontend     | HTML, CSS, JavaScript       |
| Storage      | Browser LocalStorage        |
| Architecture | Modular DOM-based rendering |

## **How It Works**

### **1. Product Browsing**

Users can view all available products, filter them by category, and search using keywords. Matching text is automatically highlighted.

### **2. Adding Items to Lists**

When selecting “Add to List,” users choose one of their existing lists through a popup. If the product already exists in the list, its quantity simply increases.

### **3. Managing Quantities**

Each list page allows:

* Incrementing item quantities (with green scaling animation)
* Decrementing item quantities (with red flash effect)
* Triggering the remove confirmation popup if quantity hits zero

### **4. Data Persistence**

All lists, items, and quantities are stored inside `localStorage`, ensuring the data remains available even after page reloads.

## **Future Improvements (Optional Enhancements)**

* Real integration with a backend inventory system
* User authentication for cloud-stored lists
* Drag-and-drop item sorting
* Dark mode theme
* Shared collaborative grocery lists

## **How to Run the Project**

1. Clone or download the repository
2. Open `index.html` in any modern browser
3. Use the navigation to view products or manage lists
4. All data will automatically persist via localStorage

No build steps or dependencies required.

## **Author**

Developed by **Code Crunchers** as part of a project for ITIS-4390 / ITIS-5390.