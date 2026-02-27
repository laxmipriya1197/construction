# 📋 Project Details Demo Guide

## How to Add Project Details (Area, Floors, Bedrooms, Construction Year)

### Step-by-Step Instructions:

#### 1. **Login as Admin**
   - Go to `/admin-login`
   - Enter your admin credentials
   - Click "Login"

#### 2. **Navigate to Projects Tab**
   - After login, you'll be on the Admin Dashboard
   - Click on the **"Projects"** tab

#### 3. **Add a New Project**
   - Click the **"Add Project"** button
   - Fill in the form with the following fields:

### 📝 Project Form Fields:

| Field | Type | Example Value | Description |
|-------|------|---------------|-------------|
| **Title** | Text | "Luxury Villa" | Project name |
| **Description** | Text | "Modern luxury villa with premium amenities" | Project description |
| **Image URL** | Text | "https://example.com/villa.jpg" | Project image link |
| **Location** | Text | "Coimbatore" | Project location |
| **Category** | Dropdown | Residential / Commercial | Project type |
| **Status** | Dropdown | Completed / Ongoing | Project status |
| **Area (sq.ft)** | Text | "2500" | Total area in square feet |
| **Floors** | Number | "2" | Number of floors |
| **Bedrooms** | Number | "3" | Number of bedrooms |
| **Construction Year** | Number | "2023" | Year of construction |

#### 4. **Click "Save"**
   - After filling all fields, click the **"Save"** button
   - Project will be added successfully!

---

## 🎯 Demo Example Project Data

Here's a complete example of a project with all fields filled:

```json
{
  "title": "Sivanesh Villa",
  "description": "Luxury villa in Goundampalayam",
  "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  "location": "Goundampalayam",
  "category": "Residential",
  "status": "Completed",
  "area": "2500",
  "floors": 2,
  "bedrooms": 3,
  "constructionYear": 2023
}
```

### Example Values for Testing:

**Project 1:**
- Title: `Sivanesh Villa`
- Description: `Luxury villa in goundampalayam`
- Image URL: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9`
- Location: `Goundampalayam`
- Category: `Residential`
- Status: `Completed`
- Area (sq.ft): `2500`
- Floors: `2`
- Bedrooms: `3`
- Construction Year: `2023`

**Project 2:**
- Title: `Vishnu Residence`
- Description: `Ready to buy luxury villa`
- Image URL: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c`
- Location: `Coimbatore`
- Category: `Residential`
- Status: `Completed`
- Area (sq.ft): `3200`
- Floors: `3`
- Bedrooms: `4`
- Construction Year: `2024`

**Project 3:**
- Title: `Manish Villa`
- Description: `Luxury villa to make your life comfortable`
- Image URL: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c`
- Location: `Erode`
- Category: `Residential`
- Status: `Ongoing`
- Area (sq.ft): `1800`
- Floors: `1`
- Bedrooms: `2`
- Construction Year: `2025`

---

## 🖼️ How to View Project Details

### For Users:
1. Go to `/projects` page
2. Click **"Know more"** button on any project card
3. A slide-in panel will open from the right showing:
   - Project image
   - Area (sq.ft)
   - Floors
   - Bedrooms
   - Construction Year
   - Close button (❌)

### For Admins:
1. Go to Admin Dashboard → Projects tab
2. Click **"Edit"** on any project to view/edit all details
3. All fields including area, floors, bedrooms, and construction year will be visible

---

## ✅ Quick Test Checklist

- [ ] Login as admin
- [ ] Go to Projects tab
- [ ] Click "Add Project"
- [ ] Fill in Title, Description, Image URL, Location
- [ ] Select Category and Status
- [ ] **Fill in Area (sq.ft)** - e.g., "2500"
- [ ] **Fill in Floors** - e.g., "2"
- [ ] **Fill in Bedrooms** - e.g., "3"
- [ ] **Fill in Construction Year** - e.g., "2023"
- [ ] Click "Save"
- [ ] Go to `/projects` page
- [ ] Click "Know more" on the project
- [ ] Verify all details show in the slide-in panel

---

## 💡 Tips

1. **Image URL**: You can use any image URL or upload to a service like Imgur/Cloudinary
2. **Area**: Enter just the number (e.g., "2500") - "sq.ft" is added automatically
3. **Floors/Bedrooms/Year**: Enter numbers only (e.g., 2, 3, 2023)
4. **Optional Fields**: All fields are optional, but filling them makes the project details panel more informative

---

## 🐛 Troubleshooting

**Problem**: Fields not saving
- **Solution**: Make sure you're logged in as admin and all required fields are filled

**Problem**: Slide-in panel not showing details
- **Solution**: Make sure the project has the area, floors, bedrooms, and constructionYear fields filled in the database

**Problem**: Image not showing
- **Solution**: Check if the image URL is valid and accessible

---

## 📞 Need Help?

If you encounter any issues:
1. Check browser console for errors
2. Verify backend server is running
3. Ensure database connection is active
4. Check that all fields are properly saved in the database


