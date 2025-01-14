import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from "./components/widget"; 

class FeedbackComponent extends HTMLElement {
  constructor() {
    super();
    this.mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
  }

  connectedCallback() {
    const props = {
      title: this.getAttribute("title") || "Send us your feedback",
    };

    // Create root and render properly
    const root = createRoot(this.mountPoint);
    root.render(<Widget {...props} />);

    // Store root instance for cleanup
    this.root = root;
  }

  disconnectedCallback() {
    // Properly cleanup React root
    if (this.root) {
      this.root.unmount();
    }
  }
}

customElements.define("feedback-widget", FeedbackComponent);

export default FeedbackComponent;