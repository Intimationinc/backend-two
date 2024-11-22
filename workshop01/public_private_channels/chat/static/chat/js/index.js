const createRoomButton = document.querySelector("#create-new-room-button");
const createNewRoomModal = document.querySelector("#create-new-room-modal");
const createNewRoomModalBackdrop = document.querySelector(
  "#create-new-room-modal-backdrop"
);

const joinPublicRoomButton = document.querySelector("#join-public-room-button");
const joinPublicRoomModal = document.querySelector("#join-public-room-modal");
const joinPublicRoomModalBackdrop = document.querySelector(
  "#join-public-room-modal-backdrop"
);
const forms = document.querySelectorAll("form");

createRoomButton.addEventListener("click", () => {
  createNewRoomModal.classList.remove("hidden");
});

createNewRoomModalBackdrop.addEventListener("click", (event) => {
  createNewRoomModal.classList.add("hidden");
});

joinPublicRoomButton.addEventListener("click", () => {
  joinPublicRoomModal.classList.remove("hidden");
});

joinPublicRoomModalBackdrop.addEventListener("click", (event) => {
  joinPublicRoomModal.classList.add("hidden");
});

forms.forEach((form) => {
  let nameInputField = form.querySelector("input[name='name']");
  let name = localStorage.getItem("name");
  if (name !== null) {
    nameInputField.value = name;
  }
  form.addEventListener("submit", (e) => {
    let name = e.target.querySelector("input[name='name']").value.trim();
    localStorage.setItem("name", name);
  });
});
