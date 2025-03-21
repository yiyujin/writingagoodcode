document.addEventListener("DOMContentLoaded", async () => {
    try {
      const sourceCodeText = await fetchSourceCode('./sourcecode.txt');
      const data = detectStep(sourceCodeText);
      const enricheddata = computeLineDifferences(data, sourceCodeText);
      renderStepAnalysis(enricheddata);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  async function fetchSourceCode(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text.split("\n").map(line => line.trim());
  }

  export function detectStep(lines) {
    return lines.reduce((data, line, index) => {
      if (line.startsWith('//')) {
        data.push({
          lineIndex: index,
          content: line.slice(2).trim()
        });
      }
      return data;
    }, []);
  }

  function computeLineDifferences(data, allLines) {
    return data.map((item, index) => {
      const startIndex = item.lineIndex;
      const nextIndex = index < data.length - 1 ? data[index + 1].lineIndex : allLines.length - 1;
      const lineCount = nextIndex - startIndex - 1;
      return { ...item, lineCount };
    });
  }

  function createElementWithProps(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  function renderStepAnalysis(data) {
    const container = document.getElementById("step-analysis");
    container.innerHTML = '';

    const title = createElementWithProps("p", "", `Step Analysis (${data.length}):`);
    container.appendChild(title);

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    const headerCell = createElementWithProps("th", "meta3", "lines · step name");
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);
    container.appendChild(table);

    data.forEach(item => {
      const rowContainer = createElementWithProps("div", "step-row");

      const barContainer = createElementWithProps("div", "step-bar");
      const barVisual = createElementWithProps("span", "bar-visual");
      barVisual.style.height = `${item.lineCount}px`;
      barContainer.appendChild(barVisual);

      const countDisplay = createElementWithProps("p", "meta3", item.lineCount.toString());
      barContainer.appendChild(countDisplay);

      const stepDescription = createElementWithProps("p", "meta2", `· ${item.content}`);

      rowContainer.appendChild(barContainer);
      rowContainer.appendChild(stepDescription);
      container.appendChild(rowContainer);
    });
  }