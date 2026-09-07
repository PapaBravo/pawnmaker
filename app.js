"use strict";

/* pawnmaker — generate printable pawns from user-supplied images.
   State is kept in memory only; pawns are rendered as DOM strips that the
   browser's print function arranges on the page. */

const pawns = [];

const form = document.getElementById("pawn-form");
const nameInput = document.getElementById("pawn-name");
const sizeInput = document.getElementById("pawn-size");
const countInput = document.getElementById("pawn-count");
const fileInput = document.getElementById("pawn-image");
const dropZone = document.getElementById("drop-zone");
const dropText = document.getElementById("drop-text");
const imagePreview = document.getElementById("image-preview");
const emptyMessage = document.getElementById("empty-message");
const controlsList = document.getElementById("pawn-controls");
const printButton = document.getElementById("print-button");
const sheetElement = document.getElementById("sheet");

/* --- Image selection (file picker + drag and drop) --- */

dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    showPreview(fileInput.files[0]);
  }
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    fileInput.files = event.dataTransfer.files;
    showPreview(file);
  }
});

function showPreview(file) {
  imagePreview.src = URL.createObjectURL(file);
  imagePreview.hidden = false;
  dropText.textContent = file.name;
}

function clearImageSelection() {
  URL.revokeObjectURL(imagePreview.src);
  imagePreview.src = "";
  imagePreview.hidden = true;
  dropText.textContent = "Click to choose an image or drop one here";
}

/* --- Adding and removing pawns --- */

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    pawns.push({
      name: nameInput.value.trim(),
      image: reader.result,
      size: sizeInput.value,
      count: countInput.valueAsNumber,
    });
    render();
    form.reset();
    clearImageSelection();
    nameInput.focus();
  });
  reader.readAsDataURL(file);
});

controlsList.addEventListener("click", (event) => {
  const button = event.target.closest(".pawn-delete");
  if (button) {
    pawns.splice(Number(button.dataset.index), 1);
    render();
  }
});

/* --- Rendering --- */

function render() {
  renderControls();
  renderSheet();
  const hasPawns = pawns.length > 0;
  emptyMessage.hidden = hasPawns;
  printButton.disabled = !hasPawns;
}

function renderControls() {
  controlsList.replaceChildren(
    ...pawns.map((pawn, index) => {
      const item = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "pawn-delete";
      deleteButton.dataset.index = index;
      deleteButton.textContent = "✕";
      deleteButton.setAttribute("aria-label", `Remove ${pawn.name}`);
      const label = document.createElement("span");
      label.textContent = `${pawn.name} — ${pawn.size}, ×${pawn.count}`;
      item.append(deleteButton, label);
      return item;
    })
  );
}

function renderSheet() {
  const fragments = [];
  for (const pawn of pawns) {
    for (let i = 0; i < pawn.count; i++) {
      fragments.push(createPawnElement(pawn));
    }
  }
  sheetElement.replaceChildren(...fragments);
}

function createPawnElement(pawn) {
  const element = document.createElement("div");
  element.className = `pawn ${pawn.size}`;

  const mirror = document.createElement("div");
  mirror.className = "mirror";
  mirror.append(createArt(pawn.image), createStand());

  element.append(
    mirror,
    createArt(pawn.image),
    createStand(pawn.name)
  );
  return element;
}

function createArt(image) {
  const art = document.createElement("div");
  art.className = "art";
  const img = document.createElement("img");
  img.src = image;
  img.alt = "";
  art.append(img);
  return art;
}

function createStand(name) {
  const stand = document.createElement("div");
  stand.className = "stand";
  if (name) {
    const label = document.createElement("span");
    label.className = "name";
    label.textContent = name;
    stand.append(label);
  }
  return stand;
}

/* --- Printing --- */

printButton.addEventListener("click", () => window.print());
