import { checkTypeOrError, checkRTAOrError } from "./check";

// 拓展名映射到mime类型的映射（常见的）
const extensionToMimeType = {
  // 图片
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  webp: "image/webp",
  // 音频
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  // 视频
  mp4: "video/mp4",
  webm: "video/webm",
  // 文档
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  html: "text/html",
  htm: "text/html",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  xml: "application/xml",
  // 压缩文件
  zip: "application/zip",
  gz: "application/gzip",
  rar: "application/x-rar-compressed",
};

// mime类型映射到拓展名（常见的）
const mimeTypeToExtension = {
  // 图片类型
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/avif": "avif",
  "image/x-icon": "ico",

  // 文档类型
  "application/pdf": "pdf",
  "text/plain": "txt",
  "text/html": "html",
  "text/css": "css",
  "text/javascript": "js",
  "application/json": "json",
  "application/xml": "xml",
  "text/csv": "csv",
  "application/rtf": "rtf",

  // 微软 Office 文档
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",

  // 压缩文件
  "application/zip": "zip",
  "application/gzip": "gz",
  "application/x-tar": "tar",
  "application/x-rar-compressed": "rar",
  "application/x-7z-compressed": "7z",

  // 音频类型
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
  "audio/mp4": "m4a",
  "audio/webm": "webm",
  "audio/x-ms-wma": "wma",

  // 视频类型
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
  "video/x-msvideo": "avi",
  "video/mpeg": "mpeg",
  "video/quicktime": "mov",
  "video/x-matroska": "mkv",

  // 字体类型
  "font/ttf": "ttf",
  "font/otf": "otf",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "font/eot": "eot",

  // 其他常见类型
  "application/octet-stream": "bin",
  "application/x-sh": "sh",
  "application/x-msdownload": "exe",
  "application/x-java-applet": "class",
  "application/x-bittorrent": "torrent",
  "application/x-sqlite3": "db",
  "application/x-font-ttf": "ttf",

  // 网页相关
  "application/javascript": "js",
  "application/xhtml+xml": "xhtml",
  "application/atom+xml": "atom",
  "application/rss+xml": "rss",

  // 数据交换
  "application/ld+json": "jsonld",
  "application/x-www-form-urlencoded": "urlencoded",
  "multipart/form-data": "formdata",

  // 其他
  "model/stl": "stl",
  "image/heic": "heic",
  "application/x-bzip2": "bz2",
  "text/markdown": "md",
  "application/x-pem-file": "pem",
  "application/x-x509-ca-cert": "crt",
};

/**
 * @description 根据文件名截取拓展名
 * @param {String} fileName 文件名，必传
 * @param {String} extCase 大小写，可选值lower|upper|original
 */
export const getFileNameExtension = (fileName, extCase = "original") => {
  checkRTAOrError(fileName, "fileName", true, ["String"]);
  checkRTAOrError(
    extCase,
    "extCase",
    false,
    ["String"],
    [["lower", "upper", "original"]]
  );
  const arr = fileName.split(".");
  const ext = arr[arr.length - 1];
  if (extCase === "lower") return ext.toLocaleLowerCase();
  if (extCase === "upper") return ext.toLocaleUpperCase();
  return ext;
};

/**
 * @description 根据拓展名获取mime类型
 * @param {String} extension 拓展名：png、.png、JPG，不区分大小写，必传
 * @returns {String} mime类型
 */
export const getMimeTypeByExtension = (extension) => {
  checkRTAOrError(extension, "extension", true, ["String"]);
  // 转换为小写并去除开头的点（如果有）
  const ext = extension.toLowerCase().replace(/^\./, "");
  // 获取对应的MIME
  const mime = extensionToMimeType[ext];
  if (!mime) throw new Error(`Unsupported file extension: ${ext}`);
  return mime;
};

/**
 * @description 根据mime类型获取拓展名
 * @param {String} mimeType mime类型：image/png，必传
 * @returns {string} 拓展名
 */
export const getExtensionByMimeType = (mimeType) => {
  checkRTAOrError(mimeType, "mimeType", true, ["String"]);

  // 获取对应的拓展名
  const ext = mimeTypeToExtension[mimeType];
  if (!ext) throw new Error(`Unsupported MIME Type: ${mimeType}`);
  return ext;
};

/**
 * @description base64数据转成blob
 * @param {String} base64 base64数据(前缀可带可不带)，必传
 * @param {String} contentType 拓展名或mime类型
 * 最终 MIME 类型优先级：contentType > base64 前缀 > 默认
 * @returns {Blob}
 */
export const base64ToBlob = (base64, contentType) => {
  checkRTAOrError(base64, "base64", true, ["String"]);
  checkTypeOrError(contentType, "contentType", "String");

  // 提取 Base64 前缀中的 MIME 类型（如果存在）
  const matches = base64.match(/^data:([^;]+);base64,/);
  const mimeTypeFromPrefix = matches?.[1];

  // 处理传入的 contentType 参数
  let resolvedMimeType = "";

  if (contentType) {
    // 如果包含斜杠，认为是 MIME 类型（如 "image/jpeg"）
    if (contentType.includes("/")) {
      resolvedMimeType = contentType;
    }
    // 否则认为是扩展名（如 "jpg"），尝试映射
    else {
      resolvedMimeType = getMimeTypeByExtension(contentType);
    }
  }

  // 最终 MIME 类型优先级：contentType > base64 前缀 > 默认
  return new Blob(
    [
      Uint8Array.from(atob(base64.replace(/^data:[^;]+;base64,/, "")), (c) =>
        c.charCodeAt(0)
      ),
    ],
    {
      type:
        resolvedMimeType || mimeTypeFromPrefix || "application/octet-stream",
    }
  );
};

/**
 * @description base64数据转成blob url
 * @param {String} base64 base64数据(前缀可带可不带)，必传
 * @param {String} contentType 拓展名或mime类型
 * 最终 MIME 类型优先级：contentType > base64 前缀 > 默认
 * @returns {String}
 */
export const base64ToBlobUrl = (base64, contentType) => {
  const blob = base64ToBlob(base64, contentType);
  return URL.createObjectURL(blob);
};

/**
 * @description blob数据转成base64数据(带前缀)
 * @param {Blob} blob blob数据，必传
 * @returns {String}
 */
export const blobToBase64 = (blob) => {
  checkRTAOrError(blob, "blob", true, ["Blob"]);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * @description blob url转成base64数据(带前缀)
 * @param {String} blobUrl blob url，必传
 * @returns {String}
 */
export const blobUrlToBase64 = async (blobUrl) => {
  checkRTAOrError(blobUrl, "blobUrl", true, ["String"]);
  try {
    // 通过 fetch API 获取 Blob 对象
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`Fetch blobUrl error! status: ${response.status}`);
    }

    const blob = await response.blob();

    // 使用 FileReader 将 Blob 转换为 Base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // 返回带 MIME 前缀的 Base64
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw error;
  }
};

/**
 * @description 解析base64数据(带前缀)获取base64数据(不带前缀)、mime、拓展名
 * @param {String} base64 base64数据(带前缀)，必传
 */
export const parseBase64 = (base64) => {
  checkRTAOrError(base64, "base64", true, ["String"]);

  // 正则表达式匹配 MIME 类型和 Base64 数据
  const matches = base64.match(/^data:([^;]+);base64,(.*)$/);

  let result = {
    mime: "application/octet-stream",
    base64,
    extension: "",
  };

  if (matches && matches.length === 3) {
    result.mime = matches[1];
    result.base64 = matches[2];

    const ext = getExtensionByMimeType(result.mime);
    result.extension = ext;
  }

  return result;
};

/**
 * @description 补全Base64数据的前缀，生成完整的Data URL
 * @param {String} base64 不带前缀的base64字符串，必传
 * @param {String} extension 拓展名：png、.png、JPG，不区分大小写，必传
 */
export const completeBase64Prefix = (base64, extension) => {
  checkRTAOrError(base64, "base64", ["String"]);
  checkRTAOrError(extension, "extension", ["String"]);

  // 获取对应的MIME
  const mime = getMimeTypeByExtension(extension);

  // 拼接完整的Data URL
  return `data:${mime};base64,${base64}`;
};

/**
 * @description 下载文件
 * @param {String} url 文件路径，必传
 * @param {String} fileName 文件名称
 */
export const downloadFile = (url, fileName = "下载文件") => {
  checkRTAOrError(url, "url", ["String"]);
  checkTypeOrError(fileName, "fileName", "String");

  // 创建a标签
  const a = document.createElement("a");
  // 设置下载链接和文件名
  a.href = url;
  a.download = fileName;
  // 触发点击事件
  document.body.appendChild(a);
  a.click();
  // 移除a标签避免内存泄漏
  document.body.removeChild(a);
};
