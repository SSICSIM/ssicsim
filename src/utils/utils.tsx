import React from "react";

// Parses a single line for inline formatting and [text]{url} links.
const parseLine = (line: string, keyPrefix: string): React.ReactNode[] => {
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
        key: `${keyPrefix}-link-${placeholder}`,
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "underline text-blue-300 hover:text-blue-200",
      },
      text,
    );

    tempLine = tempLine.replace(fullMatch, placeholder);
  }

  // Regex for formatting: [bold], (italic), {underline}, <bold italic>
  const formatRegex = /(\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\}|<([^>]+)>)/g;
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
          { key: `${keyPrefix}-${index}-bold`, className: "font-bold" },
          match[2],
        ),
      );
    } else if (match[3]) {
      elements.push(
        React.createElement(
          "span",
          { key: `${keyPrefix}-${index}-italic`, className: "italic" },
          match[3],
        ),
      );
    } else if (match[4]) {
      elements.push(
        React.createElement(
          "span",
          { key: `${keyPrefix}-${index}-underline`, className: "underline" },
          match[4],
        ),
      );
    } else if (match[5]) {
      elements.push(
        React.createElement(
          "span",
          {
            key: `${keyPrefix}-${index}-bold-italic`,
            className: "font-bold italic",
          },
          match[5],
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

  return elements;
};

// Splits desc into paragraphs on blank lines (\n\n). Within a paragraph,
// single \n becomes a <br /> so lines stay together without extra spacing.
export const parseDescription = (
  desc: string,
  textSize: string,
  textColorClass: string = "text-white",
) => {
  const paragraphs = desc.split(/\n{2,}/).filter((p) => p.length > 0);

  return paragraphs.map((paragraph, pIdx) => {
    const lines = paragraph.split("\n");
    const elements: React.ReactNode[] = [];

    lines.forEach((line, lIdx) => {
      elements.push(...parseLine(line, `p${pIdx}-l${lIdx}`));
      if (lIdx < lines.length - 1) {
        elements.push(React.createElement("br", { key: `p${pIdx}-br${lIdx}` }));
      }
    });

    // Return <p> wrapper
    return React.createElement(
      "p",
      {
        key: pIdx,
        className: `${textColorClass} mb-2 ${textSize} font-dm-sans`,
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
