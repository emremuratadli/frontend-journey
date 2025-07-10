# 1. HTML5 Semantic Tags and Their Purpose of Use

## What Is Semantic HTML ?

Semantic HTML is the use of HTML tags that clearly describe the meaning and purpose of the content on a webpage. These tags make it easier not only for developers but also for browsers and search engines to understand the structure of the content. For example, we use `<header>` for the title of a page and `<article>` for the main content. This helps create a layout that is both readable and meaningful.

## Why is Semantic HTML Preferred ?

Semantic HTML is preferred because it makes the structure of the content clearer, improves accessibility, and helps search engines better understand the page. It provides more meaning than using generic tags like `<div>` or `<span>`.

## Descriptions of Common HTML5 Semantic Tags

Tags: `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`

`<header>` :

- **Definition:** Represents introductory content or a set of navigational links.
- **Purpose:** Typically contains site logos, titles, or menu bars.

`<nav>`:

- **Definition:** Defines a section that contains navigation links.
- **Purpose:** Used for site or page navigation menus.

`<section>`

- **Definition:** Represents a standalone section of content.
- **Purpose:** Groups related content together within a page.

`<article>`

- **Definition:** Represents independent, self-contained content.
- **Purpose:** Used for blog posts, news articles, or forum posts.

`<aside>`

- **Definition:** Holds extra content related to the main topic, like side notes or links.
- **Purpose:** Often used for sidebars, related links, or ads.

`<footer>`

- **Definition:** Represents the footer of a document or section.
- **Purpose:** Usually includes copyright info, contact details, or related links.

`<figure>`

- **Definition:** Represents self-contained content, typically with a caption.
- **Purpose:** Used for illustrations, diagrams, or photos along with `<figcaption>`.

# 2. CSS, Flexbox, Grid, and Responsive Design

## What is CSS and what is it used for ?

CSS (Cascading Style Sheets) is used to style the appearance of HTML content. It controls visual aspects like color, font, size, and layout.

**Relation to HTML:**  
HTML provides the structure; CSS handles the presentation.

**Types of CSS:**
- **Inline:** Inside the HTML tag via the `style` attribute  
- **Internal:** Inside a `<style>` block within the HTML `<head>`  
- **External:** Linked as a separate `.css` file (e.g., `style.css`)

## What is the Box Model ?
The CSS Box Model explains how HTML elements occupy space and interact with the areas around them. Every element is treated as a rectangular box consisting of four main layers:

- **Content**: The actual content of the element, such as text or images.

- **Padding**: The space around the content. Background color is also visible in this area.

- **Border**: The line surrounding the padding. It can have different widths and styles.

- **Margin**: The space outside the border. It determines the distance between the element and others around it.

This structure helps control spacing, alignment, and visual layout of elements effectively.

## What is Flexbox and When Is It Used?
Flexbox is a CSS layout method used to arrange items in one dimension (row or column). It's helpful when aligning, spacing, or distributing elements inside a container, especially in responsive design.

### display: flex
- **Definition:** Turns an element into a flex container, enabling its child elements to follow the Flexbox layout rules.

**Example:**
```
<div style="display: flex;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### flex-direction
- **Definition:** Defines the direction of the main axis, determining how flex items are placed inside the container.

**Values:**

- row (default): Items are placed horizontally, left to right.

- column: Items are placed vertically, top to bottom.

- row-reverse: Items are placed horizontally, right to left.

- column-reverse: Items are placed vertically, bottom to top.

**Example:**
```
<div style="display: flex; flex-direction: column;">
  <div>Box 1</div>
  <div>Box 2</div>
</div>
```

### justify-content
- **Definition:** Aligns flex items along the main axis (horizontal by default).

**Values:**

- flex-start: Items are aligned to the start.

- center: Items are centered.

- flex-end: Items are aligned to the end.

- space-between: Equal space between items.

- space-around: Equal space around items.

- space-evenly: Equal space between and around all items.

**Example:**
```
<div style="display: flex; justify-content: space-between;">
  <div>Item A</div>
  <div>Item B</div>
  <div>Item C</div>
</div>
```

### align-items
- **Definition:** Aligns flex items along the cross axis (vertical by default).

**Values:**

- stretch (default): Items stretch to fill the container.

- flex-start: Items align to the top.

- center: Items are vertically centered.

- flex-end: Items align to the bottom.

### gap
- **Definition:** Adds space between flex items. Cleaner and more efficient than using margins.

**Example:**
```
<div style="display: flex; gap: 20px;">
  <div>Box 1</div>
  <div>Box 2</div>
</div>
```

### flex-wrap
- **Definition:** Controls whether flex items should wrap to the next line when they don't fit in a single row.

**Values:**

- nowrap (default): Items stay in a single line.

- wrap: Items wrap onto multiple lines.

- wrap-reverse: Items wrap in reverse order.

**Example:**
```
<div style="display: flex; flex-wrap: wrap;">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

## What is CSS Grid and When to Use It?
CSS Grid is a two-dimensional layout system used to arrange elements in rows and columns. It's ideal for creating complex layouts where both horizontal and vertical alignment are needed.

### grid-template-columns
- Defines the number and width of columns in a grid.


`grid-template-columns: 200px 1fr 2fr;`

Creates 3 columns: one fixed, two flexible.

### grid-template-rows
- Defines the number and height of rows in a grid.

`grid-template-rows: 100px auto 50px;`

### grid-area
- Specifies where an item is placed in the grid using row/column start and end.

`grid-area: 1 / 2 / 3 / 4;`

### gap
- Sets space between rows and columns.

`gap: 10px;`

### place-items
- Short-hand for aligning items both vertically and horizontally.

`place-items: center;`
