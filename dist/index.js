// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  categoriesData;
  articlesData;
  categoryIdCounter;
  articleIdCounter;
  constructor() {
    this.categoriesData = /* @__PURE__ */ new Map();
    this.articlesData = /* @__PURE__ */ new Map();
    this.categoryIdCounter = 1;
    this.articleIdCounter = 1;
    const sampleCategories = [
      {
        name: "\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629",
        description: "\u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621\u060C \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0621\u060C \u0639\u0644\u0645 \u0627\u0644\u0623\u062D\u064A\u0627\u0621\u060C \u0639\u0644\u0648\u0645 \u0627\u0644\u0623\u0631\u0636",
        icon: "flask",
        color: "blue"
      },
      {
        name: "\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629",
        description: "\u0639\u0644\u0645 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u060C \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u060C \u0639\u0644\u0645 \u0627\u0644\u0646\u0641\u0633\u060C \u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0633\u064A\u0627\u0633\u064A\u0629",
        icon: "users",
        color: "green"
      },
      {
        name: "\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0648\u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627",
        description: "\u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0627\u0644\u0645\u062F\u0646\u064A\u0629\u060C \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629\u060C \u0639\u0644\u0648\u0645 \u0627\u0644\u062D\u0627\u0633\u0648\u0628\u060C \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A",
        icon: "laptop",
        color: "yellow"
      },
      {
        name: "\u0627\u0644\u0637\u0628 \u0648\u0627\u0644\u0635\u062D\u0629",
        description: "\u0627\u0644\u0637\u0628 \u0627\u0644\u0633\u0631\u064A\u0631\u064A\u060C \u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0639\u0627\u0645\u0629\u060C \u0627\u0644\u062A\u063A\u0630\u064A\u0629\u060C \u0627\u0644\u0635\u064A\u062F\u0644\u0629",
        icon: "heart",
        color: "red"
      },
      {
        name: "\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064A\u0629",
        description: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E\u060C \u0627\u0644\u0641\u0644\u0633\u0641\u0629\u060C \u0627\u0644\u0644\u063A\u0627\u062A\u060C \u0627\u0644\u0641\u0646\u0648\u0646",
        icon: "book",
        color: "purple"
      }
    ];
    sampleCategories.forEach((category) => this.createCategory(category));
    const sampleArticles = [
      {
        title: "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u062A\u0637\u0648\u064A\u0631 \u0645\u0648\u0627\u062F \u0645\u062A\u062C\u062F\u062F\u0629 \u0644\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u0645\u0633\u064A\u0629",
        abstract: "\u062A\u0633\u062A\u0639\u0631\u0636 \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u062A\u0637\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u062E\u064A\u0631\u0629 \u0641\u064A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645 \u0627\u0644\u0622\u0644\u064A \u0644\u062A\u0633\u0631\u064A\u0639 \u0627\u0643\u062A\u0634\u0627\u0641 \u0648\u062A\u0637\u0648\u064A\u0631 \u0645\u0648\u0627\u062F \u062C\u062F\u064A\u062F\u0629 \u0644\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0634\u0645\u0633\u064A\u0629 \u0645\u0639 \u062A\u062D\u0633\u064A\u0646 \u0643\u0641\u0627\u0621\u0629 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0637\u0627\u0642\u0629 \u0628\u0646\u0633\u0628\u0629 \u062A\u0635\u0644 \u0625\u0644\u0649 25%.",
        content: "\u064A\u0639\u062F \u062A\u0637\u0648\u064A\u0631 \u0645\u0648\u0627\u062F \u062C\u062F\u064A\u062F\u0629 \u0644\u0644\u062E\u0644\u0627\u064A\u0627 \u0627\u0644\u0634\u0645\u0633\u064A\u0629 \u0623\u0645\u0631\u064B\u0627 \u0628\u0627\u0644\u063A \u0627\u0644\u0623\u0647\u0645\u064A\u0629 \u0644\u062A\u062D\u0633\u064A\u0646 \u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u062A\u062C\u062F\u062F\u0629. \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629\u060C \u0646\u0633\u062A\u0639\u0631\u0636 \u0643\u064A\u0641\u064A\u0629 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0627\u0644\u062A\u0639\u0644\u0645 \u0627\u0644\u0622\u0644\u064A \u0644\u062A\u0633\u0631\u064A\u0639 \u0639\u0645\u0644\u064A\u0629 \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629. \u0644\u0642\u062F \u0648\u062C\u062F\u0646\u0627 \u0623\u0646 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0647 \u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A \u064A\u0645\u0643\u0646 \u0623\u0646 \u064A\u062D\u0633\u0646 \u0643\u0641\u0627\u0621\u0629 \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0637\u0627\u0642\u0629 \u0628\u0646\u0633\u0628\u0629 \u0643\u0628\u064A\u0631\u0629...",
        authors: "\u062F. \u0623\u062D\u0645\u062F \u0645\u062D\u0645\u0648\u062F\u060C \u062F. \u0633\u0627\u0631\u0629 \u0627\u0644\u0641\u0627\u0636\u0644",
        publishDate: /* @__PURE__ */ new Date("2023-05-15"),
        categoryId: 1,
        pdfUrl: "/api/pdf/article1.pdf"
      },
      {
        title: "\u062A\u0623\u062B\u064A\u0631 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A \u0639\u0644\u0649 \u0627\u0644\u062A\u0645\u0627\u0633\u0643 \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u064A \u0641\u064A \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629",
        abstract: "\u062A\u0628\u062D\u062B \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0641\u064A \u0627\u0644\u062A\u0623\u062B\u064A\u0631\u0627\u062A \u0627\u0644\u0645\u062A\u0646\u0648\u0639\u0629 \u0644\u0645\u0646\u0635\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A \u0639\u0644\u0649 \u0628\u0646\u064A\u0629 \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0645\u0646 \u062E\u0644\u0627\u0644 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u062D\u064A\u0629 \u0645\u0646 \u062E\u0645\u0633 \u062F\u0648\u0644 \u0639\u0631\u0628\u064A\u0629 \u0648\u062A\u0642\u062F\u064A\u0645 \u0631\u0624\u0649 \u062D\u0648\u0644 \u0643\u064A\u0641\u064A\u0629 \u0627\u0644\u0627\u0633\u062A\u0641\u0627\u062F\u0629 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0646\u0635\u0627\u062A \u0644\u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u062A\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u064A.",
        content: "\u0634\u0647\u062F\u062A \u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u0623\u062E\u064A\u0631\u0629 \u0627\u0646\u062A\u0634\u0627\u0631\u064B\u0627 \u0648\u0627\u0633\u0639\u064B\u0627 \u0644\u0645\u0646\u0635\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A \u0641\u064A \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0639\u0631\u0628\u064A\u060C \u0645\u0645\u0627 \u0623\u062F\u0649 \u0625\u0644\u0649 \u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0643\u0628\u064A\u0631\u0629 \u0641\u064A \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0648\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629. \u062A\u0628\u062D\u062B \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0641\u064A \u062A\u0623\u062B\u064A\u0631 \u0647\u0630\u0647 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062A\u0645\u0627\u0633\u0643 \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u064A \u0645\u0646 \u062E\u0644\u0627\u0644 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u062C\u0645\u0639\u062A \u0645\u0646 5 \u062F\u0648\u0644 \u0639\u0631\u0628\u064A\u0629 \u0645\u062E\u062A\u0644\u0641\u0629...",
        authors: "\u062F. \u0644\u064A\u0644\u0649 \u0639\u0628\u062F\u0627\u0644\u0644\u0647\u060C \u062F. \u0645\u062D\u0645\u062F \u0627\u0644\u0642\u0627\u0633\u0645",
        publishDate: /* @__PURE__ */ new Date("2023-05-10"),
        categoryId: 2,
        pdfUrl: "/api/pdf/article2.pdf"
      },
      {
        title: "\u062A\u0637\u0648\u064A\u0631 \u0646\u0638\u0627\u0645 \u0630\u0643\u064A \u0644\u0644\u0643\u0634\u0641 \u0627\u0644\u0645\u0628\u0643\u0631 \u0639\u0646 \u0627\u0644\u0622\u0641\u0627\u062A \u0627\u0644\u0632\u0631\u0627\u0639\u064A\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u062D\u0627\u0633\u0648\u0628\u064A\u0629",
        abstract: "\u062A\u0642\u062F\u0645 \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0646\u0638\u0627\u0645\u0627\u064B \u0645\u0628\u062A\u0643\u0631\u0627\u064B \u0644\u0644\u0643\u0634\u0641 \u0627\u0644\u0645\u0628\u0643\u0631 \u0639\u0646 \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0648\u0627\u0644\u0622\u0641\u0627\u062A \u0627\u0644\u0632\u0631\u0627\u0639\u064A\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u062D\u0627\u0633\u0648\u0628\u064A\u0629 \u0648\u0627\u0644\u0634\u0628\u0643\u0627\u062A \u0627\u0644\u0639\u0635\u0628\u064A\u0629 \u0627\u0644\u0639\u0645\u064A\u0642\u0629\u060C \u0645\u0639 \u062A\u062D\u0642\u064A\u0642 \u062F\u0642\u0629 \u062A\u0634\u062E\u064A\u0635 \u062A\u0628\u0644\u063A 97% \u0641\u064A \u0627\u0644\u0638\u0631\u0648\u0641 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A\u0629.",
        content: "\u062A\u0639\u062F \u0627\u0644\u0622\u0641\u0627\u062A \u0627\u0644\u0632\u0631\u0627\u0639\u064A\u0629 \u0645\u0646 \u0623\u0643\u0628\u0631 \u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0648\u0627\u062C\u0647 \u0627\u0644\u0625\u0646\u062A\u0627\u062C \u0627\u0644\u0632\u0631\u0627\u0639\u064A\u060C \u0648\u062A\u0633\u0628\u0628 \u062E\u0633\u0627\u0626\u0631 \u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0643\u0628\u064A\u0631\u0629 \u0633\u0646\u0648\u064A\u064B\u0627. \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629\u060C \u0642\u0645\u0646\u0627 \u0628\u062A\u0637\u0648\u064A\u0631 \u0646\u0638\u0627\u0645 \u0630\u0643\u064A \u064A\u0633\u062A\u062E\u062F\u0645 \u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0631\u0624\u064A\u0629 \u0627\u0644\u062D\u0627\u0633\u0648\u0628\u064A\u0629 \u0648\u0627\u0644\u062A\u0639\u0644\u0645 \u0627\u0644\u0639\u0645\u064A\u0642 \u0644\u0644\u0643\u0634\u0641 \u0627\u0644\u0645\u0628\u0643\u0631 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0622\u0641\u0627\u062A \u0628\u062F\u0642\u0629 \u0639\u0627\u0644\u064A\u0629...",
        authors: "\u062F. \u0639\u0645\u0631 \u0633\u0644\u064A\u0645\u0627\u0646\u060C \u0645. \u0646\u0648\u0631 \u0627\u0644\u062D\u0633\u0646",
        publishDate: /* @__PURE__ */ new Date("2023-05-05"),
        categoryId: 3,
        pdfUrl: "/api/pdf/article3.pdf"
      },
      {
        title: "\u0627\u0644\u0627\u0633\u062A\u0639\u062F\u0627\u062F \u0644\u0645\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0623\u0648\u0628\u0626\u0629: \u062F\u0631\u0648\u0633 \u0645\u0633\u062A\u0641\u0627\u062F\u0629 \u0645\u0646 \u062A\u062C\u0631\u0628\u0629 \u0643\u0648\u0641\u064A\u062F-19 \u0641\u064A \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629",
        abstract: "\u062A\u062D\u0644\u0644 \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0646\u0638\u0645 \u0627\u0644\u0635\u062D\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0644\u062C\u0627\u0626\u062D\u0629 \u0643\u0648\u0641\u064A\u062F-19 \u0648\u062A\u0642\u062F\u0645 \u0625\u0637\u0627\u0631\u0627\u064B \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0627\u064B \u0644\u062A\u0639\u0632\u064A\u0632 \u0627\u0644\u0627\u0633\u062A\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644\u064A \u0644\u0644\u0623\u0648\u0628\u0626\u0629 \u0645\u0646 \u062E\u0644\u0627\u0644 \u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0646\u0638\u0645 \u0627\u0644\u0625\u0646\u0630\u0627\u0631 \u0627\u0644\u0645\u0628\u0643\u0631.",
        content: "\u0643\u0634\u0641\u062A \u062C\u0627\u0626\u062D\u0629 \u0643\u0648\u0641\u064A\u062F-19 \u0639\u0646 \u062A\u062D\u062F\u064A\u0627\u062A \u0643\u0628\u064A\u0631\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0645 \u0627\u0644\u0635\u062D\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0639\u0627\u0644\u0645\u060C \u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u0627\u0644\u062F\u0648\u0644 \u0627\u0644\u0639\u0631\u0628\u064A\u0629. \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629\u060C \u0646\u062D\u0644\u0644 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0646\u0638\u0645 \u0627\u0644\u0635\u062D\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0644\u0644\u062C\u0627\u0626\u062D\u0629\u060C \u0648\u0646\u062D\u062F\u062F \u0646\u0642\u0627\u0637 \u0627\u0644\u0642\u0648\u0629 \u0648\u0627\u0644\u0636\u0639\u0641 \u0641\u064A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629...",
        authors: "\u062F. \u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u0632\u0647\u0631\u0627\u0621\u060C \u062F. \u062E\u0627\u0644\u062F \u0627\u0644\u0631\u0634\u064A\u062F\u064A\u060C \u062F. \u0647\u062F\u0649 \u0627\u0644\u0639\u0627\u0645\u0631\u064A",
        publishDate: /* @__PURE__ */ new Date("2023-05-01"),
        categoryId: 4,
        pdfUrl: "/api/pdf/article4.pdf"
      },
      {
        title: "\u0627\u0644\u0639\u0645\u0627\u0631\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A\u0629 \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629: \u0627\u0644\u062A\u0648\u0627\u0632\u0646 \u0628\u064A\u0646 \u0627\u0644\u0623\u0635\u0627\u0644\u0629 \u0648\u0627\u0644\u062D\u062F\u0627\u062B\u0629 \u0641\u064A \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0633\u0627\u062C\u062F \u0627\u0644\u062D\u062F\u064A\u062B\u0629",
        abstract: "\u062A\u0646\u0627\u0642\u0634 \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0648\u0627\u0644\u0641\u0631\u0635 \u0641\u064A \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0633\u0627\u062C\u062F \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629 \u0627\u0644\u062A\u064A \u062A\u062D\u0627\u0641\u0638 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0631\u0648\u062B \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064A \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A \u0645\u0639 \u062A\u0644\u0628\u064A\u0629 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u0627\u062A \u0627\u0644\u062D\u062F\u064A\u062B\u0629\u060C \u0645\u0646 \u062E\u0644\u0627\u0644 \u062A\u062D\u0644\u064A\u0644 \u0646\u0645\u0627\u0630\u062C \u0628\u0627\u0631\u0632\u0629 \u0645\u0646 \u0645\u062E\u062A\u0644\u0641 \u0623\u0646\u062D\u0627\u0621 \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A.",
        content: "\u062A\u0645\u062B\u0644 \u0627\u0644\u0645\u0633\u0627\u062C\u062F \u0631\u0645\u0632\u064B\u0627 \u0645\u0647\u0645\u064B\u0627 \u0644\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A\u0629 \u0648\u0627\u0644\u062B\u0642\u0627\u0641\u064A\u0629 \u0641\u064A \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0639\u0631\u0628\u064A \u0648\u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A. \u0648\u0645\u0639 \u0627\u0644\u062A\u0637\u0648\u0631 \u0627\u0644\u0639\u0645\u0631\u0627\u0646\u064A \u0648\u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u060C \u062A\u0648\u0627\u062C\u0647 \u062A\u0635\u0627\u0645\u064A\u0645 \u0627\u0644\u0645\u0633\u0627\u062C\u062F \u062A\u062D\u062F\u064A\u0627\u062A \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0632\u0646\u0629 \u0628\u064A\u0646 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0644\u062A\u0631\u0627\u062B \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064A \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A \u0648\u062A\u0644\u0628\u064A\u0629 \u0627\u062D\u062A\u064A\u0627\u062C\u0627\u062A \u0627\u0644\u0645\u062C\u062A\u0645\u0639\u0627\u062A \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629...",
        authors: "\u062F. \u0645\u0646\u0649 \u0627\u0644\u0647\u0627\u0634\u0645\u064A\u060C \u062F. \u064A\u0648\u0633\u0641 \u0627\u0644\u0639\u0648\u0636\u064A",
        publishDate: /* @__PURE__ */ new Date("2023-04-25"),
        categoryId: 5,
        pdfUrl: "/api/pdf/article5.pdf"
      },
      {
        title: "\u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u0646\u0627\u062E\u064A \u0639\u0644\u0649 \u0627\u0644\u062A\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0648\u0644\u0648\u062C\u064A \u0641\u064A \u0627\u0644\u0646\u0638\u0645 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629",
        abstract: "\u062A\u0631\u0635\u062F \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u0637\u0648\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u062F \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0648\u0644\u0648\u062C\u064A \u0644\u0644\u0646\u0638\u0645 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629 \u0641\u064A \u0634\u0645\u0627\u0644 \u0623\u0641\u0631\u064A\u0642\u064A\u0627 \u0648\u0634\u0628\u0647 \u0627\u0644\u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u062E\u0644\u0627\u0644 \u0627\u0644\u0639\u0642\u062F\u064A\u0646 \u0627\u0644\u0645\u0627\u0636\u064A\u064A\u0646\u060C \u0648\u062A\u0642\u062F\u0645 \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0627\u062A \u0644\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0647\u062F\u062F\u0629 \u0628\u0627\u0644\u0627\u0646\u0642\u0631\u0627\u0636.",
        content: "\u062A\u0639\u062A\u0628\u0631 \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629 \u0645\u0646 \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u062A\u0623\u062B\u0631\u064B\u0627 \u0628\u0627\u0644\u062A\u063A\u064A\u0631 \u0627\u0644\u0645\u0646\u0627\u062E\u064A\u060C \u0648\u062A\u0634\u0643\u0644 \u0645\u0648\u0637\u0646\u064B\u0627 \u0644\u0623\u0646\u0648\u0627\u0639 \u0641\u0631\u064A\u062F\u0629 \u0645\u0646 \u0627\u0644\u0643\u0627\u0626\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0643\u064A\u0641\u062A \u0645\u0639 \u0627\u0644\u0638\u0631\u0648\u0641 \u0627\u0644\u0642\u0627\u0633\u064A\u0629. \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u0637\u0648\u064A\u0644\u0629 \u0627\u0644\u0623\u0645\u062F\u060C \u0642\u0645\u0646\u0627 \u0628\u0631\u0635\u062F \u0627\u0644\u062A\u063A\u064A\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0648\u0644\u0648\u062C\u064A \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629 \u0628\u0634\u0645\u0627\u0644 \u0623\u0641\u0631\u064A\u0642\u064A\u0627 \u0648\u0627\u0644\u062C\u0632\u064A\u0631\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629...",
        authors: "\u062F. \u062C\u0645\u0627\u0644 \u0627\u0644\u0633\u0639\u062F\u064A\u060C \u062F. \u0647\u0627\u0644\u0629 \u0627\u0644\u0631\u064A\u0633",
        publishDate: /* @__PURE__ */ new Date("2023-04-20"),
        categoryId: 1,
        pdfUrl: "/api/pdf/article6.pdf"
      }
    ];
    sampleArticles.forEach((article) => this.createArticle(article));
  }
  // Category methods
  async getAllCategories() {
    return Array.from(this.categoriesData.values());
  }
  async getCategoryById(id) {
    return this.categoriesData.get(id);
  }
  async createCategory(category) {
    const id = this.categoryIdCounter++;
    const newCategory = { ...category, id };
    this.categoriesData.set(id, newCategory);
    return newCategory;
  }
  // Article methods
  async getAllArticles() {
    return Array.from(this.articlesData.values());
  }
  async getLatestArticles(limit) {
    const articles = Array.from(this.articlesData.values()).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, limit);
    return articles;
  }
  async getArticleById(id) {
    return this.articlesData.get(id);
  }
  async getArticlesByCategory(categoryId) {
    return Array.from(this.articlesData.values()).filter((article) => article.categoryId === categoryId).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  async searchArticles(query) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return Array.from(this.articlesData.values()).filter(
      (article) => article.title.toLowerCase().includes(lowerQuery) || article.abstract.toLowerCase().includes(lowerQuery) || article.content.toLowerCase().includes(lowerQuery) || article.authors.toLowerCase().includes(lowerQuery)
    ).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  async createArticle(article) {
    const id = this.articleIdCounter++;
    const newArticle = { ...article, id };
    this.articlesData.set(id, newArticle);
    return newArticle;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  app2.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  });
  app2.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles" });
    }
  });
  app2.get("/api/articles/latest", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 6;
      const articles = await storage.getLatestArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest articles" });
    }
  });
  app2.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      const article = await storage.getArticleById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Error fetching article" });
    }
  });
  app2.get("/api/articles/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const articles = await storage.getArticlesByCategory(categoryId);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles by category" });
    }
  });
  app2.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const articles = await storage.searchArticles(query);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error searching articles" });
    }
  });
  app2.get("/api/pdf/:filename", (req, res) => {
    const pdfContent = `
    %PDF-1.4
    1 0 obj
    << /Type /Catalog
       /Pages 2 0 R
    >>
    endobj
    2 0 obj
    << /Type /Pages
       /Kids [3 0 R]
       /Count 1
    >>
    endobj
    3 0 obj
    << /Type /Page
       /Parent 2 0 R
       /Resources << /Font << /F1 4 0 R >> >>
       /MediaBox [0 0 612 792]
       /Contents 5 0 R
    >>
    endobj
    4 0 obj
    << /Type /Font
       /Subtype /Type1
       /BaseFont /Helvetica
    >>
    endobj
    5 0 obj
    << /Length 68 >>
    stream
    BT
    /F1 24 Tf
    100 700 Td
    (Academic Article - ${req.params.filename}) Tj
    ET
    endstream
    endobj
    xref
    0 6
    0000000000 65535 f
    0000000010 00000 n
    0000000063 00000 n
    0000000126 00000 n
    0000000256 00000 n
    0000000334 00000 n
    trailer
    << /Size 6
       /Root 1 0 R
    >>
    startxref
    453
    %%EOF
    `;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${req.params.filename}`);
    res.send(Buffer.from(pdfContent));
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
