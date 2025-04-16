---
title: 'Designing a Browser History Feature'
date: 2024-02-04T00:01:00.000-08:00
draft: false
url: /2024/02/designing-browser-history-feature.html
---

### Objective

The goal is to create a class capable of handling browser history operations efficiently. This includes:

*   Initializing the browser with a specified homepage.
*   Navigating to new URLs (visiting pages).
*   Enabling backward and forward navigation through the history.

### Key Components

*   **Constructor**: Initializes the browser with a homepage.
*   **Visit(URL)**: Navigates to a new URL and updates the current position in the history.
*   **Back(steps)**: Moves back a specified number of steps in history and returns the current URL.
*   **Forward(steps)**: Moves forward a specified number of steps in history and returns the current URL.

### Implementation

We will use a doubly linked list to manage the history of visited URLs, allowing for efficient navigation both backward and forward.

```
 `class BrowserHistory {
    class Node {
        String url;
        Node prev, next;

        public Node(String url) {
            this.url = url;
        }
    }

    private Node current;

    public BrowserHistory(String homepage) {
        current = new Node(homepage);
    }

    public void visit(String url) {
        Node newNode = new Node(url);
        current.next = newNode;
        newNode.prev = current;
        current = newNode; // Move forward to the new page
    }

    public String back(int steps) {
        while (current.prev != null && steps-- > 0) {
            current = current.prev;
        }
        return current.url;
    }

    public String forward(int steps) {
        while (current.next != null && steps-- > 0) {
            current = current.next;
        }
        return current.url;
    }
}` 

```

### Example Usage

```
 `BrowserHistory browserHistory = new BrowserHistory("takeuforward.org");
browserHistory.visit("google.com"); // User visits 'google.com'.
browserHistory.visit("instagram.com"); // User then visits 'instagram.com'.
browserHistory.back(1); // User goes back one step to 'google.com'.
browserHistory.back(1); // User goes back another step to 'takeuforward.org'.
browserHistory.forward(1); // User moves forward to 'google.com' again.
browserHistory.visit("takeuforward.org"); // User visits 'takeuforward.org', overwriting forward history.
browserHistory.forward(2); // No forward history, remains on 'takeuforward.org'.
browserHistory.back(2); // User goes back to 'google.com'.
browserHistory.back(7); // Attempts to go back 7 steps but only goes back to the homepage.` 

```

### Complexity Analysis

*   **Constructor**: O(1) - Only involves initializing a single node.
*   **Visit(URL)**: O(1) - Adding a new node to a doubly linked list is a constant time operation.
*   **Back(steps)** and **Forward(steps)**: O(steps) - Proportional to the number of steps taken, due to traversal through the linked list.

This design mirrors the functionality of real web browsers, offering an intuitive navigation experience while ensuring operations are performed efficiently.