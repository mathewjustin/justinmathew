const showMessage = () => {
  const el = document.getElementById("my-message");
  if (el) el.textContent = "🚀 Hello from TypeScript!";
};

document.addEventListener("DOMContentLoaded", showMessage);