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