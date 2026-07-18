document.addEventListener("DOMContentLoaded", () => {
  const $form = document.querySelector("form");
  const $button = $form.querySelector("button");
  const $url = $form.querySelector("[name=url]");
  const $fast = $form.querySelector("[name=fast]");
  const $preferVector = $form.querySelector("[name=preferVector]");

  const $results = document.querySelector(".results");

  $url.addEventListener("input", () => {
    try {
      new URL($url.value);
      $button.removeAttribute("disabled");
    } catch {
      $button.setAttribute("disabled", "disabled");
    }
  });

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    $results.innerHTML = "";
    $results.append(createLoader());

    const queryParams = getQueryParams();

    console.time("favicon");
    fetch(`/api/favicon?${queryParams}`)
      .then((response) => {
        console.timeEnd("favicon");
        if (!response.ok) return;

        return response.json();
      })
      .then((json) => {
        $results.innerHTML = "";
        const $response = document.createElement("div");
        $response.classList.add("response");

        const $bestCandidate = document.createElement("section");
        if (json.candidates.length > 1) {
          $bestCandidate.classList.add("best-candidate");
        }
        $bestCandidate.append(...createElements(json));
        $response.append($bestCandidate);

        if (json.candidates.length > 1) {
          json.candidates.slice(1).forEach((candidate) => {
            const $candidate = document.createElement("section");
            $candidate.classList.add("candidate");
            $candidate.append(...createElements(candidate));
            $response.append($candidate);
          });
        }
        $results.append($response);
      });
  });

  function createElements(json) {
    const $copyIcon = createCopyIcon(json.url);
    const $url = createUrl(json.url);
    const $metadata = createMetadata(json);
    const $image = createImage(json.url);

    return [$copyIcon, $url, $metadata, $image];
  }

  function getQueryParams() {
    const queryParams = new URLSearchParams({
      url: $url.value,
    });

    if ($fast.checked) {
      queryParams.append("fast", "true");
    }
    if ($preferVector.checked) {
      queryParams.append("preferVector", "true");
    }
    return queryParams;
  }

  function createCopyIcon(url) {
    const $copyIconWrapper = document.createElement("a");
    $copyIconWrapper.classList.add("copy-icon-wrapper");
    $copyIconWrapper.setAttribute("href", "#");
    $copyIconWrapper.addEventListener("click", (e) => {
      navigator.clipboard.writeText(url);
      e.preventDefault();
      e.stopPropagation();
    });

    const $copyIcon = document.createElement("img");
    $copyIcon.classList.add("copy-icon");
    $copyIcon.setAttribute("src", "/assets/copy-icon.svg");
    $copyIconWrapper.append($copyIcon);
    return $copyIconWrapper;
  }

  function createUrl(url) {
    const $url = document.createElement("div");
    $url.classList.add("url");
    $url.innerHTML = url;
    return $url;
  }

  function _createFormat(format) {
    const $format = document.createElement("div");
    $format.classList.add("format");
    $format.innerHTML = format;
    return $format;
  }

  function createMetadata(json) {
    const $metadata = document.createElement("div");
    $metadata.classList.add("metadata");

    const $format = document.createElement("span");
    $format.classList.add(`pill`, `format`);
    $format.innerHTML = `Format: ${json.format}`;
    $metadata.append($format);

    const $source = document.createElement("span");
    $source.classList.add(`pill`, `source`, `source-${json.source}`);
    $source.innerHTML = `Source: ${json.source.replaceAll(/-/g, " ")}`;
    $metadata.append($source);

    if (json.isVector) {
      const $vector = document.createElement("span");
      $vector.classList.add(`pill`, `vector`);
      $vector.setAttribute("title", "Image is a vector image");
      $vector.innerHTML = "Vector Image";
      $metadata.append($vector);
    }
    return $metadata;
  }

  function createImage(url) {
    const $imageWrapper = document.createElement("a");
    $imageWrapper.classList.add("image-wrapper");
    $imageWrapper.setAttribute("href", url);
    $imageWrapper.setAttribute("target", "_blank");
    const $image = document.createElement("img");
    $image.setAttribute("src", url);
    $imageWrapper.append($image);
    return $imageWrapper;
  }

  function createLoader() {
    const $loader = document.createElement("div");
    $loader.classList.add("loader");
    return $loader;
  }
});
