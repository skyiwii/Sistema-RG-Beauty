document.querySelectorAll("[data-image-dropzone]").forEach((dropzone) => {
    const form = dropzone.closest("form");
    const input = dropzone.querySelector('input[type="file"]');
    const previewContainer = form.querySelector("[data-image-preview-container]");
    const preview = form.querySelector("[data-image-preview]");
    const placeholder = form.querySelector("[data-image-placeholder]");
    const editor = form.querySelector("[data-image-editor]");
    const frame = form.querySelector("[data-image-crop-frame]");
    const canvas = form.querySelector("[data-image-crop-canvas]");
    const context = canvas.getContext("2d");
    const zoomField = form.querySelector("[data-image-zoom-input]");
    const horizontalField = form.querySelector("[data-image-position-x-input]");
    const verticalField = form.querySelector("[data-image-position-y-input]");
    const adjustedField = form.querySelector("[data-image-adjusted-input]");
    const removeCheckbox = form.querySelector('input[name="eliminar_imagen"]');
    let sourceImage = null;
    let objectUrl = null;
    let loadNumber = 0;
    let isLoading = false;
    let isCurrentImage = false;
    let dragging = null;
    let zoom = Number(zoomField.value || 100);
    let positionX = Number(horizontalField.value || 50);
    let positionY = Number(verticalField.value || 50);

    const setPreviewToCurrentImage = () => {
        const showCurrentImage = Boolean(
            preview.dataset.currentSrc && !removeCheckbox?.checked
        );
        if (!showCurrentImage) {
            sourceImage = null;
            isCurrentImage = false;
            isLoading = false;
            editor.hidden = true;
            previewContainer.hidden = false;
            preview.hidden = true;
            placeholder.hidden = false;
            return;
        }

        previewContainer.hidden = true;
        preview.hidden = true;
        placeholder.hidden = true;
        editor.hidden = false;
        const useCurrentImage = () => {
            if (removeCheckbox?.checked) {
                return;
            }
            sourceImage = preview;
            isCurrentImage = true;
            isLoading = false;
            drawPreview();
        };
        if (preview.complete && preview.naturalWidth) {
            useCurrentImage();
        } else {
            isLoading = true;
            preview.addEventListener("load", useCurrentImage, { once: true });
        }
    };

    const markCurrentImageAdjusted = () => {
        if (isCurrentImage) {
            adjustedField.value = "true";
        }
    };

    const syncPositionFields = () => {
        zoomField.value = String(zoom);
        horizontalField.value = String(positionX);
        verticalField.value = String(positionY);
    };

    const getImageGeometry = () => {
        const scale = Math.max(
            canvas.width / sourceImage.naturalWidth,
            canvas.height / sourceImage.naturalHeight
        ) * zoom / 100;
        const width = sourceImage.naturalWidth * scale;
        const height = sourceImage.naturalHeight * scale;
        const x = (canvas.width - width) * positionX / 100;
        const y = (canvas.height - height) * positionY / 100;
        return { width, height, x, y };
    };

    const drawPreview = () => {
        if (!sourceImage) {
            return;
        }

        const geometry = getImageGeometry();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            sourceImage,
            geometry.x,
            geometry.y,
            geometry.width,
            geometry.height
        );
    };

    const resetControls = () => {
        zoom = 100;
        positionX = 50;
        positionY = 50;
        syncPositionFields();
        drawPreview();
    };

    const clearSelection = () => {
        loadNumber += 1;
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
        }
        sourceImage = null;
        isLoading = false;
        isCurrentImage = false;
        editor.hidden = true;
        input.setCustomValidity("");
        setPreviewToCurrentImage();
    };

    const loadImage = (file) => {
        const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
        if (!allowedTypes.has(file.type)) {
            input.value = "";
            clearSelection();
            input.setCustomValidity("Selecciona una imagen JPG, PNG o WebP.");
            input.reportValidity();
            return;
        }

        clearSelection();
        sourceImage = null;
        isCurrentImage = false;
        input.setCustomValidity("");
        adjustedField.value = "false";
        zoom = 100;
        positionX = 50;
        positionY = 50;
        syncPositionFields();
        if (removeCheckbox) {
            removeCheckbox.checked = false;
        }
        previewContainer.hidden = true;
        preview.hidden = true;
        placeholder.hidden = true;
        editor.hidden = false;
        isLoading = true;

        const currentLoad = ++loadNumber;
        const imageUrl = URL.createObjectURL(file);
        objectUrl = imageUrl;
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(imageUrl);
            if (objectUrl === imageUrl) {
                objectUrl = null;
            }
            if (currentLoad !== loadNumber) {
                return;
            }
            isLoading = false;
            sourceImage = image;
            isCurrentImage = false;
            input.setCustomValidity("");
            resetControls();
        };
        image.onerror = () => {
            if (currentLoad !== loadNumber) {
                return;
            }
            input.value = "";
            clearSelection();
            input.setCustomValidity("No se pudo abrir la imagen seleccionada.");
            input.reportValidity();
        };
        image.src = imageUrl;
    };

    input.addEventListener("change", () => {
        const [file] = input.files;
        if (file) {
            loadImage(file);
        } else {
            clearSelection();
        }
    });

    frame.addEventListener("pointerdown", (event) => {
        if (!sourceImage) {
            return;
        }
        event.preventDefault();
        const bounds = frame.getBoundingClientRect();
        const geometry = getImageGeometry();
        dragging = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            positionX,
            positionY,
            rangeX: canvas.width - geometry.width,
            rangeY: canvas.height - geometry.height,
            frameWidth: bounds.width,
            frameHeight: bounds.height,
        };
        frame.setPointerCapture(event.pointerId);
    });

    frame.addEventListener("pointermove", (event) => {
        if (!dragging || event.pointerId !== dragging.pointerId) {
            return;
        }
        const deltaX = (event.clientX - dragging.startX) * canvas.width / dragging.frameWidth;
        const deltaY = (event.clientY - dragging.startY) * canvas.height / dragging.frameHeight;
        if (Math.abs(dragging.rangeX) > 1) {
            positionX = Math.round(Math.max(
                0,
                Math.min(100, dragging.positionX + deltaX * 100 / dragging.rangeX)
            ));
        }
        if (Math.abs(dragging.rangeY) > 1) {
            positionY = Math.round(Math.max(
                0,
                Math.min(100, dragging.positionY + deltaY * 100 / dragging.rangeY)
            ));
        }
        markCurrentImageAdjusted();
        syncPositionFields();
        drawPreview();
    });

    frame.addEventListener("wheel", (event) => {
        if (!sourceImage) {
            return;
        }
        event.preventDefault();
        const previousZoom = zoom;
        zoom = Math.max(50, Math.min(300, zoom + (event.deltaY < 0 ? 10 : -10)));
        if (zoom !== previousZoom) {
            markCurrentImageAdjusted();
        }
        syncPositionFields();
        drawPreview();
    }, { passive: false });

    frame.addEventListener("dblclick", (event) => {
        if (!sourceImage) {
            return;
        }
        event.preventDefault();
        markCurrentImageAdjusted();
        resetControls();
    });

    ["pointerup", "pointercancel"].forEach((eventName) => {
        frame.addEventListener(eventName, (event) => {
            if (dragging && event.pointerId === dragging.pointerId) {
                dragging = null;
            }
        });
    });

    if (removeCheckbox) {
        removeCheckbox.addEventListener("change", () => {
            if (removeCheckbox.checked && !input.files.length) {
                sourceImage = null;
                isCurrentImage = false;
                previewContainer.hidden = true;
                preview.hidden = true;
                editor.hidden = true;
                placeholder.hidden = false;
            } else if (!input.files.length) {
                setPreviewToCurrentImage();
            }
        });
    }

    form.addEventListener("submit", (event) => {
        if (input.files.length && (isLoading || !sourceImage)) {
            event.preventDefault();
            input.setCustomValidity("Espera a que termine de cargar la vista previa.");
            input.reportValidity();
        }
    });

    setPreviewToCurrentImage();

    ["dragenter", "dragover"].forEach((eventName) => {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.add("is-dragging");
        });
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.remove("is-dragging");
        });
    });

    dropzone.addEventListener("drop", (event) => {
        const [file] = event.dataTransfer.files;
        if (!file) {
            return;
        }

        const transfer = new DataTransfer();
        transfer.items.add(file);
        input.files = transfer.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
    });
});
