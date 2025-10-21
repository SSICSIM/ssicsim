import React from "react";

export const parseDescription = (desc: string, textSize: string) => {
  const lines = desc.split("\n");

  return lines.map((line, idx) => {
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Link regex: [text]{url}
    const linkRegex = /\[([^\]]+)\]\{([^}]+)\}/g;

    // Store placeholders and rendered <a> elements
    const linkPlaceholders: { [key: string]: React.ReactNode } = {};
    let tempLine = line;
    let linkMatch;
    let linkCounter = 0;

    // Replace all link matches with placeholders
    while ((linkMatch = linkRegex.exec(line)) !== null) {
      const [fullMatch, text, url] = linkMatch;
      const placeholder = `__LINK_PLACEHOLDER_${linkCounter++}__`;

      linkPlaceholders[placeholder] = React.createElement(
        "a",
        {
          key: `link-${placeholder}`,
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline text-blue-300 hover:text-blue-200",
        },
        text,
      );

      tempLine = tempLine.replace(fullMatch, placeholder);
    }

    // Regex for formatting: [bold], (italic), {underline}
    const formatRegex = /(\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\})/g;
    let match;

    while ((match = formatRegex.exec(tempLine)) !== null) {
      const fullMatch = match[0];
      const index = match.index;

      // Add text before match
      if (index > lastIndex) {
        const chunk = tempLine.slice(lastIndex, index);
        elements.push(...replacePlaceholders(chunk, linkPlaceholders));
      }

      // Apply formatting
      if (match[2]) {
        elements.push(
          React.createElement(
            "span",
            { key: index + "-bold", className: "font-bold underline" },
            match[2],
          ),
        );
      } else if (match[3]) {
        elements.push(
          React.createElement(
            "span",
            { key: index + "-italic", className: "italic" },
            match[3],
          ),
        );
      } else if (match[4]) {
        elements.push(
          React.createElement(
            "span",
            { key: index + "-underline", className: "underline" },
            match[4],
          ),
        );
      }

      lastIndex = index + fullMatch.length;
    }

    // Add remaining text
    if (lastIndex < tempLine.length) {
      const chunk = tempLine.slice(lastIndex);
      elements.push(...replacePlaceholders(chunk, linkPlaceholders));
    }

    // Return <p> wrapper
    return React.createElement(
      "p",
      {
        key: idx,
        className: `text-white mb-2 ${textSize} font-dm-sans`,
      },
      ...elements,
    );
  });
};

// Helper to swap link placeholders with React elements
function replacePlaceholders(
  text: string,
  map: { [key: string]: React.ReactNode },
): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const regex = /__LINK_PLACEHOLDER_\d+__/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const index = match.index;
    const placeholder = match[0];

    if (index > lastIndex) {
      result.push(text.slice(lastIndex, index));
    }

    result.push(map[placeholder]);
    lastIndex = index + placeholder.length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}
