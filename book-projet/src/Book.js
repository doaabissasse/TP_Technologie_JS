"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookFormat = exports.BookStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var BookStatus;
(function (BookStatus) {
    BookStatus["READ"] = "Read";
    BookStatus["RE_READ"] = "Re-read";
    BookStatus["DNF"] = "DNF";
    BookStatus["CURRENTLY_READING"] = "Currently reading";
    BookStatus["RETURNED_UNREAD"] = "Returned Unread";
    BookStatus["WANT_TO_READ"] = "Want to read";
})(BookStatus || (exports.BookStatus = BookStatus = {}));
var BookFormat;
(function (BookFormat) {
    BookFormat["PRINT"] = "Print";
    BookFormat["PDF"] = "PDF";
    BookFormat["EBOOK"] = "Ebook";
    BookFormat["AUDIOBOOK"] = "AudioBook";
})(BookFormat || (exports.BookFormat = BookFormat = {}));
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    status: { type: String, enum: Object.values(BookStatus), required: true },
    price: { type: Number, required: true },
    pagesRead: { type: Number, required: true },
    format: { type: String, enum: Object.values(BookFormat), required: true },
    suggestedBy: { type: String, required: true },
    finished: { type: Boolean, default: false },
});
// Define the Book model using the IBook interface
const BookModel = mongoose_1.default.model('Book', bookSchema);
exports.default = BookModel;
